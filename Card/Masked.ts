import { Expires } from "./Expires"

export interface Masked {
	masked: string
	iin: string
	last4: string
	expires: Expires
}
export namespace Masked {
	export function is(value: Masked | any): value is Masked {
		return (
			typeof value == "object" &&
			typeof value.masked == "string" &&
			typeof value.iin == "string" &&
			typeof value.last4 == "string" &&
			Expires.is(value.expires)
		)
	}
}
