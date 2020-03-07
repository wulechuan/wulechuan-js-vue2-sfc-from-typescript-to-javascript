# Vue 2.x Single-filed Component(SFC) from TypeScript to JavaScript

<link rel="stylesheet" href="./documents/styles/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">


## Multilingual Editions of this Article

- 《[本文之简体中文版](./ReadMe.md)》




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

As we know, Vuejs allows so-called Sinlge-filed Component(SFC), to write markups (`<template>`), JavaScritp codes (`<script>`) and CSS codes (`<style>`) all together within a single file. And the said file by default takes `.vue` as its file extension. Well, this tool transforms the content string for a `.vue` file.

Simply put, this tool accept the content string of a `.vue` file, and convert the string into another string, as the content of a new `.vue` file, where the `<script>` block is for sure written in JavaScript.




### Why should this tool exist

Or say we are writting a Vue component as a lib, but we choose to write this component in TypeScript instead of JavaScript. When a project of pure JavaScript needs to make use of the lib written by us, that project might have difficulties to import out `.vue` file of TypeScript directly. So, as the author of the lib, we should provide a JavaScript version of our `.vue` file. This is a nice example that my tool play a role. You write your `.vue` lib component in TypeScript, then you design a simple tool chain to convert the TypeScript version into a JavaScript version. Then obviously my tool could be the key part of your tool chain, and make it a lot easier to build that tool chain.


Besides, although this tool is named `vue2-sfc-from-typescript-to-javascript`, it actually does more than simply transpile the TypeScript codes, but also by default compiles Stylus, Sass or LESS codes into standard CSS, if any. The compilations of Stylus, Sass or LESS could turn off via options, while the transipling of the TypeScript is **always** processed, and is not possible to turn off. Otherwise, why we need this tool anyway? The compilation of pug language is not supported yet, so if there are any pug codes, they are left untouched.


### Notice

This tool accept no file path string, but a file content string. So the codes for reading a file should write separately. This design makes this tool a bit more flexible.






## Usage

### Installation

```sh
npm  i  @wulechuan/vue2-sfc-from-typescript-to-javascript
```


### An Example

See also `./tests/index.js` in the repository of this project.

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
    options?
): string
```


#### The `options`

```ts
type Options = {
    sourceContentDescriptionName?: string;
    indentation?: string;
    tsconfig?: typescript.TranspileOptions,

    // shouldNotCompilePug, // Not implemented yet.
    shouldNotCompileStylus?: boolean,
    shouldNotCompileSass?: boolean,
    shouldNotCompileLESS?: boolean,

    // pugCompilationOptions, // Not implemented yet.
    cssStylusCompilationOptions?: any,
    cssSassCompilationOptions?: any,
    cssLESSCompilationOptions?: any,
};
```

Where

-   `sourceContentDescriptionName` is just a string that helps node console message a bit more meaningful.

-   `indentation`, the indentation per scope level.

-   `tsconfig`, see [Official Documentation](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)》and the [full schema](http://json.schemastore.org/tsconfig).

-   `pugCompilationOptions`, see [Official Documentation](https://pugjs.org/api/reference.html#pugcompilesource-options).

-   `cssStylusCompilationOptions`, see [Official Documentation](https://stylus-lang.com/docs/js.html).

-   `cssSassCompilationOptions`, see [Official Documentation](https://sass-lang.com/documentation/js-api#options).

-   `cssLESSCompilationOptions`, see [Official Documentation](http://lesscss.org/usage/#programmatic-usage).





---

## TODOs

-   To support compilation of pug language into HTML.


