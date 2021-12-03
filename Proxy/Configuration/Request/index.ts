import { Selector } from "../../Selector"

export interface Request {
	authentication?: string | (string | undefined)[]
	url: string
	process?: boolean
	get?: Selector
}
