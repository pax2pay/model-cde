import { isly } from "isly"

export type Month = typeof Month.values[number]

export namespace Month {
	export const values = [1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12] as const
	export const type = isly.named("pax2pay.cde.Card.Expires.Month", isly.number<Month>(values as any as number[]))
	export const is = type.is
	export const flaw = type.flaw
	export function parse(month: string): Month | undefined {
		const result = parseInt(month)
		return is(result) ? result : undefined
	}
}
