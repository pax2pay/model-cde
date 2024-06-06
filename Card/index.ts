import { isoly } from "isoly"
import { isly } from "isly"
import { Detokenizer as CardDetokenizer } from "./Detokenizer"
import { Expires as CardExpires } from "./Expires"
import { Masked as CardMasked } from "./Masked"
import { Part as CardPart } from "./Part"
import { Token as CardToken } from "./Token"
import { Tokenizer as CardTokenizer } from "./Tokenizer"

export interface Card {
	pan: string
	expires: CardExpires
	csc: string
	lapses?: isoly.Date
}
export namespace Card {
	export const type = isly.object<Card>(
		{
			pan: isly.string(),
			expires: CardExpires.type,
			csc: isly.string(/\d{3}/),
			lapses: isly.fromIs<isoly.Date>("isoly.Date", isoly.Date.is),
		},
		"pax2pay.cde.Card"
	)
	export const is = type.is
	export const flaw = type.flaw
	export type Token = CardToken
	export const Token = CardToken
	export namespace Token {
		export type Unpacked = CardToken.Unpacked
	}
	export type Expires = CardExpires
	export const Expires = CardExpires
	export namespace Expires {
		export type Month = CardExpires.Month
		export type Year = CardExpires.Year
	}
	export type Masked = CardMasked
	export const Masked = CardMasked
	export type Part = CardPart
	export const Part = CardPart
	export namespace Tokenizer {
		export type Base = CardTokenizer.Base
		export const Base = CardTokenizer.Base
		export type Rsa = CardTokenizer.Rsa
		export const Rsa = CardTokenizer.Rsa
	}
	export namespace Detokenizer {
		export type Base = CardDetokenizer.Base
		export const Base = CardDetokenizer.Base
		export type Rsa = CardDetokenizer.Rsa
		export const Rsa = CardDetokenizer.Rsa
	}
}
