namespace Helpers {
    export const loggingPrefix: string
    export const errorLoggingPrefix: string
    export const debuggingPrefix: string




    export type T_KnownVerbs = 'compiling' | 'transpiling' | 'rendering' | 'formatting';

    export function logSkippingOfATransformation (
        sourceDescriptionName?: string,
        theOriginalThing?: string
    ): void;

    export function logBeginningOfATransformation (
        sourceDescriptionName?: string,
        fromSomething?: string,
        toSomething?: string,
        verb?: T_KnownVerbs
    ): void;

    export function logSuccessionOfATransformation (
        sourceDescriptionName?: string,
        fromSomething?: string,
        toSomething?: string,
        verb?: T_KnownVerbs
    ): void;

    export function logAllBlocksOfTheDescriptorButWithSliceEachContentSliced (
        theDescriptor?: T_SFCParserResultingDescriptor,
        slicingLength?: number
    ): void;

    export function logSingleBlockButWithItsContentStringSliced (
        theBlockToLog?: object,
        slicingLength?: number
    ): void;
}

export = Helpers
