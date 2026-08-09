// Ambient declaration for plain (non-module) stylesheet side-effect imports,
// e.g. `import "./globals.css"`. Next.js only ships types for `*.module.css`.
declare module "*.css";
declare module "*.scss";
declare module "*.sass";
