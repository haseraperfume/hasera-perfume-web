import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPage, { contentMetadata } from "../ContentPage";
import { hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/pengiriman-pengembalian">): Promise<Metadata> {
  const { lang } = await params;
  return contentMetadata(lang, "pengiriman-pengembalian");
}

export default async function ShippingPage({
  params,
}: PageProps<"/[lang]/pengiriman-pengembalian">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <ContentPage lang={lang} pageKey="pengiriman-pengembalian" />;
}
