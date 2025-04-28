import * as isoly from "isoly"
import { isly } from "isly"
import { eightDigitBins } from "../eightDigitBins"
import { Expires } from "./Expires"
import { Card } from "./index"

export interface Masked {
	masked: string
	iin: string
	last4: string
	expires: Expires
	lapses?: isoly.Date
}
export namespace Masked {
	export const type = isly.object<Masked>(
		{
			masked: isly.string(/^\d{6,8}\*+\d{4}$/),
			iin: isly.string(/^\d{6,8}$/),
			last4: isly.string(/^\d{4}$/),
			expires: Expires.type,
			lapses: isly.fromIs<isoly.Date>("isoly.Date", isoly.Date.is).optional(),
		},
		"pax2pay.cde.Card.Masked"
	)
	export const is = type.is
	export const flaw = type.flaw
	export function mask(card: Card): Masked {
		const length = card.pan.length
		const iinLength = eightDigitBins.some(iin => card.pan.startsWith(iin)) ? 8 : 6
		const iin = card.pan.slice(0, iinLength)
		const last4 = card.pan.slice(length - 4, length)
		const result: Masked = {
			masked: iin + "*".repeat(length - iinLength - 4) + last4,
			iin,
			last4,
			expires: card.expires,
		}
		if (card.lapses)
			result.lapses = card.lapses
		return result
	}
}
