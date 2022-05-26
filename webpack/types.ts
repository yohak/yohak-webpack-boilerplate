export type ConfigProps = {
  output: string;
  server: {
    root: string;
    port?: number;
    watch: string;
  };
  pug?: PugConf;
  less?: CompileConf;
  sass?: CompileConf;
  ts?: CompileConf;
  copy?: {
    from: string;
    to: string;
  }[];
};
export type CompileConf = {
  src: string;
  dest: string;
  files: {
    [key: string]: string;
  };
};

export type PugConf = {
  data?: string[];
} & CompileConf;
