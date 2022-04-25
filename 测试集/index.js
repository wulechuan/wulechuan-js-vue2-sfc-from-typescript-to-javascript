import path from 'path'
import chalk from 'chalk'
import { readFile, writeFile, mkdirp } from 'fs-extra'
import { transformContentStringOfSingleVueFile } from '../源代码'



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

const 诸测试用例之公用默认配置项集 = {
    indentation: false,
    tsconfig,
}





async function 主程序 () {
    const 容纳各输出文件之文件夹之路径 = path.resolve(__dirname, './产生的-vue-文件集')
    await mkdirp(容纳各输出文件之文件夹之路径)





    await Promise.all([
        // 照常输出所有标签。
        测试用例1(
            `${容纳各输出文件之文件夹之路径}/测试用例1-输出结果-甲.vue`,
            诸测试用例之公用默认配置项集
        ),

        // 在输出结果中故意删除所有 style 标签。
        测试用例1(
            `${容纳各输出文件之文件夹之路径}/测试用例1-输出结果-乙.vue`,
            {
                ...诸测试用例之公用默认配置项集,
                shouldNotOutputAnyStyleTags: true,
            }
        ),





        测试用例2(
            './测试集/原始-vue-文件集/测试用例2-原始文件.vue',
            `${容纳各输出文件之文件夹之路径}/测试用例2-输出结果.vue`,
            诸测试用例之公用默认配置项集
        ),





        测试用例3(`${容纳各输出文件之文件夹之路径}/测试用例3-输出结果.vue`, {
            indentation: true,
            tsconfig,
            shouldNotTranspileTypescript: true,
        }),
    ])

    console.log(`\n\n${
        chalk.bgGreen(` 全 ${3} 则测试用例运行完毕。`)
    }\n\n`)
}

主程序()





async function 测试用例1 (输出文件之路径, 配置项集) {
    const 原始Vue文件之内容全文 = `
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

    const 得到的新的Vue文件之内容全文 = await transformContentStringOfSingleVueFile(
        原始Vue文件之内容全文,
        {
            ...配置项集,
            // sourceContentDescriptionName: 'My Testing Content 1',
        }
    )

    await writeFile(输出文件之路径, 得到的新的Vue文件之内容全文)
}





async function 测试用例2 (原始文件之路径, 输出文件之路径, 配置项集) {
    const 原始Vue文件之内容包 = await readFile(原始文件之路径, 'utf8')
    const 原始Vue文件之内容全文 = 原始Vue文件之内容包.toString()

    const 得到的新的Vue文件之内容全文 = await transformContentStringOfSingleVueFile(
        原始Vue文件之内容全文,
        {
            ...配置项集,
            sourceContentDescriptionName: '第二则测试，代码来自一个真实的 .vue 文件',
        }
    )

    await writeFile(输出文件之路径, 得到的新的Vue文件之内容全文)
}





async function 测试用例3 (输出文件之路径, 配置项集) {
    const 用Pug语言书写的模板之源代码全文 = `
    div.pug-template-test
        h1 Pug - node template engine

        #container-1.col.
            {{ usage }}

        .col(v-if="favoriteFoodName")
            p.
                {{ favoriteFoodName }}

`

    const 原始Vue文件之内容全文 = `
<template lang="pug">${用Pug语言书写的模板之源代码全文}</template>

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

    const 得到的新的Vue文件之内容全文 = await transformContentStringOfSingleVueFile(
        原始Vue文件之内容全文,
        {
            ...配置项集,
            sourceContentDescriptionName: '<template> 采用了 Pug 语言',
        }
    )

    await writeFile(输出文件之路径, 得到的新的Vue文件之内容全文)
}
