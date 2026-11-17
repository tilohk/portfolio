import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME}: software development, creative technologies, music producing and UI/UX design`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori (which renders this) can't read CSS variables, so the palette is repeated here.
const cream = "#f7f1ea";
const plum = "#7a0d7c";
const teal = "#0f6b70";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: cream,
      }}
    >
      <div
        style={{ fontSize: 96, fontWeight: 800, letterSpacing: 8, color: plum }}
      >
        {SITE_NAME.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          fontSize: 32,
          letterSpacing: 6,
          color: teal,
        }}
      >
        <span>SOFTWARE DEVELOPMENT</span>
        <span>CREATIVE TECHNOLOGIES</span>
        <span>MUSIC PRODUCING &amp; DJ</span>
        <span>UI/UX DESIGN</span>
      </div>
    </div>,
    size,
  );
}
