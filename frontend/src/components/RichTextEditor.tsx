'use client'

import { Editor } from "@tinymce/tinymce-react"
import { useRef } from "react"
import { Editor as TinyMCEEditor } from 'tinymce'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhập mô tả công việc...",
}: RichTextEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null)

  return (
    <Editor
      apiKey="your-api-key" // Bạn cần đăng ký và thay thế bằng API key của bạn từ TinyMCE
      onInit={(_evt: any, editor: TinyMCEEditor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={onChange}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
          "searchreplace", "visualblocks", "code", "fullscreen",
          "insertdatetime", "media", "table", "code", "help", "wordcount"
        ],
        toolbar: [
          "undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor",
          "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
          "removeformat | help"
        ],
        content_style: `
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: 14px;
            line-height: 1.5;
          }
        `,
        placeholder: placeholder,
        language: "vi",
        language_url: "/tinymce/langs/vi.js", // Đường dẫn đến file ngôn ngữ tiếng Việt
        formats: {
          bold: { inline: "strong" },
          italic: { inline: "em" },
          underline: { inline: "u" },
          strikethrough: { inline: "strike" }
        },
        // Các tùy chọn màu sắc cho văn bản
        color_map: [
          "000000", "Đen",
          "808080", "Xám",
          "FF0000", "Đỏ",
          "008000", "Xanh lá",
          "0000FF", "Xanh dương",
          "FFD700", "Vàng",
          "FFA500", "Cam",
          "800080", "Tím"
        ]
      }}
    />
  )
} 