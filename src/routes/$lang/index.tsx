import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { highlight } from 'fumadocs-core/highlight';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';

export const Route = createFileRoute('/$lang/')({
  component: Home,
});

const features = [
  {
    title: 'Declarative UI',
    description: 'Describe UI structure and intent with a clean component syntax — no closing tags, no angle brackets.',
  },
  {
    title: 'Rust-Inspired Syntax',
    description: 'struct, enum, trait, match, async/await, and let mut — familiar patterns from systems programming.',
  },
  {
    title: 'Type-Safe',
    description: 'Static typing with type inference, generics, union types, and trait-based polymorphism.',
  },
  {
    title: 'AI-Friendly',
    description: 'Structured enough for AI to understand and reason about, simple enough for humans to read.',
  },
];

const exampleCode = `struct User {
  name: string
  age: number
  role: Role
}

enum Role {
  Admin
  Member
}

impl User {
  fn is_admin(self): boolean {
    match self.role {
      Role::Admin => true
      _ => false
    }
  }
}

async fn get_user(id: string): User {
  let resp = await fetch("/api/users/" + id)
  return await resp.json()
}`;

async function HighlightedCode() {
  const code = await highlight(exampleCode, {
    lang: 'rust',
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
  });

  return (
    <CodeBlock>
      <Pre>{code}</Pre>
    </CodeBlock>
  );
}

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
              ? '面向人/AI 最优阅读的编程语言。Rust 风格语法，声明式 UI，类型安全，异步支持。'
              : 'A programming language for optimal human/AI reading. Rust-style syntax, declarative UI, type safety, and async support.'}
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

        {/* Code Example + Language Features */}
        <section className="px-4 py-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Code */}
            <div>
              <h2 className="text-3xl font-bold mb-3">
                {isZh ? '代码示例' : 'Code Example'}
              </h2>
              <p className="text-fd-muted-foreground mb-6">
                {isZh
                  ? '类型、函数、结构体、模式匹配——简洁而强大。'
                  : 'Types, functions, structs, pattern matching — concise and powerful.'}
              </p>
              <HighlightedCode />
            </div>

            {/* Right: Language Features */}
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-3">
                  {isZh ? '语言特性' : 'Language Features'}
                </h2>
                <p className="text-fd-muted-foreground">
                  {isZh
                    ? 'XULO 融合了 Rust、Swift、TypeScript 的最佳实践，打造简洁高效的语法。'
                    : 'XULO combines the best practices from Rust, Swift, and TypeScript into a clean, efficient syntax.'}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-fd-muted/50">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-fd-primary/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-fd-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      {isZh ? 'struct + impl' : 'struct + impl'}
                    </h4>
                    <p className="text-xs text-fd-muted-foreground">
                      {isZh
                        ? '命名结构体，支持方法实现和 trait 派发。'
                        : 'Named structs with method implementations and trait dispatch.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-fd-muted/50">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-fd-primary/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-fd-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      {isZh ? 'enum + match' : 'enum + match'}
                    </h4>
                    <p className="text-xs text-fd-muted-foreground">
                      {isZh
                        ? '带关联数据的枚举，Rust 风格模式匹配。'
                        : 'Enums with associated data, Rust-style pattern matching.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-fd-muted/50">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-fd-primary/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-fd-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      {isZh ? 'let mut + 类型推断' : 'let mut + Type Inference'}
                    </h4>
                    <p className="text-xs text-fd-muted-foreground">
                      {isZh
                        ? '显式可变性，可选类型标注，编译器自动推断。'
                        : 'Explicit mutability, optional type annotations, compiler infers types.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-fd-muted/50">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-fd-primary/10 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-fd-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">
                      {isZh ? 'async fn + await' : 'async fn + await'}
                    </h4>
                    <p className="text-xs text-fd-muted-foreground">
                      {isZh
                        ? '一等异步支持，Promise 语义，try/catch 错误处理。'
                        : 'First-class async support, Promise semantics, try/catch error handling.'}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/$lang/docs/$"
                params={{ lang, _splat: 'reference/types' }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm w-fit hover:opacity-90 transition-opacity"
              >
                {isZh ? '查看类型系统' : 'Explore Types'}
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
                  ? '面向人/AI 最优阅读的编程语言'
                  : 'Programming language for optimal human/AI reading'}
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
                  <Link to="/$lang/docs/$" params={{ lang, _splat: 'reference/types' }} className="hover:text-fd-foreground">
                    {isZh ? '类型' : 'Types'}
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
