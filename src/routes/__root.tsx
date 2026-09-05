import { translations } from '@/lib/layout.shared';
import appCss from '@/styles/app.css?url';
import { createRootRoute, HeadContent, Outlet, Scripts, useParams } from '@tanstack/react-router';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'XULO',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { lang } = useParams({ strict: false });

  return (
    <html suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col min-h-screen ">
        <RootProvider i18n={i18nProvider(translations, lang)}>
          <Outlet />
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
