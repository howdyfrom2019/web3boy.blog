import { LocaleId } from "thirdweb/react";

export const locale: LocaleId =
  (navigator && (navigator.languages[2] as LocaleId)) || "en-US";
