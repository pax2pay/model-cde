import { Month as ExpiresMonth, Month } from "./Month"
import { Year as ExpiresYear, Year } from "./Year"


export type Expires = [Month, Year]

export namespace Expires {
	export function is(value: Expires | any): value is Expires {
		return Array.isArray(value) && value.length == 2 && ExpiresMonth.is(value[0]) && ExpiresYear.is(value[1])
	}
	export function stringify(expires: Expires): string {
		return expires[0] + "/" + expires[1]
	}
	export function parse(expires: string): Expires | undefined {
		const result = expires.split("/").map(Number.parseInt)
		return Expires.is(result) ? result : undefined
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
