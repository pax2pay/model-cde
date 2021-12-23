import * as gracely from "gracely"
import * as rest from "cloudly-rest"
import { Card as ClientCard } from "./Card"

export class Client extends rest.Client<gracely.Error> {
	readonly card = new ClientCard(this.client)
}
export namespace Client {
	export type Card = ClientCard
	export const Card = ClientCard
}
