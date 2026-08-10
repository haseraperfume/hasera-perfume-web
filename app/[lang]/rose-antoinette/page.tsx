import { redirect } from "next/navigation";

export default async function RoseAntoinettePage({ params }: PageProps<"/[lang]/rose-antoinette">) {
  const { lang } = await params;
  redirect(`/${lang}`);
}
