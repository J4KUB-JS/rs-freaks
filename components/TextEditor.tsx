import { useEffect, useState } from "react";
import { convertToRaw } from "draft-js";
import { EditorState, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor), {
  ssr: false,
});

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface TextEditorProps {
  onChange: (value: any) => void;
  placeholder?: string;
  value?: string;
}

export const TextEditor = ({ value = "", placeholder, onChange }: TextEditorProps) => {
  const [content, setContent] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const handleEditorChange = (newState: EditorState) => {
    setEditorState(newState);
    setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
  };

  const onSave = () => {
    onChange(content);
  };

  useEffect(() => {
    const contentBlock = htmlToDraft(value);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const editorState = EditorState.createWithContent(contentState);

    setEditorState(editorState);
  }, [value]);

  return (
    <div>
      <div className="flex gap-3 items-center relative">
        <Editor
          placeholder={placeholder}
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="bg-white border border-gray-200 rounded-md overflow-hidden"
          editorClassName="bg-white px-4 pb-6"
          toolbarClassName=""
          toolbar={{
            options: [
              "inline",
              "list",
              "textAlign",
              "colorPicker",
              "history",
              "blockType",
            ],
          }}
        />
        <div
          onClick={onSave}
          className="absolute right-0 bottom-0 btn btn-sm bg-gray-900 text-gray-50"
        >
          Save
        </div>
        <div className="absolute left-4 bottom-1 text-gray-500 text-sm">
          Save before send
        </div>
      </div>
    </div>
  );
};
