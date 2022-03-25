import { Base } from "./Base"
import { Expires } from "./Expires"
import { MonthYear } from "./MonthYear"

export type Card = Base | MonthYear | Expires
