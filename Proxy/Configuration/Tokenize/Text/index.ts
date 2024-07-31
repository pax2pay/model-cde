import { Card } from "../../../../Card"
import { Pattern } from "../../../Pattern"
import { Card as CardType } from "./Card"
import { Plain as TextPlain } from "./Plain"
import { Xml as TextXml } from "./Xml"

export type Text = TextXml | TextPlain

export namespace Text {
	export function extract(configuration: TextPlain | TextXml, body: string): Card {
		const plain = TextPlain.is(configuration)
		let month: Card.Expires.Month | undefined | 0
		let year: Card.Expires.Year | undefined | 0

		if (CardType.MonthYear.is(configuration.card)) {
			month = Card.Expires.Month.parse(
				plain
					? Pattern.getInPlain(
							body,
							configuration.card.month,
							configuration.entryDelimiter,
							configuration.equalsDelimiter
					  )
					: Pattern.getInXml(body, configuration.card.month)
			)
			year = Card.Expires.Year.parse(
				plain
					? Pattern.getInPlain(
							body,
							configuration.card.year,
							configuration.entryDelimiter,
							configuration.equalsDelimiter
					  )
					: Pattern.getInXml(body, configuration.card.year)
			)
		} else if (CardType.Expires.is(configuration.card)) {
			const monthYear = Card.Expires.parse(
				plain
					? Pattern.getInPlain(
							body,
							configuration.card.expires,
							configuration.entryDelimiter,
							configuration.equalsDelimiter
					  )
					: Pattern.getInXml(body, configuration.card.expires)
			)
			month = monthYear ? monthYear[0] : undefined
			year = monthYear ? monthYear[1] : undefined
		}

		return {
			pan: plain
				? Pattern.getInPlain(body, configuration.card.pan, configuration.entryDelimiter, configuration.equalsDelimiter)
				: Pattern.getInXml(body, configuration.card.pan),
			csc: configuration.card.csc
				? plain
					? Pattern.getInPlain(
							body,
							configuration.card.csc,
							configuration.entryDelimiter,
							configuration.equalsDelimiter
					  )
					: Pattern.getInXml(body, configuration.card.csc)
				: "000",
			expires: month && year ? [month, year] : [0, 0],
		}
	}

	export function process(configuration: TextPlain | TextXml, token: Card.Token, body: string): string | any {
		const plain = TextPlain.is(configuration)
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
			return plain
				? Pattern.setInPlain(
						r,
						replacement.find,
						replacement.value == undefined ? "" : replace(replacement.value, variables),
						configuration.entryDelimiter,
						configuration.equalsDelimiter
				  )
				: Pattern.setInXml(
						r,
						replacement.find,
						replacement.value == undefined ? "" : replace(replacement.value, variables)
				  )
		}, body)
	}
	function replace(data: string, variables: Record<string, string | undefined>): string {
		return data.replaceAll(/\$\(([a-zA-Z]\w*)\)/g, (match, variable) => variables[variable] || match)
	}

	export type Xml = TextXml
	export const Xml = TextXml
	export type Plain = TextPlain
	export const Plain = TextPlain
}
