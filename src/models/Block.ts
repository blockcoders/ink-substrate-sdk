import { Header, Extrinsic, Hash } from '@polkadot/types/interfaces'
import Transaction from './Transaction'

export default class Block {
  hash: Hash
  header: Header
  transactions: Transaction[] = []

  constructor(hash: Hash, header: Header, extrinsics: Extrinsic[]) {
    this.hash = hash
    this.header = header
    extrinsics.forEach((ex: Extrinsic) => {
      const tx = new Transaction(ex)
      this.transactions.push(tx)
    })
  }
}
