"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

const LANGUAGES = [
    { name: "English", code: "en", flag: "US" },
    { name: "Afrikaans", code: "af", flag: "ZA" },
    { name: "Albanian", code: "sq", flag: "AL" },
    { name: "Amharic", code: "am", flag: "ET" },
    { name: "Arabic", code: "ar", flag: "SA" },
    { name: "Armenian", code: "hy", flag: "AM" },
    { name: "Azerbaijani", code: "az", flag: "AZ" },
    { name: "Basque", code: "eu", flag: "ES" },
    { name: "Belarusian", code: "be", flag: "BY" },
    { name: "Bengali", code: "bn", flag: "BD" },
    { name: "Bosnian", code: "bs", flag: "BA" },
    { name: "Bulgarian", code: "bg", flag: "BG" },
    { name: "Catalan", code: "ca", flag: "ES" },
    { name: "Cebuano", code: "ceb", flag: "PH" },
    { name: "Chinese", code: "zh", flag: "CN" },
    { name: "Corsican", code: "co", flag: "FR" },
    { name: "Croatian", code: "hr", flag: "HR" },
    { name: "Czech", code: "cs", flag: "CZ" },
    { name: "Danish", code: "da", flag: "DK" },
    { name: "Dutch", code: "nl", flag: "NL" },
    { name: "Esperanto", code: "eo", flag: "EU" },
    { name: "Estonian", code: "et", flag: "EE" },
    { name: "Finnish", code: "fi", flag: "FI" },
    { name: "French", code: "fr", flag: "FR" },
    { name: "Frisian", code: "fy", flag: "NL" },
    { name: "Galician", code: "gl", flag: "ES" },
    { name: "Georgian", code: "ka", flag: "GE" },
    { name: "German", code: "de", flag: "DE" },
    { name: "Greek", code: "el", flag: "GR" },
    { name: "Haitian Creole", code: "ht", flag: "HT" },
    { name: "Hawaiian", code: "haw", flag: "US" },
    { name: "Hebrew", code: "he", flag: "IL" },
    { name: "Hindi", code: "hi", flag: "IN" },
    { name: "Hmong", code: "hmn", flag: "CN" },
    { name: "Hungarian", code: "hu", flag: "HU" },
    { name: "Icelandic", code: "is", flag: "IS" },
    { name: "Igbo", code: "ig", flag: "NG" },
    { name: "Irish", code: "ga", flag: "IE" },
    { name: "Indonesian", code: "id", flag: "ID" },
    { name: "Italian", code: "it", flag: "IT" },
    { name: "Japanese", code: "ja", flag: "JP" },
    { name: "Javanese", code: "jv", flag: "ID" },
    { name: "Kannada", code: "kn", flag: "IN" },
    { name: "Kazakh", code: "kk", flag: "KZ" },
    { name: "Khmer", code: "km", flag: "KH" },
    { name: "Kinyarwanda", code: "rw", flag: "RW" },
    { name: "Korean", code: "ko", flag: "KR" },
    { name: "Kurdish", code: "ku", flag: "TR" },
    { name: "Kyrgyz", code: "ky", flag: "KG" },
    { name: "Lao", code: "lo", flag: "LA" },
    { name: "Latin", code: "la", flag: "VA" },
    { name: "Latvian", code: "lv", flag: "LV" },
    { name: "Lithuanian", code: "lt", flag: "LT" },
    { name: "Luxembourgish", code: "lb", flag: "LU" },
    { name: "Macedonian", code: "mk", flag: "MK" },
    { name: "Malagasy", code: "mg", flag: "MG" },
    { name: "Malay", code: "ms", flag: "MY" },
    { name: "Malayalam", code: "ml", flag: "IN" },
    { name: "Maltese", code: "mt", flag: "MT" },
    { name: "Maori", code: "mi", flag: "NZ" },
    { name: "Marathi", code: "mr", flag: "IN" },
    { name: "Mongolian", code: "mn", flag: "MN" },
    { name: "Myanmar", code: "my", flag: "MM" },
    { name: "Nepali", code: "ne", flag: "NP" },
    { name: "Norwegian", code: "no", flag: "NO" },
    { name: "Nyanja", code: "ny", flag: "MW" },
    { name: "Odia", code: "or", flag: "IN" },
    { name: "Pashto", code: "ps", flag: "AF" },
    { name: "Persian", code: "fa", flag: "IR" },
    { name: "Polish", code: "pl", flag: "PL" },
    { name: "Portuguese", code: "pt", flag: "PT" },
    { name: "Punjabi", code: "pa", flag: "PK" },
    { name: "Romanian", code: "ro", flag: "RO" },
    { name: "Russian", code: "ru", flag: "RU" },
    { name: "Samoan", code: "sm", flag: "WS" },
    { name: "Spanish", code: "es", flag: "ES" },
    { name: "Scots Gaelic", code: "gd", flag: "GB" },
    { name: "Serbian", code: "sr", flag: "RS" },
    { name: "Sesotho", code: "st", flag: "LS" },
    { name: "Shona", code: "sn", flag: "ZW" },
    { name: "Sinhala", code: "si", flag: "LK" },
    { name: "Slovak", code: "sk", flag: "SK" },
    { name: "Slovenian", code: "sl", flag: "SI" },
    { name: "Somali", code: "so", flag: "SO" },
    { name: "Sundanese", code: "su", flag: "ID" },
    { name: "Swahili", code: "sw", flag: "KE" },
    { name: "Swedish", code: "sv", flag: "SE" },
    { name: "Tagalog (Filipino)", code: "tl", flag: "PH" },
    { name: "Tajik", code: "tg", flag: "TJ" },
    { name: "Tamil", code: "ta", flag: "IN" },
    { name: "Tatar", code: "tt", flag: "RU" },
    { name: "Telugu", code: "te", flag: "IN" },
    { name: "Thai", code: "th", flag: "TH" },
    { name: "Turkmen", code: "tk", flag: "TM" },
    { name: "Turkish", code: "tr", flag: "TR" },
    { name: "Ukrainian", code: "uk", flag: "UA" },
    { name: "Urdu", code: "ur", flag: "PK" },
    { name: "Uyghur", code: "ug", flag: "CN" },
    { name: "Uzbek", code: "uz", flag: "UZ" },
    { name: "Vietnamese", code: "vi", flag: "VN" },
    { name: "Welsh", code: "cy", flag: "GB" },
    { name: "Xhosa", code: "xh", flag: "ZA" },
    { name: "Yiddish", code: "yi", flag: "IL" },
    { name: "Yoruba", code: "yo", flag: "NG" },
    { name: "Zulu", code: "zu", flag: "ZA" },
];


export function LanguageDropdown() {
    const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES[0]); // Default to English
    const [showDialog, setShowDialog] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [googleTranslateReady, setGoogleTranslateReady] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsMounted(true);

        // Check for existing language preference, but keep English as default
        const savedLang = localStorage.getItem("preferredLanguage");
        if (savedLang && savedLang !== "en") {
            const lang = LANGUAGES.find(l => l.code === savedLang);
            if (lang) {
                setCurrentLanguage(lang);
            }
        }

        // Check if Google Translate is ready
        const checkGoogleTranslate = () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((window as any).google?.translate?.TranslateElement) {
                setGoogleTranslateReady(true);
            } else {
                setTimeout(checkGoogleTranslate, 100);
            }
        };
        checkGoogleTranslate();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const triggerTranslation = (languageCode: string) => {
        // Method 1: Try to programmatically change the Google Translate selection
        const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (selectElement) {
            selectElement.value = languageCode;
            selectElement.dispatchEvent(new Event('change'));
            return true;
        }

        // Method 2: Try to find and click the appropriate language option
        const translateFrame = document.querySelector('.goog-te-menu-frame') as HTMLIFrameElement;
        if (translateFrame && translateFrame.contentDocument) {
            const languageLinks = translateFrame.contentDocument.querySelectorAll('.goog-te-menu2-item span');
            for (const link of languageLinks) {
                if (link.textContent?.toLowerCase().includes(LANGUAGES.find(l => l.code === languageCode)?.name.toLowerCase() || '')) {
                    (link as HTMLElement).click();
                    return true;
                }
            }
        }

        // Method 3: Direct URL change method (as fallback)
        const currentUrl = window.location.href;
        const hasTranslateParam = currentUrl.includes('#googtrans(');

        if (languageCode === 'en') {
            // Remove translation
            if (hasTranslateParam) {
                window.location.href = currentUrl.split('#googtrans(')[0];
            }
        } else {
            // Add or update translation
            const newTranslateParam = `#googtrans(en|${languageCode})`;
            if (hasTranslateParam) {
                window.location.href = currentUrl.replace(/#googtrans\([^)]*\)/, newTranslateParam);
            } else {
                window.location.href = currentUrl + newTranslateParam;
            }
        }

        return false;
    };

    const handleLanguageSelect = (lang: typeof LANGUAGES[0]) => {
        if (lang.code === currentLanguage.code) return;

        // Update current language and save preference
        setCurrentLanguage(lang);
        localStorage.setItem("preferredLanguage", lang.code);

        // Show dialog immediately - user will close it manually
        setShowDialog(true);
        // Clear any existing timeout since we're not auto-closing anymore
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Trigger translation
        if (googleTranslateReady) {
            // Small delay to ensure dialog shows first
            setTimeout(() => {
                triggerTranslation(lang.code);
            }, 100);
        } else {
            // If Google Translate isn't ready, wait for it
            const waitForTranslate = () => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((window as any).google?.translate?.TranslateElement) {
                    setTimeout(() => {
                        triggerTranslation(lang.code);
                    }, 500); // Give it a bit more time to fully initialize
                } else {
                    setTimeout(waitForTranslate, 200);
                }
            };
            waitForTranslate();
        }
    };

    if (!isMounted) return null;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        translate="no"
                        variant="ghost"
                        className="flex items-center gap-2 font-[400] text-[14px] text-[#008ace]"
                    >
                        <ReactCountryFlag
                            countryCode={currentLanguage.flag}
                            svg
                            style={{ width: '1.2em', height: '1.2em' }}
                        />
                        <span>{currentLanguage.name}</span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className=" w-[200px] md:w-[500px] lg:w-[700px] grid-cols-1 md:grid-cols-2 grid lg:grid-cols-4 gap-2 p-4" translate="no">
                    {LANGUAGES.map((lang) => (
                        <DropdownMenuItem
                            key={lang.code}
                            className={`flex items-center gap-3 cursor-pointer ${lang.code === currentLanguage.code ? 'bg-gray-100' : ''
                                }`}
                            onClick={() => handleLanguageSelect(lang)}
                        >
                            <ReactCountryFlag
                                countryCode={lang.flag}
                                svg
                                style={{ width: '1.2em', height: '1.2em' }}
                            />
                            <span className=" font-[500] text-[13px]">{lang.name}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-[700px] h-auto rounded-xl">
                    <DialogHeader className="bg-[#dedede] px-10 py-4 text-[#008ace] leading-[27px] text-[18px] font-[500]">
                        <DialogTitle>Language conversion warning</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="px-10 py-5 text-[#212529] font-[400] text-[12px] leading-[26px]">
                        Our booking site uses google translation and we do not warranty the accuracy of the content translated.
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
}