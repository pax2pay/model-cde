import { Tokenize as ConfigurationTokenize } from "./Tokenize"

export interface Configuration {
	authentication?: string | (string | undefined)[]
	proxyAuthentication?: string
	additionalHeaders?: Record<string, string>
	url: string
	request?: ConfigurationTokenize.Json | ConfigurationTokenize.Text | "detokenize"
	response?: ConfigurationTokenize.Json | ConfigurationTokenize.Text | "detokenize"
}

export namespace Configuration {
	export type Tokenize = ConfigurationTokenize
	export const Tokenize = ConfigurationTokenize
}
