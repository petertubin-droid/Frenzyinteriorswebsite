import Script from 'next/script';

export function GoogleAdSense() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!clientId) return null;

  return (
    <>
      <Script
        id="adsense-init"
        strategy="lazyOnload"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
      />
      <Script
        id="adsense-push"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "${clientId}", enable_page_level_ads: true});`,
        }}
      />
    </>
  );
}
