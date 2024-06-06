import { Base as DetokenizerBase } from "./Base"
import { Rsa as DetokenizerRsa } from "./Rsa"

export namespace Detokenizer {
	export type Base = DetokenizerBase
	export const Base = DetokenizerBase
	export type Rsa = DetokenizerRsa
	export const Rsa = DetokenizerRsa
}
