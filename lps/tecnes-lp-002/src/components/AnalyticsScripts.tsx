import Script from "next/script";
import {
  GA4_MEASUREMENT_ID as GA4_ID,
  TIKTOK_PIXEL_ID as TIKTOK_ID,
  META_PIXEL_ID as META_ID,
} from "@/lib/constants";

// 計測ベースコードをサイト全体（中間ページ含む）に設置する。
// ClarityのIDはVercelの環境変数に入れるまでは未設定扱いとなり、
// 何も出力しない。TikTok/Meta/GA4は発行済みのため既定値を直接設定している
// （NEXT_PUBLIC_TIKTOK_PIXEL_ID / NEXT_PUBLIC_META_PIXEL_ID / NEXT_PUBLIC_GA4_ID
// を設定すればそちらを優先する）。
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || TIKTOK_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || META_ID;
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || GA4_ID;
const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function AnalyticsScripts() {
  return (
    <>
      {TIKTOK_PIXEL_ID && (
        <Script id="tiktok-pixel-base" strategy="afterInteractive">
          {`
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  ttq.load('${TIKTOK_PIXEL_ID}');
  ttq.page();
}(window, document, 'ttq');
          `}
        </Script>
      )}

      {META_PIXEL_ID && (
        <Script id="meta-pixel-base" strategy="afterInteractive">
          {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
          `}
        </Script>
      )}
      {META_PIXEL_ID && (
        // eslint-disable-next-line @next/next/no-img-element
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      )}

      {GA4_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-base" strategy="afterInteractive">
            {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      {CLARITY_PROJECT_ID && (
        <Script id="clarity-base" strategy="afterInteractive">
          {`
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      )}
    </>
  );
}
