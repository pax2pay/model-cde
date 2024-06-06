import { isoly } from "isoly"
import { isly } from "isly"
import { Expires as CardExpires } from "./Expires"
import { Masked as CardMasked } from "./Masked"
import { Part as CardPart } from "./Part"
import { Token as CardToken } from "./Token"

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
			lapses: isly.fromIs<isoly.Date>("isoly.Date", isoly.Date.is).optional(),
		},
		"pax2pay.cde.Card"
	)
	export const is = type.is
	export const flaw = type.flaw
	export import Token = CardToken
	export import Expires = CardExpires
	export import Masked = CardMasked
	export import Part = CardPart
}
