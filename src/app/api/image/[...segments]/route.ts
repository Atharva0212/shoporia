import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ segments: string[] }> }
) {
  const ipAddress = req.headers.get("x-forwarded-for");

  if (!ipAddress) {
    return NextResponse.json({ success: false, error: "We’re having trouble verifying your session. Please try again." }, { status: 403 });
  }

  const paramsData = await params;
  const segments = paramsData.segments;

  if (!segments || segments.length === 0) {
    return NextResponse.json({ error: "No path specified" }, { status: 400 })
  }

  const baseUploadDir = process.env.ASSETS_DIR ?? "assets";

  const filePath = path.posix.join(process.cwd(), baseUploadDir, ...segments);

  try {
    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      const ext = path.extname(filePath).slice(1);
      const fileData = new Uint8Array(fileBuffer);
      return new Response(fileData, {
        headers: {
          'Content-Type': `image/${ext}`,
        },
      });
    } else {
      return Response.json({ error: 'Image not found' }, { status: 404 });
    }
  } catch (error) {
    console.error("Error serving image:", error);
    return Response.json({ error: 'Error serving image' }, { status: 500 });
  }
}