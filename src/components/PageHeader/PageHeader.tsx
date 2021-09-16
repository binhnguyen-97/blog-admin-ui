import { ReactElement, ReactNode } from 'react';
import { useHistory, Link } from "react-router-dom";
import { PageHeader as AntPageHeader, Breadcrumb } from 'antd';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { IBreadcrumb } from 'interfaces'

import './PageHeader.scss'

interface IPageHeaderProps {
  children?: ReactNode,
  title: ReactNode,
  subTitle?: string,
  ghost?: boolean,
  extra?: ReactElement
  breadcrumb?: IBreadcrumb,
  className?: string,
  customOnBack?: () => void
}

const PageHeader = ({
  children,
  title,
  subTitle,
  ghost = false,
  extra,
  breadcrumb,
  customOnBack,
  className
}: IPageHeaderProps): ReactElement => {

  const history = useHistory();

  const onBack = () => {
    if (typeof customOnBack === 'function') {
      return customOnBack();
    }

    if (breadcrumb && breadcrumb?.routes?.length > 2) {
      const [destination] = breadcrumb?.routes.slice(-2);

      return history.push(destination.path);
    }

    return history.goBack();
  };

  const breadcrumbItemRender = (route: any, _: any, routes: any, paths: any): ReactElement => {
    if (isEmpty(routes)) return <span />;
    const last = routes.indexOf(route) === routes.length - 1;

    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={paths.pop() || '/'}>{route.breadcrumbName}</Link>
    );
  };

  return (
    <AntPageHeader
      ghost={ghost}
      title={title}
      subTitle={subTitle}
      onBack={onBack}
      extra={extra}
      breadcrumb={
        <Breadcrumb
          routes={breadcrumb?.routes}
          itemRender={breadcrumbItemRender}
        />
      }
      className={cx(className, 'c-page-header')}
    >
      {children}
    </AntPageHeader>
  );
};

export default PageHeader;
