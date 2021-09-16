import { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import imageCompression from 'browser-image-compression';
import cx from 'classnames';

import { uploadImage } from 'services/api/image'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './TextEditor.scss'

interface TextEditorProps {
  onUpdate?: (value?: string) => void,
  initHtml?: string,
  className?: string
}

const TextEditor = ({
  initHtml,
  className,
  onUpdate
}: TextEditorProps) => {


  const getInitialValue = () => {
    if (initHtml) {
      const contentBlock = htmlToDraft(initHtml);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        return EditorState.createWithContent(contentState);
      }
    }
    return EditorState.createEmpty()
  }

  const [editorState, setEditorState] = useState(getInitialValue);

  const handleUpdateValue = () => {
    if (typeof onUpdate === 'function') {
      const currentContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      onUpdate(currentContent)
    }
  }

  const uploadImageCallBack = async (imageFile: File) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);

      const result = await uploadImage(compressedFile);

      return {
        data: {
          link: result.data.display_url,
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const componentClassName = cx("ce-text-editor", className)

  return (
    <div className={componentClassName}>
      <Editor
        editorState={editorState}
        wrapperClassName="ce-text-editor__wrapper"
        editorClassName="ce-text-editor__textarea"
        onEditorStateChange={setEditorState}
        onContentStateChange={handleUpdateValue}
        toolbar={{
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
        }}
      />
    </div>
  )
}

export default TextEditor
