import { cryptly } from "cryptly"
import * as gracely from "gracely"
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
					pan: "4556180012345890",
					csc: "987",
					expires: [2, 21],
				},
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual("455618005890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ")
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
		const token = "455618007890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		expect(model.Card.Token.unpack(token)).toEqual({
			masked: "45561800****7890",
			iin: "45561800",
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
				"455618007890",
				"16",
				"0221",
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual({
			masked: "45561800****7890",
			iin: "45561800",
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
				"455618007890",
				"16",
				"0221",
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ",
				"pan"
			)
		).toEqual({
			masked: "45561800****7890",
			iin: "45561800",
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
		const token =
			"455618007890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.unpack(token)).toEqual({
			masked: "45561800****7890",
			iin: "45561800",
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
		//RSA keyname
		token = "411111111111/10/0212/RSAasdf/6_jZdzSHypjr2qMsHT8WNI_Hziz3wp2bl_ZRQr14/OTKZcllvfoOsWFw3UFu4XA"
		expect(model.Card.Token.is(token)).toBeTruthy()
	})
	it("Token.is expect false", () => {
		let token =
			"4567897890/16123/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.is(token)).toBeFalsy()
		token = "4567897890/16/0221/21122/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.is(token)).toBeFalsy()
		token =
			"456789789012341254/16/0221/211224/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		expect(model.Card.Token.is(token)).toBeFalsy()
		//keyname too long
		token = "411111111111/10/0212/RSAasdfg/6_jZdzSHypjr2qMsHT8WNI_Hziz3wp2bl_ZRQr14/OTKZcllvfoOsWFw3UFu4XA"
		expect(model.Card.Token.is(token)).toBeFalsy()
		//keyname contains invalid characters
		token = "411111111111/10/0212/RSA+123/6_jZdzSHypjr2qMsHT8WNI_Hziz3wp2bl_ZRQr14/OTKZcllvfoOsWFw3UFu4XA"
		expect(model.Card.Token.is(token)).toBeFalsy()
	})
	it("Token.globalPattern.match", async () => {
		const token = "4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"

		let textContainingToken = token
		expect(model.Card.Token.globalPattern.test(textContainingToken)).toBeTruthy()
		let match = textContainingToken.match(model.Card.Token.globalPattern)
		expect(match).toHaveLength(1)
		expect(match?.[0]).toEqual(
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		)

		textContainingToken = "asd " + textContainingToken + "qwe"
		match = textContainingToken.match(model.Card.Token.globalPattern)
		expect(match).toHaveLength(1)
		expect(match?.[0]).toEqual(
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		)

		textContainingToken = textContainingToken + "\n asdqweqweqweqweasd \n " + token
		match = textContainingToken.match(model.Card.Token.globalPattern)
		expect(match).toHaveLength(2)
		expect(match?.[0]).toEqual(
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		)
		expect(match?.[1]).toEqual(
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		)

		const stringWithoutToken = "sdiufhsdifhdsif"
		match = stringWithoutToken.match(model.Card.Token.globalPattern)
		expect(match).toBeNull()
	})
})

describe("@pax2pay/model.Card.Tokenizer + Detokenizer", () => {
	it("Rsa tokenize + detokenize", async () => {
		const encrypter = cryptly.Encrypter.Rsa.generate(2048)
		const tokenizer = new model.Card.Tokenizer.Rsa(encrypter)
		const token = await tokenizer.tokenize({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 21],
		})
		if (gracely.Error.is(token))
			fail(token.error)
		else {
			expect(model.Card.Token.is(token)).toEqual(true)
			const detokenizer = new model.Card.Detokenizer.Rsa(encrypter)
			const card = token && (await detokenizer.detokenize(token))
			expect(card).toMatchObject({
				pan: "4567890123457890",
				masked: "456789******7890",
				csc: "987",
				expires: [2, 21],
			})
		}
	})
})
