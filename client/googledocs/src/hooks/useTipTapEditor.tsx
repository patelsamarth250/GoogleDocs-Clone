import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import History from '@tiptap/extension-history';
import Underline from '@tiptap/extension-underline';

const useTipTapEditor = (initialContent: string, handleEditorChange: (editor: Editor) => void) => {
  return useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: initialContent,
    parseOptions: {
      preserveWhitespace: "full",
    },
    onUpdate: ({ editor }) => {
      const updatedContent = editor.getHTML();
      // console.log('Updated Content:', updatedContent);
      
      handleEditorChange(editor as Editor);
    },
  });
};

export default useTipTapEditor;
