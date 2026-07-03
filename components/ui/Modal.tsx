"use client"

import { useEffect } from "react"

type Props = { open: boolean; onClose: () => void; children: React.ReactNode; title?: string }

export default function Modal({ open, onClose, children, title }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border border-gray-800 bg-[#0B0B0B] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {title && <h3 className="text-lg font-bold text-white mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  )
}
