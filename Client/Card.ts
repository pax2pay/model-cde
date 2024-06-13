import * as gracely from "gracely"
import * as http from "cloudly-http"
import { Card as modelCard } from "../Card"

export class Card extends http.Client<gracely.Error> {
	async getImage(card: modelCard | modelCard.Token, cardHolderName?: string): Promise<string | gracely.Error> {
		return this.getGraphics("image", card, cardHolderName)
	}
	async getPdf(card: modelCard | modelCard.Token, cardHolderName?: string): Promise<string | gracely.Error> {
		return this.getGraphics("pdf", card, cardHolderName)
	}
	private async getGraphics(
		type: "image" | "pdf",
		card: modelCard | modelCard.Token,
		cardHolderName?: string
	): Promise<string | gracely.Error> {
		const header = {
			accept: [type == "pdf" ? "application/pdf" : "image/svg+xml"],
		}
		return modelCard.is(card)
			? await this.post<string>(`card/raw${this.getQueryString(cardHolderName)}`, card, header)
			: await this.get<string>(`card/${card}${this.getQueryString(cardHolderName)}`, header)
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
	getQueryString(cardHolderName?: string) {
		return cardHolderName ? `?ch=${cardHolderName}` : ""
	}
	static create(connection: string): { card: Card } {
		return { card: new Card(connection) }
	}
}
