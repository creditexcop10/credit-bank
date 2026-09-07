"use client";
import Script from "next/script";
import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
];

export function Translator() {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check for existing cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/googtrans=([^;]+)/);
    if (match) {
      const langCode = match[1].split("/")[2];
      if (langCode) setCurrentLang(langCode);
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    // Set the Google Translate cookie
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    document.cookie = `googtrans=/en/${langCode}; expires=${date.toUTCString()}; path=/`;
    
    setCurrentLang(langCode);
    setOpen(false);
    
    // Reload the page to apply the translation
    window.location.reload();
  };

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <>
      {/* Scripts MUST be inside the return statement */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `,
        }}
      />

      {/* Hidden div for Google to initialize */}
      <div id="google_translate_element" className="hidden"></div>

      {/* Custom Floating Dropdown */}
      <div className="fixed bottom-8 right-8 z-[60]" ref={ref}>
        {open && (
          <div className="absolute bottom-16 right-0 bg-card border border-border rounded-xl shadow-xl w-56 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="p-2">
              <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2 px-2">Select Language</h4>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{lang.flag}</span>
                      {lang.name}
                    </span>
                    {currentLang === lang.code && <Check className="h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setOpen(!open)}
          className="h-12 px-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 font-medium"
          aria-label="Translate"
        >
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:block">{currentLanguage.name}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </>
  );
}