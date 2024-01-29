import { Base as TokenizerBase } from "./Base"
import { Rsa as TokenizerRsa } from "./Rsa"

export namespace Tokenizer {
	export type Base = TokenizerBase
	export const Base = TokenizerBase
	export type Rsa = TokenizerRsa
	export const Rsa = TokenizerRsa
}
