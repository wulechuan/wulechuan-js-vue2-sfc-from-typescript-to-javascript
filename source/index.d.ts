declare module '@wulechuan/vue2-sfc-from-typescript-to-javascript' {
    import type { CompilerOptions as T_tsconfig } from 'typescript'
    import type { Options as T_PugCompilationOptions } from 'pug'
    import type { RenderOptions as T_CssStylusCompilationOptions } from 'stylus'
    import type { Options as T_CssSassCompilationOptions } from 'sass'
    import type Less from 'less'

    export type T_TransformationOptions = {
        sourceContentDescriptionName?: string;
        indentation?: string;

        shouldNotTranspileTypescript?: boolean;
        shouldNotCompilePug?: boolean;
        shouldNotCompileStylus?: boolean;
        shouldNotCompileSass?: boolean;
        shouldNotCompileLESS?: boolean;

        tsconfig?: T_tsconfig;
        pugCompilationOptions?: T_PugCompilationOptions;
        cssStylusCompilationOptions?: T_CssStylusCompilationOptions;
        cssSassCompilationOptions?: T_CssSassCompilationOptions<'sync'>;
        cssLESSCompilationOptions?: Less.Options;
    };

    export function transformContentStringOfSingleVueFile (
        originalVueFileContentString?: string,
        options?: T_TransformationOptions
    ): Promise<string>;
}
