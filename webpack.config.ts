import { makeConfig } from "./bundler/webpack/makeConfig";
import { join } from "path";
//
// 本ファイル内のパスの記述は原則マシン内の絶対パス基準で統一する
// そのため `process.cwd()` を最初に定義しておくと便利
const CWD = process.cwd();
const DIR_SRC = join(CWD, "src");
const DIR_PUBLIC = join(CWD, "public");
const DIR_ASSETS = join(DIR_PUBLIC, "assets");
//
export default makeConfig({
  output: DIR_PUBLIC,
  server: {
    root: DIR_PUBLIC,
    watch: `${DIR_SRC}/**/*.*`,
  },
  pug: {
    src: join(DIR_SRC, "pug"),
    dest: join(DIR_PUBLIC),
    data: [],
    files: {
      "index.html": "top.pug",
      "sub.html": "sub.pug",
    },
  },
  sass: {
    src: join(DIR_SRC, "sass"),
    dest: join(DIR_ASSETS, "css"),
    files: {
      "main.css": "main.scss",
    },
  },
  ts: {
    src: join(DIR_SRC, "ts"),
    dest: join(DIR_ASSETS, "js"),
    files: {
      "main.js": "main.ts",
    },
  },
  copy: [
    {
      from: join(DIR_SRC, "assets/libs"),
      to: join(DIR_ASSETS, "libs"),
    },
    {
      from: join(DIR_SRC, "assets/img"),
      to: join(DIR_ASSETS, "images"),
    },
  ],
});
