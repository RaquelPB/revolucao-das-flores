/// <reference types="vite/client" />

declare module '*.PNG' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_GOOGLE_SHEETS_SCRIPT_URL?: string;
  readonly VITE_GOOGLE_SHEETS_DEPLOYMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

