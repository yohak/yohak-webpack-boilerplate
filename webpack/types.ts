import type { Options as BrowserSyncOptions } from "browser-sync";

export type ConfigProps = {
  /**
   * 複数のコンフィグを使用する際の識別子
   */
  id?: string;
  /**
   * 書き出し先のベースディレクトリ(絶対パス)
   */
  output: string;
  /**
   * 書き出し前のファイル削除設定。このオブジェクト自体が省略された場合は `output` 内が削除される
   */
  clean?: {
    /**
     * clean を実行する
     * @default true
     */
    run?: boolean;
    /**
     * clean対象のパス配列。(絶対パスベースのglob形式)
     */
    paths?: string[];
    /**
     * clean時の対象をログに表示させる
     * @default false
     */
    verbose?: boolean;
    /**
     * 実際の削除を行わずログ表示だけを行う
     * @default false
     */
    dry?: boolean;
  };
  /**
   * サーバー周りの設定
   */
  server: {
    /**
     * サーバーを起動する際のルートフォルダ(絶対パス)
     */
    root?: string;
    /**
     * サーバー起動時のポート番号
     * @default 9000
     */
    port?: number;
    /**
     * LiveReloadPluginを発火するかどうか。WordPressなど別のサーバーを起動しているときに便利。
     * @default false
     */
    liveReloadPlugin?: boolean;
    /**
     * 自動更新時の監視対象。(絶対パスベースのglob形式)
     */
    watch: string;
    /**
     * browserSyncのオプション。特殊なルーティングをする場合などに使う
     */
    browserSync?: BrowserSyncOptions;
  };
  pug?: PugConf;
  less?: CompileConf;
  sass?: CompileConf;
  ts?: CompileConf;
  /**
   * 書き出し後に対象フォルダの同期を行う()
   */
  copy?: {
    from: string;
    to: string;
  }[];
  /**
   * ビルド時に最小化を行う
   */
  optimization?: {
    /**
     * @default true
     */
    minifyJs?: boolean;
    /**
     * @default true
     */
    minifyCss?: boolean;
    /**
     * @default true
     */
    minifyImages?:
      | boolean
      | {
          /**
           * 小数点ベースで0-1 のTuple
           * @default [0.6, 0.8]
           */
          png?: [number, number];
          /**
           * 0-100
           * @default 80
           */
          jpg?: number;
        };
  };
};

export type CompileConf = {
  /**
   * ソースフォルダの絶対パス
   */
  src: string;
  /**
   * 書き出し先(destination)の絶対パス
   */
  dest: string;
  /**
   * "書き出しファイルパス":"ソースファイルパス" の配列 (src/destからの相対パス)
   */
  files: {
    [key: string]: string;
  };
};

export type PugConf = {
  /**
   * Pugで読み込むデータファイルのパス配列 (srcからの相対パス)
   */
  data?: string[];
} & CompileConf;
