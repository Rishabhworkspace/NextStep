import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import dbConnect from "@/lib/db/connect";
import Profile from "@/lib/db/models/Profile";

// Lightweight check: does this user have a profile?
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    await dbConnect();
    const profile = await Profile.findOne({ userId: session.user.id }).select("_id completionPercentage").lean() as any;

    return NextResponse.json({ 
      exists: !!profile,
      completionPercentage: profile?.completionPercentage || 0,
    }, { status: 200 });
  } catch {
    return NextResponse.json({ exists: false }, { status: 200 });
  }
}
