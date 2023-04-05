import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <script async type="text/javascript" src={`${process.env.NEXT_PUBLIC_WASDER_JS_PATH}`} />
      <script
            dangerouslySetInnerHTML={{
              __html: `
              window.w3r = window.w3r || function () {
                (w3r.q = w3r.q || []).push(arguments);
              };
              w3r('init', {appKey: '${process.env.NEXT_PUBLIC_APP_KEY}', googleClientId:'${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}' });
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
