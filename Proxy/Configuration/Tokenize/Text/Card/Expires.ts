import { Pattern } from "../../../../Pattern"
import { Base } from "./Base"

export interface Expires extends Base {
	expires: Pattern
}
export namespace Expires {
	export function is(value: Expires | any): value is Expires {
		return typeof value == "object" && value.expires && Pattern.is(value.expires) && Base.is(value)
	}
}
