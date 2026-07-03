export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString("id-ID", { year: "numeric", month: "long" })
}

export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + "..." : text
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}
