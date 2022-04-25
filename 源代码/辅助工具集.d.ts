import type { SFCDescriptor, SFCBlock } from '@wulechuan/vue2-official-sfc-parser/源代码/发布的源代码/types'



export declare const 正常消息之统一前缀文本: string
export declare const 出错消息之统一前缀文本: string
export declare const 调试信息之统一前缀文本: string





export type T_KnownVerbs = 'compiling' | 'transpiling' | 'rendering' | 'formatting';

export declare function 依次尽早采纳布尔值 (...参数序列: any[]): boolean
export declare function 依次尽早采纳对象值 (...参数序列: any[]): null | { [键: string]: 值; }

export declare function 在命令行环境中报告某内容块被丢弃 (
    用于命令行消息中的对原内容的扼要描述?: string,
    原始内容之称谓?: string
): void;

export declare function 在命令行环境中报告某内容块原封未动 (
    用于命令行消息中的对原内容的扼要描述?: string,
    原始内容之称谓?: string
): void;

export declare function 在命令行环境中报告某任务已启动 (
    用于命令行消息中的对原内容的扼要描述?: string,
    源内容之称谓?: string,
    动作之称谓?: T_KnownVerbs,
    产出内容之称谓?: string
): void;

export declare function 在命令行环境中报告某任务已成功 (
    用于命令行消息中的对原内容的扼要描述?: string,
    源内容之称谓?: string,
    动作之称谓?: T_KnownVerbs,
    产出内容之称谓?: string
): void;

export declare function 在命令行环境中打印原文件拆分得到的整个结构化数据_但截短其中各内容块之内容 (
    整个结构化数据?: SFCDescriptor,
    各内容块之内容文本长度上限?: number
): void;

export declare function 在命令行环境中打印某内容块之详情_但截短其内容之原文 (
    某内容块之结构化数据?: SFCBlock,
    各内容块之内容文本长度上限?: number
): void;
