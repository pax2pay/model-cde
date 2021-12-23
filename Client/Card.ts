import * as gracely from "gracely"
import * as isoly from "isoly"
import * as cde from "@pax2pay/model-cde"
import * as http from "cloudly-http"
import * as rest from "cloudly-rest"

export class Card extends rest.Collection<gracely.Error> {
	async detokenize(token: cde.Card.Token): Promise<cde.Card | string | gracely.Error> {
		return await this.client.get<cde.Card | string>(`card/${token}`)
	}
	async tokenize(card: cde.Card, lapses?: isoly.Date): Promise<cde.Card.Token | gracely.Error> {
		return await this.client.post<cde.Card.Token>("card", { card, lapses })
	}
	static create(connection: http.Client): { card: Card } {
		return { card: new Card(connection) }
	}
}
