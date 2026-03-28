"use client"

import { useState, useMemo } from "react"
import {
  Search, ExternalLink, Gift, Music, Monitor, GraduationCap,
  Shirt, Heart, Plane, UtensilsCrossed, Landmark, Tag, 
  ChevronRight, Star, Sparkles, Filter, ArrowUpRight, CheckCircle2,
  Code, Target
} from "lucide-react"

// ─── All Benefit Data (Parsed from docx) ─────────────────────────
interface Benefit {
  brand: string
  discount: string
  howToAccess: string
  link: string
}

interface Section {
  id: string
  title: string
  subtitle: string
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  benefits: Benefit[]
}

const SECTIONS: Section[] = [
  {
    id: "platforms",
    title: "Discount Platforms",
    subtitle: "Join these first — they unlock 95% of all student deals in India",
    icon: Tag,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    benefits: [
      { brand: "UNiDAYS India", discount: "FREE – 300+ brands in India", howToAccess: "Sign up with college/uni email or student ID", link: "https://www.myunidays.com/IN/en-IN" },
      { brand: "Student Beans India", discount: "FREE – thousands of stores", howToAccess: "Sign up free with student ID", link: "https://www.studentbeans.com/in" },
      { brand: "ISIC Card", discount: "Discounts in 130+ countries", howToAccess: "Apply for card at isic.org – accepted worldwide", link: "https://www.isic.org" },
      { brand: "SheerID", discount: "Verification hub for many global brands", howToAccess: "Verify at participating brands' websites", link: "https://www.sheerid.com/students/" },
      { brand: "ID.me Education Hub", discount: "Verification service – some US brands", howToAccess: "Create free ID.me account", link: "https://www.id.me/education" },
    ],
  },
  {
    id: "entertainment",
    title: "Entertainment",
    subtitle: "Streaming, Music, Gaming & Sports — confirmed available for Indian students",
    icon: Music,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    benefits: [
      { brand: "Spotify Premium Student", discount: "₹59/mo (50% off ₹119)", howToAccess: "SheerID on Spotify India site", link: "https://www.spotify.com/in/student/" },
      { brand: "Apple Music Student", discount: "₹59/mo (50% off ₹99)", howToAccess: "UNiDAYS verification – renew annually", link: "https://www.apple.com/in/shop/buy-product/student" },
      { brand: "YouTube Premium Student", discount: "Discounted student rate (India)", howToAccess: "SheerID – enrolled in Indian institution", link: "https://www.youtube.com/premium/student" },
      { brand: "MUBI (Film Streaming)", discount: "Discounted student plan – India available", howToAccess: "Student email verification", link: "https://mubi.com/en/students" },
      { brand: "Crunchyroll (Anime)", discount: "Periodic student promos (India-accessible)", howToAccess: "Student Beans / UNiDAYS India", link: "https://www.crunchyroll.com/" },
      { brand: "NBA League Pass", discount: "40% off (India-accessible)", howToAccess: "Verify student status at checkout", link: "https://leaguepass.nba.com/" },
      { brand: "BookMyShow Student Offers", discount: "Discounted movie tickets & events", howToAccess: "Promo codes + student promotions in app", link: "https://in.bookmyshow.com/" },
    ],
  },
  {
    id: "tech",
    title: "Technology & Software",
    subtitle: "Devices, Developer Tools, Design & Cloud — GitHub Student Pack unlocks $200k+ in tools",
    icon: Monitor,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    benefits: [
      { brand: "GitHub Student Developer Pack", discount: "FREE – $200k+ tools (global, India OK)", howToAccess: "GitHub Education – student ID or .edu email", link: "https://education.github.com/pack" },
      { brand: "JetBrains All Products Pack", discount: "FREE (annually renewable – global)", howToAccess: "Apply at JetBrains Education", link: "https://www.jetbrains.com/community/education/" },
      { brand: "Adobe Creative Cloud", discount: "~65% off (India pricing)", howToAccess: "SheerID or school email on Adobe India site", link: "https://www.adobe.com/in/creativecloud/buy/students.html" },
      { brand: "Microsoft 365 Education", discount: "FREE – Word, Excel, PowerPoint, Teams", howToAccess: "Sign up with school/college email", link: "https://www.microsoft.com/en-in/education/products/office" },
      { brand: "Notion Plus Plan", discount: "FREE for students (global)", howToAccess: "Sign up with school email", link: "https://www.notion.so/product/notion-for-education" },
      { brand: "Autodesk (AutoCAD, Maya, Fusion 360)", discount: "FREE (1-year, renewable – India OK)", howToAccess: "Create Autodesk Education account", link: "https://www.autodesk.com/education/edu-software/overview" },
      { brand: "Figma Education", discount: "FREE Professional plan (global)", howToAccess: "Apply via Figma Education", link: "https://www.figma.com/education/" },
      { brand: "Canva for Education", discount: "FREE Canva Pro features (India OK)", howToAccess: "Sign up with school email", link: "https://www.canva.com/education/" },
      { brand: "Apple India Education Pricing", discount: "Up to ₹9,000 off Mac; 20% off iPad", howToAccess: "Apple India Education Store + student ID", link: "https://www.apple.com/in-edu/shop" },
      { brand: "Samsung India Student Discount", discount: "Up to 10-15% off devices in India", howToAccess: "UNiDAYS India verification", link: "https://www.samsung.com/in/offer/galaxy-student-offer/" },
      { brand: "Lenovo India Student Discount", discount: "Up to 40% off (laptops, IdeaPad, Yoga)", howToAccess: "Lenovo India EDU store; promo codes", link: "https://www.lenovo.com/in/en/" },
      { brand: "HP India Student Discount", discount: "Up to 30% off laptops and PCs", howToAccess: "HP India education store", link: "https://www.hp.com/in-en/shop/" },
      { brand: "Dell India Student (EDU Store)", discount: "Up to 15% off", howToAccess: ".edu email or student ID", link: "https://www.dell.com/en-in/shop/dell-advantage" },
      { brand: "Microsoft Azure for Students", discount: "$100 Azure credit – no credit card needed", howToAccess: "Sign up with college email", link: "https://azure.microsoft.com/en-in/free/students/" },
      { brand: "Sketch (Design Tool)", discount: "FREE for students & educators", howToAccess: "Apply at Sketch Education page", link: "https://www.sketch.com/for-education/" },
      { brand: "Grammarly Students", discount: "Free basic; premium discounts", howToAccess: "UNiDAYS India or Grammarly EDU", link: "https://www.grammarly.com/students" },
      { brand: "Evernote Professional", discount: "40% off Professional plan", howToAccess: "UNiDAYS India verification", link: "https://www.myunidays.com/IN/en-IN/partners/evernote/view" },
      { brand: "Namecheap (.me domain + SSL)", discount: "FREE 1 year domain + SSL", howToAccess: "GitHub Student Developer Pack", link: "https://education.github.com/pack" },
      { brand: "DigitalOcean Cloud Credits", discount: "$200 credit for 1 year", howToAccess: "GitHub Student Developer Pack", link: "https://education.github.com/pack" },
      { brand: "Miro Online Whiteboard", discount: "FREE Education plan (unlimited boards)", howToAccess: "Sign up with school email", link: "https://miro.com/education/" },
      { brand: "Loom Pro (Video Messaging)", discount: "FREE via GitHub Student Pack", howToAccess: "GitHub Student Developer Pack", link: "https://www.loom.com/education" },
      { brand: "1Password Student", discount: "Free first year", howToAccess: "GitHub Student Pack / SheerID", link: "https://1password.com/students/" },
      { brand: "Perplexity AI Pro", discount: "Discounted Pro for students", howToAccess: "Student verification on site", link: "https://www.perplexity.ai/" },
      { brand: "Lenskart Student Discount", discount: "10% off eyewear orders", howToAccess: "Register and verify student status at checkout", link: "https://www.lenskart.com/" },
      { brand: "OnePlus India Student Offer", discount: "Exclusive student deals on devices", howToAccess: "Verify via UNiDAYS India", link: "https://www.oneplus.in/" },
    ],
  },
  {
    id: "education",
    title: "Education & Learning",
    subtitle: "Online Courses, Textbooks, Productivity & India-Specific Platforms",
    icon: GraduationCap,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    benefits: [
      { brand: "Coursera", discount: "Free access to 7,000+ courses", howToAccess: "Coursera Campus or Student Beans", link: "https://www.coursera.org/campus" },
      { brand: "Udemy India", discount: "Up to 80% off courses", howToAccess: "UNiDAYS India or Student Beans", link: "https://www.udemy.com/" },
      { brand: "Khan Academy", discount: "Completely FREE always", howToAccess: "No verification required", link: "https://www.khanacademy.org/" },
      { brand: "edX Online Courses", discount: "Free audit; discounts on certificates", howToAccess: "Sign up free; check verified track", link: "https://www.edx.org/" },
      { brand: "Quizlet Plus", discount: "15% off annual Plus subscription", howToAccess: "UNiDAYS India verification", link: "https://www.myunidays.com/IN/en-IN/partners/quizlet/view" },
      { brand: "Duolingo Plus", discount: "Occasional student promo codes", howToAccess: "Student Beans India", link: "https://www.duolingo.com/" },
      { brand: "Google Workspace for Education", discount: "FREE – Gmail, Drive, Docs, Meet", howToAccess: "Applied via Indian institution / .edu email", link: "https://edu.google.com/" },
      { brand: "Wolfram Alpha Pro", discount: "Discounted Pro plan", howToAccess: "Verify with school email", link: "https://www.wolframalpha.com/pro-for-students" },
      { brand: "Overleaf LaTeX Editor", discount: "FREE Pro via school affiliation", howToAccess: "Sign up with Indian college email", link: "https://www.overleaf.com/edu" },
      { brand: "Chegg eTextbooks & Study", discount: "Discounted study plans (India access)", howToAccess: "Sign up with student status", link: "https://www.chegg.com/study" },
      { brand: "Skillshare Student Scholarship", discount: "50% off 1-year membership", howToAccess: "Apply via Skillshare scholarship page", link: "https://www.skillshare.com/" },
      { brand: "LinkedIn Learning India", discount: "1-month free + 30% off plans", howToAccess: "Student status via UNiDAYS India", link: "https://www.linkedin.com/learning/" },
      { brand: "MATLAB Student License", discount: "Discounted student license", howToAccess: "MathWorks Education – Indian institution", link: "https://in.mathworks.com/academia/student_version.html" },
      { brand: "Ableton Live (Music Production)", discount: "50% off", howToAccess: "Education pricing at Ableton India", link: "https://www.ableton.com/en/shop/education/" },
      { brand: "Codecademy Pro Student", discount: "Discounted Pro plans", howToAccess: "GitHub Student Pack or direct", link: "https://www.codecademy.com/" },
      { brand: "Byju's", discount: "India's own edu platform – trial offers", howToAccess: "Sign up with student details", link: "https://byjus.com/" },
      { brand: "Unacademy Plus", discount: "Student-specific subscription deals", howToAccess: "Promo codes for Indian students", link: "https://unacademy.com/" },
      { brand: "Preply Language Tutoring", discount: "15% off 1-on-1 online lessons", howToAccess: "Sign up with student email", link: "https://preply.com/" },
    ],
  },
  {
    id: "fashion",
    title: "Fashion & Apparel",
    subtitle: "Clothing, Footwear & Accessories — all ship to India or have India stores",
    icon: Shirt,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    benefits: [
      { brand: "Nike India", discount: "10% off via SheerID", howToAccess: "SheerID student verification on Nike India", link: "https://www.nike.com/in" },
      { brand: "Adidas India", discount: "15-30% off", howToAccess: "UNiDAYS India verification", link: "https://www.adidas.co.in/" },
      { brand: "H&M India", discount: "15% off", howToAccess: "UNiDAYS India / Student Beans India", link: "https://www.hm.com/en_in/" },
      { brand: "Converse India", discount: "15% off online orders", howToAccess: "UNiDAYS India verification", link: "https://www.converse.com/in/en/home/" },
      { brand: "Levi's India", discount: "15% off", howToAccess: "SheerID verification on Levi's India", link: "https://www.levi.com/IN/en_IN/" },
      { brand: "Under Armour India", discount: "10% off", howToAccess: "UNiDAYS India verification", link: "https://www.underarmour.com/en-in/" },
      { brand: "Ray-Ban India", discount: "Student discount via UNiDAYS India", howToAccess: "UNiDAYS India verification", link: "https://www.ray-ban.com/india" },
      { brand: "Calvin Klein India", discount: "Student discount via UNiDAYS India", howToAccess: "UNiDAYS India verification", link: "https://www.calvinklein.in/" },
      { brand: "SHEIN India", discount: "15% off via UNiDAYS India", howToAccess: "UNiDAYS India verification", link: "https://in.shein.com/" },
      { brand: "Forever 21 India", discount: "10-20% off in-store and online", howToAccess: "Show student ID in-store (India)", link: "https://www.forever21.com/in/" },
      { brand: "Jack & Jones India", discount: "Up to 50% off selected products", howToAccess: "UNiDAYS India verification", link: "https://www.jackjones.com/in/en/" },
      { brand: "Myntra Student Discount", discount: "10-15% off select categories", howToAccess: "UNiDAYS India / student promo codes", link: "https://www.myntra.com/" },
      { brand: "AJIO Student Offer", discount: "Extra 10% off with student coupon", howToAccess: "UNiDAYS India or verified student codes", link: "https://www.ajio.com/" },
      { brand: "Crocs India", discount: "₹500 gift voucher on registration", howToAccess: "UNiDAYS India verification", link: "https://www.crocs.in/" },
      { brand: "Gymshark", discount: "15% off – ships to India", howToAccess: "Student Beans verification", link: "https://in.gymshark.com/" },
    ],
  },
  {
    id: "wellness",
    title: "Beauty & Wellness",
    subtitle: "Cosmetics, Skincare, Fitness & Mental Wellness — India-accessible",
    icon: Heart,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    benefits: [
      { brand: "Nykaa Student Program", discount: "15% off beauty & wellness products", howToAccess: "Register + student ID verification", link: "https://www.nykaa.com/" },
      { brand: "Lakme India", discount: "20% off – Student Special offer", howToAccess: "Show student ID; promo codes on site", link: "https://www.lakmeindia.com/" },
      { brand: "MAC Cosmetics India", discount: "15% off", howToAccess: "Student ID in MAC India stores / UNiDAYS", link: "https://www.maccosmetics.in/" },
      { brand: "Clinique India", discount: "15% off", howToAccess: "UNiDAYS India verification", link: "https://www.clinique.com/" },
      { brand: "Kerastase India", discount: "15% off + free shipping", howToAccess: "Student Beans India verification", link: "https://www.kerastase.co.in/" },
      { brand: "Headspace Student Plan", discount: "Up to 85% off – meditation app", howToAccess: "SheerID – Indian institution accepted", link: "https://www.headspace.com/studentplan" },
      { brand: "Calm Student Discount", discount: "Discounted annual subscription", howToAccess: "Student Beans India / UNiDAYS India", link: "https://www.calm.com/" },
      { brand: "Cult.fit Student Offers", discount: "Student-specific workout membership deals", howToAccess: "Direct sign-up + student ID in India", link: "https://www.cult.fit/" },
      { brand: "Lookfantastic", discount: "10-15% off – ships to India", howToAccess: "UNiDAYS India verification", link: "https://www.lookfantastic.com/" },
      { brand: "DailyObjects India", discount: "Extra 21% off on orders above ₹699", howToAccess: "UNiDAYS India verification", link: "https://www.dailyobjects.com/" },
      { brand: "Nike Training Club", discount: "FREE fitness app – available in India", howToAccess: "Free download on Google Play / App Store", link: "https://www.nike.com/ntc-app" },
    ],
  },
  {
    id: "travel",
    title: "Travel & Transport",
    subtitle: "Indian Airlines, International Airlines from India & Local Transport",
    icon: Plane,
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
    benefits: [
      { brand: "IndiGo Student Fare", discount: "10% off base fare + 10 kg extra baggage + free change", howToAccess: "Book online; show student ID at airport", link: "https://www.goindigo.in/offers/student-offer.html" },
      { brand: "Air India Student Discount", discount: "Up to 25% off on domestic & international flights", howToAccess: "Book directly; show student ID (age 12+)", link: "https://www.airindia.com/in/en/offers/air-india-student-offer.html" },
      { brand: "SpiceJet Student Deals", discount: "Discounted fares – check Offer Zone", howToAccess: "Visit SpiceJet Offer Zone; student promo codes", link: "https://www.spicejet.com/Offers" },
      { brand: "StudentUniverse India", discount: "Exclusive student fares – 75+ international airlines", howToAccess: "Free membership + enrollment proof", link: "https://www.studentuniverse.com/" },
      { brand: "Emirates Student Discount", discount: "10% off + extra 10 kg baggage", howToAccess: "Use code STUDENT on Emirates India site", link: "https://www.emirates.com/in/english/plan-and-book/student-offers/" },
      { brand: "Etihad Airways Student", discount: "10% off Economy, 5% off Business from India", howToAccess: "Etihad student page + student ID", link: "https://www.etihad.com/en-in/studentoffer" },
      { brand: "Qatar Airways Student", discount: "Up to 15% off from Indian cities", howToAccess: "Qatar student offer page – India routing", link: "https://www.qatarairways.com/en-in/offers/student-deals.html" },
      { brand: "Singapore Airlines Student", discount: "10% off + extra baggage (from India)", howToAccess: "KrisFlyer India account + student ID", link: "https://www.singaporeair.com/en_UK/in/plan-travel/promotions/" },
      { brand: "Lufthansa Student Fare", discount: "Discounted fares India to Europe + extra bag", howToAccess: "Lufthansa Travel ID India + student verification", link: "https://www.lufthansa.com/in/en/student-offer" },
      { brand: "Turkish Airlines Student", discount: "Up to 20% off + free ticket change", howToAccess: "Miles&Smiles Student account – India accepted", link: "https://www.turkishairlines.com/en-in/" },
      { brand: "IRCTC Student Concession", discount: "25-50% off railway fares (educational travel)", howToAccess: "Book via IRCTC; submit Institution Certificate at station", link: "https://www.irctc.co.in/" },
      { brand: "Ola Student Discount", discount: "Periodic student promo codes", howToAccess: "OLA app + student promo codes", link: "https://www.olacabs.com/" },
      { brand: "RedBus Student Promo", discount: "Discounts on bus bookings across India", howToAccess: "RedBus app + student promo codes", link: "https://www.redbus.in/" },
      { brand: "Yatra.com Student Deals", discount: "Student discounts on flights & hotels", howToAccess: "UNiDAYS India / direct booking", link: "https://www.yatra.com/" },
      { brand: "MakeMyTrip Student Offers", discount: "Seasonal student deals on flights & hotels", howToAccess: "Check MMT student offer page", link: "https://www.makemytrip.com/" },
      { brand: "KAYAK Student Fares", discount: "Compare student/youth fares – international", howToAccess: "Filter for student fares; India-accessible", link: "https://www.kayak.co.in/" },
    ],
  },
  {
    id: "food",
    title: "Food & Dining",
    subtitle: "Indian Delivery Apps, Restaurants & Campus Food — India-exclusive deals",
    icon: UtensilsCrossed,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    benefits: [
      { brand: "Swiggy Student Rewards", discount: "Free delivery, ₹49 meals, ₹200 off – INDIA EXCLUSIVE", howToAccess: "Verify college email in Swiggy app → Student Rewards section", link: "https://www.swiggy.com/" },
      { brand: "Zomato Student Promos", discount: "Periodic student promos & promo codes", howToAccess: "Zomato app – check offers + student codes", link: "https://www.zomato.com/" },
      { brand: "Domino's India", discount: "Regular student deals & combo offers", howToAccess: "UNiDAYS India / Student Beans codes", link: "https://www.dominos.co.in/" },
      { brand: "McDonald's India", discount: "Deals via Student Beans India", howToAccess: "Student Beans India app", link: "https://www.mcdonaldsindia.com/" },
      { brand: "KFC India", discount: "Student meal combos – via Swiggy/Zomato", howToAccess: "Order via Swiggy/Zomato; student promo codes", link: "https://online.kfc.co.in/" },
      { brand: "Subway India", discount: "10-15% off with student ID", howToAccess: "Valid student ID at Subway India stores", link: "https://www.subway.com/en-IN" },
      { brand: "Pizza Hut India", discount: "Student combos and periodic deals", howToAccess: "Student Beans India / in-store ID", link: "https://www.pizzahut.co.in/" },
      { brand: "Cafe Coffee Day", discount: "Student discounts – valid ID", howToAccess: "Valid student ID at CCD outlets across India", link: "https://www.cafecoffeeday.com/" },
      { brand: "Starbucks India", discount: "Occasional promotions with student ID", howToAccess: "Show student ID at participating Starbucks India stores", link: "https://www.starbucks.in/" },
    ],
  },
  {
    id: "scholarships",
    title: "Government & Scholarships",
    subtitle: "Central Government, State, & Overseas Scholarship Programs for Indian students",
    icon: Landmark,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
    benefits: [
      { brand: "National Scholarship Portal (NSP)", discount: "Central + state schemes", howToAccess: "Register at scholarships.gov.in with Aadhaar", link: "https://scholarships.gov.in/" },
      { brand: "Prime Minister's Scholarship Scheme", discount: "₹2,500-3,000/mo for CAPF/RPF wards", howToAccess: "Apply via National Scholarship Portal", link: "https://scholarships.gov.in/" },
      { brand: "Post-Matric Scholarship SC/ST/OBC", discount: "Full tuition + maintenance allowance", howToAccess: "Apply via NSP with caste certificate + enrollment", link: "https://scholarships.gov.in/" },
      { brand: "National Overseas Scholarship", discount: "Up to ₹12.8 lakh/yr for SC students abroad", howToAccess: "Apply via nosmsje.gov.in", link: "https://nosmsje.gov.in/" },
      { brand: "Fulbright-Nehru Fellowship", discount: "Full funding – US Master's/PhD for Indians", howToAccess: "Apply via USIEF India", link: "https://www.usief.org.in/Fellowships.aspx" },
      { brand: "Chevening Scholarship (UK)", discount: "Fully funded Master's in UK for Indians", howToAccess: "Apply at chevening.org (Oct deadline)", link: "https://www.chevening.org/" },
      { brand: "Commonwealth Scholarship (UK)", discount: "Full tuition + living + airfare (UK)", howToAccess: "National Nominating Agency India", link: "https://cscuk.fcdo.gov.au/scholarships/" },
      { brand: "DAAD Scholarship (Germany)", discount: "Stipend EUR 861-1,200/mo + tuition", howToAccess: "Apply at daad.de – India applications open", link: "https://www.daad.de/en/find-funding/" },
      { brand: "MEXT Scholarship (Japan)", discount: "Full tuition + JPY 117,000-145,000/mo", howToAccess: "Apply via Japanese Embassy in India", link: "https://www.studyjapan.go.jp/en/toj/toj0302e.html" },
      { brand: "Swiss Govt. Excellence Scholarship", discount: "Full tuition + CHF 1,920/mo stipend", howToAccess: "Apply via Swiss Embassy New Delhi", link: "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html" },
      { brand: "Australian Awards Scholarship", discount: "Full tuition + AUD 28,000/yr living", howToAccess: "Apply via DFAT – India citizens eligible", link: "https://www.dfat.gov.au/people-to-people/australia-awards" },
      { brand: "GREAT Scholarships (UK)", discount: "GBP 10,000 toward tuition (Master's)", howToAccess: "British Council India / partner university", link: "https://study-uk.britishcouncil.org/scholarships/great-scholarships" },
      { brand: "Rhodes Scholarship (Oxford)", discount: "Full tuition + living + airfare (Oxford)", howToAccess: "Apply via Rhodes Trust India", link: "https://www.rhodeshouse.ox.ac.uk/scholarships/" },
      { brand: "Gates Cambridge Scholarship", discount: "Full funding at Cambridge Univ.", howToAccess: "Apply through University of Cambridge", link: "https://www.gatescambridge.org/" },
      { brand: "Inlaks Shivdasani Foundation", discount: "Up to USD 100,000 for top global universities", howToAccess: "Apply at inlaksfoundation.org (India-focused)", link: "https://www.inlaksfoundation.org/scholarships/" },
      { brand: "JN Tata Endowment Scholarship", discount: "₹10L-1Cr loan scholarship for abroad studies", howToAccess: "Apply at jntataendowment.org", link: "https://www.jntataendowment.org/" },
      { brand: "KC Mahindra Scholarship", discount: "₹5L-10L for Master's abroad", howToAccess: "Apply at kcmet.org", link: "https://www.kcmet.org/" },
      { brand: "Aditya Birla Scholarships", discount: "₹65,000-75,000/yr for IIT/IIM/BITS/NLU students", howToAccess: "Apply during college interviews/campus", link: "https://adityabirlascholars.net/" },
      { brand: "Tata Strive Scholarship", discount: "Vocational skill training + stipend", howToAccess: "Apply via Tata Strive portal", link: "https://tatastrive.com/" },
    ],
  },
]

// ─── Component ───────────────────────────────────────────────
export default function StudentBenefitsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState<string>("all")

  const totalBenefits = SECTIONS.reduce((acc, s) => acc + s.benefits.length, 0)

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return SECTIONS

    const q = searchQuery.toLowerCase()
    return SECTIONS.map(section => ({
      ...section,
      benefits: section.benefits.filter(
        b =>
          b.brand.toLowerCase().includes(q) ||
          b.discount.toLowerCase().includes(q) ||
          b.howToAccess.toLowerCase().includes(q)
      ),
    })).filter(s => s.benefits.length > 0)
  }, [searchQuery])

  const displaySections = activeSection === "all"
    ? filteredSections
    : filteredSections.filter(s => s.id === activeSection)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Premium Hero Header */}
      <div className="relative overflow-hidden bg-surface border-b border-border">
        {/* Background Mesh Gradients */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50" />
        
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-bold mb-6 border border-accent/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified India Edition • 2025–2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-heading tracking-tight mb-4">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-600">Student Arsenal</span>
            </h1>
            <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-10">
              Stop paying full price. Access {totalBenefits}+ highly curated discounts, incredibly powerful free tools, and exclusive student-only deals.
            </p>

            {/* Floating Search Bar */}
            <div className="relative group max-w-2xl shadow-2xl shadow-black/5 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
              <div className="relative flex items-center bg-surface border-2 border-border/50 rounded-2xl px-2">
                <Search className="w-5 h-5 text-muted ml-3" />
                <input
                  type="text"
                  placeholder="Search for GitHub, Spotify, Nike, Apple..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-4 py-4 text-foreground placeholder:text-muted/70 focus:outline-none text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-2 mr-1 rounded-xl hover:bg-surface-alt text-muted transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Must Have Featured Bento Grid - Only show if not searching */}
        {!searchQuery && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <Target className="w-4 h-4 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold font-heading text-foreground">The Absolute Essentials</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bento Box 1 */}
              <a href="https://education.github.com/pack" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white border border-slate-700 hover:border-slate-500 transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                   <Code className="w-32 h-32" />
                 </div>
                 <div className="relative z-10">
                   <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20">
                     <Monitor className="w-6 h-6 text-white" />
                   </div>
                   <h3 className="text-2xl font-bold mb-2">$200k+ Free Tools</h3>
                   <p className="text-slate-300 text-sm mb-6 leading-relaxed">GitHub Student Developer Pack unlocks JetBrains, DigitalOcean, Canva Pro, domains & more instantly.</p>
                   <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-white">
                     Claim GitHub Pack <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                   </div>
                 </div>
              </a>

              {/* Bento Box 2 */}
              <a href="https://www.myunidays.com/IN/en-IN" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8 text-white border border-violet-500 hover:border-violet-400 transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl md:col-span-2 lg:col-span-1">
                 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                   <Tag className="w-32 h-32" />
                 </div>
                 <div className="relative z-10">
                   <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20">
                     <Shirt className="w-6 h-6 text-white" />
                   </div>
                   <h3 className="text-2xl font-bold mb-2">The Verification Hubs</h3>
                   <p className="text-violet-100 text-sm mb-6 leading-relaxed">Sign up for UNiDAYS & Student Beans. These 2 platforms act as global verification keys for 95% of brands.</p>
                   <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-white">
                     Join UNiDAYS <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                   </div>
                 </div>
              </a>

              {/* Bento Box 3 */}
              <a href="https://www.swiggy.com/" target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-amber-500 p-8 text-white border border-orange-400 hover:border-orange-300 transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                 <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity -rotate-12">
                   <UtensilsCrossed className="w-32 h-32" />
                 </div>
                 <div className="relative z-10">
                   <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20">
                     <Heart className="w-6 h-6 text-white" />
                   </div>
                   <h3 className="text-2xl font-bold mb-2">Campus Food Priority</h3>
                   <p className="text-orange-100 text-sm mb-6 leading-relaxed">Activate Swiggy Student Rewards to instantly unlock ₹49 meals and free delivery to 2,000+ Indian campuses.</p>
                   <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-white">
                     Activate Swiggy <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                   </div>
                 </div>
              </a>
            </div>
          </div>
        )}

        {/* Dynamic Category Pill Navigation */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border py-4 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
            <button
              onClick={() => setActiveSection("all")}
              className={`snap-start whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm border ${
                activeSection === "all" 
                  ? "bg-foreground text-background border-foreground shadow-md"
                  : "bg-surface border-border text-muted hover:bg-surface-alt hover:text-foreground"
              }`}
            >
              All Rewards
            </button>
            {SECTIONS.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 snap-start whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm border ${
                  activeSection === s.id
                    ? `${s.bgColor} ${s.color} ${s.borderColor} shadow-md`
                    : "bg-surface border-border text-muted hover:bg-surface-alt hover:text-foreground"
                }`}
              >
                <s.icon className={`w-4 h-4 ${activeSection === s.id ? "" : "opacity-70"}`} />
                {s.title}
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ml-1 ${activeSection === s.id ? "bg-white/80" : "bg-surface-alt"}`}>
                  {s.benefits.length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid Sections */}
        <div className="space-y-16">
          {displaySections.map((section) => (
            <div key={section.id} className="scroll-mt-32">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className={`text-2xl font-bold font-heading mb-1 flex items-center gap-3 ${section.color}`}>
                    <div className={`w-10 h-10 rounded-xl ${section.bgColor} flex items-center justify-center border ${section.borderColor}`}>
                      <section.icon className="w-5 h-5" />
                    </div>
                    {section.title}
                  </h2>
                  <p className="text-muted text-sm ml-14">{section.subtitle}</p>
                </div>
              </div>

              {/* Premium Masonry Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-0 lg:ml-14">
                {section.benefits.map((benefit, idx) => (
                  <a
                    key={idx}
                    href={benefit.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col p-6 rounded-3xl bg-surface border border-border hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 overflow-hidden"
                  >
                    {/* Glowing background gradient on hover */}
                    <div className={`absolute -inset-2 opacity-0 group-hover:opacity-10 transition-opacity blur-xl ${section.bgColor}`} />
                    
                    <div className="relative z-10 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors leading-tight">
                          {benefit.brand}
                        </h3>
                        <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm mb-5 ${section.bgColor} ${section.color} border ${section.borderColor}`}>
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {benefit.discount}
                      </div>

                      <p className="text-sm text-muted leading-relaxed font-medium">
                        {benefit.howToAccess}
                      </p>
                    </div>

                    <div className="relative z-10 mt-6 pt-4 border-t border-border flex items-center gap-2 text-sm font-bold text-accent opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                      Access Deal <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {displaySections.length === 0 && (
          <div className="py-32 text-center rounded-3xl bg-surface border border-border border-dashed mt-8">
            <Filter className="w-16 h-16 text-muted/50 mx-auto mb-6" />
            <h3 className="text-2xl font-bold font-heading text-foreground mb-3">No deals found</h3>
            <p className="text-muted text-base mb-8 max-w-md mx-auto">We searched through 70+ benefits but couldn't find a match for "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveSection("all") }}
              className="px-6 py-3 rounded-xl bg-foreground text-background font-bold hover:-translate-y-0.5 transition-transform shadow-lg shadow-black/10"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
