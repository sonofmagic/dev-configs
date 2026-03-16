declare module 'tailwindcss-v3/resolveConfig.js' {
  const resolveConfig: (config: object) => object
  export default resolveConfig
}

declare module 'tailwindcss-v3/stubs/config.full.js' {
  const config: object
  export default config
}

declare module 'tailwindcss-v3/lib/lib/generateRules.js' {
  const generateRulesModule: {
    generateRules: (candidates: Set<string>, context: object) => unknown[]
  }
  export default generateRulesModule
}

declare module 'tailwindcss-v3/lib/lib/setupContextUtils.js' {
  const setupContextUtils: {
    createContext: (config: object) => object
  }
  export default setupContextUtils
}
