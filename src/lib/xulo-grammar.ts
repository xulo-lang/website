import type { LanguageRegistration } from 'shiki';

export const xuloGrammar: LanguageRegistration = {
  name: 'xulo',
  scopeName: 'source.xulo',
  displayName: 'XULO',
  repository: {},
  patterns: [
    // 1. 单行与多行注释 (灰色)
    {
      name: 'comment.line.double-slash.xulo',
      match: '//.*$',
    },
    {
      name: 'comment.block.xulo',
      begin: '/\\*',
      end: '\\*/',
    },

    // 2. 字符串字面量 (浅绿色)
    {
      name: 'string.quoted.double.xulo',
      begin: '"',
      end: '"',
      patterns: [
        {
          name: 'constant.character.escape.xulo',
          match: '\\\\.',
        },
      ],
    },

    // 3. 箭头运算符 (⇒ 或 =>) (粉色/浅红)
    {
      name: 'keyword.operator.arrow.xulo',
      match: '(=>|⇒)',
    },

    // 4. 控制流关键字：if / match / try / return / await 等 (紫色/深红)
    {
      name: 'keyword.control.xulo',
      match:
        '\\b(if|else|match|try|catch|finally|throw|return|await|async|spawn|lock|shared|loop|while|for|break|continue|in|is)\\b',
    },

    // 5. 结构与函数声明关键字：struct / enum / impl / fn (洋红/粉红)
    {
      name: 'keyword.declaration.xulo',
      match: '\\b(struct|enum|impl|trait|fn)\\b',
    },

    // 6. 状态与修饰符：pub / export / import / mut / let (红色/粉红)
    {
      name: 'keyword.other.xulo',
      match: '\\b(export|import|from|as|mod|use|pub|let|mut)\\b',
    },

    // 7. 特殊关键字 self / super (蓝色/橙色)
    {
      name: 'variable.language.this.xulo',
      match: '\\b(self|super)\\b',
    },

    // 8. 函数声明：fn check_access(...) (黄色/金黄)
    {
      match: '\\bfn\\s+([a-zA-Z_][a-zA-Z0-9_]*)',
      captures: {
        '1': { name: 'entity.name.function.xulo' },
      },
    },

    // 9. 显式结构体/枚举/Trait 声明名称：enum Role / struct User (青黄/黄色)
    {
      match: '\\b(struct|enum|impl|trait)\\s+([A-Z][a-zA-Z0-9_]*)',
      captures: {
        '1': { name: 'keyword.declaration.xulo' },
        '2': { name: 'entity.name.type.class.xulo' },
      },
    },

    // 10. 枚举点号与静态变体访问：Role.Admin / Role.Guest(...) (蓝绿/青色)
    {
      match: '\\b([A-Z][a-zA-Z0-9_]*)\\.([a-zA-Z0-9_]+)\\b',
      captures: {
        '1': { name: 'entity.name.type.class.xulo' },
        '2': { name: 'variable.other.enummember.xulo' },
      },
    },

    // 11. 方法调用：perms.len() / JSON.parse() (蓝色/紫蓝)
    {
      match: '\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*\\(',
      captures: {
        '1': { name: 'entity.name.function.xulo' },
      },
    },

    // 12. 布尔与空值字面量：true / false / null (浅蓝/橙色)
    {
      name: 'constant.language.xulo',
      match: '\\b(true|false|null|undefined)\\b',
    },

    // 13. 数字字面量 (浅青色)
    {
      name: 'constant.numeric.xulo',
      match: '\\b\\d+(\\.\\d+)?\\b',
    },

    // 14. 原生基本类型名：string, number, boolean, list, map 等 (黄绿/青色)
    {
      name: 'support.type.primitive.xulo',
      match: '\\b(string|number|boolean|null|object|list|map|set|any|void|undefined)\\b',
    },

    // 15. 全局内建原语/类名：JSON, Error 等 (黄色/青黄)
    {
      name: 'support.class.xulo',
      match: '\\b(JSON|RegExp|JSONError|RegexError|FsError|Error|TypeError|RangeError)\\b',
    },

    // 16. 大写开头的自定义类型/枚举名称：Role, User, Guest (青黄/绿色)
    {
      name: 'entity.name.type.class.xulo',
      match: '\\b[A-Z][a-zA-Z0-9_]*\\b',
    },
  ],
};