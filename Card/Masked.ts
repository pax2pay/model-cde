import { Expires } from "./Expires"

export interface Masked {
	masked: string
	expires: Expires
}
export namespace Masked {
	export function is(value: Masked | any): value is Masked {
		return typeof value == "object" && typeof value.masked == "string" && Expires.is(value.expires)
	}
}
