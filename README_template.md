# PROJECT NAME

## Install
```bash
yarn install
```

## Scripts
```bash
yarn webpack
```
`public` にファイルを書き出す


```bash
yarn serve
```
上記 `webpack` に加えてbrowserSyncサーバーを起動する  
確認用URLは以下  
http://localhost:9000/


```bash
yarn build
```
上記 `webpack` と同等かつ


## Git branches
### `#main`
### `#develop`
### `#staging`

## Lint / Code format
本プロジェクトでは ESLint, StyleLint 及び prettier を採用している。以下の拡張子に対して保存時に自動で適用されるようにエディターの設定を行うこと。
* `ESLint` : `js,jsx,ts,tsx`
* `StyleLint` : `scss`
* `prettier` : `js,jsx,ts,tsx,json,yaml,pug,scss,css,less`
