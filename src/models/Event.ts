import { Vec } from '@polkadot/types-codec'
import { EventId, H256, EventMetadataLatest } from '@polkadot/types/interfaces'
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
  label: string

  constructor(
    contract: string,
    index: EventId,
    section: string,
    method: string,
    phase: FrameSystemPhase,
    topics: Vec<H256>,
    meta: EventMetadataLatest,
    typeDef: any,
    data: any,
    label: string,
  ) {
    this.contract = contract
    this.index = index
    this.section = section
    this.method = method
    this.phase = phase
    this.topics = topics
    this.meta = meta
    this.typeDef = typeDef
    this.data = data
    this.label = label
  }
}
