import chalk from 'chalk'

export function logTransformation(sourceDescriptionName, fromSomething, toSomething, verb) {
    const sourceDescriptionNameHasProvided = !!sourceDescriptionName
        && !(/^<Untitled source [\d\w]+>$/.test(sourceDescriptionName))
    const sourceDescription = sourceDescriptionNameHasProvided
        ? chalk.bgHex('#319').hex('#ddd')(sourceDescriptionName)
        : chalk.bgHex('#205').hex('#ccc')(sourceDescriptionName || '<Untitled source -1>')

    console.log(`${
        sourceDescription
    }: ${
        verb || 'compiling'
    } ${
        chalk.green(fromSomething)
    } into ${
        chalk.yellow(toSomething)
    }\n`)
}
