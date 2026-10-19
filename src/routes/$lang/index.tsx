import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { XuloCodeBlock } from '@/components/xulo-code-block';
import { Sparkles, Layout, ShieldCheck, Zap, ArrowRight, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/$lang/')({
  component: Home,
});

const FEATURES_ZH = [
  {
    id: 'struct-impl',
    title: 'struct + impl',
    badge: 'OOP & 封装',
    desc: '支持数据结构与方法实现，显式 pub 可见性控制，消除过度隐式继承。',
    fileName: 'user.xulo',
    code: `pub struct User {
    pub name: string
    pub age: int
    role: Role
}

impl User {
    // 构造函数
    pub fn new(name: string, age: int): User {
        User(name: name, age: age, role: Role::Member)
    }

    // 实例方法（使用 pub 暴露）
    pub fn get_name(self): string {
        self.name
    }
}`,
  },
  {
    id: 'enum-match',
    title: 'enum + match',
    badge: '代数数据类型',
    desc: '代数数据类型与穷尽模式匹配。变体统一用双冒号 (::) 路径访问，点号 (.) 保留给字段与方法。',
    fileName: 'role.xulo',
    code: `pub enum Role {
    Admin,
    Member,
    Guest(permission: string),
}

pub fn check_access(role: Role): bool {
    match role {
        Role::Admin => true,
        Role::Guest(p) => p == "read",
        Role::Member => false,
    }
}`,
  },
  {
    id: 'json-async',
    title: 'JSON & async/await',
    badge: 'Result & Task',
    desc: 'JSON 来自 std 的 json 包并返回 Result。async fn 产生 Task<T>，await 解包，失败用 ? 向上传播。',
    fileName: 'api.xulo',
    code: `use json as JSON;
use net::fetch;

pub async fn fetch_profile(id: string): Result<User, JSONError> {
    let resp = await fetch("/api/users/" + id)
    // 解析失败会经由 ? 提前返回整个 Result::Err
    let user = JSON::parse(resp.body)?
    Result::Ok(user)
}`,
  },
  {
    id: 'result-error-handling',
    title: 'Result & ? 错误处理',
    badge: '零歧义错误模型',
    desc: '没有异常：失败是普通的 Result 值，用 match 检查或用 ? 传播；panic 停止程序且没有处理器。',
    fileName: 'storage.xulo',
    code: `enum LoadError { NotFound(path: string), Denied(user: string) }

fn read(path: string): Result<string, LoadError> {
    if path == "" { return Result::Err(LoadError::NotFound(path)) }
    Result::Ok("{}")
}

// ? 传播 Err，主路径保持线性
pub fn load(path: string): Result<string, LoadError> {
    let raw = read(path)?
    Result::Ok(raw)
}`,
  },
];

const FEATURES_EN = [
  {
    id: 'struct-impl',
    title: 'struct + impl',
    badge: 'OOP & Encapsulation',
    desc: 'Data structures with method implementations, explicit pub visibility, and no implicit inheritance.',
    fileName: 'user.xulo',
    code: `pub struct User {
    pub name: string
    pub age: int
    role: Role
}

impl User {
    // Constructor
    pub fn new(name: string, age: int): User {
        User(name: name, age: age, role: Role::Member)
    }

    // Instance method (exposed with pub)
    pub fn get_name(self): string {
        self.name
    }
}`,
  },
  {
    id: 'enum-match',
    title: 'enum + match',
    badge: 'Algebraic Data Types',
    desc: 'Algebraic data types with exhaustive pattern matching. Variants are paths with ::; the dot (.) is reserved for fields and methods.',
    fileName: 'role.xulo',
    code: `pub enum Role {
    Admin,
    Member,
    Guest(permission: string),
}

pub fn check_access(role: Role): bool {
    match role {
        Role::Admin => true,
        Role::Guest(p) => p == "read",
        Role::Member => false,
    }
}`,
  },
  {
    id: 'json-async',
    title: 'JSON & async/await',
    badge: 'Result & Task',
    desc: 'JSON comes from the std json package and returns a Result. async fn produces a Task<T> you await — failures travel up with ?.',
    fileName: 'api.xulo',
    code: `use json as JSON;
use net::fetch;

pub async fn fetch_profile(id: string): Result<User, JSONError> {
    let resp = await fetch("/api/users/" + id)
    // A parse failure early-returns the whole Result::Err via ?
    let user = JSON::parse(resp.body)?
    Result::Ok(user)
}`,
  },
  {
    id: 'result-error-handling',
    title: 'Result & ? Error Handling',
    badge: 'Zero-Ambiguity Error Model',
    desc: 'No exceptions: failures are ordinary Result values you inspect with match or propagate with ?. panic stops the program — there is no handler.',
    fileName: 'storage.xulo',
    code: `enum LoadError { NotFound(path: string), Denied(user: string) }

fn read(path: string): Result<string, LoadError> {
    if path == "" { return Result::Err(LoadError::NotFound(path)) }
    Result::Ok("{}")
}

// ? propagates the Err; the happy path stays linear
pub fn load(path: string): Result<string, LoadError> {
    let raw = read(path)?
    Result::Ok(raw)
}`,
  },
];

function Home() {
  const { lang } = Route.useParams();
  const isZh = lang === 'zh';
  const [activeTab, setActiveTab] = useState(0);

  const features = isZh
    ? [
        {
          icon: Layout,
          title: '声明式 UI',
          description: '用简洁的组件语法描述 UI 结构和意图——无闭合标签，无尖括号。',
        },
        {
          icon: Zap,
          title: '简洁语法',
          description: 'use 声明式导入，:: 走声明路径（包、模块、变体、命名空间），. 只访问值成员——零歧义语法设计，零摩擦。',
        },
        {
          icon: ShieldCheck,
          title: '类型安全与 Result 错误模型',
          description: '静态类型、类型推断、pub 可见性；失败以 Result 承载，用 match 检查或用 ? 传播。',
        },
        {
          icon: Sparkles,
          title: 'AI 友好核心',
          description: '足够结构化和可预测，让 LLM 无瑕疵生成；足够直觉，让人喜爱。',
        },
      ]
    : [
        {
          icon: Layout,
          title: 'Declarative UI',
          description: 'Describe UI structure and intent with a clean component syntax — no closing tags, no angle brackets.',
        },
        {
          icon: Zap,
          title: 'Clean Syntax',
          description: '`use` declarations instead of string imports — `::` walks declaration paths (packages, modules, variants, namespaces), `.` reaches into values — and zero-ambiguity syntax designed for zero friction.',
        },
        {
          icon: ShieldCheck,
          title: 'Type-Safe & Result Errors',
          description: 'Static typing with type inference, `pub` visibility, and failures carried as `Result` values propagated with `?`.',
        },
        {
          icon: Sparkles,
          title: 'AI-Friendly Core',
          description: 'Structured and predictable enough for LLMs to generate flawlessly; intuitive enough for humans to love.',
        },
      ];

  const showcaseFeatures = isZh ? FEATURES_ZH : FEATURES_EN;
  const currentFeature = showcaseFeatures[activeTab];

  return (
    <HomeLayout {...baseOptions(lang)}>
      <div className="relative flex flex-col flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-purple-600/20 via-pink-500/10 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-8 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>XULO v0.1.0 Alpha is Live</span>
            <span className="text-white/30">|</span>
            <span className="text-purple-300">{isZh ? '为人类与 AI 设计' : 'Designed for Humans & AIs'}</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-fd-foreground mb-6">
            XULO
          </h1>

          <h2 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6 tracking-tight">
            {isZh ? '逻辑与界面，同一份源码' : 'Logic and interface, one file'}
          </h2>

          <p className="text-xl md:text-2xl font-semibold text-fd-foreground/80 tracking-tight mb-10">
            {isZh ? '可靠、可读、无数据竞争。' : 'Reliable, readable, and race-free.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Link
              to="/$lang/docs/$"
              params={{ lang, _splat: 'reference/getting-started/overview' }}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-fd-primary text-fd-primary-foreground font-bold hover:opacity-90 transition-all shadow-xl shadow-white/10"
            >
              {isZh ? '快速开始' : 'Get Started'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/$lang/docs/$"
              params={{ lang, _splat: 'introduction' }}
              className="px-7 py-3 rounded-xl bg-white/5 border border-white/10 text-fd-foreground font-medium hover:bg-white/10 transition-all"
            >
              {isZh ? '文档' : 'Documentation'}
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-6xl mx-auto py-12 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-purple-400/50 transition-all">
                    <Icon className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-fd-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Code Showcase */}
        <section className="max-w-6xl mx-auto py-20 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Tab Buttons */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-6 lg:sticky lg:top-24">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Spec Showcase</span>
                </div>
                <h2 className="text-3xl font-extrabold text-fd-foreground mb-2 tracking-tight">
                  {isZh ? '语言特性' : 'Language Features'}
                </h2>
                <p className="text-fd-muted-foreground text-sm">
                  {isZh
                    ? '点击下方特性选项卡，实时预览 XULO 严谨且优雅的代码语法规范。'
                    : 'Click any feature tab below to preview XULO\'s precise and elegant syntax spec in real-time.'}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {showcaseFeatures.map((feature, idx) => {
                  const isActive = activeTab === idx;
                  return (
                    <button
                      key={feature.id}
                      onClick={() => setActiveTab(idx)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-purple-500/10 border-purple-500/50 shadow-lg shadow-purple-500/5'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-2 h-2 rounded-full transition-all ${
                              isActive ? 'bg-purple-400 scale-125' : 'bg-gray-600'
                            }`}
                          />
                          <h3
                            className={`font-mono text-sm font-semibold transition-colors ${
                              isActive ? 'text-purple-300' : 'text-fd-foreground'
                            }`}
                          >
                            {feature.title}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                          {feature.badge}
                        </span>
                      </div>
                      <p className="text-xs text-fd-muted-foreground pl-4 leading-relaxed line-clamp-2">
                        {feature.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              <Link
                to="/$lang/docs/$"
                params={{ lang, _splat: 'reference/getting-started/overview' }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-fd-foreground text-sm font-medium hover:bg-white/20 transition-all w-fit"
              >
                {isZh ? '阅读完整规范' : 'Read Full Specification'}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right: Dynamic IDE Code Block with Fumadocs DynamicCodeBlock */}
            <div className="lg:col-span-7 flex flex-col rounded-2xl bg-[#0B0B0D] border border-white/10 shadow-2xl overflow-hidden transition-all duration-300">
              {/* IDE Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-gray-400">
                    {currentFeature.fileName}
                  </span>
                </div>
              </div>

              {/* Code Content using DynamicCodeBlock */}
              <div className="min-h-[380px]">
                <XuloCodeBlock
                  code={currentFeature.code}
                  fileName={currentFeature.fileName}
                />
              </div>

              {/* IDE Footer */}
              <div className="px-6 py-2.5 bg-white/[0.02] border-t border-white/5 text-[11px] text-gray-500 font-mono flex items-center justify-between">
                <span>Language: XULO v0.1</span>
                <span>{isZh ? '静态类型 • 规范驱动' : 'Statically Typed • Spec-Driven'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why XULO */}
        <section className="max-w-6xl mx-auto py-16 px-6 border-t border-white/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-fd-foreground mb-3">
              {isZh ? '为什么选择 XULO？' : 'Why XULO?'}
            </h2>
            <p className="text-fd-muted-foreground text-sm">
              {isZh ? '连接高层级 DX 与底层级执行。' : 'Bridging high-level DX with low-level execution.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="text-purple-400 font-mono text-sm mb-2">VS TypeScript</div>
              <h3 className="text-lg font-bold text-fd-foreground mb-3">
                {isZh ? '安全默认值' : 'Safe Defaults'}
              </h3>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                {isZh
                  ? '`let` 默认不可变、`match` 必须穷尽、无隐式类型转换——危险的选择都需要显式声明。'
                  : '`let` bindings are immutable by default, every `match` must be exhaustive, and nothing is coerced silently — the risky choices are the ones you opt into.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="text-pink-400 font-mono text-sm mb-2">VS Rust</div>
              <h3 className="text-lg font-bold text-fd-foreground mb-3">
                {isZh ? '低认知负担' : 'Low Cognitive Load'}
              </h3>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                {isZh
                  ? '无需学习生命周期标注或宏。错误是普通的 Result 值，访问规则简单：`::` 走声明，`.` 取值。'
                  : 'No lifetime annotations and no macros to learn. Errors are ordinary `Result` values, with a simple access split: `::` for declarations, `.` for values.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="text-cyan-400 font-mono text-sm mb-2">
                {isZh ? '为 AI 工作流' : 'For AI Workflows'}
              </div>
              <h3 className="text-lg font-bold text-fd-foreground mb-3">
                {isZh ? '零语法歧义' : 'Zero Syntactic Ambiguity'}
              </h3>
              <p className="text-xs text-fd-muted-foreground leading-relaxed">
                {isZh
                  ? '严格的语法规则最小化 LLM 代码生成时的幻觉率，使 XULO 成为 AI 编码代理的首选。'
                  : 'Strict syntax rules minimize hallucination rates during LLM code generation, making XULO the premier choice for AI coding agents.'}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto my-20 px-6">
          <div className="relative flex flex-col items-center justify-center p-12 md:p-16 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 text-center overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-purple-300 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isZh ? '准备好迎接下一代了吗？' : 'Ready for the next generation?'}</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-fd-foreground tracking-tight mb-4">
              {isZh ? '立即用 XULO 构建。' : 'Build faster with XULO today.'}
            </h2>

            <p className="max-w-xl text-fd-muted-foreground text-sm md:text-base mb-8">
              {isZh
                ? '加入开发者行列，用现代简洁构建原生、类型安全、AI 加速的应用。'
                : 'Join developers building native, type-safe, and AI-accelerated applications with modern simplicity.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/$lang/docs/$"
                params={{ lang, _splat: 'reference/getting-started/overview' }}
                className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-fd-primary text-fd-primary-foreground font-bold hover:opacity-90 transition-all shadow-2xl"
              >
                {isZh ? '开始构建' : 'Start Building'}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/$lang/docs/$"
                params={{ lang, _splat: 'reference/getting-started/overview' }}
                className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-fd-foreground font-medium hover:bg-white/10 transition-all"
              >
                {isZh ? '阅读语言规范' : 'Read Language Spec'}
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t bg-fd-muted/50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className="font-semibold mb-2">XULO</h3>
              <p className="text-sm text-fd-muted-foreground">
                {isZh
                  ? '面向人/AI 最优阅读的编程语言'
                  : 'Programming language for optimal human/AI reading'}
              </p>
            </div>

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
                  <Link to="/$lang/docs/$" params={{ lang, _splat: 'reference/getting-started/overview' }} className="hover:text-fd-foreground">
                    {isZh ? '概述' : 'Overview'}
                  </Link>
                </li>
                <li>
                  <Link to="/$lang/docs/$" params={{ lang, _splat: 'reference/basics/types-and-data-structures' }} className="hover:text-fd-foreground">
                    {isZh ? '类型' : 'Types'}
                  </Link>
                </li>
                <li>
                  <Link to="/$lang/docs/$" params={{ lang, _splat: 'spec' }} className="hover:text-fd-foreground">
                    {isZh ? '语言规范' : 'Specification'}
                  </Link>
                </li>
              </ul>
            </div>

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
