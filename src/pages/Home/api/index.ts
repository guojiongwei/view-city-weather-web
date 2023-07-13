import { IGetWeatherBuyCityParams, IWeatherData } from './types'

import request from '@/utils/request'

/** 根据城市名称获取天气信息 */
export const getWeatherBuyCity = (params: IGetWeatherBuyCityParams) => {
  return request.get<IWeatherData>(`/getWeatherBuyCity`, params)
}
