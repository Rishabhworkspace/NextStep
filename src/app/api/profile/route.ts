import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import dbConnect from "@/lib/db/connect";
import Profile from "@/lib/db/models/Profile";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

    const profileData = {
      userId: session.user.id,
      fullName: body.fullName || session.user.name || "",
      college: body.college || "",
      degree: body.degree || "",
      yearOfStudy: body.yearOfStudy || "",
      isFirstGen: body.isFirstGen || false,
      cgpa: body.cgpa || 0,
      stream: body.stream || "",
      confidentSubjects: body.confidentSubjects || [],
      weakSubjects: body.weakSubjects || [],
      targetRole: body.targetRole || "",
      companyType: body.companyType || "",
      timeline: body.timeline || "",
      currentSkills: body.currentSkills || [],
      needsAssistance: body.needsAssistance || false,
      incomeBracket: body.incomeBracket || "",
      scholarshipPrefs: body.scholarshipPrefs || [],
    };

    // Upsert: create or update if already exists
    const profile = await Profile.findOneAndUpdate(
      { userId: session.user.id },
      profileData,
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, profile }, { status: 200 });
  } catch (error) {
    console.error("Profile save error:", error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const profile = await Profile.findOne({ userId: session.user.id });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
