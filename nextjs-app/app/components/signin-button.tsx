"use client";

import { locale } from "@/lib/navigator";
import { thirdwebClient } from "@/lib/thirdweb";
import axios from "axios";
import { createAuth } from "thirdweb/auth";
import { ConnectButton, getLastAuthProvider } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "x", "github", "telegram", "discord"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("com.okex.wallet"),
  createWallet("org.uniswap"),
  createWallet("com.binance"),
];

console.log(process.env.NEXT_PUBLIC_THIRDWEB_SECRET_KEY);
const thirdwebAuth = createAuth({
  domain:
    process.env.NEXT_PUBLIC_SANITY_DATASET === "develop"
      ? "localhost:3000"
      : "web3boy.vercel.app",
});

export default function SigninButton() {
  return (
    <ConnectButton
      client={thirdwebClient}
      wallets={wallets}
      theme={"light"}
      connectModal={{
        size: "wide",
        title: "빅웰컴! 웹3보이의 결과노트",
        showThirdwebBranding: false,
      }}
      locale={locale}
      onConnect={async (wallet) => {
        const address = wallet.getAccount()?.address;
        if (!address) return;

        const provider = (await getLastAuthProvider()) || "wallet";
        const { data: userInfo } = await axios.get("/api/user", {
          params: {
            walletAddress: address,
          },
        });
        console.log("existed user", userInfo);

        if (!userInfo.user) {
          const { data: createdUser } = await axios.post("/api/user", {
            walletAddress: address,
            provider,
            name: address,
          });
          console.log("created user", createdUser);
        }
      }}
      connectButton={{
        label: "로그인하고 댓글 쓰기",
        className: "rounded-full px-4 py-3",
      }}
    />
  );
}
