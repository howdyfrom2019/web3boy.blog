import { ThirdwebProvider } from "thirdweb/react";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}
