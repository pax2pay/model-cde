import * as gracely from "gracely"
import * as http from "cloudly-http"
import { Card as modelCard } from "../Card"
import { prod as prodPublicKey, test as testPublicKey } from "./publicKeys"

export class Card extends http.Client<gracely.Error> {
	constructor(connection: string, readonly backendKey: modelCard.Token.Key.Public) {
		super(connection)
	}
	async getGraphicsUrl(
		type: "svg" | "pdf",
		card: modelCard | modelCard.Token,
		cardholder?: string
	): Promise<string | undefined> {
		const token = modelCard.is(card) ? await modelCard.Token.create(card, this.backendKey) : card
		const result = (this.url && token && new URL(`${this.url}card/${token}`)) || undefined
		if (result) {
			result.searchParams.set("accept", type == "pdf" ? "application/pdf" : "image/svg+xml")
			if (cardholder)
				result.searchParams.set("ch", cardholder)
		}
		return result?.toString()
	}
	async getGraphics(
		type: "svg" | "pdf",
		card: modelCard | modelCard.Token,
		cardholder?: string
	): Promise<string | gracely.Error> {
		const url = await this.getGraphicsUrl(type, card, cardholder)
		return url && this.url
			? await this.get<string>(url.substring(this.url?.length))
			: gracely.client.invalidPathArgument(
					"card/:token",
					"token",
					"pax2pay.cde.Token",
					"Unable to create card token before requesting graphics."
			  )
	}
	async tokenize(card: modelCard, key?: string): Promise<modelCard.Token | gracely.Error> {
		return await this.post<modelCard.Token>("card", card, key ? { cdePublicKey: key } : undefined)
	}
	async detokenize(token: modelCard.Token): Promise<modelCard | gracely.Error> {
		return await this.get<modelCard>(`card/${token}`)
	}
	async modify(token: modelCard.Token, card?: Partial<modelCard>): Promise<string | gracely.Error> {
		return await this.patch<string>(`card/${token}`, card ?? {})
	}
	static create(connection: string): { card: Card } {
		return {
			card: new Card(connection, {
				public: connection.includes("https://api.pax2pay.com") ? prodPublicKey : testPublicKey,
			}),
		}
	}
}
