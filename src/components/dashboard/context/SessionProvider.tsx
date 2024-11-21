"use client"
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  session?: any; // Optionally type this as `Session` from "next-auth" if needed.
}

const SessionProviderWrapper: React.FC<Props> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default SessionProviderWrapper;