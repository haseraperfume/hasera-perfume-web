import { redirect } from "next/navigation";

export default async function CleopatraNoirPage({ params }: PageProps<"/[lang]/cleopatra-noir">) {
  const { lang } = await params;
  redirect(`/${lang}`);
}
