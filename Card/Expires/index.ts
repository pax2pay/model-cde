import { Month as ExpiresMonth } from "./Month"
import { Year as ExpiresYear } from "./Year"


export type Expires = [ExpiresMonth, ExpiresYear] | [0, 0]

export namespace Expires {
	export function is(value: Expires | any): value is Expires {
		return Array.isArray(value) && value.length == 2 && ExpiresMonth.is(value[0]) && ExpiresYear.is(value[1])
	}
	export function stringify(expires: Expires): string {
		return expires[0] + "/" + expires[1]
	}
	export function parse(expires: string): Expires | undefined {
		let result;
		if ((/^\d{4}-\d{2}-\d{2}.*/).test(expires) && new globalThis.Date(expires).toString() != "Invalid Date") {
			result = [ExpiresMonth.parse(expires.substring(5, 7)), ExpiresYear.parse(expires.substring(2, 4))]
		} else {
			const numbers = expires.replaceAll(/[\.\/-]/g, "")
			const monthLength = numbers.length % 2 == 1 ? 1: 2
			result = [ExpiresMonth.parse(numbers.substring(0, monthLength)), ExpiresYear.parse(numbers.substring(monthLength))]
		}
		return Expires.is(result) ? result : undefined
	}
	export type Month = ExpiresMonth
	export namespace Month {
		export const is = ExpiresMonth.is
		export const parse = ExpiresMonth.parse
	}
	export type Year = ExpiresYear
	export namespace Year {
		export const is = ExpiresYear.is
		export const parse = ExpiresYear.parse
	}
}
