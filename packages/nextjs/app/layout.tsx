import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "CultiVest - Agricultural Investment Platform",
  description: "Connect vetted farmers with global investors for sustainable agricultural projects",
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className="bg-white">{children}</body>
    </html>
  );
};

export default ScaffoldEthApp;
