import { Expires as CardExpires } from "./Expires"
import { Masked as CardMasked } from "./Masked"

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
				/[0-9]{10}\/[0-2][0-9]{3}\/[0-2][0-9][0-6][0,2,4,6,8]\/[a-z,A-Z,0-9\-_]+\/[a-z,A-Z,0-9\-_]+(\/(pan|csc|expires|masked))?/.test(
					value
				)
				// masked/expires/key/encrypted/salt
				// masked/expires/key/encrypted/salt/part
				// 4111111111/0222/1336/abcde01234-_ABCDE/abcde01234-_ABCDE
				// 4111111111/0222/1336/abcde01234-_ABCDE/abcde01234-_ABCDE/csc
			)
		}
		export function unpack(token: Token): CardMasked {
			const splitted = token.split("/", 3)
			const length = splitted[0].length
			return {
				masked: splitted[0].slice(0, 6) + "*".repeat(6) + splitted[0].slice(length - 4, length),
				expires: [
					Number.parseInt(splitted[1].slice(0, 2)) as CardExpires.Month,
					Number.parseInt(splitted[1].slice(2, 4)) as CardExpires.Year,
				],
			}
		}
		export function pack(card: Card, key: string, encrypted: string, salt: string): Token {
			const length = card.pan.length
			return [
				card.pan.slice(0, 6) + card.pan.slice(length - 4, length),
				card.expires[0].toString().padStart(2, "0") + card.expires[1].toString().padStart(2, "0"),
				key,
				encrypted,
				salt,
			].join("/")
		}
	}
}
