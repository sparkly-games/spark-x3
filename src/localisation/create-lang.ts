type LanguageSource = {
    meta?: { flag?: string; icon?: string };
    [key: string]: any;
};

export const createLang = (display: string, src: LanguageSource) => {
    const icon = src.meta?.flag || src.meta?.icon || "🌐";
    return { icon, displayName: `${icon} ${display}`, src };
};

export type Lang = ReturnType<typeof createLang>;

const modules = import.meta.glob<LanguageSource>("./json/*.json", {
    eager: true,
    import: "default",
});

const displayNames: Record<string, string> = {
    en: "English",
    pl: "Polski",
    pt: "Português",
    es: "Español",
    fr: "Français",
    bg: "Български",
    fi: "Suomi",
    nl: "Nederlands",
    ja: "日本語",
    "zh-Hant": "繁體中文",
};

const order = ["en", "pl", "pt", "es", "fr", "bg", "fi", "nl", "ja", "zh-Hant"];

export const langs: Record<string, Lang> = Object.fromEntries(
    order
        .filter((code) => modules[`./json/${code}.json`])
        .map((code) => [
            code,
            createLang(displayNames[code] ?? code, modules[`./json/${code}.json`]),
        ])
);