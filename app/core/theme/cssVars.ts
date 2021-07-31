export function generateCSSColorChart(colorObject: Record<string, string>, colorName: string) {
  const cssVarNamePrefix = 'cg'
  const entries = Object.entries(colorObject)
  const transformed = entries.map((entry) => {
    const [key, value] = entry
    const cssVarName = `--${cssVarNamePrefix}-color-${colorName}-${key}`
    return [cssVarName, value, key] as [string, string, string]
  })

  const cssVariables = transformed.reduce((initial, [varName, value]) => {
    return `
      ${initial}
      ${varName}: ${value};
    `.trim()
  }, '')

  const colorVariables = transformed.reduce((initial, [varName, _, key]) => {
    return {
      ...initial,
      [colorName]: {
        ...initial[colorName],
        [key]: `var(${varName})`,
      },
    }
  }, {} as Record<string, Record<string, string>>)

  return {
    cssVariables,
    colorVariables,
  }
}
