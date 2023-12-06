import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css' // import styles
import './editor.css'

const Editor = ({ onContentChange, value }: any) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    [],
  )
  const handleEditorChange = (content: any) => {
    onContentChange(content)
  }

  return (
    <ReactQuill
      value={value} // You can set an initial value here
      onChange={handleEditorChange}
      modules={Editor.modules}
      formats={Editor.formats}
      bounds={'.app'}
      placeholder="Write something..."
      className="dark:text-white"
    />
  )
}

Editor.modules = {
  toolbar: [
    [{ header: '1' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    [{ color: [] }, { background: [] }],
    ['code-block', 'divider'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
}

Editor.formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
  'video',
  'color',
  'background',
  'code-block',
  'divider',
]

export default Editor
