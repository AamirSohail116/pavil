"use client";

import { useEffect, useState } from "react";

export function GoogleTranslateScript() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Mark client ready — this will cause the div to render only after hydration
        setReady(true);

        // Check if script is already loaded
        if (document.querySelector('script[src*="translate.google.com"]')) {
            return;
        }

        const script = document.createElement("script");
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).googleTranslateElementInit = () => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                new (window as any).google.translate.TranslateElement(
                    {
                        pageLanguage: "en",
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        layout: (window as any).google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                        autoDisplay: false,
                        includedLanguages: "en,af,sq,am,ar,hy,az,eu,be,bn,bs,bg,ca,ceb,zh,co,hr,cs,da,nl,eo,et,fi,fr,fy,gl,ka,de,el,gu,ht,haw,he,hi,hmn,hu,is,ig,ga,id,it,ja,jv,kn,kk,km,rw,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,my,ne,no,ny,or,ps,fa,pl,pt,pa,ro,ru,sm,es,gd,sr,st,sn,sd,si,sk,sl,so,su,sw,sv,tl,tg,ta,tt,te,th,tr,tk,uk,ur,ug,uz,vi,cy,xh,yi,yo,zu"
                    },
                    "google_translate_element"
                );

                // Hide the Google Translate toolbar initially
                setTimeout(() => {
                    const translateElement = document.getElementById("google_translate_element");
                    if (translateElement) {
                        // Hide the default Google Translate widget
                        const iframe = translateElement.querySelector('.goog-te-banner-frame');
                        if (iframe) {
                            (iframe as HTMLElement).style.display = 'none';
                        }

                        // Hide the select dropdown
                        const select = translateElement.querySelector('.goog-te-combo');
                        if (select) {
                            (select as HTMLElement).style.display = 'none';
                        }
                    }

                    // Remove Google Translate banner/toolbar
                    const banner = document.querySelector('.goog-te-banner-frame');
                    if (banner) {
                        (banner as HTMLElement).style.display = 'none';
                    }

                    // Hide top frame
                    const topFrame = document.querySelector('#goog-gt-tt');
                    if (topFrame) {
                        (topFrame as HTMLElement).style.display = 'none';
                    }

                }, 1000);
            } catch (error) {
                console.error("Error initializing Google Translate:", error);
            }
        };

        script.onerror = () => {
            console.error("Failed to load Google Translate script");
        };

        document.head.appendChild(script);

        return () => {
            if (document.head.contains(script)) {
                document.head.removeChild(script);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            delete (window as any).googleTranslateElementInit;
        };
    }, []);

    // Prevent server rendering to avoid hydration mismatch
    if (!ready) return null;

    return (
        <>
            <div
                id="google_translate_element"
                style={{
                    position: "fixed",
                    top: "-1000px", // Hide it completely
                    left: "-1000px",
                    zIndex: -1,
                    visibility: "hidden",
                }}
            />
            {/* Add CSS to hide Google Translate elements */}
            <style jsx global>{`
                .goog-te-banner-frame {
                    display: none !important;
                }
                .goog-te-menu-frame {
                    max-height: 400px !important;
                    overflow-y: auto !important;
                }
                body {
                    top: 0px !important;
                }
                .goog-te-combo {
                    display: none !important;
                }
                #google_translate_element .goog-te-gadget {
                    display: none !important;
                }
                .goog-te-gadget {
                    display: none !important;
                }
                .goog-te-gadget-simple {
                    display: none !important;
                }
                .goog-te-gadget-icon {
                    display: none !important;
                }
            `}</style>
        </>
    );
}