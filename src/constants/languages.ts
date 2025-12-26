export const SUPPORTED_LANGUAGES = [
  "English",
  "German",
  "Czech",
  "French",
  "Italian",
  "Spanish",
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DIRECTION_FORWARD = "SOURCE_TO_TARGET";
export const DIRECTION_BACKWARD = "TARGET_TO_SOURCE";

export type LanguageDirection = typeof DIRECTION_FORWARD | typeof DIRECTION_BACKWARD;

export const DIACRITICS: Record<string, string[]> = {
  German: ["ä", "ö", "ü", "ß"],
  Czech: ["á", "č", "ď", "é", "ě", "í", "ň", "ó", "ř", "š", "ť", "ú", "ů", "ý", "ž"],
  Spanish: ["á", "é", "í", "ó", "ú", "ü", "ñ"],
  French: ["à", "â", "æ", "ç", "é", "è", "ê", "ë", "î", "ï", "ô", "œ", "ù", "û", "ü", "ÿ"],
  Italian: ["à", "è", "é", "ì", "ò", "ó", "ù"],
  English: [],
};

export const LANG_CODE_MAP: Record<SupportedLanguage, string> = {
  English: "en",
  German: "de",
  Czech: "cs",
  Spanish: "es",
  French: "fr",
  Italian: "it",
};
