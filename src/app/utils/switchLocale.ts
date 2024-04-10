"use client"
import setLanguage from "next-translate/setLanguage"

const switchLocale = () => {
    const language: string | null = window.localStorage.getItem("locale");
    if (!language) {
        window.localStorage.setItem("locale", navigator.language.split("-")[0])
    }
    
    // @ts-ignore
    setLanguage(language)
}

export default switchLocale
