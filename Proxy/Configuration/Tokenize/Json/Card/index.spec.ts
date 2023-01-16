import { Card } from "./index"

const baseCard = {
	pan: "cardnumber",
	csc: "cvv",
}

const monthYearCard = {
	...baseCard,
	month: "expires.month",
	year: "expires.year",
}

const expiresCard = {
	...baseCard,
	expires: "expiryDate",
}

describe("Proxy.Configuration.Tokenize.Json.Card", () => {
	it("Base.is", async () => {
		expect(Card.Base.is(baseCard)).toBeTruthy()
	})
	it("MonthYear is", async () => {
		expect(Card.MonthYear.is(baseCard)).toBeFalsy()
		expect(Card.MonthYear.is(expiresCard)).toBeFalsy()
		expect(Card.MonthYear.is(monthYearCard)).toBeTruthy()
	})
	it("Expires.is", async () => {
		expect(Card.Expires.is(baseCard)).toBeFalsy()
		expect(Card.Expires.is(monthYearCard)).toBeFalsy()
		expect(Card.Expires.is(expiresCard)).toBeTruthy()
	})
})
