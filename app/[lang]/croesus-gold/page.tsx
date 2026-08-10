import { redirect } from "next/navigation";

export default async function CroesusGoldPage({ params }: PageProps<"/[lang]/croesus-gold">) {
  const { lang } = await params;
  redirect(`/${lang}`);
}
