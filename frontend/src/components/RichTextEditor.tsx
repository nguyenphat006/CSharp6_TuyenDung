"use client"

import { useMemo } from "react"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const QuillNoSSR = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Đang tải trình soạn thảo...</p>,
})

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["clean"],
  ],
}

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  "bullet",
  "align",
]

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhập mô tả công việc...",
}: RichTextEditorProps) {
  const memoizedModules = useMemo(() => modules, [])

  return (
    <div className="rich-text-editor">
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 200px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          background: white;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background: #f9fafb;
        }
        .rich-text-editor .ql-editor {
          min-height: 200px;
          font-size: 1rem;
          line-height: 1.5;
        }
        .rich-text-editor .ql-editor p {
          margin-bottom: 0.5rem;
        }
        .rich-text-editor .ql-snow.ql-toolbar button:hover,
        .rich-text-editor .ql-snow .ql-toolbar button:hover {
          color: #2563eb;
        }
        .rich-text-editor .ql-snow.ql-toolbar button.ql-active,
        .rich-text-editor .ql-snow .ql-toolbar button.ql-active {
          color: #2563eb;
        }
      `}</style>
      <QuillNoSSR
        theme="snow"
        value={value}
        onChange={onChange}
        modules={memoizedModules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  )
} 