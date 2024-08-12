import { pax2pay } from "../../index"

describe("Card.Expires", () => {
	it("is [12, 24]", () => expect(pax2pay.cde.Card.Expires.is([12, 24])).toEqual(true))
	it("is [1, 24]", () => expect(pax2pay.cde.Card.Expires.is([1, 24])).toEqual(true))
	it("is not [13, 26]", () => expect(pax2pay.cde.Card.Expires.is([13, 26])).toEqual(false))
	it("is not [1, 2026]", () => expect(pax2pay.cde.Card.Expires.is([1, 2026])).toEqual(false))
	it("parse 12-24", () => expect(pax2pay.cde.Card.Expires.parse("12-24")).toEqual([12, 24]))

	it("parse 12.24", () => expect(pax2pay.cde.Card.Expires.parse("12.24")).toEqual([12, 24]))

	it("parse 12/24", () => expect(pax2pay.cde.Card.Expires.parse("12/24")).toEqual([12, 24]))
	it("parse 1224", () => expect(pax2pay.cde.Card.Expires.parse("1224")).toEqual([12, 24]))

	it("parse 122", () => expect(pax2pay.cde.Card.Expires.parse("122")).toEqual([1, 22]))
	it("parse 5/2023", () => expect(pax2pay.cde.Card.Expires.parse("5/2023")).toEqual([5, 23]))
	it("parse 52023", () => expect(pax2pay.cde.Card.Expires.parse("52023")).toEqual([5, 23]))

	it("parse 2033-07-01", () => expect(pax2pay.cde.Card.Expires.parse("2033-07-01")).toEqual([7, 33]))
	it("parse 2033-07-01T12:34:56", () => expect(pax2pay.cde.Card.Expires.parse("2033-07-01T12:34:56")).toEqual([7, 33]))

	//year first value
	it("parse 24-12", () => expect(pax2pay.cde.Card.Expires.parse("24-12", false)).toEqual([12, 24]))

	it("parse 24.12", () => expect(pax2pay.cde.Card.Expires.parse("24.12", false)).toEqual([12, 24]))

	it("parse 24/12", () => expect(pax2pay.cde.Card.Expires.parse("24/12", false)).toEqual([12, 24]))
	it("parse 2412", () => expect(pax2pay.cde.Card.Expires.parse("2412", false)).toEqual([12, 24]))

	it("parse 221", () => expect(pax2pay.cde.Card.Expires.parse("221", false)).toEqual([1, 22]))
	it("parse 2023/5", () => expect(pax2pay.cde.Card.Expires.parse("2023/5", false)).toEqual([5, 23]))
	it("parse 20235", () => expect(pax2pay.cde.Card.Expires.parse("20235", false)).toEqual([5, 23]))
})
