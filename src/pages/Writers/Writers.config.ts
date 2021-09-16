import { ColumnsType } from 'interfaces'

interface creatorProps {
  renderName: (text: string, record: any) => any,
  renderAvatar: (text: string, record: any) => any,
  renderActionGroup: (text: string, record: any) => any,
}

export const userColumnsCreator = ({
  renderName,
  renderAvatar,
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
      title: 'Action',
      key: 'action',
      render: renderActionGroup
    }
  ]
}
