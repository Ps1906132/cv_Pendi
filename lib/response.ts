import { NextResponse } from "next/server"

export function success(data: unknown, message = "Data berhasil diproses", status = 200) {
  return NextResponse.json({ success: true, message, data }, { status })
}

export function error(message: string, status = 500) {
  return NextResponse.json({ success: false, message }, { status })
}
