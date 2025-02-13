declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SANITY_PROJECT_ID: string;
    NEXT_PUBLIC_SANITY_DATASET: "develop" | "production";
    NEXT_PUBLIC_SANITY_API_VERSION: "2024-10-28";
    NEXT_PUBLIC_SANITY_STUDIO_URL: "https://jake-jio-eth.sanity.studio";
    SANITY_API_READ_TOKEN: string;
    SANITY_API_EDITOR_TOKEN: string;

    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: string;
    NEXT_PUBLIC_THIRDWEB_SECRET_KEY: string;
  }
}
