import { Pattern } from "../../.."

interface CardBase {
	pan: Pattern
	csc: Pattern
}
namespace CardBase {
	export function is(value: CardBase | any): value is CardBase {
		return typeof value == "object" && value.pan && Pattern.is(value.pan) && value.csc && Pattern.is(value.csc)
	}
}

interface CardMonthYear extends CardBase {
	month: Pattern
	year: Pattern
}
namespace CardMonthYear {
	export function is(value: CardMonthYear | any): value is CardMonthYear {
		return (
			typeof value == "object" &&
			value.pan &&
			Pattern.is(value.pan) &&
			value.csc &&
			Pattern.is(value.csc) &&
			value.month &&
			Pattern.is(value.month) &&
			value.year &&
			Pattern.is(value.year)
		)
	}
}

interface CardExpires extends CardBase {
	expires: Pattern
}
namespace CardExpires {
	export function is(value: CardExpires | any): value is CardExpires {
		return (
			typeof value == "object" &&
			value.pan &&
			Pattern.is(value.pan) &&
			value.csc &&
			Pattern.is(value.csc) &&
			value.expires &&
			Pattern.is(value.expires)
		)
	}
}

export interface Text {
	card: CardBase | CardMonthYear | CardExpires
	set: (
		| {
				find: Pattern
				value?: string
		  }
		| string
	)[]
}
