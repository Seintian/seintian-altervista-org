import { NextResponse } from "next/server";
import { siteData } from "@/lib/data";

export const dynamic = "force-static";

export async function GET() {
  const jsonString = JSON.stringify(siteData);
  const buffer = new TextEncoder().encode(jsonString);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/json",
      "Content-Length": buffer.byteLength.toString(),
      "X-Content-Length": buffer.byteLength.toString(),
    },
  });
}
