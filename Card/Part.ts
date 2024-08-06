import { isly } from "isly"

export type Part = "pan" | "csc" | "expires" | "month" | "year" | "masked"

export namespace Part {
	export const values = ["pan", "csc", "expires", "month", "year", "masked"] as const
	export const type = isly.named("pax2pay.cde.Card.Part", isly.string<Part>(values))
	export const is = type.is
	export const flaw = type.flaw
}
