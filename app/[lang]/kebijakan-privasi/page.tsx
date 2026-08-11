import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage, { contentMetadata } from "../ContentPage";
import { hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/kebijakan-privasi">): Promise<Metadata> {
  const { lang } = await params;
  return contentMetadata(lang, "kebijakan-privasi");
}

export default async function PrivacyPage({
  params,
}: PageProps<"/[lang]/kebijakan-privasi">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <ContentPage lang={lang} pageKey="kebijakan-privasi" />;
}
