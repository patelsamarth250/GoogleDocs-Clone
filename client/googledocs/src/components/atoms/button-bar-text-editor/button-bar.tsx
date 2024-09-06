import { Editor } from "@tiptap/react"

interface ButtonBarProps {
    editor: Editor
}

type Level = 1 | 2 | 3 | 4 | 5 | 6;



const ButtonBar = ({ editor }: ButtonBarProps) => {
    return (
        <div className=" relative w-full bg-white p-4">
            <div className="  relative bg-slate-200 flex flex-row justify-center gap-5 items-center rounded-full py-3">
                <div className=" rounded-full">
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={
                            !editor?.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className={`relative w-full h-full
                             px-3 ${editor?.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black rounded-full hover:bg-gray-500 hover:text-white'
                            }`}
                    >
                        <strong>B</strong>
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        disabled={
                            !editor?.can()
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                        }
                        className={`rounded-full py-1 px-3 ${editor?.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                            }`}
                    >
                        <em className='text-xl'>i</em>
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                        disabled={
                            !editor?.can()
                                .chain()
                                .focus()
                                .toggleStrike()
                                .run()
                        }
                        className={`rounded-full p-2 ${editor?.isActive('strike') ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                            }`}
                    >
                        <s>S</s>
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().setParagraph().run()}
                        className={`rounded-full p-2 ${editor?.isActive('paragraph') ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                            }`}
                    >
                        p
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`rounded-full p-2 ${editor?.isActive('heading', { level: 1 }) ? 'bg-blue-500 p-1  text-white' : 'bg-gray-300 l text-black'}`}
                    >
                        H1
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        className={`rounded-full p-2 ${editor?.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                            }`}
                    >
                        ul
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        className={`rounded-full p-2 ${editor?.isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                            }`}
                    >
                        ol
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                        className={`rounded-full p-2 ${editor?.isActive('blockquote') ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                            }`}
                    >
                        BQ
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                        className='rounded-full p-2 bg-gray-300 text-black'
                    >
                        hr
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().setHardBreak().run()}
                        className='rounded-full p-2 bg-gray-300 text-black'
                    >
                        Hard break
                    </button>
                </div>
                <div>
                    <button
                        onClick={() => editor?.chain().focus().undo().run()}
                        disabled={
                            !editor?.can()
                                .chain()
                                .focus()
                                .undo()
                                .run()
                        }
                        className='rounded-full p-2 bg-gray-300 text-black'
                    >
                        Undo
                    </button>
                </div>
            </div>
        </div>
    )

}
export default ButtonBar;


