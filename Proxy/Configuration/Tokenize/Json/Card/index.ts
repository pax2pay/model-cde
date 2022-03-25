import { Base as CardBase } from "./Base"
import { Expires as CardExpires } from "./Expires"
import { MonthYear as CardMonthYear } from "./MonthYear"

export type Card = CardBase | CardMonthYear | CardExpires

export namespace Card {
	export type Base = CardBase
	export const Base = CardBase
	export type MonthYear = CardMonthYear
	export const MonthYear = CardMonthYear
	export type Expires = CardExpires
	export const Expires = CardExpires
}
