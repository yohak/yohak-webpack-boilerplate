# PROJECT NAME

## Install

```bash
pnpm install
```

## Huskey のセットアップ

```bash
# git が初期化されていなければ実行
git init 
# 以下はpnpm install 後に実行
pnpm exec husky init
echo "pnpm dlx lint-staged --verbose" > .husky/pre-commit
```

## Scripts

```bash
pnpm webpack
```

`public` にファイルを書き出す

```bash
pnpm serve
```

上記 `webpack` に加えてbrowserSyncサーバーを起動する  
確認用URLは以下  
http://localhost:9000/

```bash
pnpm build
```

上記 `webpack` と同等かつ圧縮・難読化を行う。  
圧縮設定は `webpack.config.ts` から変更可能。

## Git branches

### `#main`

### `#develop`

### `#staging`

## Lint / Code format

本プロジェクトでは ESLint, StyleLint 及び prettier を採用している。以下の拡張子に対して保存時に自動で適用されるようにエディターの設定を行うこと。

- `ESLint` : `js,jsx,ts,tsx`
- `StyleLint` : `scss`
- `prettier` : `js,jsx,ts,tsx,json,yaml,pug,scss,css,less`
