/// <reference types="vite/client" />

// generic image imports
declare module '*.png'  { const src: string; export default src }
declare module '*.jpg'  { const src: string; export default src }
declare module '*.jpeg' { const src: string; export default src }
declare module '*.svg'  { const src: string; export default src }

// vite-imagetools or ?as=src query variants
declare module '*?as=src' { const src: string; export default src }

// plain CSS side-effect imports (index.css)
declare module '*.css'