import { SET_TOKEN, SET_LANGUAGE, SET_ASSEMBLY_SIZE, SET_THEME_CONFIG } from "../../types";
import { ThemeConfigProp } from "../../interface";

export function setToken(token: string) {
    return {
        type: SET_TOKEN,
        token
    };
}

export function setLanguage(language: string) {
    return {
        type: SET_LANGUAGE,
        language
    };
}

export function setAssemblySize(assemblySize: string) {
    return {
        type: SET_ASSEMBLY_SIZE,
        assemblySize
    };
}

export function setThemeConfig(themeConfig: ThemeConfigProp) {
    return {
        type: SET_THEME_CONFIG,
        themeConfig
    };
}