import '@polkadot/api-augment'
import { ApiPromise } from '@polkadot/api'
import { Abi } from '@polkadot/api-contract'
import erc20 from './metadata/erc20'
import Block from './models/Block'
import Event from './models/Event'

export const subscribeAllHeads = async (provider: ApiPromise, cb?: (b: Block) => Promise<void> | void) => {
  await provider.rpc.chain.subscribeAllHeads(async (h: any) => {
    const { block } = await provider.rpc.chain.getBlock(h.hash)
    const { hash, header, extrinsics } = block
    const b = new Block(hash, header, extrinsics)
    if (!cb) {
      console.log('\n-----------------New block-----------------\n')
      console.log('BLOCK HASH: %j', b.hash)
      console.log('TX COUNT: %j', b.transactions.length)
      b.transactions.forEach((tx) => console.log('\n\t TX: %j', tx))
      console.log('\n-------------------------------------------\n')
    } else {
      await cb(b)
    }
  })
}

export const subscribeToNewEvents = async (provider: ApiPromise, cb?: (e: Event) => Promise<void> | void) => {
  await provider.query.system.events((events) => {
    events.forEach(async (record) => {
      const { event, phase, topics } = record
      const { section, method, typeDef, meta, data, index } = event
      if (provider.events.contracts.ContractEmitted.is(event)) {
        const [account_id, contract_evt] = data as any
        const decoded = new Abi(erc20).decodeEvent(contract_evt)
        const label = decoded?.event.identifier
        const d: any = {}
        for (let i = 0; i < decoded?.event?.args.length; i++) {
          const a = decoded.event.args[i].name
          d[a] = decoded.args[i]
        }
        const e = new Event(account_id.toString(), index, section, method, phase, topics, meta, typeDef, decoded, label)
        if (!cb) {
          console.log('\n-----------------New Event-----------------\n')
          console.log('\nEvent: %j', label)
          console.log('\nData: %j', d)
          console.log('\nContract: %j', account_id)
          console.log('\nIndex: %j', index)
          console.log('\nSection: %j', section)
          console.log('\nMethod: %j', method)
          console.log('\nPhase: %j', phase)
          console.log('\nTopics: %j', topics)
          console.log('\nMeta: %j', meta)
          console.log('\nTypeDef: %j', typeDef)
          console.log('\nDecoded: %j', decoded)
          console.log('\n-------------------------------------------\n')
        } else {
          await cb(e)
        }
      }
    })
  })
}
