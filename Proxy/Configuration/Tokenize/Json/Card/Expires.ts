import { Selector } from "../../../../Selector"
import { Base } from "./Base"

export interface Expires extends Base {
	expires: Selector
}
export namespace Expires {
	export function is(value: Expires | any): value is Expires {
		return typeof value == "object" && value.expires && Selector.is(value.expires) && Base.is(value)
	}
}
