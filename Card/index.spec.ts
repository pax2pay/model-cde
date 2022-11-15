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
		expect(
			model.Card.is({
				// too short
				pan: "411111111111111",
				csc: "987",
				expires: [2, 22],
			})
		).toEqual(false)
	})

	it("is, expiry [0,0]", () => {
		expect(
			model.Card.is({
				pan: "5555555555555555",
				csc: "333",
				expires: [0, 0],
			})
		).toEqual(true)
	})
	it("Token.is", () => {
		const token = "4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		expect(model.Card.Token.is(token)).toEqual(true)
	})
	it("Token.is 8 digit bin", () => {
		const token = "456789117890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		expect(model.Card.Token.is(token)).toEqual(true)
	})
	it("Token.is w/ part", () => {
		const token = "4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
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
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual("4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ")
	})
	it("Token.pack 8 digit bin", () => {
		expect(
			model.Card.Token.pack(
				{
					pan: "1111111112345890",
					csc: "987",
					expires: [2, 21],
				},
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual("111111115890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ")
	})
	it("Token.unpack", () => {
		const token = "4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		expect(model.Card.Token.unpack(token)).toEqual({
			masked: "456789******7890",
			iin: "456789",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: undefined,
		})
	})
	it("Token.unpack 8 digit bin", () => {
		const token = "111111117890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		expect(model.Card.Token.unpack(token)).toEqual({
			masked: "11111111****7890",
			iin: "11111111",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: undefined,
		})
	})
	it("Token.unpack splitted", () => {
		expect(
			model.Card.Token.unpack(
				"4567897890",
				"16",
				"0221",
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual({
			masked: "456789******7890",
			iin: "456789",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: undefined,
		})
	})
	it("Token.unpack splitted 8 digit bin", () => {
		expect(
			model.Card.Token.unpack(
				"111111117890",
				"16",
				"0221",
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual({
			masked: "11111111****7890",
			iin: "11111111",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: undefined,
		})
	})
	it("Token.unpack splitted w/ part", () => {
		expect(
			model.Card.Token.unpack(
				"4567897890",
				"16",
				"0221",
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ",
				"pan"
			)
		).toEqual({
			masked: "456789******7890",
			iin: "456789",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: "pan",
		})
	})
	it("Token.unpack splitted w/ part 8 digit bin", () => {
		expect(
			model.Card.Token.unpack(
				"111111117890",
				"16",
				"0221",
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ",
				"pan"
			)
		).toEqual({
			masked: "11111111****7890",
			iin: "11111111",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: "pan",
		})
	})
	it("Token.unpack w/ part", () => {
		const token = "4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.unpack(token)).toEqual({
			masked: "456789******7890",
			iin: "456789",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: "year",
		})
	})
	it("Token.unpack w/ part 8 digit bin", () => {
		const token = "111111117890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.unpack(token)).toEqual({
			masked: "11111111****7890",
			iin: "11111111",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: "year",
		})
	})
	it("Token.is expect true", () => {
		let token = "4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.is(token)).toBeTruthy()
		token = "4567897890/16/0221/211224/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.is(token)).toBeTruthy()
		token = "4567897890/16/0221/240229/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.is(token)).toBeTruthy()
		token = "4567897890/16/0221/220115/hgUVP-7IwsW963dqwG0sop71sE4F5rCMJ85DJYnwWeGVYdXp/EfyBTD89WFZOfGGq4UGg-w"
		expect(model.Card.Token.is(token)).toBeTruthy()
		token = "411111111111/10/0212/220901/6_jZdzSHypjr2qMsHT8WNI_Hziz3wp2bl_ZRQr14/OTKZcllvfoOsWFw3UFu4XA"
		expect(model.Card.Token.is(token)).toBeTruthy()
		token = "411111111111/10/0212/220901/6_jZdzSHypjr2qMsHT8WNI_Hziz3wp2bl_ZRQr14/OTKZcllvfoOsWFw3UFu4XA/year"
		expect(model.Card.Token.is(token)).toBeTruthy()
	})
	it("Token.is expect false", () => {
		let token =
			"4567897890/16123/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.is(token)).toBeFalsy()
		token =
			"4567897890/16/0221/211224/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ123aswer12/year"
		expect(model.Card.Token.is(token)).toBeFalsy()
		token =
			"4567897890/16/0221/211224/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBsdhehaehBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.is(token)).toBeFalsy()
		token = "4567897890/16/0221/21122/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.is(token)).toBeFalsy()
		token =
			"456789789012341254/16/0221/211224/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.is(token)).toBeFalsy()
	})
})
