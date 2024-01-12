import * as isoly from "isoly"
import { Expires as CardExpires } from "./Expires"
import { Masked as CardMasked } from "./Masked"
import { Part as CardPart } from "./Part"

export interface Card {
	pan: string
	expires: CardExpires
	csc: string
	lapses?: isoly.Date
}
export namespace Card {
	// hardcoded set of eight digit bins
	const EIGHT_DIGIT_BINS = ["45561800", "45561900", "49299300", "49299400"]

	function findBinLength(pan: string): number {
		// return from a hardcoded set of eight digit bins, otherwise default 6
		for (const bin of EIGHT_DIGIT_BINS) {
			if (pan.startsWith(bin)) {
				return 8
			}
		}

		return 6
	}

	export function is(value: any | Card): value is Card {
		return (
			typeof value == "object" &&
			typeof value.pan == "string" &&
			(CardExpires.is(value.expires) ||
				(Array.isArray(value.expires) && value.expires[0] == 0 && value.expires[1] == 0)) &&
			typeof value.csc == "string" &&
			(value.lapses == undefined || isoly.Date.is(value.lapses))
		)
	}

	export function mask(card: Card): CardMasked {
		const length = card.pan.length
		const binLength = findBinLength(card.pan)
		const iin = card.pan.slice(0, binLength)
		const last4 = card.pan.slice(length - 4, length)
		const result: CardMasked = {
			masked: iin + "*".repeat(length - binLength + 4) + last4,
			iin,
			last4,
			expires: card.expires,
		}
		if (card.lapses)
			result.lapses = card.lapses
		return result
	}

	export type Expires = CardExpires
	export namespace Expires {
		export const is = CardExpires.is
		export const stringify = CardExpires.stringify
		export const parse = CardExpires.parse
		export type Month = CardExpires.Month
		export namespace Month {
			export const is = CardExpires.Month.is
			export const parse = CardExpires.Month.parse
		}
		export type Year = CardExpires.Year
		export namespace Year {
			export const is = CardExpires.Year.is
			export const parse = CardExpires.Year.parse
		}
	}
	export type Masked = CardMasked
	export namespace Masked {
		export const is = CardMasked.is
	}
	export type Token = string
	export namespace Token {
		const patternString =
			"(\\d{10,12})\\/(\\d{2})\\/([0-1]\\d{3})\\/((RSA[A-Za-z]{4})|([0-2]\\d[0-6][02468])|(((([02468][048])|([13579][2,6]))(02((0[1-9])|([1-2]\\d))))|(\\d{2}((((0[13578])|(1[02]))((0[1-9])|([1-2]\\d)|(3[01])))|(02((0[1-9])|(1\\d)|(2[0-8])))|(((0[469])|(11))((0[1-9])|([1-2]\\d)|(30)))))))\\/[a-zA-Z0-9\\-_]+\\/[a-zA-Z0-9\\-_]+(\\/(pan|csc|expires|month|year|masked))?"
		export const pattern = new RegExp("^" + patternString + "$")
		export const globalPattern = new RegExp(patternString, "g")

		export function is(value: any | Token): value is Token {
			return (
				typeof value == "string" && pattern.test(value)

				//long term token regexp 6 length
				//^(((([02468][048])|([13579][2,6]))(02((0[1-9])|([1-2][0-9]))))|(\d{2}((((0[13578])|(1[02]))((0[1-9])|(1|2[0-9])|(3[01])))|(02((0[1-9])|(1[0-9])|(2[0-8])))|(((0[469])|(11))((0[1-9])|([1-2][0-9])|(30))))))$

				// masked/length/expires/key/encrypted/salt
				// masked/length/expires/key/encrypted/salt/part
				// 4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ
				// 4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/csc
				// 4567897890/16/0221/220101/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ
			)
		}
		export type Unpacked = CardMasked & {
			key: string
			encrypted: string
			salt: string
			part?: CardPart
		}
		export function unpack(token: Token): Unpacked
		export function unpack(
			masked: string,
			length: string,
			expires: string,
			key: string,
			value: string,
			salt: string
		): Unpacked
		export function unpack(
			masked: string,
			length: string,
			expires: string,
			key: string,
			value: string,
			salt: string,
			part: string
		): Unpacked
		export function unpack(token: string[]): Unpacked
		export function unpack(...argument: Token[] | string[] | string[][]): Unpacked {
			const splitted: string[] =
				argument.length != 1
					? (argument as string[])
					: typeof argument[0] == "string"
					? argument[0].split("/")
					: argument[0]
			const length = splitted[0].length
			const iin = splitted[0].slice(0, length - 4)
			const last4 = splitted[0].slice(length - 4, length)
			const result: Unpacked = {
				masked: iin + "*".repeat(Number.parseInt(splitted[1]) - length) + last4,
				iin,
				last4,
				expires: [
					Number.parseInt(splitted[2].slice(0, 2)) as CardExpires.Month,
					Number.parseInt(splitted[2].slice(2, 4)) as CardExpires.Year,
				],
				key: splitted[3],
				encrypted: splitted[4],
				salt: splitted[5],
				part: splitted.length > 6 && CardPart.is(splitted[6]) ? splitted[6] : undefined,
			}
			if (result.key.length == 6) {
				const lapses =
					isoly.Date.now().substring(0, 2) +
					result.key.substring(0, 2) +
					"-" +
					result.key.substring(2, 4) +
					"-" +
					result.key.substring(4, 6)
				if (isoly.Date.is(lapses))
					result.lapses = lapses
			}
			return result
		}
		export function pack(card: Card, key: string, encrypted: string, salt: string): Token {
			const masked = mask(card)
			return [
				masked.iin + masked.last4,
				card.pan.length.toString(),
				card.expires[0].toString().padStart(2, "0") + card.expires[1].toString().padStart(2, "0"),
				key,
				encrypted,
				salt,
			].join("/")
		}
	}
	export type Part = CardPart
	export namespace Part {
		export const values = CardPart.values
		export const is = CardPart.is
	}
}
