import { NextResponse } from "next/server";
import { siteData } from "@/lib/data";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(siteData);
}
