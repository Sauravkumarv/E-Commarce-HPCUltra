import { AccountPageClient } from "../../components/account-page-client";

export default async function AccountPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const tab = typeof params?.tab === "string" ? params.tab : "orders";
  return <AccountPageClient initialTab={tab} />;
}
