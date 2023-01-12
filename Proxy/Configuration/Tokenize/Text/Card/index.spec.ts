import { Card } from "./index"

const baseCard = {
	pan: "cardnumber",
	csc: "cvv",
}

const baseCardOnlyNumber = {
	pan: "cardNumber",
}

const monthYearCard = {
	...baseCard,
	month: "expires.month",
	year: "expires.year",
}

const monthYearCardOnlyNumber = {
	...baseCardOnlyNumber,
	month: "expires.month",
	year: "expires.year",
}

const expiresCard = {
	...baseCard,
	expires: "expiryDate",
}

const expiresCardOnlyNumber = {
	...baseCardOnlyNumber,
	expires: "expiryDate",
}

describe("Proxy.Configuration.Tokenize.Json.Card", () => {
	it("Base.is", async () => {
		expect(Card.Base.is(baseCard)).toBeTruthy()
		expect(Card.Base.is(baseCardOnlyNumber))
	})
	it("MonthYear is", async () => {
		expect(Card.MonthYear.is(baseCard)).toBeFalsy()
		expect(Card.MonthYear.is(baseCardOnlyNumber)).toBeFalsy()
		expect(Card.MonthYear.is(expiresCard)).toBeFalsy()
		expect(Card.MonthYear.is(expiresCardOnlyNumber)).toBeFalsy()
		expect(Card.MonthYear.is(monthYearCard)).toBeTruthy()
		expect(Card.MonthYear.is(monthYearCardOnlyNumber)).toBeTruthy()
	})
	it("Expires.is", async () => {
		expect(Card.Expires.is(baseCard)).toBeFalsy()
		expect(Card.Expires.is(baseCardOnlyNumber)).toBeFalsy()
		expect(Card.Expires.is(monthYearCard)).toBeFalsy()
		expect(Card.Expires.is(monthYearCardOnlyNumber)).toBeFalsy()
		expect(Card.Expires.is(expiresCard)).toBeTruthy()
		expect(Card.Expires.is(expiresCardOnlyNumber)).toBeTruthy()
	})
})
