import { ImageResponse } from "next/og";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import { OG_IMAGE_SIZE } from "@/lib/site";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "HASERA, parfum signature";

export default async function OgImage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 88px",
          background: "#161514",
          color: "#f7f2ec",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 14,
            textTransform: "uppercase",
            color: "#a17a43",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Hasera
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            lineHeight: 1.05,
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {dict.hero.titleLine1} {dict.hero.titleLine2} {dict.hero.titleEm}
        </div>
        <div
          style={{
            display: "flex",
            width: 120,
            height: 2,
            background: "#9d681f",
            marginTop: 40,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 28,
            marginTop: 32,
            color: "#ddd0c2",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {dict.meta.description}
        </div>
      </div>
    ),
    size
  );
}
