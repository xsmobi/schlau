import Script from 'next/script';
import '../src/index.css';
import { createClient } from '../src/lib/supabase/server';
import AuthControls from '../src/components/AuthControls';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MathSolver',
  url: 'https://schlau.app/',
  potentialAction: [
    {
      '@type': 'SolveMathAction',
      target: 'https://schlau.app/',
      mathExpression:
        'Select math task types, random problems, help sections, solutions plus explanations with respective buttons',
      eduQuestionType:
        'Basic artithmetic operations, numberline, proportions, percentage problems, fractions, linear equations, quadratic equations, rearranging terms with brackets',
    },
  ],
};

export default async function RootLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let role = null;
  let hasClass = false;
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role, class_id').eq('id', user.id).single();
    role = profile?.role ?? null;
    hasClass = !!profile?.class_id;
  }

  return (
    <html lang="de">
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta charSet="utf-8" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <link rel="apple-touch-icon" href="/icons_/icon192.png" />
        <meta name="theme-color" content="#317EFB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Mathe-App für Grundlagen, Jahrgang 7-10. Die Basics für den Mittleren Schulabschluss, MSA, BBR in Mathematik und für den Einstieg in die gymnasiale Oberstufe. Kostenlos starten."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="schlau.app die Mathe-App: schlau Mathe üben und lernen  - für BBR und MSA"
        />
        <meta
          property="og:description"
          content="Mathe-App für Grundlagen, Jahrgang 7-10. Die Basics für den Mittleren Schulabschluss, MSA, BBR in Mathematik und für den Einstieg in die gymnasiale Oberstufe. Kostenlos starten."
        />
        <meta property="og:image" content="https://schlau.app//icons_/icon192.png" />
        <meta property="og:image:secure_url" content="https://schlau.app/icons_/icon192.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="192" />
        <meta property="og:image:height" content="192" />
        <meta property="og:image:alt" content="Logo der Mathe-App schlau.app blau rot mit tap icon" />
        <meta property="og:url" content="https://schlau.app" />
        <meta
          property="twitter:title"
          content="schlau.app die Mathe-App: schlau Mathe üben und lernen  - für BBR und MSA"
        />
        <meta
          property="twitter:description"
          content="Mathe-App für Grundlagen, Jahrgang 7-10. Die Basics für den Mittleren Schulabschluss, MSA, BBR in Mathematik und für den Einstieg in die gymnasiale Oberstufe. Kostenlos starten."
        />
        <meta property="twitter:image" content="https://schlau.app//icons_/icon192.png" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:site_name" content="schlau.app" />
        <link rel="manifest" href="/manifest.json" />
        <title>schlau.app die Mathe-App: schlau Mathe üben und lernen  - für BBR und MSA</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <AuthControls initialUser={user} initialRole={role} initialHasClass={hasClass} />
        {/* Bottom padding clears the fixed mobile tab bar (signed-in only,
            hidden from md up) so it doesn't cover page content. */}
        <div className={user ? 'pb-16 md:pb-0' : undefined}>{children}</div>
        <Script id="matomo-tag-manager" strategy="afterInteractive">
          {`
            var _mtm = window._mtm = window._mtm || [];
            _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='https://cdn.matomo.cloud/schlau.matomo.cloud/container_b0yLXaLv.js'; s.parentNode.insertBefore(g,s);
          `}
        </Script>
      </body>
    </html>
  );
}
