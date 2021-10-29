export type Part = "pan" | "csc" | "expires" | "month" | "year" | "masked"

export namespace Part {
	export const values = ["pan", "csc", "expires", "month", "year", "masked"] as const
	export function is(value: any | Part): value is Part {
		return typeof value == "string" && values.some(part => part == value)
	}
}
