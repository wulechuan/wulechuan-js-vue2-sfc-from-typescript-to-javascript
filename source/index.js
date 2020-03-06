import { vueSFCParser } from '@wulechuan/vue2-official-sfc-parser'

// import pug from 'pug' // TODO
import typescript from 'typescript'
import stylus from 'stylus'
import sass from 'sass'
import less from 'less'

import hashSum from 'hash-sum'

import {
    logTransformation,
} from './helpers'





export async function transformContentStringOfSingleVueFile(originalVueFileContentString, options) {
    options = options || {}

    const {
        sourceContentDescriptionName,
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

    let _sourceContentDescriptionName = sourceContentDescriptionName
    if (!_sourceContentDescriptionName) {
        _sourceContentDescriptionName = `<Untitled source ${
            hashSum(originalVueFileContentString)
            // Math.random().toFixed(8).slice(2)
        }>`
    }

    const sfcDescriptor = vueSFCParser(originalVueFileContentString)

    const {
        template,
        script,
        styles,
        customBlocks,
    } = sfcDescriptor

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



            // TODO
            // if (type === 'template' && lang === 'pug' && !shouldNotCompilePug) {
            //     delete attrs.lang
            //     attrs['source-language-was'] = lang

            //     promises.push(new Promise((resolve, reject) => {
            //         const realCompiler = pug.compile(
            //             blockOriginalContentString,
            //             pugCompilationOptions
            //         )

            //         const htmlString = realCompiler()
            //         block.content = htmlString
            //         resolve(true)
            //     }))
            // }



            if (type === 'script' && lang === 'ts') {
                delete attrs.lang
                attrs['source-language-was'] = lang

                logTransformation(
                    _sourceContentDescriptionName, 'TypeScript', 'JavaScript', 'transpiling'
                )
                const {
                    outputText: javaScriptCodes,
                } = typescript.transpileModule(
                    blockOriginalContentString,
                    tsconfig
                )
                block.content = javaScriptCodes
            }



            if (type === 'style' && lang === 'stylus' && !shouldNotCompileStylus) {
                delete attrs.lang
                attrs['source-language-was'] = lang

                promises.push(new Promise((resolve, reject) => {
                    logTransformation(
                        _sourceContentDescriptionName, 'Stylus', 'CSS', 'rendering'
                    )

                    stylus.render(blockOriginalContentString, cssStylusCompilationOptions, (err, cssString) => {
                        if (err) {
                            reject(err)
                        } else {
                            block.content = cssString
                            resolve(true)
                        }
                    })
                }))
            }



            if (type === 'style' && (lang === 'sass' || lang === 'scss') && !shouldNotCompileSass) {
                delete attrs.lang
                attrs['source-language-was'] = lang

                promises.push(new Promise((resolve, reject) => {
                    const isSASS = lang === 'sass'
                    if (isSASS) {
                        logTransformation(
                            _sourceContentDescriptionName, ' SASS ', 'CSS', 'rendering'
                        )
                    } else {
                        logTransformation(
                            _sourceContentDescriptionName, ' SCSS ', 'CSS', 'rendering'
                        )
                    }

                    sass.render({
                        indentedSyntax: isSASS,
                        ...cssSassCompilationOptions,
                        sourceMap: false,
                        data: blockOriginalContentString,
                    }, (err, result) => {
                        if (err) {
                            reject(err)
                        } else {
                            const cssString = result.css.toString()
                            block.content = cssString
                            resolve(true)
                        }
                    })
                }))
            }



            if (type === 'style' && lang === 'less' && !shouldNotCompileLESS) {
                delete attrs.lang
                attrs['source-language-was'] = lang

                promises.push(new Promise((resolve, reject) => {
                    logTransformation(
                        _sourceContentDescriptionName, ' LESS ', 'CSS', 'rendering'
                    )

                    less.render(blockOriginalContentString, cssLESSCompilationOptions, (err, output) => {
                        if (err) {
                            reject(err)
                        } else {
                            const cssString = output.css
                            block.content = cssString
                            resolve(true)
                        }
                    })
                }))
            }



            return promises
        }, [])



    await Promise.all(promisesOfAllCompilationTasks)



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

    return `${newContentStringsArray.join('\n'.repeat(6))}\n`
}
