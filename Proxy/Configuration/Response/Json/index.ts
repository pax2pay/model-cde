import { Card } from "../../../../Card"
import { Selector } from "../../../Selector"

export interface Json {
	card: {
		pan: Selector
		csc: Selector
	} & (
		| {
				month: Selector
				year: Selector
		  }
		| {
				expires?: Selector
		  }
	)
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

		if ("month" in configuration.card && "year" in configuration.card) {
			month = Card.Expires.Month.parse(Selector.get(body, configuration.card.month))
			year = Card.Expires.Year.parse(Selector.get(body, configuration.card.year))
		} else if ("expires" in configuration.card && configuration.card.expires != undefined) {
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
	export function process(configuration: Json, token: Card.Token, body: Record<string, any>): Record<string, any> {
		const masked: Card.Masked = Card.Token.unpack(token)
		const variables = {
			token,
			...masked,
			expires: Card.Expires.stringify(masked.expires),
			month: masked.expires[0].toString(),
			year: masked.expires[1].toString(),
		}
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
