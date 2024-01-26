import * as gracely from "gracely"
import * as http from "cloudly-http"
import { Card as modelCard } from "../Card"

export class Card extends http.Client<gracely.Error> {
	async detokenize(token: modelCard.Token): Promise<modelCard | string | gracely.Error> {
		return await this.get<modelCard | string>(`card/${token}`)
	}
	async getImage(token: modelCard.Token, cardHolderName?: string): Promise<string | gracely.Error> {
		const queryString = cardHolderName ? `?ch=${cardHolderName}` : ""
		return await this.get<string>(`card/${token}${queryString}`, { accept: ["image/svg+xml"] })
	}
	async getPdf(token: modelCard.Token, cardHolderName?: string): Promise<string | gracely.Error> {
		const queryString = cardHolderName ? `?ch=${cardHolderName}` : ""
		return await this.get<string>(`card/${token}${queryString}`, { accept: ["application/pdf"] })
	}
	async getImageWithRawData(card: modelCard, cardHolderName?: string): Promise<string | gracely.Error> {
		const queryString = cardHolderName ? `?ch=${cardHolderName}` : ""
		return await this.post<string>(`card/raw${queryString}`, card, { accept: ["image/svg+xml"] })
	}
	async getPdfWithRawData(card: modelCard, cardHolderName?: string): Promise<ArrayBuffer | gracely.Error> {
		const queryString = cardHolderName ? `?ch=${cardHolderName}` : ""
		const response = await this.post<ArrayBuffer>(`card/raw${queryString}`, card, {
			accept: ["application/pdf"],
		})
		return response
	}
	async tokenize(card: modelCard): Promise<modelCard.Token | gracely.Error> {
		return await this.post<modelCard.Token>("card", card)
	}
	async modify(token: modelCard.Token, card?: Partial<modelCard>): Promise<string | gracely.Error> {
		return await this.patch<string>(`card/${token}`, card ?? {})
	}
	static create(connection: string): { card: Card } {
		return { card: new Card(connection) }
	}
}
