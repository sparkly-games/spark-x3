import en from "./en.json";
import pt from "./pt.json";
import es from "./es.json";
import fr from "./fr.json";
import bg from "./bg.json";
import zhHant from "./zh-Hant.json";

type LanguageSource = {
    meta?: {
        flag?: string;
        icon?: string;
    };
    [key: string]: any;
};

export const createLang = (display: string, src: LanguageSource) => {
    const icon = src.meta?.flag || src.meta?.icon || "🌐";
    const displayName = `${icon} ${display}`;

    return {
        icon,
        displayName,
        src
    };
};

export type Lang = ReturnType<typeof createLang>;

export const langs: Record<string, Lang> = {
    en: createLang("English", en),
    pt: createLang("Português", pt),
    es: createLang("Español", es),
    fr: createLang("Français", fr),
    bg: createLang("Български", bg),
    "zh-Hant": createLang("繁體中文", zhHant)
};