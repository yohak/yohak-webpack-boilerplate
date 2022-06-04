import { CompileConf, ConfigProps, PugConf } from "./types";
import { join, relative } from "path";
import type {
  Configuration,
  WebpackPluginInstance,
  ModuleOptions,
  EntryObject,
  RuleSetRule,
} from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
const ansis = require("ansis");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const PugPlugin = require("pug-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");
const WebpackBar = require("webpackbar");
type Output = Configuration["output"];
type Entry = Configuration["entry"];
type Optimization = Configuration["optimization"];

const IS_DEVELOP = process.env.MODE === "development";
const IS_BROWSER_SYNC = process.env.SERVER === "browserSync";
const IS_DEV_SERVER = process.env.SERVER === "webpack";
const IS_SERVE = IS_DEV_SERVER || IS_BROWSER_SYNC;
const mode = IS_DEVELOP ? "development" : "production";
console.log(ansis.blue("making webpack config"));
console.log(ansis.blue("mode:"), ansis.bgMagenta(mode));
if (IS_SERVE) {
  console.log(ansis.blue("server:"), ansis.bgMagenta(process.env.SERVER));
}
//
export const makeConfig = (primary: ConfigProps, ...rest: ConfigProps[]): Configuration => {
  if (rest.length === 0) {
    return makeSingleConfig(primary);
  } else {
    const allProps: ConfigProps[] = [primary, ...rest];
    allProps.forEach((props: ConfigProps) => {
      if (!props.id) throw new Error("multiple configs require id at each ");
    });
    //
    const configID = process.env.CONFIG;
    if (!configID) {
      console.log(ansis.red(`no config id found at process, so building`), ansis.bgRed(primary.id));
      return makeSingleConfig(primary);
    }
    //
    console.log(ansis.blue("config:"), ansis.bgMagenta(configID));
    const targetProps: ConfigProps | undefined = allProps.find((config) => config.id === configID);
    if (!targetProps) throw new Error(`not found config: ${configID}`);
    return makeSingleConfig(targetProps);
  }
};
//
const makeSingleConfig = (props: ConfigProps): Configuration => {
  return {
    watch: IS_BROWSER_SYNC,
    context: process.cwd(),
    mode,
    devtool: IS_DEVELOP ? "inline-source-map" : false,
    entry: makeEntry(props),
    plugins: makePlugins(props),
    module: makeModule(props),
    devServer: IS_DEV_SERVER ? makeDevServer(props) : undefined,
    output: makeOutput(props.output),
    optimization: makeOptimization(),
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },
    stats: {
      cachedAssets: false,
      cachedModules: false,
      runtimeModules: false,
      dependentModules: false,
      assetsSpace: 9999,
      modulesSpace: 0,
    },
  };
};

const makeDevServer = ({ server }: ConfigProps): DevServerConfiguration => {
  const { port, root, watch } = server;
  return {
    port: port ?? 9000,
    open: false,
    static: {
      directory: root,
    },
    watchFiles: {
      paths: [watch],
      options: {
        usePolling: true,
      },
    },
  };
};

const makeEntry = ({ pug, less, sass, ts, output }: ConfigProps): Entry => {
  let result: Entry = {};
  if (pug) result = { ...result, ...makeEntryFromConf(pug, output) };
  if (less) result = { ...result, ...makeEntryFromConf(less, output) };
  if (sass) result = { ...result, ...makeEntryFromConf(sass, output) };
  if (ts) result = { ...result, ...makeEntryFromConf(ts, output) };

  return result;
};

const makeEntryFromConf = ({ files, dest, src }: CompileConf, output: string): EntryObject => {
  const result: Entry = {};
  const relativeSrc = relative(process.cwd(), src);
  const relativeDest = relative(output, dest);
  Object.entries(files).forEach(([key, value]) => {
    const filename = join(relativeDest, key);
    const importStr = `./${join(relativeSrc, value)}`;
    result[filename] = {
      filename,
      import: importStr,
    };
  });
  return result;
};

const makeOutput = (path: string): Output => {
  if (path === process.cwd()) {
    throw new Error("DO NOT SET output path as cwd");
  }
  return {
    path,
    publicPath: "/",
  };
};

const makePlugins = ({ copy, server, clean }: ConfigProps): WebpackPluginInstance[] => {
  const { root, port } = server;
  //
  const browserSync = IS_BROWSER_SYNC
    ? new BrowserSyncPlugin({
        host: "localhost",
        port: port ?? 9000,
        server: { baseDir: [root] },
        open: false,
        middleware: server?.browserSync?.middleware ?? [],
      })
    : undefined;
  //
  const liveReload = !!server.liveReloadPlugin
    ? new LiveReloadPlugin({ delay: 100, compareHash: false })
    : undefined;

  //
  return [
    browserSync,
    liveReload,
    new CleanWebpackPlugin({
      verbose: clean?.verbose === undefined ? false : clean.verbose,
      dry: clean?.dry === undefined ? false : clean.dry,
      cleanOnceBeforeBuildPatterns: clean?.paths,
    }),
    new PugPlugin({
      pretty: true,
      modules: [PugPlugin.extractCss({ test: /\.(css|less|sass|scss)$/ })],
    }),
    new CopyPlugin({
      patterns: copy,
    }),
    new WebpackBar(),
  ].filter((item) => !!item);
};

const loadPugData = ({ data, src }: PugConf): any => {
  if (!data) return {};
  //
  let result = {};
  data.forEach((str) => {
    const path = join(src, str);
    const data = require(path);
    result = { ...result, ...data };
  });
  return result;
};

const makeModule = ({ pug, less, sass, ts }: ConfigProps): ModuleOptions => {
  const rules: ModuleOptions["rules"] = [];
  pug ? rules.push(makePugLoadRule(pug)) : "";
  less ? rules.push(makeLessLoadRule()) : "";
  sass ? rules.push(makeSassLoadRule()) : "";
  ts ? rules.push(makeTsLoadRule()) : "";
  return { rules };
};

const makeTsLoadRule = (): RuleSetRule => {
  return {
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: "ts-loader",
      },
    ],
  };
};

const makePugLoadRule = (pug: PugConf): RuleSetRule => {
  return {
    test: /\.pug$/,
    use: [
      {
        loader: PugPlugin.loader,
        options: {
          method: "render",
          data: {
            hash: "",
            ...loadPugData(pug),
          },
        },
      },
    ],
  };
};

const makeSassLoadRule = (): RuleSetRule => {
  return {
    test: /\.(sass|scss)$/,
    use: [
      {
        loader: "css-loader",
        options: {
          url: false,
        },
      },
      {
        loader: "sass-loader",
      },
    ],
  };
};

const makeLessLoadRule = (): RuleSetRule => {
  return {
    test: /\.(less)$/,
    use: [
      {
        loader: "css-loader",
        options: {
          url: false,
        },
      },
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            relativeUrls: false,
          },
        },
      },
    ],
  };
};

const makeOptimization = (): Optimization => {
  return {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
        },
      }),
    ],
  };
};
