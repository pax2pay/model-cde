import * as gracely from "gracely"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"
import { Card as modelCard } from "../Card"

export class Card extends rest.Collection<gracely.Error> {
	async detokenize(token: modelCard.Token): Promise<modelCard | string | gracely.Error> {
		return await this.client.get<modelCard | string>(`card/${token}`)
	}
	async getImage(token: modelCard.Token): Promise<string | gracely.Error> {
		return await this.client.get<string>(`card/${token}`, { accept: ["image/svg+xml"] })
	}
	async getPDF(token: modelCard.Token): Promise<Response | gracely.Error> {
		return await this.client.get<Response>(`card/${token}`, { accept: ["application/pdf"] })
	}
	async tokenize(card: modelCard): Promise<modelCard.Token | gracely.Error> {
		return await this.client.post<modelCard.Token>("card", card)
	}
	async modify(token: modelCard.Token, card?: Partial<modelCard>): Promise<string | gracely.Error> {
		return await this.client.patch<string>(`card/${token}`, card ?? {})
	}
	static create(connection: http.Client): { card: Card } {
		return { card: new Card(connection) }
	}
}
