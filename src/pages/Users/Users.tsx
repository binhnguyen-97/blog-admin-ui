import { useEffect } from 'react';
import { Table, Image } from 'antd';
import { Link } from "react-router-dom";

import useLoadData from "hooks/useLoadData";

import ActionGroup from 'components/ActionGroup';

import { IUserInfo, IUserList } from 'interfaces'
import { fetchAllUser } from 'services/api/user';

import { userColumnsCreator } from './Users.config'
import { PAGE_PATH, PAGES } from "constants/index";

const UsersPage = () => {
  const { loading, data: userList, fetchFail, fetchSuccess, fetchStart } = useLoadData<IUserList>({
    initialState: [],
  })

  useEffect(() => {
    const asyncFetch = async () => {
      try {
        fetchStart()
        const result = await fetchAllUser();
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
  const renderLastEdit = (text: string) => <span>{new Date(text).toLocaleDateString("vi")}</span>
  const renderActionGroup = () => <ActionGroup />

  const columns = userColumnsCreator({
    renderAvatar,
    renderName,
    renderLastEdit,
    renderActionGroup
  })

  return (
    <div>
      <Table
        loading={loading}
        columns={columns as any}
        dataSource={userList}
      />
    </div>
  )
}

export default UsersPage
