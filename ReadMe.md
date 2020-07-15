# 吴乐川的 Vue 2.x 单文件组件单独编译工具

<link rel="stylesheet" href="./node_modules/@wulechuan/css-stylus-markdown-themes/dist/css/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">



## Multilingual Editions of this Article

- [English version of this ReadMe](./documents/ReadMe.en-US.md)




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

本工具将一个旧有字符串转换成新字符串，并返回该新字符串。其中，旧有字符串之内容视为一个 `.vue` 文件之内容，其`<script>` 代码块可能采用 TypeScript 编写而成，其中的 `<style>` 代码块可能采用 Stylus、Sass（含 SCSS）或 LESS 编写。本工具返回的新字符串，其内容仍视为一个 `.vue` 文件之内容，其中的 `<script>` 代码块必定是 JavaScript，并且所有 `<style>` 代码的内容默认已转换成标准的 CSS。

**简而言之，本工具处理一个 `.vue` 文件之内容，总是将 TypeScript 转成 JavaScript，且默认将 Stylus、Sass（含 SCSS）或 LESS 转换成 CSS。**

本工具暂未实现将 Pug 转换成 HTML 之功能。


### 本工具之存在意义

有时，我们采用 Vue 2.x 框架编写单个组件或组件库，此时：

1.  我们并非要将这些组件或组件库编译打包成单一的 Web 应用 JavaScript。
1.  我们多数人喜爱 `.vue` 文件，即【单文件组件】。
1.  我们可能会选择 TypeScript 而非 JavaScript 来编写 `.vue` 文件中 `<script>` 标签之内容。

如果上述三个条件同时成立，则在其他项目要引用我们撰写的上述组件或组件库时，新的问题就产生了。具体而言，如果上述所谓“其他项目”没有采用 TypeScript 编写，且没有做令 JavaScript 兼容 TypeScript 语法的相关工具配置，那么，很显然此所谓“其他项目”将无法正常引用你的库。因为你的库是 TypeScript 写成的，而引用该库的项目却不是。

解决这个问题有两个方案，如下：

1.  指导其他项目做好令 JavaScript 代码兼容 TypeScript 语法的配置。这个方案很不友好。而且我本人也没有仔细尝试，可行与否未有定论。

1.  提前将你的库代码从 TypeScript 编译成 JavaScript，令上述所谓“其他项目”放心使用。**简而言之，双管齐下。** 由此，不论其他项目采用 TypeScript 还是 JavaScript，均可使用你编写的 `.vue` 组件无虞。**如果你选择这个方案，那么你需要一个工具来帮助你做代码转换。本工具或许会是不二之选。**

> 顺便指出，本工具名称为 `vue2-sfc-from-typescript-to-javascript`，这或许给人造成“本工具仅处理 `<script>` 代码块”的错误印象。实则本工具之转换能力并不局限于转换 `<script>` 之内容，本工具默认也支持将 Stylus、Sass、LESS 转换成标准的 CSS。此三类与 CSS 相关的转换默认既是开启的，但可以通过选项关闭。而由 TypeScript 至 JavaScript 的转换是不能关闭的。否则，私以为阁下就不必采用本工具了。采用 pug 语法的 `<template>` 内容块暂不支持转换成标准的 HTML，故而，在结果字符串中（即在结果 `.vue` 文件内容中），pug 代码将原封不动。


### 注意事项

> 本工具接受的输入**并非**文件路径字符串，而是文件内容字符串。因此，读取文件之操作须另行编写。如此设计，自然是为了令本工具拥有更佳的通用性。




## 用法

### 安装

```sh
npm  i  @wulechuan/vue2-sfc-from-typescript-to-javascript
```


### 具体示例

注意下方示例代码中的 `transformContentStringOfSingleVueFile` 函数。

另可参阅本项目代码库中的 `./tests/index.js`。

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

const options = {
    tsconfig,
}

convert(
    './lib/my-cool-component.vue',
    './dist/lib/my-cool-component.js.vue',
    options
)

async function convert(sourceVueFilePath, targetVueFilePath, options) {
    const sourceVueFileRawContent = await readFile(sourceVueFilePath, 'utf8')
    const sourceVueFileContentString = sourceVueFileRawContent.toString()

    // This is it. The `transformContentStringOfSingleVueFile`.
    const newVueContentString = await transformContentStringOfSingleVueFile(
        sourceVueFileContentString,
        {
            ...options,
            sourceContentDescriptionName: 'My Cool Component',
        }
    )

    await writeFile(targetVueFilePath, newVueContentString)
}
```


### 应用编程接口（所谓 API）

#### 主函数

本工具提供唯一的函数用于转换 `.vue` 文件之内容字符串。该函数名为 `transformContentStringOfSingleVueFile`。该函数之签名（Signature）如下：

```ts
function transformContentStringOfSingleVueFile(
    sourceVueFileContentString: string,
    options?: Options // 详见下文。
): string
```


#### 主函数之选项（`Options`）

```ts
type Options = {
    sourceContentDescriptionName?: string;
    indentation?: string | number;
    tsconfig?: typescript.TranspileOptions;

    // shouldNotCompilePug?: boolean; // 暂不支持，无作用。
    shouldNotCompileStylus?: boolean;
    shouldNotCompileSass?: boolean;
    shouldNotCompileLESS?: boolean;

    // pugCompilationOptions?: any; // 暂不支持，无作用。
    cssStylusCompilationOptions?: any;
    cssSassCompilationOptions?: any;
    cssLESSCompilationOptions?: any;
};
```

其中，

-   `sourceContentDescriptionName` 是一个字符串，填写该字符串，可令 Nodejs 在控制台输出的信息更明确易懂。如果给出无效值，例如 `undefined`，则本程序退而求其次，采用源 `.vue` 内容字符串之[哈希值](https://www.npmjs.com/package/hash-sum)作为其所为“名称”。

-   `indentation`  每缩进一级代码时，采用的字符串。此处亦可给出大于零的数字值而非字符串值，该数字用于规定单级缩进所需空格之数量。参阅《[@wulechuan/get-valid-indentation-string 的〈应用编程接口〉部分](https://www.npmjs.com/package/@wulechuan/get-valid-indentation-string#%E5%BA%94%E7%94%A8%E7%BC%96%E7%A8%8B%E6%8E%A5%E5%8F%A3%EF%BC%88%E6%89%80%E8%B0%93-api%EF%BC%89)》。

-   `tsconfig` 见《[官方说明](https://www.tslang.cn/docs/handbook/tsconfig-json.html)》以及《[完整定义](http://json.schemastore.org/tsconfig)》。

-   `pugCompilationOptions` 见《[官方说明](https://pugjs.org/api/reference.html#pugcompilesource-options)》。

-   `cssStylusCompilationOptions` 见《[官方说明](https://stylus-lang.com/docs/js.html)》。

-   `cssSassCompilationOptions` 见《[官方说明](https://sass-lang.com/documentation/js-api#options)》。

-   `cssLESSCompilationOptions` 见《[官方说明](http://lesscss.org/usage/#programmatic-usage)》。



---

## 未来计划

-   支持由 pug 编译至 HTML。



