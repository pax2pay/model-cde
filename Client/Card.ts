import * as gracely from "gracely"
import * as http from "cloudly-http"
import { Card as modelCard } from "../Card"

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
				public: connection.includes("https://api.pax2pay.com")
					? "production-public-key"
					: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9LwPP/B8VdWLI0bOHkkAczNIJ0bUqXI+2bXH34DRT7w7efgfEtsLCQsF2AjmEXyYyRSC1nZOB0eggM/9tzhuPfa17j9e6Ob2ugxuIY0MHCPsTBm2l0T7GEJIPYBIwaVwkTEwv6hao7EBH5OV51UOHSpnuc9YsBYl68s5cMoN5REVj3ybzFZ71jWu3GLeY+w2YIH9/km2sKDDpTdzWrmtsVZMo7j+ffm01xhCWHqrSSatESUgR545Bn6AuIuU+X+PHPNHJDwIecgtjg538VF9PvYaAbGC/2wZR8kKn/WBiI8l967EuA+nioUYl2tGWgRBeNA0bb5zR64iq/q1CSwJEwIDAQAB",
			}),
		}
	}
}
