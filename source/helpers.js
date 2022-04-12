import chalk from 'chalk'




/** @typedef {'compiling' | 'transpiling' | 'rendering' | 'formatting'} T_KnownVerbs */





export const loggingPrefix = `${chalk.whiteBright('@wulechuan/vue2-official-sfc-parser')}:`
export const errorLoggingPrefix = `\n${chalk.red('Error')}:\n${loggingPrefix}`
export const debuggingPrefix = `\n${loggingPrefix}\n${chalk.bgYellow.black('DEBUG')}:`





/**
 * @param {string} sourceDescriptionName
 * @returns {string}
 */
function _getColorfulSourceDescription (sourceDescriptionName) {
    const sourceDescriptionNameHasProvided = !!sourceDescriptionName
        && !(/^<Untitled source [\d\w]+>$/.test(sourceDescriptionName))

    const sourceDescription = sourceDescriptionNameHasProvided
        ? chalk.bgBlue.whiteBright(` ${sourceDescriptionName} `)
        : chalk.bgHex('#741').hex('#ccc')(sourceDescriptionName || '<Untitled source -1>')

    return `${loggingPrefix}\n    ${sourceDescription}`
}

/**
 * @param {string} sourceDescriptionName
 * @param {string} fromSomething
 * @param {string} fromSomething
 * @param {T_KnownVerbs} verb
 * @param {string} suffix
 * @returns {string}
 */
function _logTransformationEvent (sourceDescriptionName, fromSomething, fromSomething, verb, suffix) {
    console.log(`\n${
        _getColorfulSourceDescription(sourceDescriptionName)
    }: ${
        verb || 'compiling'
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
    _logTransformationEvent(sourceDescriptionName, fromSomething, toSomething, verb, `...${chalk.greenBright('SUCCEEDED')}`)
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
