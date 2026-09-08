'use client';

import { xuloGrammar } from '@/lib/xulo-grammar';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock.core';
import type { ReactNode } from 'react';
import type { HighlighterCore } from 'shiki';

interface XuloCodeBlockProps {
  code: string;
  fileName?: string;
}

let highlighterPromise: Promise<HighlighterCore> | null = null;

async function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const { createHighlighter, createJavaScriptRegexEngine } = await import('shiki');
      const highlighter = await createHighlighter({
        langs: [],
        themes: ['github-dark', 'github-light'],
        engine: createJavaScriptRegexEngine(),
      });
      await highlighter.loadLanguage(xuloGrammar as any);
      return highlighter;
    })();
  }
  return highlighterPromise;
}

function PlainPre({ children, ...props }: { children: ReactNode } & React.HTMLAttributes<HTMLPreElement>) {
  return (
    <pre {...props} className="shiki shiki-themes github-dark github-light p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
      {children}
    </pre>
  );
}

export function XuloCodeBlock({ code, fileName }: XuloCodeBlockProps) {
  return (
    <DynamicCodeBlock
      highlighter={getHighlighter}
      lang="xulo"
      code={code}
      options={{
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
        components: {
          pre: PlainPre,
        },
      }}
    />
  );
}
