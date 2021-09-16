import { useRef, useEffect, useState } from 'react';
import { Form, Input, message, Select } from 'antd';
import cx from 'classnames';

import TextEditor from 'components/TextEditor';

import { IWriterList } from 'interfaces';

import { fetchAllWriter } from 'services/api/writer'
import { createArticle } from 'services/api/article'

import './ArticleForm.scss'
import { Button } from 'antd';

interface ArticleFormProps {
  className?: string
}

const DEFAULT_EDITOR_VALUE = "<p></p>";

const ArticleForm = ({
  className
}: ArticleFormProps) => {
  const [form] = Form.useForm();
  const [writerList, setWriterList] = useState<IWriterList>([])

  const editorValueRef = useRef<string | null>(null)

  useEffect(() => {
    const asyncLoadWriter = async () => {
      try {
        const result = await fetchAllWriter();
        setWriterList(result.data)
      } catch (error) {
        setWriterList([])
      }
    }

    asyncLoadWriter()
  }, [])

  const onContentUpdate = (value: string | undefined) => {
    editorValueRef.current = value as string | null
  }

  const onSubmit = async (values: any) => {
    if (!editorValueRef.current || editorValueRef?.current === DEFAULT_EDITOR_VALUE || editorValueRef?.current.length <= 10) {
      return message.error("Content can not be empty")
    }

    const articlePayload = {
      title: values.title,
      author: typeof values.writer === 'object' ? values.writer?.id : values.writer,
      content: editorValueRef.current as string,
      shortDescription: values.shortDesc
    }

    try {
      await createArticle(articlePayload);

      message.success("Create article success")
    } catch (error: any) {
      message.error("Fail to create article with error: " + error.toString())
    }
  }

  const getWriterProps = (value: any) => {
    return {
      value: typeof value === 'string' ? value : value?.id
    }
  }

  const getContentValueProps = (Value: string) => {
    return {
      initHtml: Value
    }
  }

  const componentClassName = cx("ce-article-form", className)

  return (
    <Form
      form={form}
      layout="vertical"
      className={componentClassName}
      onFinish={onSubmit}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Article Title can not be empty" }]}>
        <Input placeholder="Article Title" />
      </Form.Item>
      <Form.Item
        name="shortDesc"
        label="Short Description"
        rules={[{ required: true, message: "Short Description can not be empty" }]}>
        <Input placeholder="Short Description" />
      </Form.Item>
      <Form.Item
        name="writer"
        label="Writer"
        getValueProps={getWriterProps}
        rules={[{ required: true, message: "Please select writer" }]}>
        <Select >
          {writerList?.map(writer => <Select.Option value={writer.id} key={writer.id}>{writer.name}</Select.Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        name="content"
        label="Content"
        getValueProps={getContentValueProps}
        required
      >
        <TextEditor
          onUpdate={onContentUpdate}
          className="ce-article-form__editor"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">Save</Button>
    </Form>
  )
}

export default ArticleForm
