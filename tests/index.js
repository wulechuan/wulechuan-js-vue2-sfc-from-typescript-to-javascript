import path from 'path'
import chalk from 'chalk'
import { readFile, writeFile, mkdirp } from 'fs-extra'
import { transformContentStringOfSingleVueFile } from '..'



const tsconfig = {
    compilerOptions: {
        target: 'ES2019',
        module: 'ESNext',
        noImplicitAny: true,
        removeComments: false,
        preserveConstEnums: true,
        sourceMap: false,
    },
}

const defaultOptionsForTheseTests = {
    indentation: false,
    tsconfig,
}





async function main () {
    const folderFullPath = path.resolve(__dirname, './to')
    await mkdirp(folderFullPath)

    await Promise.all([
        test1(defaultOptionsForTheseTests),

        test2('./tests/from/testing-source-2.vue', defaultOptionsForTheseTests),

        test3({
            indentation: true,
            tsconfig,
            shouldNotTranspileTypescript: true,
        }),
    ])

    console.log(`\n\n${
        chalk.bgGreen(` All ${3} tests end.`)
    }\n\n`)
}

main()





async function test1 (options) {
    const fullVueSourceCodeToTest = `
<template><div class="my-test-component1"></div></template>

<script lang="ts">
import Vue from 'vue'

const a = 9

export default class MyTestComponent1 extends Vue {
    components = {}
    someData = 79
    mounted() {
        console.log("I'm here.")
    }
}
</script>

<style lang="stylus">
default-bg-color = #123;

.my-test-component1 {
    background-color default-bg-color
}
</style>

<style lang="scss">
$default-color: cyan;

.my-test-component1 {
    color: $default-color;
}
</style>

<style lang="less">
@default-filter: blur(2px);

.my-test-component1 {
    filter: @default-filter;
}
</style>
`

    const newVueContentString = await transformContentStringOfSingleVueFile(
        fullVueSourceCodeToTest,
        {
            ...options,
            // sourceContentDescriptionName: 'My Testing Content 1',
        }
    )

    await writeFile('./tests/to/test1-result.vue', newVueContentString)
}





async function test2 (testingSourceFilePath, options) {
    const sourceVueFileRawContent = await readFile(testingSourceFilePath, 'utf8')
    const sourceVueFileContentString = sourceVueFileRawContent.toString()

    const newVueContentString = await transformContentStringOfSingleVueFile(
        sourceVueFileContentString,
        {
            ...options,
            sourceContentDescriptionName: 'My Testing Content 2, from a .vue file',
        }
    )

    await writeFile('./tests/to/test2-result.vue', newVueContentString)
}





async function test3 (options) {
    const sourceCode_Pug = `
    div.pug-template-test
        h1 Pug - node template engine
        
        #container-1.col.
            {{ usage }}

        .col(v-if="favoriteFoodName")
            p.
                {{ favoriteFoodName }}

`

    const fullVueSourceCodeToTest = `
<template lang="pug">${sourceCode_Pug}</template>

<script lang="ts">
import Vue from 'vue'

export default class PugTemplateTest extends Vue {
    private usage: string = 'A test for both pug and typescript blocks'

    private get favoriteFoodName (): string {
        return '江西炒粉'
    }
}
</script>
`

    const newVueContentString = await transformContentStringOfSingleVueFile(
        fullVueSourceCodeToTest,
        {
            ...options,
            sourceContentDescriptionName: 'Template written in Pug',
        }
    )

    await writeFile('./tests/to/test3-result.vue', newVueContentString)
}
