import { Pattern } from "./Pattern"
import { Selector } from "./Selector"

export interface Configuration {
	id: string
	authentication?: string | (string | undefined)[]
	request: {
		url: string
		process?: boolean
	}
	response: {
		card: {
			pan: Pattern | Selector
			csc: Pattern | Selector
			month: Pattern | Selector
			year: Pattern | Selector
		}
		replace: {
			find: Pattern | Selector
			replace: string
		}[]
	}
}
