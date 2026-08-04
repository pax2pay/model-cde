import * as gracely from "gracely"
import * as http from "cloudly-http"
import { Card as modelCard } from "../Card"
export class Card extends http.Client<gracely.Error> {
	constructor(connection: string) {
		super(connection)
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
			card: new Card(connection),
		}
	}
}
