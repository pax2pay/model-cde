import { Request as ConfigurationRequest } from "./Request"
import { Response as ConfigurationResponse } from "./Response"

export interface Configuration {
	id: string
	request: ConfigurationRequest
	response: ConfigurationResponse.Json | ConfigurationResponse.Text
}

export namespace Configuration {
	export type Request = ConfigurationRequest
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
