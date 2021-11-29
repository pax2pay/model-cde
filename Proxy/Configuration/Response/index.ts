import { Json as ResponseJson } from "./Json"
import { Text as ResponseText } from "./Text"

export type Response = ResponseJson

export namespace Response {
	export type Json = ResponseJson
	export namespace Json {
		export const extract = ResponseJson.extract
		export const process = ResponseJson.process
	}
	export type Text = ResponseText
	export namespace Text {
		export const extract = ResponseText.extract
		export const process = ResponseText.process
	}
}
