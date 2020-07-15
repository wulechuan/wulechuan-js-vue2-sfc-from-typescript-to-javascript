import { readFile, writeFile } from 'fs-extra'
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

const options = {
    indentation: false,
    tsconfig,
}

test1(options)
test2('./tests/from/testing-source-2.vue', options)





async function test1(options) {
    const testingSrouce = `
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
        testingSrouce,
        {
            ...options,
            // sourceContentDescriptionName: 'My Testing Content 1',
        }
    )

    await writeFile('./tests/to/test-1-result.vue', newVueContentString)
}





async function test2(testingSourceFilePath, options) {
    const sourceVueFileRawContent = await readFile(testingSourceFilePath, 'utf8')
    const sourceVueFileContentString = sourceVueFileRawContent.toString()

    const newVueContentString = await transformContentStringOfSingleVueFile(
        sourceVueFileContentString,
        {
            ...options,
            sourceContentDescriptionName: 'My Testing Content 2, from a .vue file',
        }
    )

    await writeFile('./tests/to/test-2-result.vue', newVueContentString)
}
