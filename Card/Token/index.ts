import { isoly } from "isoly"
import { isly } from "isly"
import { Key } from "../../Key"
import { Expires } from "../Expires"
import type { Card } from "../index"
import { Masked } from "../Masked"
import { Part } from "../Part"
import { Type } from "./Type"
import { Unpacked as TokenUnpacked } from "./Unpacked"

type CoreToken = `${string}/${string}/${string}/${string}/${string}/${string}`
export type Token = CoreToken | `${CoreToken}/${Part}`
export namespace Token {
	const patternString =
		"(\\d{10,12})\\/(\\d{2})\\/([0-1]\\d{3})\\/((RSA[A-Za-z]{4})|([0-2]\\d[0-6][02468])|(((([02468][048])|([13579][2,6]))(02((0[1-9])|([1-2]\\d))))|(\\d{2}((((0[13578])|(1[02]))((0[1-9])|([1-2]\\d)|(3[01])))|(02((0[1-9])|(1\\d)|(2[0-8])))|(((0[469])|(11))((0[1-9])|([1-2]\\d)|(30)))))))\\/[a-zA-Z0-9\\-_]+\\/[a-zA-Z0-9\\-_]+(\\/(pan|csc|expires|month|year|masked))?"
	export const pattern = new RegExp("^" + patternString + "$")
	export const globalPattern = new RegExp(patternString, "g")
	export const type = isly.named("pax2pay.cde.Card.Token", isly.string<Token>(pattern))
	export const is = type.is
	export const flaw = type.flaw
	//long term token regexp 6 length
	//^(((([02468][048])|([13579][2,6]))(02((0[1-9])|([1-2][0-9]))))|(\d{2}((((0[13578])|(1[02]))((0[1-9])|(1|2[0-9])|(3[01])))|(02((0[1-9])|(1[0-9])|(2[0-8])))|(((0[469])|(11))((0[1-9])|([1-2][0-9])|(30))))))$

	// masked/length/expires/key/encrypted/salt
	// masked/length/expires/key/encrypted/salt/part
	// 4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ
	// 4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/csc
	// 4567897890/16/0221/220101/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ
	export function getType(value: string): Type | undefined {
		return !is(value) ? undefined : unpack(value).key.startsWith("RSA") ? "asymmetric" : "symmetric"
	}
	export type Unpacked = TokenUnpacked
	export const Unpacked = TokenUnpacked
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
				Number.parseInt(splitted[2].slice(0, 2)) as Expires.Month,
				Number.parseInt(splitted[2].slice(2, 4)) as Expires.Year,
			],
			key: splitted[3],
			encrypted: splitted[4],
			salt: splitted[5],
			part: splitted.length > 6 && Part.is(splitted[6]) ? splitted[6] : undefined,
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
		const masked = Masked.mask(card)
		return [
			masked.iin + masked.last4,
			card.pan.length.toString(),
			card.expires[0].toString().padStart(2, "0") + card.expires[1].toString().padStart(2, "0"),
			key,
			encrypted,
			salt,
		].join("/") as Token
	}
	export async function create(card: Card, key: string | Key.Public): Promise<Token | undefined> {
		
	} 
}
