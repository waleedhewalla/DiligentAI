import Script from "next/script";
import { HotjarLoader } from "./hotjar-loader";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;

/**
 * GA4 with Consent Mode v2: analytics storage is denied until the visitor
 * accepts, so GA sends cookieless pings only. Hotjar (session recording) loads
 * only after consent.
 */
export function Analytics() {
  return (
    <>
      {GA_ID ? (
        <>
          <Script id="ga-consent" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var c=null;try{c=localStorage.getItem('da_consent')}catch(e){}
gtag('consent','default',{analytics_storage:c==='granted'?'granted':'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        </>
      ) : null}
      {HOTJAR_ID ? <HotjarLoader id={HOTJAR_ID} /> : null}
    </>
  );
}
