
import RootPageProduct from "@/components/products/RootPage";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <p>Access Denied</p>;
  }

  return (
    <RootPageProduct />
  );
}
