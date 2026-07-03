export async function uploadFile(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch("/api/upload", { method: "POST", body: formData })
  const json = await res.json()

  if (!json.success) throw new Error(json.message)
  return json.data.url
}
