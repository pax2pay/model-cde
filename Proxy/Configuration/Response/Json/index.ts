import { Card } from "../../../../Card"
import { Selector } from "../../../Selector"

interface CardBase {
	pan: Selector
	csc: Selector
}
namespace CardBase {
	export function is(value: CardBase | any): value is CardBase {
		return typeof value == "object" && value.pan && Selector.is(value.pan) && value.csc && Selector.is(value.csc)
	}
}

interface CardMonthYear extends CardBase {
	month: Selector
	year: Selector
}
namespace CardMonthYear {
	export function is(value: CardMonthYear | any): value is CardMonthYear {
		return (
			typeof value == "object" &&
			value.pan &&
			Selector.is(value.pan) &&
			value.csc &&
			Selector.is(value.csc) &&
			value.month &&
			Selector.is(value.month) &&
			value.year &&
			Selector.is(value.year)
		)
	}
}

interface CardExpires extends CardBase {
	expires: Selector
}
namespace CardExpires {
	export function is(value: CardExpires | any): value is CardExpires {
		return (
			typeof value == "object" &&
			value.pan &&
			Selector.is(value.pan) &&
			value.csc &&
			Selector.is(value.csc) &&
			value.expires &&
			Selector.is(value.expires)
		)
	}
}

export interface Json {
	card: CardBase | CardMonthYear | CardExpires
	set: (
		| {
				find: Selector
				value?: string
		  }
		| string
	)[]
}
export namespace Json {
	export function is(value: Json | any): value is Json {
		return (
			typeof value == "object" &&
			value.card &&
			typeof value.card == "object" &&
			value.card.pan &&
			Selector.is(value.card.pan) &&
			value.card.csc &&
			Selector.is(value.card.csc) &&
			((value.card.month && Selector.is(value.card.month) && value.card.year && Selector.is(value.card.year)) ||
			value.card.expires
				? Selector.is(value.card.expires)
				: value.card.expires == undefined) &&
			value.set &&
			Array.isArray(value.set) &&
			value.set.array.every((element: string | Record<string, any>) => {
				return (
					typeof element == "string" ||
					(typeof element == "object" &&
						element.find &&
						Selector.is(element.find) &&
						(element.value == undefined || typeof element.value == "string"))
				)
			})
		)
	}
	export function hasExpires(value: Json): value is Json & { card: { expires: Selector } } {
		return Selector.is((value.card as any).expires)
	}
	export function hasMonthYear(value: Json): value is Json & { card: { month: Selector; year: Selector } } {
		return Selector.is((value.card as any).year) && Selector.is((value.card as any).year)
	}
	export function extract(configuration: Json, body: Record<string, any>): Card {
		let month: Card.Expires.Month | undefined | 0
		let year: Card.Expires.Year | undefined | 0

		if (CardMonthYear.is(configuration.card)) {
			month = Card.Expires.Month.parse(Selector.get(body, configuration.card.month))
			year = Card.Expires.Year.parse(Selector.get(body, configuration.card.year))
		} else if (CardExpires.is(configuration.card)) {
			const monthYear = Card.Expires.parse(Selector.get(body, configuration.card.expires))
			month = monthYear ? monthYear[0] : undefined
			year = monthYear ? monthYear[1] : undefined
		}

		return {
			pan: Selector.get<string>(body, configuration.card.pan),
			csc: Selector.get<string>(body, configuration.card.csc),
			expires: month && year ? [month, year] : [0, 0],
		}
	}
	export function fromToken(token: Card.Token): Record<string, any> {
		const masked: Card.Token.Unpacked = Card.Token.unpack(token)
		return {
			token,
			...masked,
			maskedAndEncrypted: [masked.masked, masked.encrypted].join("/"),
			expires: Card.Expires.stringify(masked.expires),
			month: masked.expires[0].toString(),
			year: masked.expires[1].toString(),
		}
	}
	export function process(
		configuration: Json,
		variables: Record<string, any>,
		body: Record<string, any>
	): Record<string, any> {
		return configuration.set.reduce((r, replacement) => {
			if (typeof replacement == "string")
				replacement = { find: replacement }
			return Selector.set(
				r,
				replacement.find,
				replacement.value == undefined ? undefined : replace(replacement.value, variables)
			)
		}, body)
	}
	function replace(data: string, variables: Record<string, string | undefined>): string {
		return data.replaceAll(/\$\(([a-zA-Z]\w*)\)/g, (match, variable) => variables[variable] || match)
	}
}
