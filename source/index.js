import { vueSFCParser } from '@wulechuan/vue2-official-sfc-parser'
import { getValidIndentationString } from '@wulechuan/get-valid-indentation-string'

import simpleIndent      from 'indent'
import changeIndentation from 'indent.js'
import chalk             from 'chalk'

// import pug from 'pug' // TODO
import typescript from 'typescript'
import stylus from 'stylus'
import sass from 'sass'
import less from 'less'

import hashSum from 'hash-sum'

import {
    loggingPrefix,
    debuggingPrefix,
    errorLoggingPrefix,

    logSkippingOfATransformation,
    logBeginOfATransformation,
    logSuccessionOfATransformation,

    logAllBlocksOfTheDescriptorButWithSliceEachContentSliced,
    logSingleBlockButWithItsContentStringSliced,
} from './helpers'





export async function transformContentStringOfSingleVueFile(originalVueFileContentString, options) {
    options = options || {}

    const {
        sourceContentDescriptionName,
        indentation: providedIndentation,
        tsconfig,
        // shouldNotCompilePug,
        shouldNotCompileStylus,
        shouldNotCompileSass,
        shouldNotCompileLESS,
        // pugCompilationOptions,
        cssStylusCompilationOptions,
        cssSassCompilationOptions,
        cssLESSCompilationOptions,
    } = options





    const indentation = getValidIndentationString(providedIndentation, '    ')

    let _sourceContentDescriptionName = sourceContentDescriptionName
    if (!_sourceContentDescriptionName) {
        _sourceContentDescriptionName = `<Untitled source ${
            hashSum(originalVueFileContentString)
        }>`
    }





    const sfcDescriptor = vueSFCParser(originalVueFileContentString)

    const {
        template,
        script,
        styles,
        customBlocks,
        errors,
    } = sfcDescriptor

    if (Array.isArray(errors) && errors.length > 0) {
        errors.forEach(
            errorString => console.error(`${errorLoggingPrefix}\n${chalk.red(errorString)}`)
        )

        const errorToThrowOrReject = new Error(`${errorLoggingPrefix} ${errors.length} errors encounted.`)

        logAllBlocksOfTheDescriptorButWithSliceEachContentSliced(sfcDescriptor, 128)

        return Promise.reject(errorToThrowOrReject)
    } else {
        // logAllBlocksOfTheDescriptorButWithSliceEachContentSliced(sfcDescriptor, 128)
    }





    let flattenedSFCBlocks = []

    if (template) {
        flattenedSFCBlocks.push(template)
    }

    if (script) {
        flattenedSFCBlocks.push(script)
    }

    flattenedSFCBlocks = [
        ...flattenedSFCBlocks,
        ...styles,
        ...customBlocks,
    ]

    const blocksSortedObeyingOriginalOrder = [
        ...flattenedSFCBlocks,
    ].sort((a, b) => a.start - b.start)

    const promisesOfAllCompilationTasks = blocksSortedObeyingOriginalOrder
        .reduce((promises, block) => {
            const { type, lang, attrs, content: blockOriginalContentString } = block



            if (type === 'template') {
                if (lang === 'pug') {
                    // TODO
                    // if (shouldNotCompilePug) {
                    //     logSkippingOfATransformation(
                    //         _sourceContentDescriptionName, 'pug', 'pug', 'leaving as is'
                    //     )
                    // } else {
                    //     delete attrs.lang
                    //     attrs['source-language-was'] = lang

                    //     promises.push(new Promise((resolve, reject) => {
                    //         logBeginOfATransformation(
                    //             _sourceContentDescriptionName, 'pug', 'HTML', 'compiling'
                    //         )

                    //         const realCompiler = pug.compile(
                    //             blockOriginalContentString,
                    //             pugCompilationOptions
                    //         )

                    //         const htmlString = realCompiler()

                    //         logSuccessionOfATransformation(
                    //             _sourceContentDescriptionName, 'pug', 'HTML', 'compiling'
                    //         )

                    //         block.content = htmlString
                    //         resolve(true)
                    //     }))
                    // }
                } else {
                    promises.push(new Promise((resolve, reject) => {
                        try {
                            logBeginOfATransformation(
                                _sourceContentDescriptionName, 'HTML', 'HTML', 'formatting'
                            )



                            let indentedContent = changeIndentation.html(blockOriginalContentString, { tabString: indentation })
                            indentedContent = simpleIndent(indentedContent, indentation)

                            block.content = indentedContent



                            logSuccessionOfATransformation(
                                _sourceContentDescriptionName, 'HTML', 'HTML', 'formatting'
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
                delete attrs.lang
                attrs['source-language-was'] = lang

                promises.push(new Promise((resolve, reject) => {
                    try {
                        logBeginOfATransformation(
                            _sourceContentDescriptionName, 'TypeScript', 'JavaScript', 'transpiling'
                        )



                        const {
                            outputText: javaScriptCodes,
                        } = typescript.transpileModule(
                            blockOriginalContentString,
                            tsconfig
                        )

                        block.content = changeIndentation.js(javaScriptCodes, { tabString: indentation })



                        logSuccessionOfATransformation(
                            _sourceContentDescriptionName, 'TypeScript', 'JavaScript', 'transpiling'
                        )

                        // logSingleBlockButWithItsContentStringSliced(block)

                        resolve(true)
                    } catch (e) {
                        reject(e)
                    }
                }))
            }



            if (type === 'style' && lang === 'stylus') {
                if (shouldNotCompileStylus) {
                    logSkippingOfATransformation(
                        _sourceContentDescriptionName, 'Stylus'
                    )
                } else {
                    delete attrs.lang
                    attrs['source-language-was'] = lang

                    promises.push(new Promise((resolve, reject) => {
                        try {
                            logBeginOfATransformation(
                                _sourceContentDescriptionName, 'Stylus', 'CSS', 'rendering'
                            )



                            stylus.render(blockOriginalContentString, cssStylusCompilationOptions, (error, cssString) => {
                                // console.log(debuggingPrefix, '\n    error:', error, '\n    cssString:', cssString)

                                if (error) {
                                    throw error
                                }



                                block.content = changeIndentation.css(cssString, { tabString: indentation })



                                logSuccessionOfATransformation(
                                    _sourceContentDescriptionName, 'Stylus', 'CSS', 'rendering'
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
                const isSASS = lang === 'sass'

                if (shouldNotCompileSass) {
                    if (isSASS) {
                        logSkippingOfATransformation(
                            _sourceContentDescriptionName, ' SASS '
                        )
                    } else {
                        logSkippingOfATransformation(
                            _sourceContentDescriptionName, ' SCSS '
                        )
                    }
                } else {
                    delete attrs.lang
                    attrs['source-language-was'] = lang

                    promises.push(new Promise((resolve, reject) => {
                        try {
                            if (isSASS) {
                                logBeginOfATransformation(
                                    _sourceContentDescriptionName, ' SASS ', 'CSS', 'rendering'
                                )
                            } else {
                                logBeginOfATransformation(
                                    _sourceContentDescriptionName, ' SCSS ', 'CSS', 'rendering'
                                )
                            }


                            const compilationResult = sass.compileString(
                                blockOriginalContentString,
                                {
                                    indentedSyntax: isSASS,
                                    ...cssSassCompilationOptions,
                                    sourceMap: false,
                                    data: blockOriginalContentString,
                                }
                            )

                            const cssString = compilationResult.css
                            block.content = changeIndentation.css(cssString, { tabString: indentation })



                            if (isSASS) {
                                logSuccessionOfATransformation(
                                    _sourceContentDescriptionName, ' SASS ', 'CSS', 'rendering'
                                )
                            } else {
                                logSuccessionOfATransformation(
                                    _sourceContentDescriptionName, ' SCSS ', 'CSS', 'rendering'
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
                if (shouldNotCompileLESS) {
                    logSkippingOfATransformation(
                        _sourceContentDescriptionName, ' LESS '
                    )
                } else {
                    delete attrs.lang
                    attrs['source-language-was'] = lang

                    promises.push(new Promise((resolve, reject) => {
                        try {
                            logBeginOfATransformation(
                                _sourceContentDescriptionName, ' LESS ', 'CSS', 'rendering'
                            )



                            less.render(blockOriginalContentString, cssLESSCompilationOptions, (error, output) => {
                                if (error) {
                                    throw error
                                }



                                const cssString = output.css
                                block.content = changeIndentation.css(cssString, { tabString: indentation })



                                logSuccessionOfATransformation(
                                    _sourceContentDescriptionName, ' LESS ', 'CSS', 'rendering'
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



            return promises
        }, [])



    return Promise.all(promisesOfAllCompilationTasks).then(() => {
        const newContentStringsArray = blocksSortedObeyingOriginalOrder.reduce((blockCodesArray, block) => {
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



        const fullContent = `${newContentStringsArray.join('\n'.repeat(6))}\n`



        return fullContent
    }).catch(error => {
        if (error) {
            console.log(errorLoggingPrefix, error)
        }

        return Promise.reject(error)
    })
}
