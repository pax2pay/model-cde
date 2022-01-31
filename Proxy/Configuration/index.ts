import { Request as ConfigurationRequest } from "./Request"
import { Response as ConfigurationResponse } from "./Response"

export type Configuration = NormalConfiguration | ReverseConfiguration

interface NormalConfiguration {
	id: string
	request: ConfigurationRequest
	response: ConfigurationResponse.Json
}

interface ReverseConfiguration {
	id: string
	request: ConfigurationRequest
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
