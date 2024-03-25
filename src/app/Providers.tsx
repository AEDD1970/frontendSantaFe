"use client"
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={{}}>{children}</ThemeProvider>
    </SessionProvider>
  );
}

