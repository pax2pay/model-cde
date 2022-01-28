import { Json as ResponseJson } from "./Json"

export type Response = ResponseJson

export namespace Response {
	export type Json = ResponseJson
	export namespace Json {
		export const fromToken = ResponseJson.fromToken
		export const extract = ResponseJson.extract
		export const process = ResponseJson.process
	}
}
