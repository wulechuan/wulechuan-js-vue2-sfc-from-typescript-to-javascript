declare module '@wulechuan/vue2-sfc-from-typescript-to-javascript' {
    import type { CompilerOptions as T_tsconfig } from 'typescript'
    import type { Options         as T_PugCompilationOptions } from 'pug'
    import type { RenderOptions   as T_CssStylusCompilationOptions } from 'stylus'
    import type { Options         as T_CssSassCompilationOptions } from 'sass'
    import type Less from 'less'

    export type T_TransformationOptions = {
        用于命令行消息中的对原内容的扼要描述?: string;
        sourceContentDescriptionName?: string;

        用于产生的Vue文件中各代码块的单级缩进空白?: string | number | null;
        indentation?: string | number | null;

        不应编译TypeScript?: boolean;
        shouldNotTranspileTypescript?: boolean;

        不应编译Pug?: boolean;
        shouldNotCompilePug?: boolean;

        不应编译Stylus?: boolean;
        shouldNotCompileStylus?: boolean;

        不应编译Sass?: boolean;
        shouldNotCompileSass?: boolean;

        不应编译LESS?: boolean;
        shouldNotCompileLESS?: boolean;

        产生的内容中不应包含模板?: boolean;
        shouldNotOutputTemplateTag?: boolean;

        产生的内容中不应包含任何Style标签?: boolean;
        shouldNotOutputAnyStyleTags?: boolean;

        tsconfig?: T_tsconfig;
        TypeScript语言的编译配置项集?: T_tsconfig;

        pug语言的编译配置项集?: T_PugCompilationOptions;
        pugCompilationOptions?: T_PugCompilationOptions;

        cssStylus语言的编译配置项集?: T_CssStylusCompilationOptions;
        cssStylusCompilationOptions?: T_CssStylusCompilationOptions;

        cssSass语言的编译配置项集?: T_CssSassCompilationOptions<'sync'>;
        cssSassCompilationOptions?: T_CssSassCompilationOptions<'sync'>;

        cssLESS语言的编译配置项集?: Less.Options;
        cssLESSCompilationOptions?: Less.Options;
    };

    export function 处理一个Vue2的单文件部件的内容 (
        原始Vue文件之内容全文?: string,
        配置项总集?: T_TransformationOptions
    ): Promise<string>;

    export function transformContentStringOfSingleVueFile (
        originalVueFileContentString?: string,
        options?: T_TransformationOptions
    ): Promise<string>;
}
