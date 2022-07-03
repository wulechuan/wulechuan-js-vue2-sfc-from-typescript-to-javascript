# 吴乐川的 Vue 2.x 单文件部件单独编译工具

<link rel="stylesheet" href="./node_modules/@wulechuan/css-stylus-markdown-themes/源代码/发布的源代码/文章排版与配色方案集/层叠样式表/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">


> 中国人——特别是汉族人，理应坚持广泛、规范地使用汉语。凡非必要之情形不说外国话、不用外国字。此乃天经地义！然则每当必要，亦不排斥采用外国之语言。不妨 **博世界之学问，养中国之精神** 。
>
> 本人亦支持少数民族坚持采用自己民族的传统语言。仍须强调，凡中国人，皆应会用汉语、积极使用汉语，此乃中华各民族之大一统之必由。




## Multilingual Editions of this Article

- [English edition of this ReadMe](./文档集/说明书/ReadMe.en-US.md)




## NPM 页

<dl>
<dt>NPM 包名</dt>
<dd>

[@wulechuan/vue2-sfc-from-typescript-to-javascript](https://www.npmjs.com/package/@wulechuan/vue2-sfc-from-typescript-to-javascript)

</dd>
<dt>作者</dt>
<dd><p>南昌吴乐川</p></dd>
</dl>





## 简介

### 功用

本工具之主体是一个函数，其将一个旧有字符串转换成新字符串，并返回该新字符串。

1.  旧有字符串由外界给出，其内容视为一个 Vuejs *2.x* 版的 `.vue` 文件之内容。且：

    -   `<script>` 代码块可能采用 TypeScript 或 JavaScript 语言编写而成；
    -   `<template>` 代码块可能采用 Pug 或 HTML 语言编写而成；
    -   诸 `<style>` 代码块可能采用 Stylus 、Sass（含 SCSS ）或 LESS 语言编写；
    -   可能包含零个、一个或若干自定义内容块。

1.  本工具返回的新字符串，其内容仍视为一个 `.vue` 文件之内容。**默认情况**下：

    -   若输入的 `<script>` 代码块系采用 TypeScript 语言编写，则输出的 `<script>` 中的代码已编译成 JavaScript 语言之代码。
    -   若输入的 `<template>` 代码块系采用 Pug 语言编写，则输出的 `<template>` 中的代码已编译成类 HTML 代码。
    -   所有 `<style>` 代码块中的所有代码已编译成标准的 CSS 代码。
    -   凡自定义内容块，原封不动。

**简而言之，本工具处理一个 `.vue` 文件之内容全文（字符串），得到一个全新的 `.vue` 文件内容之全文（字符串）。**



### 本工具之存在意义

#### 为什么要从 `.vue` 转换成 `.vue`

**既然我们已经写就了 `.vue` 文件，为何还要产出新的 `.vue` 文件呢？** 换句话说，我们可能遇到怎样的问题或困难呢？

设想我们采用 Vuejs 框架编写【部件】（外国话所谓 “component”）或部件库时，有以下可能的情形：

1.  我们多数人喜爱采取 `.vue` 文件（即【单文件部件】）之形式。
1.  我们可能会选择 TypeScript 语言而非 JavaScript 语言来编写 `.vue` 文件中 `<script>` 标签之内容。
1.  我们并非要将这些部件或部件库编译打包成单一的【网页应用】（外国话所谓 “Web App”），而是要发布到云端（典型的如 `npmjs.org` ）供其他项目调用。

**如果上述三个条件同时成立，则在其他项目要引用我们的这类部件或部件库时，就可能遭遇问题。** 这是因为：

-   已知我们的工具的代码是 TypeScript 语言编写的；
-   其他人在其项目中则可能采用纯 JavaScript 而非 TypeScript 语言编写代码。且可能其并未配置与兼容 TypeScript 代码相关的复杂的工具链。

故其项目无法直接利用我们采用 TypeScript 语言编写的 `.vue` 部件。**他们的项目希望利用纯用 JavaScript 语言编写之工具。**



解决这个问题有两个方案，如下：

1.  不厌其烦地*指导其他项目*做好令 JavaScript 代码兼容 TypeScript 语法的配置。这个方案很不友好。况且我本人也没有仔细尝试，可行与否未有定论。

1.  每当我们采用 TypeScript 语言编写独立的 Vue 部件后，在发布这些由 TypeScript 语言编写的代码时，一并发布一套 JavaScript 语言之版本的代码。**即，我们在发布时， TypeScript 和 JavaScript 并举。** 由此，不论其他项目采用 TypeScript 还是 JavaScript 语言，均可使用我们编写的 `.vue` 部件无虞。

**如果你采取第 2 方案，那么需要一个工具来帮助你做代码转换。而本工具许是阁下不二之选。**

> 顺便指出，本工具名称为 `vue2-sfc-from-typescript-to-javascript`，易给人造成“本工具仅处理 `<script>` 代码块”的错误印象。实则本工具默认也会将 Stylus 、Sass 、LESS 转换成标准的 CSS ；并将 `<template>` 中采用 Pug 语言编写的代码编译成类 HTML 代码。
>
> **所有代码转换动作默认均是开启的**，且均可通过选项关闭。若某转换开关关闭，则对应语种之代码将原封不动输出。



## 用法


### 使用须知

本工具接受的输入是一个字符串，但该字符串**并非** `.vue` 文件路径之字符串，**而是 `.vue` 文件之内容**之字符串。因此，读取文件之操作须另行编写。如此设计，自然是为了令本工具拥有更佳的通用性。




### 安装

```sh
npm  i  @wulechuan/vue2-sfc-from-typescript-to-javascript
```


### 具体示例

注意下方示例代码中的 `处理一个Vue2的单文件部件的内容` 函数。

另可参阅本项目代码库中的 `./测试集/index.js`。

```js
const tsconfig = {
    compilerOptions: {
        target: 'ES2015',
        module: 'ESNext',
        noImplicitAny: true,
        removeComments: false,
        preserveConstEnums: true,
        sourceMap: false,
    },
}

const 配置项总集之公共部分 = {
    tsconfig,
}

转换单个Vue文件(
    './lib/my-cool-component.vue',
    './dist/lib/my-cool-component.js.vue',
    配置项总集之公共部分
)

async function 转换单个Vue文件(原始文件之路径, 输出文件之路径, 配置项总集) {
    const 原始Vue文件之内容包 = await readFile(原始文件之路径, 'utf8')
    const 原始Vue文件之内容全文 = 原始Vue文件之内容包.toString()

    // 下方的 `处理一个Vue2的单文件部件的内容` 即是本工具之唯一接口函数。
    const 得到的新的Vue文件之内容全文 = await 处理一个Vue2的单文件部件的内容(
        原始Vue文件之内容全文,
        {
            ...配置项总集,
            用于命令行消息中的对原内容的扼要描述: '一枚极为闪耀的 Vue 2 部件',
        }
    )

    await writeFile(输出文件之路径, 得到的新的Vue文件之内容全文)
}
```


### 应用编程接口（所谓 API）

#### 主函数

本工具仅提供唯一的函数作为对外接口，但故意给出汉语、英语两种名称：

-   `处理一个Vue2的单文件部件的内容`
-   `transformContentStringOfSingleVueFile`

该函数之签名（ Signature ）如下：

```ts
function 处理一个Vue2的单文件部件的内容(
    原始Vue文件之内容全文: string,
    配置项总集?: T_TransformationOptions // 详见下文。
): string

function transformContentStringOfSingleVueFile(
    sourceVueFileContentString: string,
    options?: T_TransformationOptions // 详见下文。
): string
```


#### 主函数之`配置项总集`（`options`）

```ts
import type {
    CompilerOptions as 范_TypeScript语言的编译配置项集,
} from 'typescript'

import type {
    Options         as 范_Pug语言的编译配置项集,
} from 'pug'

import type {
    RenderOptions   as 范_CssStylus语言的编译配置项集,
} from 'stylus'

import type {
    Options         as 范_CssSass语言的编译配置项集,
} from 'sass'

import type Less from 'less'

// - - - - - - - - - - - - - - - - - - - - - -

export type T_TransformationOptions = {
    用于命令行消息中的对原内容的扼要描述?: string;
    sourceContentDescriptionName?: string;

    用于产生的Vue文件中各代码块的单级缩进空白?: string | number | null;
    indentation?: string | number | null;

    不应编译TypeScript?: boolean;
    shouldNotTranspileTypescript?: boolean;

    不应编译Pug?: boolean;
    shouldNotCompilePug?: boolean;

    不应编译Stylus?: boolean;
    shouldNotCompileStylus?: boolean;

    不应编译Sass?: boolean;
    shouldNotCompileSass?: boolean;

    不应编译LESS?: boolean;
    shouldNotCompileLESS?: boolean;

    产生的内容中不应包含模板?: boolean;
    shouldNotOutputTemplateTag?: boolean;

    产生的内容中不应包含任何Style标签?: boolean;
    shouldNotOutputAnyStyleTags?: boolean;

    tsconfig?:                   范_TypeScript语言的编译配置项集;
    TypeScript语言的编译配置项集?:  范_TypeScript语言的编译配置项集;

    pug语言的编译配置项集?:         范_Pug语言的编译配置项集;
    pugCompilationOptions?:       范_Pug语言的编译配置项集;

    cssStylus语言的编译配置项集?:   范_CssStylus语言的编译配置项集;
    cssStylusCompilationOptions?: 范_CssStylus语言的编译配置项集;

    cssSass语言的编译配置项集?:     范_CssSass语言的编译配置项集<'sync'>;
    cssSassCompilationOptions?:   范_CssSass语言的编译配置项集<'sync'>;

    cssLESS语言的编译配置项集?:     Less.Options;
    cssLESSCompilationOptions?:   Less.Options;
};
```

其中，

-   `用于命令行消息中的对原内容的扼要描述`（`sourceContentDescriptionName`）是文本（string）。填写该值可令 Nodejs 在控制台输出的信息更明确易懂。如果给出无效值，例如 `undefined`，则本程序退而求其次，采用源 `.vue` 内容字符串之[哈希值](https://www.npmjs.com/package/hash-sum)作为其所谓“名称”。

-   `用于产生的Vue文件中各代码块的单级缩进空白`（`indentation`）表达代码缩进时的单级缩进空白采用的文本。不仅可以给出空白字符串，亦可给出大于零的数字值，该数字用于规定单级缩进所需空格（`' '`）之数量。参阅《[@wulechuan/get-valid-indentation-string 的〈应用编程接口〉部分](https://gitee.com/nanchang-wulechuan/wulechuan-js-get-valid-indentation-string#%E5%BA%94%E7%94%A8%E7%BC%96%E7%A8%8B%E6%8E%A5%E5%8F%A3%E6%89%80%E8%B0%93-api)》。

-   `TypeScript语言的编译配置项集`（`tsconfig`）为 TypeScript 语言的标准配置项集。本工具不对该配置项集做任何处理，亦不使用其中任何字段，而是将其直接传递给 TypeScript 的编译程序。

    > 见《[官方说明](https://www.tslang.cn/docs/handbook/tsconfig-json.html)》以及《[完整定义](http://json.schemastore.org/tsconfig)》。

-   `pug语言的编译配置项集`（`pugCompilationOptions`）为 Pug 语言的标准配置项集。本工具不对该配置项集做任何处理，亦不使用其中任何字段，而是将其直接传递给 Pug 的编译程序。

    > 见《[官方说明](https://pugjs.org/api/reference.html#pugcompilesource-options)》。

-   `cssStylus语言的编译配置项集`（`cssStylusCompilationOptions`）为 Stylus 语言的标准配置项集。本工具不对该配置项集做任何处理，亦不使用其中任何字段，而是将其直接传递给 Stylus 的编译程序。

    > 见《[官方说明](https://stylus-lang.com/docs/js.html)》。

-   `cssSass语言的编译配置项集`（`cssSassCompilationOptions`）为 Sass 语言的标准配置项集。本工具不对该配置项集做任何处理，亦不使用其中任何字段，而是将其直接传递给 Sass 的编译程序。

    > 见《[官方说明](https://sass-lang.com/documentation/js-api#options)》。

-   `cssLESS语言的编译配置项集`（`cssLESSCompilationOptions`）为 Sass 语言的标准配置项集。本工具不对该配置项集做任何处理，亦不使用其中任何字段，而是将其直接传递给 Sass 的编译程序。

    > 见《[官方说明](http://lesscss.org/usage/#programmatic-usage)》。




## 源代码仓库

| <span style="display:inline-block;width:180px;">提供仓库服务之组织</span> | <span style="display:inline-block;width:150px;">仓库组织之国别</span> | 仓库地址 |
| ------------- | :----------: | ------- |
| 码云           | 中华人民共和国 | [https://gitee.com/nanchang-wulechuan/wulechuan-js-vue2-sfc-from-typescript-to-javascript.git](https://gitee.com/nanchang-wulechuan/wulechuan-js-vue2-sfc-from-typescript-to-javascript.git) |
| 阿里云之代码仓库 | 中华人民共和国 | [https://code.aliyun.com/wulechuan/wulechuan-js-vue2-sfc-from-typescript-to-javascript.git](https://code.aliyun.com/wulechuan/wulechuan-js-vue2-sfc-from-typescript-to-javascript.git) |
| GitHub         | 美           | [https://github.com/wulechuan/wulechuan-js-vue2-sfc-from-typescript-to-javascript.git](https://github.com/wulechuan/wulechuan-js-vue2-sfc-from-typescript-to-javascript.git) |


## 重要版本说明

-   `v1.0.0` 改用了 ES Module 的写法。

-   `v0.x.x` 沿用了就的模块写法。

