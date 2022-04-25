import type { SFCDescriptor, SFCBlock } from '@wulechuan/vue2-official-sfc-parser/源代码/发布的源代码/types'



export declare const loggingPrefix: string
export declare const errorLoggingPrefix: string
export declare const debuggingPrefix: string





export type T_KnownVerbs = 'compiling' | 'transpiling' | 'rendering' | 'formatting';

export declare function 依次尽早采纳布尔值 (...参数序列: any[]): boolean
export declare function 依次尽早采纳对象值 (...参数序列: any[]): null | { [键: string]: 值; }

export declare function logSkippingOfATransformation (
    sourceDescriptionName?: string,
    theOriginalThing?: string
): void;

export declare function logBeginningOfATransformation (
    sourceDescriptionName?: string,
    fromSomething?: string,
    toSomething?: string,
    verb?: T_KnownVerbs
): void;

export declare function logSuccessionOfATransformation (
    sourceDescriptionName?: string,
    fromSomething?: string,
    toSomething?: string,
    verb?: T_KnownVerbs
): void;

export declare function logAllBlocksOfTheDescriptorButWithSliceEachContentSliced (
    theDescriptor?: SFCDescriptor,
    slicingLength?: number
): void;

export declare function logSingleBlockButWithItsContentStringSliced (
    theBlockToLog?: SFCBlock,
    slicingLength?: number
): void;
