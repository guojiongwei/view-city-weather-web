import { Button, Form, Input } from 'antd'
import { useCallback, useState } from 'react'

import { getWeatherBuyCity } from './api'
import { IGetWeatherBuyCityParams, IWeatherData } from './api/types'
import { formRules } from './data'
import styles from './index.module.less'

const Home: React.FC = () => {
  // loading
  const [loading, setLoading] = useState<boolean>(false)

  const [weatherData, setWeatherData] = useState<IWeatherData>()

  /** 查询天气按钮提交 */
  const onFinish = useCallback(async (values: IGetWeatherBuyCityParams) => {
    setLoading(true)
    const res = await getWeatherBuyCity(values)
    setLoading(false)
    if (res.code === 200) {
      setWeatherData(res.data)
    }
  }, [])

  return (
    <div className={styles.home}>
      <div className={styles.form}>
        <h2 className={styles.title}>城市当前天气查询</h2>
        <Form onFinish={onFinish} size='large'>
          <Form.Item label='城市' name='city' rules={formRules.city}>
            <Input placeholder='请输入' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className={styles.submitBtn} loading={loading}>
              {!weatherData ? '查询' : '重新查询'}
            </Button>
          </Form.Item>
        </Form>

        {!!weatherData && (
          <div className={styles.result}>
            <div>当前天气：{weatherData?.weather?.[0]?.description || '未知'}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
