import Navbar from "@/components/Navbar"
import Script from "next/script"





export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            
        >

            <head>

{/* Google Tag Manager */}
<Script
  id="google-tag-manager"
  src="https://www.googletagmanager.com/gtm.js?id=GTM-5K9LF3KN"
  strategy="afterInteractive"
/>

<Script
  id="google-analytics-init"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    `,
  }}
/>


                {/* Google Analytics*/}

                <Script
                    id="clarity-script"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "z8dfbiqgjy");`,
                    }}
                />
            </head>

            <body className="bg-bg font-body leading-[1.6] text-ink overflow-x-hidden">
                <Navbar/>


                <main className="relative z-[1] overflow-x-clip">{children}</main>


            </body>
        </html>
    )
}