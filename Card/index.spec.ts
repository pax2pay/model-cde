import * as model from "../index"

describe("@pax2pay/model.Card", () => {
	it("is", () => {
		expect(
			model.Card.is({
				pan: "4111111111111111",
				csc: "987",
				expires: [2, 22],
			})
		).toEqual(true)
	})
	it("Token.is", () => {
		const token = "4567897890/16/0221/1336/abcdefgh/ABCDEFGH"
		expect(model.Card.Token.is(token)).toEqual(true)
	})
	it("Token.is w/ part", () => {
		const token = "4567897890/16/0221/1336/abcdefgh/ABCDEFGH/csc"
		expect(model.Card.Token.is(token)).toEqual(true)
	})
	it("Token.pack", () => {
		expect(
			model.Card.Token.pack(
				{
					pan: "4567890123457890",
					csc: "987",
					expires: [2, 21],
				},
				"1336",
				"abcdefgh",
				"ABCDEFGH"
			)
		).toEqual("4567897890/16/0221/1336/abcdefgh/ABCDEFGH")
	})
	it("Token.unpack", () => {
		const token = "4567897890/16/0221/1336/abcdefgh/ABCDEFGH"
		expect(model.Card.Token.unpack(token)).toEqual({
			masked: "456789******7890",
			expires: [2, 21],
			key: "1336",
			encrypted: "abcdefgh",
			salt: "ABCDEFGH",
			part: undefined,
		})
	})
	it("Token.unpack splitted", () => {
		expect(model.Card.Token.unpack("4567897890", "16", "0221", "1336", "abcdefgh", "ABCDEFGH")).toEqual({
			masked: "456789******7890",
			expires: [2, 21],
			key: "1336",
			encrypted: "abcdefgh",
			salt: "ABCDEFGH",
			part: undefined,
		})
	})
	it("Token.unpack splitted w/ part", () => {
		expect(model.Card.Token.unpack("4567897890", "16", "0221", "1336", "abcdefgh", "ABCDEFGH", "pan")).toEqual({
			masked: "456789******7890",
			expires: [2, 21],
			key: "1336",
			encrypted: "abcdefgh",
			salt: "ABCDEFGH",
			part: "pan",
		})
	})
	it("Token.unpack w/ part", () => {
		const token = "4567897890/16/0221/1336/abcdefgh/ABCDEFGH/year"
		expect(model.Card.Token.unpack(token)).toEqual({
			masked: "456789******7890",
			expires: [2, 21],
			key: "1336",
			encrypted: "abcdefgh",
			salt: "ABCDEFGH",
			part: "year",
		})
	})
})
