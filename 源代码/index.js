import { 将Vue2的单文件部件内容全文拆分 } from '@wulechuan/vue2-official-sfc-parser'
import { getValidIndentationString } from '@wulechuan/get-valid-indentation-string'

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

    loggingPrefix,
    debuggingPrefix,
    errorLoggingPrefix,

    logSkippingOfATransformation,
    logBeginningOfATransformation,
    logSuccessionOfATransformation,

    logAllBlocksOfTheDescriptorButWithSliceEachContentSliced,
    logSingleBlockButWithItsContentStringSliced,
} from './辅助工具集'





export async function 处理一个Vue2的单文件部件的内容(原始Vue文件之内容全文, 配置项总集) {
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





    const 单级缩进空白_采纳的值 = getValidIndentationString(
        用于产生的Vue文件中各代码块的单级缩进空白,
        getValidIndentationString(indentation, '    ')
    )

    let 原内容的扼要描述 = sourceContentDescriptionName
    if (typeof 用于命令行消息中的对原内容的扼要描述 === 'string' && 用于命令行消息中的对原内容的扼要描述.trim()) {
        原内容的扼要描述 = 用于命令行消息中的对原内容的扼要描述 // .trim()
    } else if (typeof sourceContentDescriptionName === 'string' && sourceContentDescriptionName.trim()) {
        原内容的扼要描述 = sourceContentDescriptionName // .trim()
    } else {
        原内容的扼要描述 = `< 未给出描述的 .vue （散列编号： ${
            hashSum(原始Vue文件之内容全文)
        }）>`
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
            errorString => console.error(`${errorLoggingPrefix}\n${chalk.red(errorString)}`)
        )

        const 记载错误之对象 = new Error(`${errorLoggingPrefix} ${errors.length} errors encounted.`)

        logAllBlocksOfTheDescriptorButWithSliceEachContentSliced(源文件拆分得到的结构化数据, 128)

        return Promise.reject(记载错误之对象)
    } else {
        // logAllBlocksOfTheDescriptorButWithSliceEachContentSliced(源文件拆分得到的结构化数据, 128)
    }





    let 展平后的各内容块之列表_乱序 = []

    if (template && !产生的内容中不应包含模板_采纳的值) {
        展平后的各内容块之列表_乱序.push(template)
    }

    if (script) {
        展平后的各内容块之列表_乱序.push(script)
    }

    if (!产生的内容中不应包含任何Style标签_采纳的值) {
        展平后的各内容块之列表_乱序 = [
            ...展平后的各内容块之列表_乱序,
            ...styles,
        ]
    }

    展平后的各内容块之列表_乱序 = [
        ...展平后的各内容块之列表_乱序,
        ...customBlocks,
    ]

    const 展平后的各内容块之列表_遵照在原文件中的出场顺序 = [
        ...展平后的各内容块之列表_乱序,
    ].sort((内容块甲, 内容块乙) => 内容块甲.start - 内容块乙.start)

    const promisesOfAllCompilationTasks = 展平后的各内容块之列表_遵照在原文件中的出场顺序
        .reduce((汇总的承诺列表, 拆分原文件得到的某内容块) => {
            const { type, lang, attrs, content: 该内容块的原始内容全文 } = 拆分原文件得到的某内容块



            if (type === 'template') {
                if (lang === 'pug') {
                    if (不应编译Pug_采纳的值) {
                        logSkippingOfATransformation(
                            原内容的扼要描述, 'pug'
                        )
                    } else {
                        delete attrs.lang
                        attrs['source-language-was'] = lang

                        汇总的承诺列表.push(new Promise((resolve, reject) => {
                            logBeginningOfATransformation(
                                原内容的扼要描述, 'pug', 'HTML', '编译成'
                            )
                            logBeginningOfATransformation(
                                原内容的扼要描述, 'pug', 'HTML', '编译成'
                            )



                            const htmlString = pug.render(
                                该内容块的原始内容全文,
                                pug语言的编译配置项集_采纳的值
                            )

                            let indentedContent = changeIndentation.html(htmlString, { tabString: 单级缩进空白_采纳的值 })
                            indentedContent = simpleIndent(indentedContent, 单级缩进空白_采纳的值)

                            拆分原文件得到的某内容块.content = indentedContent



                            logSuccessionOfATransformation(
                                原内容的扼要描述, 'pug', 'HTML', '编译成'
                            )

                            resolve(true)
                        }))
                    }
                } else {
                    汇总的承诺列表.push(new Promise((resolve, reject) => {
                        try {
                            logBeginningOfATransformation(
                                原内容的扼要描述, 'HTML', 'HTML', 'formatting'
                            )



                            let indentedContent = changeIndentation.html(该内容块的原始内容全文, { tabString: 单级缩进空白_采纳的值 })
                            indentedContent = simpleIndent(indentedContent, 单级缩进空白_采纳的值)

                            拆分原文件得到的某内容块.content = indentedContent



                            logSuccessionOfATransformation(
                                原内容的扼要描述, 'HTML', 'HTML', 'formatting'
                            )

                            // logSingleBlockButWithItsContentStringSliced(block)

                            resolve(true)
                        } catch (error) {
                            reject(error)
                        }
                    }))
                }
            }



            if (type === 'script' && lang === 'ts') {
                if (不应编译TypeScript_采纳的值) {
                    logSkippingOfATransformation(
                        原内容的扼要描述, 'TypeScript'
                    )
                } else {
                    delete attrs.lang
                    attrs['source-language-was'] = lang

                    汇总的承诺列表.push(new Promise((resolve, reject) => {
                        try {
                            logBeginningOfATransformation(
                                原内容的扼要描述, 'TypeScript', 'JavaScript', '编译成'
                            )



                            const {
                                outputText: javaScriptCodes,
                            } = typescript.transpileModule(
                                该内容块的原始内容全文,
                                TypeScript语言的编译配置项集_采纳的值
                            )

                            拆分原文件得到的某内容块.content = changeIndentation.js(javaScriptCodes, { tabString: 单级缩进空白_采纳的值 })



                            logSuccessionOfATransformation(
                                原内容的扼要描述, 'TypeScript', 'JavaScript', '编译成'
                            )

                            // logSingleBlockButWithItsContentStringSliced(block)

                            resolve(true)
                        } catch (e) {
                            reject(e)
                        }
                    }))
                }
            }



            if (type === 'style' && lang === 'stylus') {
                if (不应编译Stylus_采纳的值) {
                    logSkippingOfATransformation(
                        原内容的扼要描述, 'Stylus'
                    )
                } else {
                    delete attrs.lang
                    attrs['source-language-was'] = lang

                    汇总的承诺列表.push(new Promise((resolve, reject) => {
                        try {
                            logBeginningOfATransformation(
                                原内容的扼要描述, 'Stylus', 'CSS', '编译成'
                            )



                            stylus.render(该内容块的原始内容全文, cssStylus语言的编译配置项集_采纳的值, (error, cssString) => {
                                // console.log(debuggingPrefix, '\n    error:', error, '\n    cssString:', cssString)

                                if (error) {
                                    throw error
                                }



                                拆分原文件得到的某内容块.content = changeIndentation.css(cssString, { tabString: 单级缩进空白_采纳的值 })



                                logSuccessionOfATransformation(
                                    原内容的扼要描述, 'Stylus', 'CSS', '编译成'
                                )

                                // logSingleBlockButWithItsContentStringSliced(block)

                                resolve(true)
                            })
                        } catch (error) {
                            reject(error)
                        }
                    }))
                }
            }



            if (type === 'style' && (lang === 'sass' || lang === 'scss')) {
                const sass源代码的语法风格为SASS而非SCSS = lang === 'sass'

                if (不应编译Sass_采纳的值) {
                    if (sass源代码的语法风格为SASS而非SCSS) {
                        logSkippingOfATransformation(
                            原内容的扼要描述, 'SASS'
                        )
                    } else {
                        logSkippingOfATransformation(
                            原内容的扼要描述, 'SCSS'
                        )
                    }
                } else {
                    delete attrs.lang
                    attrs['source-language-was'] = lang

                    汇总的承诺列表.push(new Promise((resolve, reject) => {
                        try {
                            if (sass源代码的语法风格为SASS而非SCSS) {
                                logBeginningOfATransformation(
                                    原内容的扼要描述, ' SASS', 'CSS', '编译成'
                                )
                            } else {
                                logBeginningOfATransformation(
                                    原内容的扼要描述, ' SCSS', 'CSS', '编译成'
                                )
                            }


                            const compilationResult = sass.compileString(
                                该内容块的原始内容全文,
                                {
                                    ...cssSass语言的编译配置项集_采纳的值,
                                    indentedSyntax: sass源代码的语法风格为SASS而非SCSS,
                                    sourceMap: false,
                                    data: 该内容块的原始内容全文,
                                }
                            )

                            const cssString = compilationResult.css
                            拆分原文件得到的某内容块.content = changeIndentation.css(cssString, { tabString: 单级缩进空白_采纳的值 })



                            if (sass源代码的语法风格为SASS而非SCSS) {
                                logSuccessionOfATransformation(
                                    原内容的扼要描述, ' SASS', 'CSS', '编译成'
                                )
                            } else {
                                logSuccessionOfATransformation(
                                    原内容的扼要描述, ' SCSS', 'CSS', '编译成'
                                )
                            }

                            // logSingleBlockButWithItsContentStringSliced(block)

                            resolve(true)
                        } catch (error) {
                            reject(error)
                        }
                    }))
                }
            }



            if (type === 'style' && lang === 'less') {
                if (不应编译LESS_采纳的值) {
                    logSkippingOfATransformation(
                        原内容的扼要描述, 'LESS'
                    )
                } else {
                    delete attrs.lang
                    attrs['source-language-was'] = lang

                    汇总的承诺列表.push(new Promise((resolve, reject) => {
                        try {
                            logBeginningOfATransformation(
                                原内容的扼要描述, 'LESS', 'CSS', '编译成'
                            )



                            less.render(该内容块的原始内容全文, cssLESS语言的编译配置项集_采纳的值, (error, output) => {
                                if (error) {
                                    throw error
                                }



                                const cssString = output.css
                                拆分原文件得到的某内容块.content = changeIndentation.css(cssString, { tabString: 单级缩进空白_采纳的值 })



                                logSuccessionOfATransformation(
                                    原内容的扼要描述, 'LESS', 'CSS', '编译成'
                                )

                                // logSingleBlockButWithItsContentStringSliced(block)

                                resolve(true)
                            })
                        } catch (error) {
                            reject(error)
                        }
                    }))
                }
            }



            return 汇总的承诺列表
        }, [])



    return Promise.all(promisesOfAllCompilationTasks).then(() => {
        const 所有须输出的内容块的最终内容全文组成的列表 = 展平后的各内容块之列表_遵照在原文件中的出场顺序.reduce((blockCodesArray, block) => {
            const { type, attrs, content: blockNewContentString } = block



            let attributesString = Object.keys(attrs).map(key => {
                const value = attrs[key]
                return `${key}="${value}"`
            }).join(' ')

            if (attributesString) {
                attributesString = ` ${attributesString}`
            }

            let wrappingMarkupStartTag = `<${type}${attributesString}>`
            let wrappingMarkupEndTag = `</${type}>`

            const firstChar = blockNewContentString.slice(0, 1)
            const lastChar  = blockNewContentString.slice(-1)

            if (!(/[\r\n]/.test(lastChar))) {
                // This is necessary only for a <template> block.
                // Vue SFC Parser in Code Editor has a bug?
                // At lease VSCode v1.42.1 (2020-03-07)
                // cannot color-coding a .vue file correctly
                // if there is no '\n' before the '</template>'.
                wrappingMarkupEndTag = `\n${wrappingMarkupEndTag}`
            }

            if (!(/[\n\r]/.test(firstChar))) {
                // For start tag, this is not necessary.
                // But I insist to do this as well.
                wrappingMarkupStartTag = `${wrappingMarkupStartTag}\n`
            }

            block.wrappingMarkupStartTag = wrappingMarkupStartTag
            block.wrappingMarkupEndTag   = wrappingMarkupEndTag



            blockCodesArray.push([
                wrappingMarkupStartTag,
                blockNewContentString,
                wrappingMarkupEndTag,
            ].join(''))

            return blockCodesArray
        }, [])



        const 输出的Vue文件内容之全文 = `${所有须输出的内容块的最终内容全文组成的列表.join('\n'.repeat(6))}\n`

        return 输出的Vue文件内容之全文

    }).catch(记载错误之对象 => {

        if (记载错误之对象) {
            console.log(errorLoggingPrefix, 记载错误之对象)
        }

        return Promise.reject(记载错误之对象)

    })
}

export const transformContentStringOfSingleVueFile = 处理一个Vue2的单文件部件的内容
