import { useEffect } from 'react';
import { Table, Image } from 'antd';
import { Link } from "react-router-dom";

import useLoadData from "hooks/useLoadData";
import { IUserInfo, IWriterList } from 'interfaces'
import { fetchAllWriter } from 'services/api/writer';

import ActionGroup from 'components/ActionGroup';

import { userColumnsCreator } from './Writers.config'
import { PAGE_PATH, PAGES } from "constants/index";

const WriterPage = () => {
  const { loading, data: writerList, fetchFail, fetchSuccess, fetchStart } = useLoadData<IWriterList>({
    initialState: [],
  })

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        fetchStart()
        const result = await fetchAllWriter();
        fetchSuccess(result.data)
      } catch (error) {
        fetchFail()
      }
    }
    asyncFetch()
  }, [fetchFail, fetchStart, fetchSuccess])

  const renderName = (title: string, record: IUserInfo) => (
    <Link to={PAGE_PATH[PAGES.ARTICLE_DETAIL] + record.id}>
      {title}
    </Link>
  )
  const renderAvatar = (text: any) => <Image src={text} alt="ava" width="50px" height="50px" />
  const renderActionGroup = () => <ActionGroup />

  const columns = userColumnsCreator({
    renderAvatar,
    renderName,
    renderActionGroup
  })

  return (
    <div>
      <Table
        loading={loading}
        columns={columns as any}
        dataSource={writerList}
      />
    </div>
  )
}

export default WriterPage
