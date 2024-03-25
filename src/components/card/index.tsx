'use client'
import { ReactNode, Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface ICard {
  children: ReactNode;
}

export default function OutlinedCard({
  children,
}: ICard) {
  return (
    <Fragment>
      <Card>
        <CardContent>{children}</CardContent>
        
      </Card>
    </Fragment>
  );
}
