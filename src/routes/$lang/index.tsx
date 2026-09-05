import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

export const Route = createFileRoute('/$lang/')({
  component: Home,
});

const features = [
  {
    title: 'Declarative',
    description: 'Describe UI structure and intent, not implementation details. Structure is explicit; style is optional.',
  },
  {
    title: 'Component-Based',
    description: 'Any PascalCase identifier is a component. Use recommended names or define your own.',
  },
  {
    title: 'Concise Syntax',
    description: 'Attributes as key: value pairs, children via { } blocks. Clean and readable.',
  },
  {
    title: 'AI-Friendly',
    description: 'Structured enough for AI to understand and reason about.',
  },
];

function Home() {
  const { lang } = Route.useParams();
  const isZh = lang === 'zh';

  return (
    <HomeLayout {...baseOptions(lang)}>
      <div className="relative flex flex-col flex-1">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-fd-primary/10 via-fd-background to-fd-background" />

        {/* Hero */}
        <section className="flex flex-col items-center justify-center px-4 py-24 text-center font-sans">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">XULO</h1>
          <p className="text-xl text-fd-foreground mb-4 font-medium">
            {isZh ? '简洁如文本，强大如代码' : 'Simple as Text, Powerful as Code'}
          </p>
          <p className="text-lg text-fd-muted-foreground mb-8 max-w-2xl">
            {isZh
              ? '跨平台 UI 布局语言，面向人/AI 最优阅读。使用简洁的组件化语法描述界面——无闭合标签，无尖括号。'
              : 'Xross-platform UI Layout for Optimal human/AI reading. Describe interfaces with a clean, component-based syntax — no closing tags, no angle brackets.'}
          </p>
          <div className="flex gap-4">
            <Link
              to="/$lang/docs/$"
              params={{ lang, _splat: 'reference/overview' }}
              className="px-5 py-2.5 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              {isZh ? '快速开始' : 'Get Started'}
            </Link>
            <Link
              to="/$lang/docs/$"
              params={{ lang, _splat: 'introduction' }}
              className="px-5 py-2.5 rounded-lg bg-fd-secondary text-fd-secondary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              {isZh ? '文档' : 'Documentation'}
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 py-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="p-6 rounded-lg border bg-fd-card">
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-fd-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Example + Pure Intent */}
        <section className="px-4 py-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Code */}
            <div>
              <h2 className="text-3xl font-bold mb-3">
                {isZh ? '快速示例' : 'Quick Example'}
              </h2>
              <p className="text-fd-muted-foreground mb-6">
                {isZh
                  ? '一个简单的仪表盘布局，几行代码即可描述。'
                  : 'A simple dashboard layout, described in just a few lines.'}
              </p>
              <CodeBlock>
                <Pre>{`Screen {
  Header {
    Text("${isZh ? '仪表盘' : 'Dashboard'}")
  }
  Body {
    VStack(spacing: 16) {
      Card(title: "${isZh ? '统计' : 'Stats'}", radius: "lg") {
        Text("3,214 ${isZh ? '账户' : 'accounts'}")
      }
      Button("${isZh ? '登录' : 'Sign in'}", variant: "primary")
    }
  }
}`}</Pre>
              </CodeBlock>
            </div>

            {/* Right: Pure Intent */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-3">
                  {isZh ? '纯粹意图' : 'Pure Intent'}
                </h2>
                <p className="text-fd-muted-foreground">
                  {isZh
                    ? 'XULO 让你描述 UI 是什么，而非如何渲染。无 DOM，无组件，无状态——只有意图。'
                    : 'XULO lets you describe what the UI is, not how it renders. No DOM, no components, no state — just intent.'}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-fd-muted/50">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-fd-primary/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-fd-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      {isZh ? '结构显式' : 'Explicit Structure'}
                    </h4>
                    <p className="text-xs text-fd-muted-foreground">
                      {isZh
                        ? '层级关系通过缩进表达，一目了然。'
                        : 'Hierarchy expressed through indentation, clear at a glance.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-fd-muted/50">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-fd-primary/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-fd-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      {isZh ? '样式可选' : 'Style Optional'}
                    </h4>
                    <p className="text-xs text-fd-muted-foreground">
                      {isZh
                        ? '只写意图，渲染器决定最终外观。'
                        : 'Write only intent, the renderer decides the look.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-fd-muted/50">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-fd-primary/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-fd-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      {isZh ? '人机可读' : 'Human & AI Readable'}
                    </h4>
                    <p className="text-xs text-fd-muted-foreground">
                      {isZh
                        ? '足够简洁让人读，足够结构让 AI 理解。'
                        : 'Simple enough for humans, structured enough for AI.'}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/$lang/docs/$"
                params={{ lang, _splat: 'introduction/what-is-xulo' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm w-fit hover:opacity-90 transition-opacity"
              >
                {isZh ? '了解更多' : 'Learn More'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t bg-fd-muted/50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="font-semibold mb-2">XULO</h3>
              <p className="text-sm text-fd-muted-foreground">
                {isZh
                  ? '跨平台 UI 布局语言'
                  : 'Cross-platform UI Layout'}
              </p>
            </div>

            {/* Documentation */}
            <div>
              <h4 className="font-medium mb-3">
                {isZh ? '文档' : 'Documentation'}
              </h4>
              <ul className="space-y-2 text-sm text-fd-muted-foreground">
                <li>
                  <Link to="/$lang/docs/$" params={{ lang, _splat: 'introduction' }} className="hover:text-fd-foreground">
                    {isZh ? '介绍' : 'Introduction'}
                  </Link>
                </li>
                <li>
                  <Link to="/$lang/docs/$" params={{ lang, _splat: 'reference/overview' }} className="hover:text-fd-foreground">
                    {isZh ? '概述' : 'Overview'}
                  </Link>
                </li>
                <li>
                  <Link to="/$lang/docs/$" params={{ lang, _splat: 'reference/components' }} className="hover:text-fd-foreground">
                    {isZh ? '组件' : 'Components'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-medium mb-3">
                {isZh ? '资源' : 'Resources'}
              </h4>
              <ul className="space-y-2 text-sm text-fd-muted-foreground">
                <li>
                  <a href="https://github.com/xulo-lang/xulo" target="_blank" rel="noopener noreferrer" className="hover:text-fd-foreground">
                    GitHub
                  </a>
                </li>
                <li>
                  <Link to="/$lang/docs/$" params={{ lang, _splat: 'introduction/comparisons' }} className="hover:text-fd-foreground">
                    {isZh ? '对比' : 'Comparisons'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-medium mb-3">
                {isZh ? '社区' : 'Community'}
              </h4>
              <ul className="space-y-2 text-sm text-fd-muted-foreground">
                <li>
                  <a href="https://github.com/xulo-lang/xulo/issues" target="_blank" rel="noopener noreferrer" className="hover:text-fd-foreground">
                    {isZh ? '问题反馈' : 'Issue Tracker'}
                  </a>
                </li>
                <li>
                  <a href="https://github.com/xulo-lang/xulo/discussions" target="_blank" rel="noopener noreferrer" className="hover:text-fd-foreground">
                    {isZh ? '讨论区' : 'Discussions'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-fd-muted-foreground">
            <p>© {new Date().getFullYear()} XULO. {isZh ? '保留所有权利。' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </HomeLayout>
  );
}
