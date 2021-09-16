import { MouseEventHandler } from 'react'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Space } from 'antd'

interface ActionGroupProps {
  nonEditable?: boolean,
  nonDeleteAble?: boolean,
  handleEdit?: MouseEventHandler,
  handleDelete?: MouseEventHandler,
}

const ActionGroup = ({
  nonEditable = false,
  nonDeleteAble = false,
  handleEdit = () => null,
  handleDelete = () => null,
}: ActionGroupProps) => {
  return (
    <Space size="large" align="center">
      {!nonEditable && (
        <Button title="Edit" icon={<EditTwoTone />} type="text" onClick={handleEdit} />
      )}
      {!nonDeleteAble && (
        <Button title="Delete" icon={<DeleteTwoTone twoToneColor="red" />} type="text" onClick={handleDelete} />
      )}
    </Space>
  )
}

export default ActionGroup
