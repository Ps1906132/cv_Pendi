export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0
}

export function validateUrl(url: string): boolean {
  try { new URL(url); return true } catch { return false }
}
