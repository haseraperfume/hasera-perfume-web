import { redirect } from "next/navigation";

export default async function GeorgiaFloraPage({ params }: PageProps<"/[lang]/georgia-flora">) {
  const { lang } = await params;
  redirect(`/${lang}`);
}
