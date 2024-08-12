import { Pattern } from "../../../../Pattern"
import { Base } from "./Base"

export interface Expires extends Base {
	expires: Pattern | [Pattern, "YYMM" | "MMYY"]
}
export namespace Expires {
	export function is(value: Expires | any): value is Expires {
		return (
			typeof value == "object" &&
			value.expires &&
			(Pattern.is(value.expires) ||
				(Array.isArray(value.expires) &&
					value.expires.length == 2 &&
					Pattern.is(value.expires[0]) &&
					(value.expires[1] == "YYMM" || value.expires[1] == "MMYY"))) &&
			Base.is(value)
		)
	}
}
