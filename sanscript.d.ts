declare module 'sanscript' {
  export function t(text: string, from: string, to: string): string;
  export const defaults: Record<string, any>;
  export const schemes: Record<string, any>;
  export function isRomanScheme(scheme: string): boolean;
  export function addBrahmicScheme(...args: any[]): void;
  export function addRomanScheme(...args: any[]): void;
  const Sanscript: {
    t: typeof t;
    defaults: typeof defaults;
    schemes: typeof schemes;
    isRomanScheme: typeof isRomanScheme;
    addBrahmicScheme: typeof addBrahmicScheme;
    addRomanScheme: typeof addRomanScheme;
  };
  export default Sanscript;
}
