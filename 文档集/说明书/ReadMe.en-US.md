# Vue 2.x Single-filed Component(SFC) from TypeScript to JavaScript

<link rel="stylesheet" href="../../node_modules/@wulechuan/css-stylus-markdown-themes/源代码/发布的源代码/文章排版与配色方案集/层叠样式表/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">



## Multilingual Editions of this Article

- 《[汉语说明书](../../ReadMe.md)》




## NPM Page

<dl>
<dt>NPM Name</dt>
<dd>

[@wulechuan/vue2-sfc-from-typescript-to-javascript](https://www.npmjs.com/package/@wulechuan/vue2-sfc-from-typescript-to-javascript)

</dd>
<dt>Author</dt>
<dd><p>wulechuan (南昌吴乐川)</p></dd>
</dl>





## Introduction

### What is it

As we know, Vuejs allows us to write so-called Sinlge-filed Components(SFC), putting markups (`<template>`), JavaScritp codes (`<script>`) and CSS codes (`<style>`) all together within a single file. And the said file by default takes `.vue` as its file extension. Well, this tool transforms the content string of a `.vue` file somehow.

Simply put, this tool accepts the content string of a `.vue` file, and converts the string into another string, as the content of a new `.vue` file, where the `<script>` block is by default converted into JavaScript codes. In addition, inside the output string, any Stylus, Sass, LESS codes are compiled into standard CSS codes; The Pug codes are compiled into standard HTML codes.




### Why should this tool exist

Say we are writting a Vue component library, but we choose to write the component, or those components in TypeScript instead of JavaScript. 

Whatever, basically we created one or several `.vue` files and publish them.

When later a project written by others, which is of pure JavaScript, needs to make use of the said library written by us, that project might have difficulties to import our `.vue` file of TypeScript directly. So, as the author of the library, we should provide a JavaScript version of our `.vue` files. This is a nice example that my tool plays a role. You write your `.vue` library components in TypeScript as usual, then you design a simple tool chain to convert the TypeScript version into a JavaScript version. Obviously my tool could be the key part of your tool chain, and make it a lot easier to build up that tool chain.


Besides, although this tool is named `vue2-sfc-from-typescript-to-javascript`, it actually does more than simply transpile the TypeScript codes. By default, my tool also compiles Stylus, Sass or LESS codes, if any, into standard CSS codes. And compiles Pug into standard HTML codes. Any conversions/transpilations/compilations can turn off via options. If any option turns off, the corresponding code blocks would be untouched in the output `.vue` file.


### Notice

The string as the argument of this tool is **not** a file path, but file contents. So the codes for reading a file out as a string should write separately.






## Usage

### Installation

```sh
npm  i  @wulechuan/vue2-sfc-from-typescript-to-javascript
```


### An Example

Notice the function named `transformContentStringOfSingleVueFile` below.

See also `./测试集/index.js` in the repository of this project.

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



### API

#### The Main Function

This tool provides the only function named `transformContentStringOfSingleVueFile`. The signature of the said function is:

```ts
function transformContentStringOfSingleVueFile(
    sourceVueFileContentString: string,
    options?: T_TransformationOptions // See below
): string
```


#### The `options`

```ts
import type { CompilerOptions as T_tsconfig } from 'typescript'
import type { Options as T_PugCompilationOptions } from 'pug'
import type { RenderOptions as T_CssStylusCompilationOptions } from 'stylus'
import type { Options as T_CssSassCompilationOptions } from 'sass'
import type Less from 'less'

export type T_TransformationOptions = {
    sourceContentDescriptionName?: string;
    indentation?: string;

    shouldNotTranspileTypescript?: boolean;
    shouldNotCompilePug?: boolean;
    shouldNotCompileStylus?: boolean;
    shouldNotCompileSass?: boolean;
    shouldNotCompileLESS?: boolean;

    shouldNotOutputTemplateTag?: boolean;
    shouldNotOutputAnyStyleTags?: boolean;

    tsconfig?: T_tsconfig;
    pugCompilationOptions?: T_PugCompilationOptions;
    cssStylusCompilationOptions?: T_CssStylusCompilationOptions;
    cssSassCompilationOptions?: T_CssSassCompilationOptions<'sync'>;
    cssLESSCompilationOptions?: Less.Options;
};
```

Where

-   `sourceContentDescriptionName` is just a string that helps messages in the Nodejs console a bit more meaningful. It could be a "falsy" value like `undefined`, then the [hash-sum](https://www.npmjs.com/package/hash-sum) string of the source string is used instead.

-   `indentation`, the indentation per scope level. See [API of @wulechuan/get-valid-indentation-string](https://github.com/wulechuan/wulechuan-js-get-valid-indentation-string/blob/HEAD/ReadMe.en-US.md#api).

-   `tsconfig`, see [Official Documentation](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html) and the [full schema](http://json.schemastore.org/tsconfig).

-   `pugCompilationOptions`, see [Official Documentation](https://pugjs.org/api/reference.html#pugcompilesource-options).

-   `cssStylusCompilationOptions`, see [Official Documentation](https://stylus-lang.com/docs/js.html).

-   `cssSassCompilationOptions`, see [Official Documentation](https://sass-lang.com/documentation/js-api#options).

-   `cssLESSCompilationOptions`, see [Official Documentation](http://lesscss.org/usage/#programmatic-usage).




