import { AccountPageClient } from "../../components/account-page-client";

export default async function OrdersPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const placedOrderNumber = typeof params?.placed === "string" ? params.placed : undefined;
  return <AccountPageClient mode="orders" placedOrderNumber={placedOrderNumber} />;
}
