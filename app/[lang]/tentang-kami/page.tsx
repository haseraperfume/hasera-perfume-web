import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage, { contentMetadata } from "../ContentPage";
import { hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/tentang-kami">): Promise<Metadata> {
  const { lang } = await params;
  return contentMetadata(lang, "tentang-kami");
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/tentang-kami">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <ContentPage lang={lang} pageKey="tentang-kami" />;
}
