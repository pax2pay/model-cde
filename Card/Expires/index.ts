import { Month as ExpiresMonth, Month } from "./Month"
import { Year as ExpiresYear, Year } from "./Year"


export type Expires = [Month, Year]

export namespace Expires {
	export function is(value: Expires | any): value is Expires {
		return Array.isArray(value) && value.length == 2 && ExpiresMonth.is(value[0]) && ExpiresYear.is(value[1])
	}
	export type Month = ExpiresMonth
	export namespace Month {
		export const is = ExpiresMonth.is
	}
	export type Year = ExpiresYear
	export namespace Year {
		export const is = ExpiresYear.is
	}
}
