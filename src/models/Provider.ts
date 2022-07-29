import { ApiPromise, WsProvider } from '@polkadot/api'

export default class Provider {
  url: string
  api: ApiPromise | undefined
  constructor(url: string) {
    this.url = url
  }

  async connect() {
    const wsProvider = new WsProvider(this.url)
    this.api = await ApiPromise.create({ provider: wsProvider })
    return this.api
  }
}
