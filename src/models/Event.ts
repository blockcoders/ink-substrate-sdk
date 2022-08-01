import { Abi } from '@polkadot/api-contract'
import { Vec } from '@polkadot/types-codec'
import { EventId, H256, EventMetadataLatest } from '@polkadot/types/interfaces'
import { Event as SubstrateEvent } from '@polkadot/types/interfaces'
import { FrameSystemPhase } from '../interfaces'

export default class Event {
  contract: string
  index: EventId
  section: string
  method: string
  phase: FrameSystemPhase
  topics: Vec<H256>
  meta: EventMetadataLatest
  typeDef: any
  data: any

  constructor(event: SubstrateEvent, phase: FrameSystemPhase, topics: Vec<H256>) {
    const { section, method, typeDef, meta, data, index } = event
    const [account_id] = data
    this.contract = account_id.toString()
    this.index = index
    this.section = section
    this.method = method
    this.phase = phase
    this.topics = topics
    this.meta = meta
    this.typeDef = typeDef
    this.data = data
  }

  decode(abi: string | Record<string, unknown>) {
    const [_, contract_evt] = this.data
    return new Abi(abi).decodeEvent(contract_evt)
  }
}
