export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 768px)').matches
}

export function shouldReduce3D(): boolean {
  if (typeof window === 'undefined') return true
  if (prefersReducedMotion()) return true
  if (isMobileViewport()) return true
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) return true
  if (nav.connection?.saveData) return true
  return false
}

export function canUseWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}
