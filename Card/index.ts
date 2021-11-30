import { Expires as CardExpires } from "./Expires"
import { Masked as CardMasked } from "./Masked"
import { Part as CardPart } from "./Part"

export interface Card {
	pan: string
	expires: CardExpires
	csc: string
}
export namespace Card {
	export function is(value: any | Card): value is Card {
		return (
			typeof value == "object" &&
			typeof value.pan == "string" &&
			(CardExpires.is(value.expires) ||
				(Array.isArray(value.expires) && value.expires[0] == 0 && value.expires[1] == 0)) &&
			typeof value.csc == "string"
		)
	}
	export function mask(card: Card): CardMasked {
		const length = card.pan.length
		const iin = card.pan.slice(0, 6)
		const last4 = card.pan.slice(length - 4, length)
		return {
			masked: iin + "*".repeat(length - 10) + last4,
			iin,
			last4,
			expires: card.expires,
		}
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
		export function is(value: any | Token): value is Token {
			return (
				typeof value == "string" &&
				/[0-9]{10,12}\/[0-9]{2}\/[0-1][0-9]{3}\/[0-2][0-9][0-6][0,2,4,6,8]\/[a-z,A-Z,0-9\-_]+\/[a-z,A-Z,0-9\-_]+(\/(pan|csc|expires|month|year|masked))?/.test(
					value
				)
				// masked/length/expires/key/encrypted/salt
				// masked/length/expires/key/encrypted/salt/part
				// 4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ
				// 4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/csc
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
			return {
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
