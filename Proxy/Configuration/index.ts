import { Tokenize as ConfigurationTokenize } from "./Tokenize"

export interface Configuration {
	authentication?: string | (string | undefined)[]
	url: string
	request?: ConfigurationTokenize.Json | "detokenize"
	response?: ConfigurationTokenize.Json | "detokenize"
}

export namespace Configuration {
	export type Tokenize = ConfigurationTokenize
	export const Tokenize = ConfigurationTokenize
}
