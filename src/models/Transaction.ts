import { GenericExtrinsicEra } from '@polkadot/types'
import {
  Hash,
  Extrinsic,
  Address,
  EcdsaSignature,
  Ed25519Signature,
  Sr25519Signature,
} from '@polkadot/types/interfaces'
import { ICompact, INumber } from '@polkadot/types/types'

export default class Transaction {
  hash: Hash
  method: string
  section: string
  args: any
  era?: GenericExtrinsicEra
  nonce?: ICompact<INumber>
  signature?: EcdsaSignature | Ed25519Signature | Sr25519Signature
  signer?: Address
  tip?: ICompact<INumber>

  constructor(extrinsic: Extrinsic) {
    const { hash, era, nonce, signature, signer, tip } = extrinsic
    const { method, args, section } = extrinsic.method
    this.hash = hash
    this.method = method
    this.section = section
    this.era = era
    this.nonce = nonce
    this.signature = signature
    this.signer = signer
    this.tip = tip
    this.args = args
  }
}
