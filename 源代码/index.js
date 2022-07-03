import { 将Vue2的单文件部件内容全文拆分 } from '@wulechuan/vue2-official-sfc-parser'
import { 求可靠的用于计算机源代码缩进的空白文本 } from '@wulechuan/get-valid-indentation-string'

import simpleIndent      from 'indent'
import changeIndentation from 'indent.js'
import chalk             from 'chalk'

import pug from 'pug'
import typescript from 'typescript'
import stylus from 'stylus'
import sass from 'sass'
import less from 'less'

import hashSum from 'hash-sum'

import {
    依次尽早采纳布尔值,
    依次尽早采纳对象值,

    正常消息之统一前缀文本,
    调试信息之统一前缀文本,
    出错消息之统一前缀文本,

    在命令行环境中报告某内容块被丢弃,
    在命令行环境中报告某内容块原封未动,
    在命令行环境中报告某任务已启动,
    在命令行环境中报告某任务已成功,

    在命令行环境中打印原文件拆分得到的整个结构化数据_但截短其中各内容块之内容,
    在命令行环境中打印某内容块之详情_但截短其内容之原文,
} from './辅助工具集.js'





/** @typedef {import('@wulechuan/vue2-sfc-from-typescript-to-javascript').T_TransformationOptions} T_TransformationOptions */

/**
 * @param {string} 原始Vue文件之内容全文
 * @param {T_TransformationOptions} 配置项总集
 * @returns {Promise<string>}
 */
export async function 处理一个Vue2的单文件部件的内容 (原始Vue文件之内容全文, 配置项总集) {
    配置项总集 = 配置项总集 || {}

    const {
        用于命令行消息中的对原内容的扼要描述,
        sourceContentDescriptionName,

        用于产生的Vue文件中各代码块的单级缩进空白,
        indentation,

        不应编译TypeScript,
        shouldNotTranspileTypescript,

        不应编译Pug,
        shouldNotCompilePug,

        不应编译Stylus,
        shouldNotCompileStylus,

        不应编译Sass,
        shouldNotCompileSass,

        不应编译LESS,
        shouldNotCompileLESS,

        产生的内容中不应包含模板,
        shouldNotOutputTemplateTag,

        产生的内容中不应包含任何Style标签,
        shouldNotOutputAnyStyleTags,

        TypeScript语言的编译配置项集,
        tsconfig,

        pug语言的编译配置项集,
        pugCompilationOptions,

        cssStylus语言的编译配置项集,
        cssStylusCompilationOptions,

        cssSass语言的编译配置项集,
        cssSassCompilationOptions,

        cssLESS语言的编译配置项集,
        cssLESSCompilationOptions,
    } = 配置项总集





    const 单级缩进空白_采纳的值 = 求可靠的用于计算机源代码缩进的空白文本(
        用于产生的Vue文件中各代码块的单级缩进空白,
        求可靠的用于计算机源代码缩进的空白文本(indentation, '    ')
    )

    let 原内容的扼要描述 = sourceContentDescriptionName
    if (typeof 用于命令行消息中的对原内容的扼要描述 === 'string' && 用于命令行消息中的对原内容的扼要描述.trim()) {
        原内容的扼要描述 = 用于命令行消息中的对原内容的扼要描述 // .trim()
    } else if (typeof sourceContentDescriptionName === 'string' && sourceContentDescriptionName.trim()) {
        原内容的扼要描述 = sourceContentDescriptionName // .trim()
    } else {
        原内容的扼要描述 = `（ 未给出描述的 .vue ，内容全文之散列： ${
            hashSum(原始Vue文件之内容全文)
        } ）`
    }



    const 不应编译TypeScript_采纳的值 = 依次尽早采纳布尔值(不应编译TypeScript, shouldNotTranspileTypescript)
    const 不应编译Pug_采纳的值 = 依次尽早采纳布尔值(不应编译Pug, shouldNotCompilePug)
    const 不应编译Stylus_采纳的值 = 依次尽早采纳布尔值(不应编译Stylus, shouldNotCompileStylus)
    const 不应编译Sass_采纳的值 = 依次尽早采纳布尔值(不应编译Sass, shouldNotCompileSass)
    const 不应编译LESS_采纳的值 = 依次尽早采纳布尔值(不应编译LESS, shouldNotCompileLESS)
    const 产生的内容中不应包含模板_采纳的值 = 依次尽早采纳布尔值(产生的内容中不应包含模板, shouldNotOutputTemplateTag)
    const 产生的内容中不应包含任何Style标签_采纳的值 = 依次尽早采纳布尔值(产生的内容中不应包含任何Style标签, shouldNotOutputAnyStyleTags)

    const TypeScript语言的编译配置项集_采纳的值 = 依次尽早采纳对象值(TypeScript语言的编译配置项集, tsconfig)
    const pug语言的编译配置项集_采纳的值 = 依次尽早采纳对象值(pug语言的编译配置项集, pugCompilationOptions)
    const cssStylus语言的编译配置项集_采纳的值 = 依次尽早采纳对象值(cssStylus语言的编译配置项集, cssStylusCompilationOptions)
    const cssSass语言的编译配置项集_采纳的值 = 依次尽早采纳对象值(cssSass语言的编译配置项集, cssSassCompilationOptions)
    const cssLESS语言的编译配置项集_采纳的值 = 依次尽早采纳对象值(cssLESS语言的编译配置项集, cssLESSCompilationOptions)





    const 源文件拆分得到的结构化数据 = 将Vue2的单文件部件内容全文拆分(原始Vue文件之内容全文)

    const {
        template,
        script,
        styles,
        customBlocks,
        errors,
    } = 源文件拆分得到的结构化数据

    if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach(
            errorString => console.error(`${出错消息之统一前缀文本}\n${chalk.red(errorString)}`)
        )

        const 记载错误之对象 = new Error(`${出错消息之统一前缀文本} ${errors.length} errors encounted.`)

        在命令行环境中打印原文件拆分得到的整个结构化数据_但截短其中各内容块之内容(源文件拆分得到的结构化数据, 128)

        return Promise.令期待落空(记载错误之对象)
    } else {
        // 在命令行环境中打印原文件拆分得到的整个结构化数据_但截短其中各内容块之内容(源文件拆分得到的结构化数据, 128)
    }





    let 展平后的各内容块之列表_乱序 = []

    if (template) {
        if (产生的内容中不应包含模板_采纳的值) {
            在命令行环境中报告某内容块被丢弃(原内容的扼要描述, '<template>')
        } else {
            展平后的各内容块之列表_乱序.push(template)
        }
    }

    if (script) {
        展平后的各内容块之列表_乱序.push(script)
    }

    if (Array.isArray(styles) && styles.length > 0) {
        if (产生的内容中不应包含任何Style标签_采纳的值) {
            styles.forEach((内容块, 列表编号) => {
                在命令行环境中报告某内容块被丢弃(
                    原内容的扼要描述,
                    `<style> （${列表编号 + 1}）`
                )
            })
        } else {
            展平后的各内容块之列表_乱序 = [
                ...展平后的各内容块之列表_乱序,
                ...styles,
            ]
        }
    }

    展平后的各内容块之列表_乱序 = [
        ...展平后的各内容块之列表_乱序,
        ...customBlocks,
    ]

    const 展平后的各内容块之列表_遵照在原文件中的出场顺序 = [
        ...展平后的各内容块之列表_乱序,
    ].sort((内容块甲, 内容块乙) => 内容块甲.start - 内容块乙.start)

    const 所有任务之期待之汇总列表 = 展平后的各内容块之列表_遵照在原文件中的出场顺序.reduce((各期待之汇总列表, 拆分原文件得到的某内容块) => {
        const { type, lang, attrs, content: 该内容块的原始内容全文 } = 拆分原文件得到的某内容块



        if (type === 'template') {
            if (lang === 'pug') {
                if (不应编译Pug_采纳的值) {
                    在命令行环境中报告某内容块原封未动(
                        原内容的扼要描述, 'pug'
                    )
                } else {
                    delete attrs.lang
                    attrs['source-language-was'] = lang

                    各期待之汇总列表.push(new Promise((令期待落实, 令期待落空) => {
                        在命令行环境中报告某任务已启动(
                            原内容的扼要描述, 'pug', '编译成', 'HTML'
                        )



                        const 类HTML代码之全文 = pug.render(
                            该内容块的原始内容全文,
                            pug语言的编译配置项集_采纳的值
                        )

                        let 调整好缩进格式的内容全文 = changeIndentation.html(类HTML代码之全文, { tabString: 单级缩进空白_采纳的值 })
                        调整好缩进格式的内容全文 = simpleIndent(调整好缩进格式的内容全文, 单级缩进空白_采纳的值)

                        拆分原文件得到的某内容块.content = 调整好缩进格式的内容全文



                        在命令行环境中报告某任务已成功(
                            原内容的扼要描述, 'pug', '编译成', 'HTML'
                        )

                        令期待落实(true)
                    }))
                }
            } else {
                各期待之汇总列表.push(new Promise((令期待落实, 令期待落空) => {
                    try {
                        在命令行环境中报告某任务已启动(
                            原内容的扼要描述, 'HTML', '之代码格式标准化'
                        )



                        let 调整好缩进格式的内容全文 = changeIndentation.html(该内容块的原始内容全文, { tabString: 单级缩进空白_采纳的值 })
                        调整好缩进格式的内容全文 = simpleIndent(调整好缩进格式的内容全文, 单级缩进空白_采纳的值)

                        拆分原文件得到的某内容块.content = 调整好缩进格式的内容全文



                        在命令行环境中报告某任务已成功(
                            原内容的扼要描述, 'HTML', '之代码格式标准化'
                        )

                        // 在命令行环境中打印某内容块之详情_但截短其内容之原文(block)

                        令期待落实(true)
                    } catch (记载错误之对象) {
                        令期待落空(记载错误之对象)
                    }
                }))
            }
        }



        if (type === 'script' && lang === 'ts') {
            if (不应编译TypeScript_采纳的值) {
                在命令行环境中报告某内容块原封未动(
                    原内容的扼要描述, 'TypeScript'
                )
            } else {
                delete attrs.lang
                attrs['source-language-was'] = lang

                各期待之汇总列表.push(new Promise((令期待落实, 令期待落空) => {
                    try {
                        在命令行环境中报告某任务已启动(
                            原内容的扼要描述, 'TypeScript', '编译成', 'JavaScript'
                        )



                        const {
                            outputText: javaScript代码全文,
                        } = typescript.transpileModule(
                            该内容块的原始内容全文,
                            TypeScript语言的编译配置项集_采纳的值
                        )

                        拆分原文件得到的某内容块.content = changeIndentation.js(javaScript代码全文, { tabString: 单级缩进空白_采纳的值 })



                        在命令行环境中报告某任务已成功(
                            原内容的扼要描述, 'TypeScript', '编译成', 'JavaScript'
                        )

                        // 在命令行环境中打印某内容块之详情_但截短其内容之原文(block)

                        令期待落实(true)
                    } catch (e) {
                        令期待落空(e)
                    }
                }))
            }
        }



        if (type === 'style' && lang === 'stylus') {
            if (不应编译Stylus_采纳的值) {
                在命令行环境中报告某内容块原封未动(
                    原内容的扼要描述, 'Stylus'
                )
            } else {
                delete attrs.lang
                attrs['source-language-was'] = lang

                各期待之汇总列表.push(new Promise((令期待落实, 令期待落空) => {
                    try {
                        在命令行环境中报告某任务已启动(
                            原内容的扼要描述, 'Stylus', '编译成', 'CSS'
                        )



                        stylus.render(该内容块的原始内容全文, cssStylus语言的编译配置项集_采纳的值, (记载错误之对象, css代码全文) => {
                            // console.log(调试信息之统一前缀文本, '\n    error:', 记载错误之对象, '\n    css代码全文:', css代码全文)

                            if (记载错误之对象) {
                                throw 记载错误之对象
                            }



                            拆分原文件得到的某内容块.content = changeIndentation.css(css代码全文, { tabString: 单级缩进空白_采纳的值 })



                            在命令行环境中报告某任务已成功(
                                原内容的扼要描述, 'Stylus', '编译成', 'CSS'
                            )

                            // 在命令行环境中打印某内容块之详情_但截短其内容之原文(block)

                            令期待落实(true)
                        })
                    } catch (记载错误之对象) {
                        令期待落空(记载错误之对象)
                    }
                }))
            }
        }



        if (type === 'style' && (lang === 'sass' || lang === 'scss')) {
            const sass源代码的语法风格为SASS而非SCSS = lang === 'sass'

            if (不应编译Sass_采纳的值) {
                if (sass源代码的语法风格为SASS而非SCSS) {
                    在命令行环境中报告某内容块原封未动(
                        原内容的扼要描述, 'SASS'
                    )
                } else {
                    在命令行环境中报告某内容块原封未动(
                        原内容的扼要描述, 'SCSS'
                    )
                }
            } else {
                delete attrs.lang
                attrs['source-language-was'] = lang

                各期待之汇总列表.push(new Promise((令期待落实, 令期待落空) => {
                    try {
                        if (sass源代码的语法风格为SASS而非SCSS) {
                            在命令行环境中报告某任务已启动(
                                原内容的扼要描述, 'SASS', '编译成', 'CSS'
                            )
                        } else {
                            在命令行环境中报告某任务已启动(
                                原内容的扼要描述, 'SCSS', '编译成', 'CSS'
                            )
                        }


                        const 编译器之产出 = sass.compileString(
                            该内容块的原始内容全文,
                            {
                                ...cssSass语言的编译配置项集_采纳的值,

                                indentedSyntax: sass源代码的语法风格为SASS而非SCSS,
                                sourceMap:      false,
                                data:           该内容块的原始内容全文,
                            }
                        )

                        const css代码全文 = 编译器之产出.css
                        拆分原文件得到的某内容块.content = changeIndentation.css(css代码全文, { tabString: 单级缩进空白_采纳的值 })



                        if (sass源代码的语法风格为SASS而非SCSS) {
                            在命令行环境中报告某任务已成功(
                                原内容的扼要描述, 'SASS', '编译成', 'CSS'
                            )
                        } else {
                            在命令行环境中报告某任务已成功(
                                原内容的扼要描述, 'SCSS', '编译成', 'CSS'
                            )
                        }

                        // 在命令行环境中打印某内容块之详情_但截短其内容之原文(block)

                        令期待落实(true)
                    } catch (error) {
                        令期待落空(error)
                    }
                }))
            }
        }



        if (type === 'style' && lang === 'less') {
            if (不应编译LESS_采纳的值) {
                在命令行环境中报告某内容块原封未动(
                    原内容的扼要描述, 'LESS'
                )
            } else {
                delete attrs.lang
                attrs['source-language-was'] = lang

                各期待之汇总列表.push(new Promise((令期待落实, 令期待落空) => {
                    try {
                        在命令行环境中报告某任务已启动(
                            原内容的扼要描述, 'LESS', '编译成', 'CSS'
                        )



                        less.render(该内容块的原始内容全文, cssLESS语言的编译配置项集_采纳的值, (记载错误之对象, 产出) => {
                            if (记载错误之对象) {
                                throw 记载错误之对象
                            }



                            const css代码全文 = 产出.css
                            拆分原文件得到的某内容块.content = changeIndentation.css(css代码全文, { tabString: 单级缩进空白_采纳的值 })



                            在命令行环境中报告某任务已成功(
                                原内容的扼要描述, 'LESS', '编译成', 'CSS'
                            )

                            // 在命令行环境中打印某内容块之详情_但截短其内容之原文(block)

                            令期待落实(true)
                        })
                    } catch (error) {
                        令期待落空(error)
                    }
                }))
            }
        }



        return 各期待之汇总列表
    }, [])



    return Promise.all(所有任务之期待之汇总列表).then(() => {
        const 所有须输出的内容块的最终内容全文组成的列表 = 展平后的各内容块之列表_遵照在原文件中的出场顺序.reduce((将产生的新Vue文件全文的各个片段之列表, block) => {
            const { type, attrs, content: 该内容块最终应输出的内容全文 } = block



            let 该内容块起始标签应具备的一切属性拼接的总字符串 = Object.keys(attrs).map(属性名 => {
                const 属性值 = attrs[属性名]
                return `${属性名}="${属性值}"`
            }).join(' ')

            if (该内容块起始标签应具备的一切属性拼接的总字符串) {
                该内容块起始标签应具备的一切属性拼接的总字符串 = ` ${该内容块起始标签应具备的一切属性拼接的总字符串}`
            }

            let 用以包裹该内容块的标签对的起始标签 = `<${type}${该内容块起始标签应具备的一切属性拼接的总字符串}>`
            let 用以包裹该内容块的标签对的结束标签 = `</${type}>`

            const 首字 = 该内容块最终应输出的内容全文.slice(0, 1)
            const 末字  = 该内容块最终应输出的内容全文.slice(-1)

            if (!(/[\r\n]/.test(末字))) {
                // This is necessary only for a <template> block.
                // Vue SFC Parser in Code Editor has a bug?
                // At lease VSCode v1.42.1 (2020-03-07)
                // cannot color-coding a .vue file correctly
                // if there is no '\n' before the '</template>'.
                用以包裹该内容块的标签对的结束标签 = `\n${用以包裹该内容块的标签对的结束标签}`
            }

            if (!(/[\n\r]/.test(首字))) {
                // For start tag, this is not necessary.
                // But I insist to do this as well.
                用以包裹该内容块的标签对的起始标签 = `${用以包裹该内容块的标签对的起始标签}\n`
            }

            // block.wrappingMarkupStartTag = 用以包裹该内容块的标签对的起始标签
            // block.wrappingMarkupEndTag   = 用以包裹该内容块的标签对的结束标签



            将产生的新Vue文件全文的各个片段之列表.push([
                用以包裹该内容块的标签对的起始标签,
                该内容块最终应输出的内容全文,
                用以包裹该内容块的标签对的结束标签,
            ].join(''))

            return 将产生的新Vue文件全文的各个片段之列表
        }, [])



        const 输出的Vue文件内容之全文 = `${所有须输出的内容块的最终内容全文组成的列表.join('\n'.repeat(6))}\n`

        return 输出的Vue文件内容之全文

    }).catch(记载错误之对象 => {

        if (记载错误之对象) {
            console.log(出错消息之统一前缀文本, 记载错误之对象)
        }

        return Promise.令期待落空(记载错误之对象)

    })
}

// 此为本工具集之主体之英语别称。
export const transformContentStringOfSingleVueFile = 处理一个Vue2的单文件部件的内容
