import { Json as ResponseJson } from "./Json"
import { DateParser as JsonDateParser } from "./Json/DateParser"

export type Response = ResponseJson

export namespace Response {
	export type Json = ResponseJson
	export namespace Json {
		export const extract = ResponseJson.extract
		export const process = ResponseJson.process
	}
	export namespace DateParser {
		export const parseMonth = JsonDateParser.parseMonth
		export const parseYear = JsonDateParser.parseYear
	}
}
