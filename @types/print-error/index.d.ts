declare module 'print-error' {
  export function html(error: any): any;
  export function htmlErrorStack(error: any): any;
  export const HTML_ERROR_STACK_STYLE: any;
  export function markdown(error: any): any;
  export function parse(stackTrace: string): any;
  export function terminal(error: any): any;
  export function text(error: any): string;
}
