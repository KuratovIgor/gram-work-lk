// @ts-ignore
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { AxiosResponseType } from '@/types/axios.type'
// @ts-ignore
import Cookie from 'js-cookie'

export class AxiosService {
  private axiosInstance!: AxiosInstance

  constructor(config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(config)

    this.axiosInstance.interceptors.request.use((config) => {
      config.xsrfCookieName = 'XSRF-TOKEN'

      config.xsrfHeaderName = 'X-XSRF-TOKEN'

      const token = Cookie.get()

      config.headers = {
        Authorization: `Bearer ${token.access_token}`,
      }


      return config
    })

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        const response = error?.response?.data

        switch (error?.response?.status) {
          case 401:
            break
          case 404:
            break
          case 422:
            break

          default:
            break
        }

        return Promise.reject(response.errors ? response.errors : response)
      }
    )
  }

  protected async axiosCall<T = any>(
    config: AxiosRequestConfig
  ): AxiosResponseType<T> {
    try {
      const { data } = await this.axiosInstance.request<T>(config)

      return [null, data]
    } catch (e: any) {
      return [e]
    }
  }
}
