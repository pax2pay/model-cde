import * as gracely from "gracely"
import * as http from "cloudly-http"
import { Card as modelCard } from "../Card"

export class Card extends http.Client<gracely.Error> {
	async detokenize(token: modelCard.Token): Promise<modelCard | string | gracely.Error> {
		return await this.get<modelCard | string>(`card/${token}`)
	}
	async getImage(token: modelCard.Token, cardHolderName?: string): Promise<string | gracely.Error> {
		return await this.get<string>(`card/${token}${this.getQueryString(cardHolderName)}`, { accept: ["image/svg+xml"] })
	}
	async getPdf(token: modelCard.Token, cardHolderName?: string): Promise<string | gracely.Error> {
		return await this.get<string>(`card/${token}${this.getQueryString(cardHolderName)}`, {
			accept: ["application/pdf"],
		})
	}
	async getImageWithRawData(card: modelCard, cardHolderName?: string): Promise<string | gracely.Error> {
		return await this.post<string>(`card/raw${this.getQueryString(cardHolderName)}`, card, {
			accept: ["image/svg+xml"],
		})
	}
	async getPdfWithRawData(card: modelCard, cardHolderName?: string): Promise<ArrayBuffer | gracely.Error> {
		const response = await this.post<ArrayBuffer>(`card/raw${this.getQueryString(cardHolderName)}`, card, {
			accept: ["application/pdf"],
		})
		return response
	}
	async tokenize(card: modelCard, key?: string): Promise<modelCard.Token | gracely.Error> {
		return await this.post<modelCard.Token>("card", card, key ? { cdePublicKey: key } : undefined)
	}
	async modify(token: modelCard.Token, card?: Partial<modelCard>): Promise<string | gracely.Error> {
		return await this.patch<string>(`card/${token}`, card ?? {})
	}
	getQueryString(cardHolderName?: string) {
		return cardHolderName ? `?ch=${cardHolderName}` : ""
	}
	static create(connection: string): { card: Card } {
		return { card: new Card(connection) }
	}
}
