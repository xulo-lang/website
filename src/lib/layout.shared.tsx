import { i18n } from '@/lib/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';
import logo from '@/assets/logo.svg';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: {
      displayName: 'English',
    },
    zh: {
      displayName: '中文',
    },
  });

export function baseOptions(locale: string): BaseLayoutProps {
  const isZh = locale === 'zh';

  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <img src={logo} alt="XULO" className="h-8 w-8" />
          <span className="font-semibold text-lg">XULO</span>
        </div>
      ),
    },
    links: [
      {
        text: isZh ? '文档' : 'Docs',
        url: `/${locale}/docs/introduction`,
      },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
