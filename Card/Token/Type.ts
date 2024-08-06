import { isly } from "isly"

export type Type = typeof Type.values[number]

export namespace Type {
	export const values = ["symmetric", "asymmetric"] as const
	export const type = isly.named("pax2pay.cde.Card.Token.Type", isly.string<Type>(values))
	export const is = type.is
	export const flaw = type.flaw
}
