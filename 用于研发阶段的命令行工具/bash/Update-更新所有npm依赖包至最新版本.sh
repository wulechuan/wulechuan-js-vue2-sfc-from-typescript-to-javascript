#!/bin/sh

# ------------------------------------------------------
# ---------- 【产品依赖包】 ------------------------------
# ------------------------------------------------------

# 以下均为须采用特定版本的【产品依赖包】。
npm i \
    'chalk@4' # 不能更新至第 5 或更晚的版本。因为自第 5 版始， chalk 仅支持 ES Module 语法。



# 以下均为可采用 latest 版本的【产品依赖包】。顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
npm  i \
    '@wulechuan/get-valid-indentation-string@latest' \
    '@wulechuan/vue2-official-sfc-parser@latest' \
    'hash-sum@latest' \
    'indent@latest' \
    'indent.js@latest' \
    'less@latest' \
    'sass@latest' \
    'stylus@latest'





# ------------------------------------------------------
# ---------- 【研发依赖包】 ------------------------------
# ------------------------------------------------------

# 以下均为须采用特定版本的【研发依赖包】。
npm  i  -D \
    'vue@2'



# 以下均为可采用 latest 版本的【研发依赖包】。顺便提醒，虽然一般而言 latest 版本应恰为最高版本，但并不确保。
npm  i  -D \
    '@babel/core@latest' \
    '@babel/node@latest' \
    '@babel/preset-env@latest' \
    '@types/node@latest' \
    '@typescript-eslint/eslint-plugin@latest' \
    '@typescript-eslint/parser@latest' \
    '@vue/eslint-config-typescript@latest' \
    '@wulechuan/cli-scripts--git-push@latest' \
    '@wulechuan/css-stylus-markdown-themes@latest' \
    'eslint@latest' \
    'fs-extra@latest' \
    'rimraf@latest' \
    'typescript@latest' \
    'vue-property-decorator@latest'
