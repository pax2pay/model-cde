import { Response as ConfigurationResponse } from "./Response"
import { Tokenize as ConfigurationTokenize } from "./Tokenize"

export interface Configuration {
	authentication?: string | (string | undefined)[]
	url: string
	request?: ConfigurationTokenize.Json | ConfigurationResponse.Text | "detokenize"
	response?: ConfigurationTokenize.Json | ConfigurationResponse.Text | "detokenize"
}

export namespace Configuration {
	export type Tokenize = ConfigurationTokenize
	export const Tokenize = ConfigurationTokenize
	export type Response = ConfigurationResponse
	export namespace Response {
		export type Json = ConfigurationResponse.Json
		export namespace Json {
			export const is = ConfigurationResponse.Json.is
			export const extract = ConfigurationResponse.Json.extract
			export const process = ConfigurationResponse.Json.process
		}
		export type Text = ConfigurationResponse.Text
		export namespace Text {
			export const is = ConfigurationResponse.Text.is
			export const extract = ConfigurationResponse.Text.extract
			export const process = ConfigurationResponse.Text.process
		}
	}
}
