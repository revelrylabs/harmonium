declare module 'tinycolor2' {
  interface TinyColor {
    getAlpha(): number;
    toHexString(): string;
    toRgbString(): string;
  }
  
  function tinycolor(color: string): TinyColor;
  export = tinycolor;
} 