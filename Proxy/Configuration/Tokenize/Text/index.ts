import { Card } from "../../../../Card/index"
import { Pattern } from "../../.."

interface CardBase {
	pan: Pattern
	csc: Pattern | undefined
}
namespace CardBase {
	export function is(value: CardBase | any): value is CardBase {
		return typeof value == "object" && value.pan && Pattern.is(value.pan) && value.csc && Pattern.is(value.csc)
	}
}

interface CardMonthYear extends CardBase {
	month: Pattern
	year: Pattern
}
namespace CardMonthYear {
	export function is(value: CardMonthYear | any): value is CardMonthYear {
		return (
			typeof value == "object" &&
			value.pan &&
			Pattern.is(value.pan) &&
			value.csc &&
			Pattern.is(value.csc) &&
			value.month &&
			Pattern.is(value.month) &&
			value.year &&
			Pattern.is(value.year)
		)
	}
}

interface CardExpires extends CardBase {
	expires: Pattern
}
namespace CardExpires {
	export function is(value: CardExpires | any): value is CardExpires {
		return (
			typeof value == "object" &&
			value.pan &&
			Pattern.is(value.pan) &&
			value.csc &&
			Pattern.is(value.csc) &&
			value.expires &&
			Pattern.is(value.expires)
		)
	}
}

export interface Text {
	type: "text"
	card: CardBase | CardMonthYear | CardExpires
	set: (
		| {
				find: Pattern
				value?: string
		  }
		| string
	)[]
}

export namespace Text {
	export function is(value: Text | any): value is Text {
		return (
			typeof value == "object" &&
			value.type == "text" &&
			value.card &&
			(CardBase.is(value.card) || CardMonthYear.is(value.card) || CardExpires.is(value.card)) &&
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

	export function extract(configuration: Text, body: string): Card {
		let month: Card.Expires.Month | undefined | 0
		let year: Card.Expires.Year | undefined | 0

		if (CardMonthYear.is(configuration.card)) {
			month = Card.Expires.Month.parse(Pattern.get(body, configuration.card.month))
			year = Card.Expires.Year.parse(Pattern.get(body, configuration.card.year))
		} else if (CardExpires.is(configuration.card)) {
			const monthYear = Card.Expires.parse(Pattern.get(body, configuration.card.expires))
			month = monthYear ? monthYear[0] : undefined
			year = monthYear ? monthYear[1] : undefined
		}

		return {
			pan: Pattern.get(body, configuration.card.pan),
			csc: configuration.card.csc ? Pattern.get(body, configuration.card.csc) : "000",
			expires: month && year ? [month, year] : [0, 0],
		}
	}

	export function process(configuration: Text, token: Card.Token, body: string): string | any {
		const masked: Card.Token.Unpacked = Card.Token.unpack(token)
		const variables = {
			token,
			...masked,
			maskedAndEncrypted: [masked.masked, masked.encrypted].join("/"),
			expires: Card.Expires.stringify(masked.expires),
			month: masked.expires[0].toString(),
			year: masked.expires[1].toString(),
		}
		return configuration.set.reduce((r, replacement) => {
			if (typeof replacement == "string")
				replacement = { find: replacement }
			return Pattern.set(
				r,
				replacement.find,
				replacement.value == undefined ? "" : replace(replacement.value, variables)
			)
		}, body)
	}
	function replace(data: string, variables: Record<string, string | undefined>): string {
		return data.replaceAll(/\$\(([a-zA-Z]\w*)\)/g, (match, variable) => variables[variable] || match)
	}
}
