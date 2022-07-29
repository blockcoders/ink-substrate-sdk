import Provider from '../models/Provider'
import { subscribeAllHeads, subscribeToNewEvents } from '../utils'

const main = async () => {
  const provider = new Provider('ws://127.0.0.1:9944')
  const api = await provider.connect()
  await subscribeAllHeads(api)
  await subscribeToNewEvents(api)
}

main()
