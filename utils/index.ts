export function classToString(classAttr: string | string[] | Record<string, boolean> | unknown) {
  if (Array.isArray(classAttr))
    return classAttr.join(' ')

  if (typeof classAttr === 'object' && classAttr !== null)
    return Object.entries(classAttr)
      .filter(([_, value]) => value) // Filter out falsy values
      .map(([key]) => key)
      .join(' ')

  return classAttr ? String(classAttr) : ''
}
