import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "MTD Software";
  const subtitle = searchParams.get("subtitle") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontFamily: "sans-serif",
          fontSize: 64,
        }}
      >
        <div style={{ fontWeight: "bold" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 32 }}>{subtitle}</div>}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
