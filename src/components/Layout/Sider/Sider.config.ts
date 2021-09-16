import { PAGES, PAGE_NAME, PAGE_PATH, SIDER_ICON } from 'constants/index';

export const siderConfig = [
  {
    label: PAGE_NAME[PAGES.HOMEPAGE],
    path: PAGE_PATH[PAGES.HOMEPAGE],
    Icon: SIDER_ICON[PAGES.HOMEPAGE],
  },
  {
    label: PAGE_NAME[PAGES.ARTICLE_LISTING],
    path: PAGE_PATH[PAGES.ARTICLE_LISTING],
    Icon: SIDER_ICON[PAGES.ARTICLE_LISTING],
  },
  {
    label: PAGE_NAME[PAGES.WRITER],
    path: PAGE_PATH[PAGES.WRITER],
    Icon: SIDER_ICON[PAGES.WRITER],
  },
  {
    label: PAGE_NAME[PAGES.USER],
    path: PAGE_PATH[PAGES.USER],
    Icon: SIDER_ICON[PAGES.USER],
  },
]
