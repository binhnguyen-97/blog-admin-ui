import { PAGES } from "constants/enums"
import { HomeOutlined, UnorderedListOutlined, UserOutlined, BulbOutlined } from '@ant-design/icons'

export const SIDER_ICON = {
  [PAGES.HOMEPAGE]: HomeOutlined,
  [PAGES.ARTICLE_LISTING]: UnorderedListOutlined,
  [PAGES.USER]: UserOutlined,
  [PAGES.WRITER]: BulbOutlined,
}
