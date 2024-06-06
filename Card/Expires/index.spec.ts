import { pax2pay } from "../../index"

describe("Card.Expires", () => {
	it("parse 12-24", () => expect(pax2pay.cde.Card.Expires.parse("12-24")).toEqual([12, 24]))

	it("parse 12.24", () => expect(pax2pay.cde.Card.Expires.parse("12.24")).toEqual([12, 24]))

	it("parse 12/24", () => expect(pax2pay.cde.Card.Expires.parse("12/24")).toEqual([12, 24]))
	it("parse 1224", () => expect(pax2pay.cde.Card.Expires.parse("1224")).toEqual([12, 24]))
	it("parse 1224", () => expect(pax2pay.cde.Card.Expires.parse("1224")).toEqual([12, 24]))

	it("parse 122", () => expect(pax2pay.cde.Card.Expires.parse("122")).toEqual([1, 22]))
	it("parse 5/2023", () => expect(pax2pay.cde.Card.Expires.parse("5/2023")).toEqual([5, 23]))
	it("parse 52023", () => expect(pax2pay.cde.Card.Expires.parse("52023")).toEqual([5, 23]))

	it("parse 2033-07-01", () => expect(pax2pay.cde.Card.Expires.parse("2033-07-01")).toEqual([7, 33]))
	it("parse 2033-07-01T12:34:56", () => expect(pax2pay.cde.Card.Expires.parse("2033-07-01T12:34:56")).toEqual([7, 33]))
})
