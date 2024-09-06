import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { FONTS } from "../components/atoms/font-select";
import { DocumentContext } from "./document-context";
import { ToastContext } from "./toast-context";
import useAuth from "../hooks/use-auth";
import SocketEvent from "../types/enums/socket-events-enum";
import DocumentInterface from "../types/interfaces/document";
import { io } from "socket.io-client";
import { BASE_URL } from "../services/api";
import useTipTapEditor from "../hooks/useTipTapEditor";
import { TextSelection } from "@tiptap/pm/state";

interface EditorContextInterface {
  editor: Editor | null;
  setEditor: Dispatch<SetStateAction<Editor | null>>;
  socket: null | MutableRefObject<any>;
  documentRendered: boolean;
  setDocumentRendered: Dispatch<SetStateAction<boolean>>;
  handleEditorChange: (editor: Editor) => void;
  focusEditor: () => void;
  currentFont: string;
  setCurrentFont: Dispatch<SetStateAction<string>>;
}

export default EditorContextInterface;

const defaultValues = {
  editor: null,
  socket: null,
  documentRendered: false,
  setDocumentRendered: () => {},
  handleEditorChange: () => {},
  focusEditor: () => {},
  setEditor: () => {},
  currentFont: FONTS[0],
  setCurrentFont: () => {},
};

export const EditorContext = createContext<EditorContextInterface>(defaultValues);

interface EditorProviderInterface {
  children: ReactNode;
}

const DEFAULT_SAVE_TIME = 1500;
let saveInterval: null | NodeJS.Timer = null;

export const EditorProvider = ({ children }: EditorProviderInterface) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const socket = useRef<any>(defaultValues.socket);
  const [documentRendered, setDocumentRendered] = useState(defaultValues.documentRendered);
  const [currentFont, setCurrentFont] = useState(defaultValues.currentFont);

  const { document, setCurrentUsers, setSaving, setDocument, saveDocument } = useContext(DocumentContext);
  const { error } = useContext(ToastContext);
  const { accessToken } = useAuth();

  const focusEditor = () => {
    if (editor) {
      editor.commands.focus();
    }
  };

  const handleEditorChange = (editor: Editor) => {
    if (!socket.current) return;

    const html = editor.getHTML();

    socket.current.emit(SocketEvent.SEND_CHANGES, html);

    const updatedDocument = {
      ...document,
      content: html,
    } as DocumentInterface;

    setDocument(updatedDocument);

    if (!document || html === document.content) return;

    setSaving(true);

    if (saveInterval) {
      clearInterval(saveInterval as unknown as number);
    }
    
    saveInterval = setInterval(async () => {
      await saveDocument(updatedDocument);
      if (saveInterval) clearInterval(saveInterval as unknown as number);
    }, DEFAULT_SAVE_TIME);
  };

  // Initialize TipTap Editor
  const editorInstance = useTipTapEditor(document?.content || "", handleEditorChange);

  useEffect(() => {
    if (document?.content && editor) {
      const { from, to } = editor.state.selection;
      
      // sets the content and whitespaces are considered
      editor.commands.setContent(document.content, false, {
        preserveWhitespace: "full",
      });
      
      const newFrom = Math.min(from, editor.state.doc.content.size);
      const newTo = Math.min(to, editor.state.doc.content.size);
      const textSelection = new TextSelection(
        editor.state.doc.resolve(newFrom),
        editor.state.doc.resolve(newTo)
      );
      editor.view.dispatch(editor.state.tr.setSelection(textSelection));
    }
  }, [document?.content, editor]);

  useEffect(() => {
    setEditor(editorInstance);
  }, [editorInstance]);

  useEffect(() => {
    if (!document || !accessToken || !socket || (socket.current && socket.current.connected)) return;

    socket.current = io(BASE_URL, {
      query: { documentId: document.id, accessToken },
    }).connect();
  }, [document, socket, accessToken]);

  useEffect(() => {
    return () => {
      socket?.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket.current) return;

    const handler = (htmlContent: string) => {
      if (editor && htmlContent !== editor.getHTML()) {
        editor.commands.setContent(htmlContent);
      }
    };

    socket.current.on(SocketEvent.RECEIVE_CHANGES, handler);

    return () => {
      socket.current.off(SocketEvent.RECEIVE_CHANGES, handler);
    };
  }, [socket.current, editor]);

  useEffect(() => {
    if (!socket.current) return;

    const handler = (currentUsers: Array<string>) => {
      setCurrentUsers(new Set<string>(currentUsers));
    };

    socket.current.on(SocketEvent.CURRENT_USERS_UPDATE, handler);

    return () => {
      socket.current.off(SocketEvent.CURRENT_USERS_UPDATE, handler);
    };
  }, [socket.current]);

  return (
    <EditorContext.Provider
      value={{
        editor,
        setEditor,
        socket,
        documentRendered,
        setDocumentRendered,
        currentFont,
        setCurrentFont,
        focusEditor,
        handleEditorChange,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
