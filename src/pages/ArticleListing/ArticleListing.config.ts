import { ColumnsType } from 'interfaces'

interface creatorProps {
  renderTitle: (text: string, record: any) => any,
  renderAuthor: (text: string, record: any) => any,
  renderDescription: (text: string, record: any) => any,
  renderLastEdit: (text: string, record: any) => any,
  renderActionGroup: (text: string, record: any) => any,
}

export const articleColumnsCreator = ({
  renderTitle,
  renderAuthor,
  renderDescription,
  renderLastEdit,
  renderActionGroup
}: creatorProps): ColumnsType => {
  return [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: renderTitle,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: renderDescription
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: renderAuthor
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
