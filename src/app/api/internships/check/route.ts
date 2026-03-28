import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
// Use the high rate limit model as requested previously
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    })
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { url, description } = await req.json()
    if (!url && !description) {
      return NextResponse.json({ error: "Please provide either an internship URL or description text." }, { status: 400 })
    }

    let textToAnalyze = description

    // If URL is provided and we don't have text, use Firecrawl to extract content
    if (url && !description) {
      const response = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.FIRECRAWL_API_KEY}`,
        },
        body: JSON.stringify({ url, formats: ["markdown"] }),
      })

      if (!response.ok) throw new Error("Failed to scrape internship URL.")
      const data = await response.json()
      textToAnalyze = data.data.markdown || ""
      
      if (textToAnalyze.length < 50) throw new Error("Could not extract enough readable content from this URL.")
    }

    // Call Hugging Face BERT model
    let hfVerdict = "Analyze the text based strictly on your own logic without any external baseline.";
    try {
      if (process.env.HF_TOKEN) {
        const hfRes = await fetch("https://api-inference.huggingface.co/models/AventIQ-AI/BERT-Spam-Job-Posting-Detection-Model", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ inputs: textToAnalyze.substring(0, 1000) })
        });
        
        if (hfRes.ok) {
          const result = await hfRes.json();
          if (Array.isArray(result) && result.length > 0) {
            let sortedScores = Array.isArray(result[0]) ? result[0] : result;
            sortedScores.sort((a: any, b: any) => b.score - a.score);
            const topLabel = sortedScores[0].label;
            const topScore = (sortedScores[0].score * 100).toFixed(1);
            const isFake = topLabel === "LABEL_1";
            hfVerdict = `HIGH PRIORITY VERDICT: A specialized BERT job-spam detection AI has already analyzed this post and definitively concluded it is ${isFake ? 'FAKE' : 'REAL'} with ${topScore}% confidence. You MUST align your trustScore and final verdict with this conclusion. Generate the specific red flags that support this verdict.`;
          }
        }
      }
    } catch (hfErr) {
      console.error("Hugging Face API Error:", hfErr);
    }

    // Now use Gemini to analyze the text for authenticity
    const prompt = `
    You are an expert cybersecurity and fraud analyst specializing in fake internship detection.
    Analyze the following internship listing text and determine its authenticity.
    
    INTERNSHIP LISTING TEXT:
    ${textToAnalyze.substring(0, 4000)} // Truncate to save tokens

    ${hfVerdict}

    Perform a strict analysis against these 5 checks:
    1. PAYMENT_REQUESTED: Does it ask the applicant to pay money (registration fee, training fee, software fee, deposit)? (Rule: Paying for an internship = SCAM).
    2. VERIFIABLE_COMPANY: Is the company name clearly stated and sounds like a real verifiable corporate entity? (Or is it vague like "Confidential Company" or a fake sounding SEO mill).
    3. CONTACT_INFO: Does it provide professional contact info? (Rule: Only WhatsApp or personal Gmail = Red Flag).
    4. REALISTIC_SCOPE: Is the job scope realistic for an intern? 
    5. REALISTIC_PAY: Is the stipend realistic for this role? (Rule: Offering ₹1L+/month for a 2-hour remote data entry job = SCAM).

    Output a STRICT JSON object matching this schema exactly without markdown formatting:
    {
       "trustScore": <number 0-100>,
       "checks": {
          "paymentRequestedFlag": <boolean> (true if payment is demanded - this drops score immensely),
          "verifiableCompanyPass": <boolean>,
          "legitimateContactPass": <boolean>,
          "realisticScopePass": <boolean>,
          "realisticPayPass": <boolean>
       },
       "verdict": "<2-3 sentence summary of the verdict>",
       "redFlags": ["<list any specific red flags found, empty array if none>"],
       "greenFlags": ["<list positive indicators>"]
    }
    `

    const aiResult = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    })

    const resultText = aiResult.response.text()
    const parsed = JSON.parse(resultText)

    return NextResponse.json(parsed)

  } catch (err: any) {
    console.error("Authenticity Checker Error:", err)
    return NextResponse.json({ error: err.message || "Failed to analyze internship." }, { status: 500 })
  }
}
