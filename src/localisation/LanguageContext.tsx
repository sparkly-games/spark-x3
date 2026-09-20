import React, { createContext, useContext, useState } from "react";
import { langs, type Lang } from "./create-lang";

type LanguageContextType = {
    language: string;
    lang: Lang;
    setLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export function LanguageProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [language, setLanguage] = useState("en");

    const lang = langs[language] ?? langs.en;

    return (
        <LanguageContext.Provider
            value={{
                language,
                lang,
                setLanguage
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used inside a LanguageProvider"
        );
    }

    return context;
}