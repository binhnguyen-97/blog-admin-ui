import { ColumnsType } from 'interfaces'

interface creatorProps {
  renderName: (text: string, record: any) => any,
  renderAvatar: (text: string, record: any) => any,
  renderLastEdit: (text: string, record: any) => any,
  renderActionGroup: (text: string, record: any) => any,
}

export const userColumnsCreator = ({
  renderName,
  renderAvatar,
  renderLastEdit,
  renderActionGroup
}: creatorProps): ColumnsType => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: renderName,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: renderAvatar
    },
    {
      title: 'Last Edit',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: renderLastEdit
    },
    {
      title: 'Action',
      key: 'action',
      render: renderActionGroup
    }
  ]
}
