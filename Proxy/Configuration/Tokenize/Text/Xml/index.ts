import { Pattern } from "../../../.."
import { Card as CardType } from "../Card"

export interface Xml {
	type: "text" | "xml" // text is legacy
	card: CardType
	set: (
		| {
				find: Pattern
				value?: string
		  }
		| string
	)[]
}

export namespace Xml {
	export function is(value: Xml | any): value is Xml {
		return (
			typeof value == "object" &&
			(value.type == "text" || value.type == "xml") &&
			value.card &&
			(CardType.Base.is(value.card) || CardType.MonthYear.is(value.card) || CardType.Expires.is(value.card)) &&
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
