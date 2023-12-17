// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.less' {
  const resource: {[key: string]: string};
  export = resource;
}

declare module '*.module.less' {
  const classes: { [className: string]: string };
  export default classes;
}