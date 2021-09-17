import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

import './LoadingSpin.scss'

const LoadingSpin = () => {
  return (
    <div className="ce-loading-spin" >
      <Spin size="large" indicator={<LoadingOutlined />} />
    </div>
  )
}

export default LoadingSpin
