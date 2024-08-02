import { Plain as ConfigPlain } from "../Configuration/Tokenize/Text/Plain"
import { Xml as ConfigXml } from "../Configuration/Tokenize/Text/Xml"
import { Plain as PatternPlain } from "./Plain"
import { Xml as PatternXml } from "./Xml"

export type Pattern = RegExp | string

export namespace Pattern {
	export function is(value: Pattern | any): value is Pattern {
		return typeof value == "string" || value instanceof RegExp
	}

	export function forConfiguration(configuration: ConfigXml | ConfigPlain): PatternPlain | PatternXml {
		return ConfigPlain.is(configuration) ? new PatternPlain(configuration) : new PatternXml()
	}

	export type Plain = PatternPlain
	export const Plain = PatternPlain
	export type Xml = PatternXml
	export const Xml = PatternXml
}
