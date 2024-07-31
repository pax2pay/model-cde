import { Pattern } from "../../../.."
import { Card as CardType } from "../Card"

export interface Plain {
	type: "plain"
	card: CardType
	entryDelimiter: string
	equalsDelimiter: string
	set: (
		| {
				find: Pattern
				value?: string
		  }
		| string
	)[]
}

export namespace Plain {
	export function is(value: Plain | any): value is Plain {
		return (
			typeof value == "object" &&
			value.type == "plain" &&
			value.card &&
			(CardType.Base.is(value.card) || CardType.MonthYear.is(value.card) || CardType.Expires.is(value.card)) &&
			value.entryDelimiter &&
			typeof value.entryDelimiter == "string" &&
			value.equalsDelimiter &&
			typeof value.equalsDelimiter == "string" &&
			value.set &&
			Array.isArray(value.set) &&
			value.set.every((element: string | Record<string, any>) => {
				return (
					typeof element == "string" ||
					(typeof element == "object" &&
						element.find &&
						Pattern.is(element.find) &&
						(element.value == undefined || typeof element.value == "string"))
				)
			})
		)
	}
}
