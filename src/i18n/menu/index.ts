import { enGB } from "./en-gb";
import { ptBR } from "./pt-br";

export type { MenuLabels } from "./types";

export type SupportedLocale = "en-GB" | "pt-BR";

export const getMenuLabels = (locale: string) =>
  locale === "pt-BR" ? ptBR : enGB;
