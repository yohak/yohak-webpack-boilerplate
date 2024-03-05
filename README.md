# YOHAK webpack boilerplate

## これは何？

**YOHAK 社内プロジェクトで使用するWebpack設定の基礎ファイル群**

### 採用技術

- PNPM
  - パッケージ管理
- Webpack
  - TypeScript/Pug/Sass/Lessのコンパイル
  - ローカルサーバーはBrowserSyncとWebpackDevServer(HMR対応)の両方を使用可能
  - アセットファイルの単純ファイルのコピー
  - ビルド時における画像/CSS/JSの圧縮
- フォーマッター (使用しているIDEに合わせてプラグインの設定を行うこと)
  - `ESLint` : `js,jsx,ts,tsx`
  - `Stylelint` : `scss`
  - `prettier` : `js,jsx,ts,tsx,json,yaml,pug,scss,css,less`
- テスト
  - jest
- **[Experimental]** webpへの画像変換及びソース書き換え
  - `bundler/webp/indx.mjs` 内に記述あり
    - 現状でwebpackのプロセスとは独立しているので、独自に対象フォルダ・ファイルのパスを書き換える必要がある
  - `pnpm webp` で実行

## CLI コマンド

`node.process.env` に変数を入れることで書き出し設定の切り替えを行っている

- `MODE`
  - `=development`: 開発モードとなりソースマップなどが有効化される。入っていない場合はプロダクションモードになり各種圧縮などが有効化される。
- `SERVER`
  - `=browserSync`: でbrowserSyncが同時に起動する
  - `=webpack`: でwebpackDevServerが起動する。この場合はwebpackの引数として `server` の追記が必要。
- `CONFIG`
  - "WordPress用にファイルをコピーしたい","クライアント納品用に別のビルド先を用意したい"などの要求を実現させるために、`webpack.config.ts` 内の `makeConfig()` には複数のビルド設定を渡すことができる。ビルド設定に付与したidと同じidを `CONFIG` に与えることで該当のビルドを実行する。(idが見つからない場合はエラーとなる)
- `LOG`
  - `=webpack`: makeConfigで作成したwebpackのコンフィグをログ上に表示する。デバッグ時やゼロからコンフィグを作るときに。

## TODO

**プロジェクトを開始するにあたり以下を行うこと**

- webpack.config.ts に設定を記述
  - 記述ルールはTypeScriptの型定義を参照
- package.jsonの中身を変更
  - `scripts` の中身を必要に応じて変更
  - このboilerplate自体はMITだが商用プロジェクトの場合はライセンスを消しておいたほうが無難
    - `"author": "YOHAK LLC"`
    - `"license": "UNLICENSED"`
    - `"private": true`
- ビルド先に合わせて必要であれば `.gitignore` の内容を変更
- `README_template.md` の中身を変更
  - プロジェクト名やlintの設定などを適宜変更する
- この`README.md`を削除して`README_template.md`を`README.md`にリネーム。
