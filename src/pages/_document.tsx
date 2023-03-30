import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <script
            dangerouslySetInnerHTML={{
              __html: `
            (function (d, s, id) {
                var w = window;
              if (w.w3r) {
                    return (window.console.error || window.console.log || function () { })('Wasd3r script included twice.');
                  }

              w.w3r = w.w3r || function () {
                (w.w3r.q = w.w3r.q || []).push(arguments);
                  };

              function l() {
                if (w.Wasd3rInitialized) {
                  return;
                }
                w.Wasd3rInitialized = true;
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = '${process.env.NEXT_PUBLIC_WASDER_JS_PATH}';
                s.charset = 'UTF-8';
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
              }
              if (document.readyState === 'complete') {
                l();
              } else if (window.attachEvent) {
                window.attachEvent('onload', l);
              } else {
                window.addEventListener('DOMContentLoaded', l, false);
                window.addEventListener('load', l, false);
              }
              
              w.w3r('init', {appKey: '${process.env.NEXT_PUBLIC_APP_KEY}', googleClientId:'${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}' });
            })();
            `,
            }}
          ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
