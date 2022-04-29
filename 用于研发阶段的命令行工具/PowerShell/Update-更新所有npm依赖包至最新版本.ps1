#

# ------------------------------------------------------
# ---------- 【产品依赖包】 ------------------------------
# ------------------------------------------------------

# 以下均为须采用特定版本的【产品依赖包】。
Write-Host
Write-Host
Write-Host
Write-Host  -NoNewline  -F 'DarkRed'                '===== npm i    '
Write-Host  -NoNewline  -F 'White'    -B 'DarkRed'  '特定版本'
Write-Host              -F 'DarkRed'                '的【产品依赖包】 ============================'
Write-Host
npm i `
    'chalk@4' # 不能更新至第 5 或更晚的版本。因为自第 5 版始， chalk 仅支持 ES Module 语法。



# 以下均为可采用 latest 版本的【产品依赖包】。顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
Write-Host
Write-Host
Write-Host
Write-Host  -NoNewline  -F 'DarkRed'                '===== npm i    '
Write-Host  -NoNewline  -F 'DarkRed'                '最末版本'
Write-Host              -F 'DarkRed'                '的【产品依赖包】 ============================'
Write-Host
npm  i `
    '@wulechuan/get-valid-indentation-string@latest' `
    '@wulechuan/vue2-official-sfc-parser@latest' `
    'hash-sum@latest' `
    'indent@latest' `
    'indent.js@latest' `
    'less@latest' `
    'sass@latest' `
    'stylus@latest'





# ------------------------------------------------------
# ---------- 【研发依赖包】 ------------------------------
# ------------------------------------------------------

# 以下均为须采用特定版本的【研发依赖包】。
Write-Host
Write-Host
Write-Host
Write-Host  -NoNewline  -F 'DarkGreen'              '===== npm i -D '
Write-Host  -NoNewline  -F 'Black'      -B 'Green'  '特定版本'
Write-Host              -F 'DarkGreen'              '的【研发依赖包】 ============================'
Write-Host
npm  i  -D `
    'vue@2'



# 以下均为可采用 latest 版本的【研发依赖包】。顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
Write-Host
Write-Host
Write-Host
Write-Host  -NoNewline  -F 'DarkGreen'              '===== npm i -D '
Write-Host  -NoNewline  -F 'DarkGreen'              '最末版本'
Write-Host              -F 'DarkGreen'              '的【研发依赖包】 ============================'
Write-Host
npm  i  -D `
    '@babel/core@latest' `
    '@babel/node@latest' `
    '@babel/preset-env@latest' `
    '@types/node@latest' `
    '@typescript-eslint/eslint-plugin@latest' `
    '@typescript-eslint/parser@latest' `
    '@vue/eslint-config-typescript@latest' `
    '@wulechuan/cli-scripts--git-push@latest' `
    '@wulechuan/css-stylus-markdown-themes@latest' `
    'eslint@latest' `
    'fs-extra@latest' `
    'rimraf@latest' `
    'typescript@latest' `
    'vue-property-decorator@latest'
