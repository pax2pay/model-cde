import { Selector } from "../../../../Selector"
import { Base } from "./Base"

export interface Expires extends Base {
	expires: Selector | [Selector, "YYMM" | "MMYY"]
}
export namespace Expires {
	export function is(value: Expires | any): value is Expires {
		return (
			typeof value == "object" &&
			value.expires &&
			(Selector.is(value.expires) ||
				(Array.isArray(value.expires) &&
					value.expires.length == 2 &&
					Selector.is(value.expires[0]) &&
					(value.expires[1] == "YYMM" || value.expires[1] == "MMYY"))) &&
			Base.is({ ...value })
		)
	}
}
