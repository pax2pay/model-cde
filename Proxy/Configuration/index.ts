import { Tokenize as ConfigurationTokenize } from "./Tokenize"

export interface Configuration {
	id: string
	authentication?: string | (string | undefined)[]
	url: string
	request: ConfigurationTokenize.Json | "detokenize"
	response?: ConfigurationTokenize.Json | "detokenize"
}

export namespace Configuration {
	export type Tokenize = ConfigurationTokenize
	export const Tokenize = ConfigurationTokenize
}
