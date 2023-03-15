import { useEffect, useRef } from 'react';
import { basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';

type DocText = EditorState['doc'];

interface CodeEditorProps {
  className: string;
  value: string;
  onChange(value: string): void;
}

export default function CodeEditor({
  value,
  className,
  onChange,
}: CodeEditorProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorView>();
  const latestDocRef = useRef<{
    text?: string;
    doc?: DocText;
  }>({});

  // create editor
  useEffect(() => {
    const view = new EditorView({
      state: EditorState.create({
        doc: '',
        extensions: [basicSetup, javascript()],
      }),
      parent: elRef.current!,
    });
    editorRef.current = view;
  }, []);

  // watch prop.value change
  useEffect(() => {
    const editor = editorRef.current!;
    if (value !== latestDocRef.current.text) {
      const transaction = editor.state.update({
        changes: [
          {
            from: 0,
            to: editor.state.doc.length,
            insert: value,
          },
        ],
      });
      editor.dispatch(transaction);
      latestDocRef.current = {
        text: value,
        doc: transaction.state.doc,
      };
    }
  }, [value]);

  // watch editor change
  useEffect(() => {
    const editor = editorRef.current!;

    const timer = setInterval(() => {
      const currentDoc = editor.state.doc;
      if (currentDoc !== latestDocRef.current.doc) {
        const newValue = currentDoc.toString();
        latestDocRef.current = {
          text: newValue,
          doc: currentDoc,
        };
        onChange(newValue);
      }
    }, 500);

    return () => clearInterval(timer);
  });

  return <div ref={elRef} className={className}></div>;
}
