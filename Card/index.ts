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
			CardExpires.is(value.expires) &&
			typeof value.csc == "string"
		)
	}
	export type Expires = CardExpires
	export namespace Expires {
		export const is = CardExpires.is
		export type Month = CardExpires.Month
		export namespace Month {
			export const is = CardExpires.Month.is
		}
		export type Year = CardExpires.Year
		export namespace Year {
			export const is = CardExpires.Year.is
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
				// 4111111111/16/0222/1336/abcde01234-_ABCDE/abcde01234-_ABCDE
				// 4111111111/16/0222/1336/abcde01234-_ABCDE/abcde01234-_ABCDE/csc
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
		export function unpack(...argument: [Token] | string[] | [string[]]): Unpacked
		export function unpack(...argument: [Token] | string[] | [string[]]): Unpacked {
			const splitted: string[] = argument.length == 1
				? (Array.isArray(argument[0])) ? argument[0] : argument[0].split("/")
				: argument as string[]
			const length = splitted[0].length
			return {
				masked:
					splitted[0].slice(0, length - 4) +
					"*".repeat(Number.parseInt(splitted[1]) - length) +
					splitted[0].slice(length - 4, length),
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
			const length = card.pan.length
			return [
				card.pan.slice(0, 6) + card.pan.slice(length - 4, length),
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
