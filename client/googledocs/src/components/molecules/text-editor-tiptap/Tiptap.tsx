import { useContext, useEffect } from 'react';
import { EditorContent } from '@tiptap/react';
import ButtonBar from '../../atoms/button-bar-text-editor/button-bar';
import { EditorContext } from '../../../contexts/editor-context';

const Tiptap = () => {
  const { editor } = useContext(EditorContext);

  return (
    <div className='h-full w-full relative mx-8 pt-3 bg-gray-200 flex flex-col items-center'>
      <div className='relative w-full h-full flex flex-col align-middle content-center gap-4 pb-4'>
        <ButtonBar editor={editor} />
        <div onClick={() => editor?.commands.focus()} className='w-full relative bg-white h-full overflow-x-scroll'>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Tiptap;
