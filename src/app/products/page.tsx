import RootPageProduct from "@/components/products/RootPage";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { Fragment } from "react";
import { Box, Button } from "@mui/material";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/authConfig";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Access Denied</p>;
  }
  return (
    <Fragment>
      
      <RootPageProduct />
    </Fragment>
  );
}
