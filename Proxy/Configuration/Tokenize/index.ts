import { Json as TokenizeJson } from "./Json"
import { Text as TokenizeText } from "./Text"

export type Tokenize = TokenizeJson

export namespace Tokenize {
	export type Json = TokenizeJson
	export const Json = TokenizeJson
	export type Text = TokenizeText
	export const Text = TokenizeText
}
