import chalk from 'chalk'





/** @typedef {'编译成' | 'compiling' | 'transpiling' | 'rendering' | 'formatting' | '代码格式标准化'} T_KnownVerbs */





export const loggingPrefix = `${chalk.whiteBright('@wulechuan/vue2-official-sfc-parser')}:`
export const errorLoggingPrefix = `\n${chalk.red('Error')}:\n${loggingPrefix}`
export const debuggingPrefix = `\n${loggingPrefix}\n${chalk.bgYellow.black('DEBUG')}:`





/**
 *
 * @returns {boolean}
 */
export function 依次尽早采纳布尔值 (...全部的值) {
    for (let 参数之编号 = 0; 参数之编号 < 全部的值.length; 参数之编号++) {
        const 参数值 = 全部的值[参数之编号]
        if (typeof 参数值 === 'boolean') {
            return 参数值
        }
    }
    return false
}





/**
 *
 * @returns {object | null}
 */
export function 依次尽早采纳对象值 (...全部的值) {
    for (let 参数之编号 = 0; 参数之编号 < 全部的值.length; 参数之编号++) {
        const 参数值 = 全部的值[参数之编号]
        if (typeof 参数值 === 'object' && !!参数值) {
            return 参数值
        }
    }
    return null
}





/**
 * @param {string} sourceDescriptionName
 * @returns {string}
 */
function _getColorfulSourceDescription (sourceDescriptionName) {
    const sourceDescriptionNameHasProvided = !(/^< 未给出描述的 .vue （散列编号： [\d\w]+）>$/.test(sourceDescriptionName))

    const sourceDescription = sourceDescriptionNameHasProvided
        ? chalk.bgBlue.whiteBright(` ${sourceDescriptionName} `)
        : chalk.bgHex('#741').hex('#ccc')(` ${sourceDescriptionName} `)

    return `${loggingPrefix}\n    ${sourceDescription}`
}

/**
 * @param {string} sourceDescriptionName
 * @param {string} fromSomething
 * @param {string} toSomething
 * @param {T_KnownVerbs} verb
 * @param {string} suffix
 * @returns {string}
 */
function _logTransformationEvent (sourceDescriptionName, fromSomething, toSomething, verb, suffix) {
    console.log(`\n${
        _getColorfulSourceDescription(sourceDescriptionName)
    }: ${
        verb || '编译成'
    } ${
        chalk.green(fromSomething)
    } into ${
        chalk.yellow(toSomething)
    }${
        suffix
    }`)
}





export function logSkippingOfATransformation (sourceDescriptionName, theOriginalThing) {
    console.log(`\n${
        _getColorfulSourceDescription(sourceDescriptionName)
    }: ${
        chalk.bgYellow.black(` ${theOriginalThing} `)
    } ${
        chalk.yellow('outputs as is.')
    }`)
}





export function logBeginningOfATransformation (sourceDescriptionName, fromSomething, toSomething, verb) {
    _logTransformationEvent(sourceDescriptionName, fromSomething, toSomething, verb, '...')
}





export function logSuccessionOfATransformation (sourceDescriptionName, fromSomething, toSomething, verb) {
    _logTransformationEvent(sourceDescriptionName, fromSomething, toSomething, verb, `...${chalk.greenBright('成功')}`)
}





export function logAllBlocksOfTheDescriptorButWithSliceEachContentSliced (theDescriptor, slicingLength) {
    if (!theDescriptor || typeof theDescriptor !== 'object') {
        console.log(`${debuggingPrefix}`, 'the descriptor:', theDescriptor)
        return
    }

    const copyOfDesctiptorForLogging = {}
    Object.keys(theDescriptor).forEach(key => {
        const propertyValue = theDescriptor[key]
        try {
            copyOfDesctiptorForLogging[key] = _getLoggingCopyOfSingleBlockButWithItsContentStringSliced(propertyValue, slicingLength)
        } catch (e) {
            console.log(`${errorLoggingPrefix}\n`, e)
        }
    })

    console.log(`${debuggingPrefix}`, 'the descriptor:', copyOfDesctiptorForLogging)
}





export function logSingleBlockButWithItsContentStringSliced (theBlockToLog, slicingLength) {
    console.log(`${debuggingPrefix}`, 'the block:', _getLoggingCopyOfSingleBlockButWithItsContentStringSliced(theBlockToLog, slicingLength))
}





/**
 * @param {number} slicedCharsCount
 * @returns {string}
 */
function _getStringOfHintOfContentDidSliced(slicedCharsCount) {
    const coreString = `\n... and ${slicedCharsCount} chars odmitted.`
    // return chalk.yellow(coreString) // node 命令行环境中打印复杂的对象中的文本值时，无法支持自定义彩色。在对象、数组中均失败。
    return coreString
}

function _getLoggingCopyOfSingleBlockButWithItsContentStringSliced (theThingToLog, slicingLength) {
    if (!theThingToLog || typeof theThingToLog !== 'object') { return theThingToLog }

    if (Array.isArray(theThingToLog)) {
        return theThingToLog.map(theThingToLog2 => _getLoggingCopyOfSingleBlockButWithItsContentStringSliced(theThingToLog2, slicingLength))
    }

    const blockObject = theThingToLog



    if (typeof blockObject.content !== 'string') { return { ...blockObject } }



    let usedSlicingLength
    if (typeof slicingLength === 'number') {
        usedSlicingLength = slicingLength
    } else if (typeof slicingLength === 'string' && slicingLength.trim()) {
        usedSlicingLength = +slicingLength.trim()
    }

    if (!(usedSlicingLength > 128)) {
        usedSlicingLength = 128
    }

    const objectLoggingCopy = { ...blockObject }

    const fullContent = objectLoggingCopy.content
    if (typeof fullContent === 'string') {
        delete objectLoggingCopy.content

        let slicedContent = fullContent.slice(0, usedSlicingLength)
        const slicedCharsCount = fullContent.length - usedSlicingLength
        if (slicedCharsCount > 0) {
            // slicedContent = [
            //     slicedContent,
            //     _getStringOfHintOfContentDidSliced(slicedCharsCount),
            // ]
            slicedContent = `${slicedContent}${_getStringOfHintOfContentDidSliced(slicedCharsCount)}`
        }

        objectLoggingCopy.slicedContent = slicedContent
    }



    return objectLoggingCopy
}
