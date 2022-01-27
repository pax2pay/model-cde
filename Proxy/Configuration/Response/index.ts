import { Json as ResponseJson } from "./Json"

export type Response = ResponseJson

export namespace Response {
	export type Json = ResponseJson
	export namespace Json {
		export const reverseProcess = ResponseJson.reverseProcess
		export const extract = ResponseJson.extract
		export const process = ResponseJson.process
	}
}
