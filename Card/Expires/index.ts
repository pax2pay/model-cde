import { isly } from "isly"
import { Month as ExpiresMonth } from "./Month"
import { Year as ExpiresYear } from "./Year"

export type Expires = [ExpiresMonth, ExpiresYear] | [0, 0]

export namespace Expires {
	export const type = isly.named("pax2pay.cde.Card.Expires", isly.union<Expires>(isly.tuple(ExpiresMonth.type, ExpiresYear.type), isly.tuple<[0, 0]>(isly.number(0), isly.number(0))))
	export const is = type.is
	export const flaw = type.flaw
	export function stringify(expires: Expires): string {
		return expires[0] + "/" + expires[1]
	}
	export function parse(expires: string, monthFirst = true): Expires | undefined {
		let result;
		if ((/^\d{4}-\d{2}-\d{2}.*/).test(expires) && new globalThis.Date(expires).toString() != "Invalid Date")
			result = [ExpiresMonth.parse(expires.substring(5, 7)), ExpiresYear.parse(expires.substring(2, 4))]
		else {
			const numbers = expires.replaceAll(/[\.\/-]/g, "")
			const monthLength = numbers.length % 2 == 1 ? 1: 2
			result = monthFirst 
			? [ExpiresMonth.parse(numbers.substring(0, monthLength)), ExpiresYear.parse(numbers.substring(monthLength))]
			: [ExpiresYear.parse(numbers.substring(numbers.length - monthLength)), ExpiresYear.parse(numbers.substring(0, numbers.length - monthLength))] 
		}
		return Expires.is(result) ? result : undefined
	}
	export type Month = ExpiresMonth
	export const Month = ExpiresMonth
	export type Year = ExpiresYear
	export const Year = ExpiresYear
}
