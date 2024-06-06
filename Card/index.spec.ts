import { pax2pay } from "../index"

describe("@pax2pay/model.Card", () => {
	it("is", () =>
		expect(
			pax2pay.cde.Card.is({
				pan: "4111111111111111",
				csc: "987",
				expires: [2, 22],
			})
		).toEqual(true))
	it("flaw", () =>
		expect(
			pax2pay.cde.Card.flaw({
				pan: "4111111111111111",
				csc: "987",
				expires: [2, 22],
			})
		).toMatchInlineSnapshot(`
{
  "isFlaw": false,
  "message": "This type is correct.",
  "type": "pax2pay.cde.Card",
}
`))

	it("is, expiry [0,0]", () =>
		expect(
			pax2pay.cde.Card.is({
				pan: "5555555555555555",
				csc: "333",
				expires: [0, 0],
			})
		).toEqual(true))
})
