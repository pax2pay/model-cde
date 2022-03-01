import { Request as ConfigurationRequest } from "./Request"
import { Response as ConfigurationResponse } from "./Response"

export interface Configuration {
	id: string
	request: ConfigurationRequest
	response?: ConfigurationResponse.Json
}

export namespace Configuration {
	export type Request = ConfigurationRequest
	export type Response = ConfigurationResponse
	export namespace Response {
		export type Json = ConfigurationResponse.Json
		export namespace Json {
			export const extract = ConfigurationResponse.Json.extract
			export const process = ConfigurationResponse.Json.process
		}
	}
}
