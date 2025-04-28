import { pax2pay } from "../../index"

describe("@pax2pay/model.Card.Token", () => {
	it("is", () =>
		expect(
			pax2pay.cde.Card.Token.is(
				"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual(true))
	it("is 8 digit bin", () =>
		expect(
			pax2pay.cde.Card.Token.is(
				"456789117890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual(true))
	it("is w/ part", () =>
		expect(
			pax2pay.cde.Card.Token.is(
				"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual(true))
	it("pack", () =>
		expect(
			pax2pay.cde.Card.Token.pack(
				{
					pan: "4567890123457890",
					csc: "987",
					expires: [2, 21],
				},
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual("4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"))
	it("pack 8 digit bin", () => {
		expect(
			pax2pay.cde.Card.Token.pack(
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
		expect(
			pax2pay.cde.Card.Token.pack(
				{
					pan: "4567255712345890",
					csc: "987",
					expires: [2, 21],
				},
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual("456725575890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ")
	})
	it("unpack", () =>
		expect(
			pax2pay.cde.Card.Token.unpack(
				"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
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
		}))
	it("unpack 8 digit bin", () => {
		expect(
			pax2pay.cde.Card.Token.unpack(
				"455618007890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
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
		expect(
			pax2pay.cde.Card.Token.unpack(
				"456725577890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual({
			masked: "45672557****7890",
			iin: "45672557",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: undefined,
		})
	})
	it("unpack splitted", () =>
		expect(
			pax2pay.cde.Card.Token.unpack(
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
		}))
	it("unpack splitted 8 digit bin", () => {
		expect(
			pax2pay.cde.Card.Token.unpack(
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
		expect(
			pax2pay.cde.Card.Token.unpack(
				"456725577890",
				"16",
				"0221",
				"1354",
				"0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
				"FlBUNQjpk4R9g_dcw6WYzQ"
			)
		).toEqual({
			masked: "45672557****7890",
			iin: "45672557",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: undefined,
		})
	})
	it("unpack splitted w/ part", () =>
		expect(
			pax2pay.cde.Card.Token.unpack(
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
		}))
	it("unpack splitted w/ part 8 digit bin", () =>
		expect(
			pax2pay.cde.Card.Token.unpack(
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
		}))
	it("unpack w/ part", () =>
		expect(
			pax2pay.cde.Card.Token.unpack(
				"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
			)
		).toEqual({
			masked: "456789******7890",
			iin: "456789",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: "year",
		}))
	it("unpack w/ part 8 digit bin", () =>
		expect(
			pax2pay.cde.Card.Token.unpack(
				"455618007890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
			)
		).toEqual({
			masked: "45561800****7890",
			iin: "45561800",
			last4: "7890",
			expires: [2, 21],
			key: "1354",
			encrypted: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			salt: "FlBUNQjpk4R9g_dcw6WYzQ",
			part: "year",
		}))
	it("is expect true", () => {
		expect(
			pax2pay.cde.Card.Token.is(
				"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
			)
		).toBeTruthy()
		expect(
			pax2pay.cde.Card.Token.is(
				"4567897890/16/0221/211224/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
			)
		).toBeTruthy()
		expect(
			pax2pay.cde.Card.Token.is(
				"4567897890/16/0221/240229/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
			)
		).toBeTruthy()
		expect(
			pax2pay.cde.Card.Token.is(
				"4567897890/16/0221/220115/hgUVP-7IwsW963dqwG0sop71sE4F5rCMJ85DJYnwWeGVYdXp/EfyBTD89WFZOfGGq4UGg-w"
			)
		).toBeTruthy()
		expect(
			pax2pay.cde.Card.Token.is(
				"411111111111/10/0212/220901/6_jZdzSHypjr2qMsHT8WNI_Hziz3wp2bl_ZRQr14/OTKZcllvfoOsWFw3UFu4XA"
			)
		).toBeTruthy()
		expect(
			pax2pay.cde.Card.Token.is(
				"411111111111/10/0212/220901/6_jZdzSHypjr2qMsHT8WNI_Hziz3wp2bl_ZRQr14/OTKZcllvfoOsWFw3UFu4XA/year"
			)
		).toBeTruthy()
		//RSA key name
		expect(
			pax2pay.cde.Card.Token.is(
				"411111111111/10/0212/RSAasdf/6_jZdzSHypjr2qMsHT8WNI_Hziz3wp2bl_ZRQr14/OTKZcllvfoOsWFw3UFu4XA"
			)
		).toBeTruthy()
	})
	it("is expect false", () => {
		expect(
			pax2pay.cde.Card.Token.is(
				"4567897890/16123/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
			)
		).toBeFalsy()
		expect(
			pax2pay.cde.Card.Token.is(
				"4567897890/16/0221/21122/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
			)
		).toBeFalsy()
		expect(
			pax2pay.cde.Card.Token.is(
				"456789789012341254/16/0221/211224/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
			)
		).toBeFalsy()
		//key name too long
		expect(
			pax2pay.cde.Card.Token.is(
				"411111111111/10/0212/RSAasdfg/6_jZdzSHypjr2qMsHT8WNI_Hziz3wp2bl_ZRQr14/OTKZcllvfoOsWFw3UFu4XA"
			)
		).toBeFalsy()
		//key name contains invalid characters
		expect(
			pax2pay.cde.Card.Token.is(
				"411111111111/10/0212/RSA+123/6_jZdzSHypjr2qMsHT8WNI_Hziz3wp2bl_ZRQr14/OTKZcllvfoOsWFw3UFu4XA"
			)
		).toBeFalsy()
	})
	it("globalPattern.match", async () => {
		const token = "4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		let textContainingToken = token
		expect(pax2pay.cde.Card.Token.globalPattern.test(textContainingToken)).toBeTruthy()
		let match = textContainingToken.match(pax2pay.cde.Card.Token.globalPattern)
		expect(match).toHaveLength(1)
		expect(match?.[0]).toEqual(
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		)
		textContainingToken = "asd " + textContainingToken + "qwe"
		match = textContainingToken.match(pax2pay.cde.Card.Token.globalPattern)
		expect(match).toHaveLength(1)
		expect(match?.[0]).toEqual(
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		)
		textContainingToken = textContainingToken + "\n asdqweqweqweqweasd \n " + token
		match = textContainingToken.match(pax2pay.cde.Card.Token.globalPattern)
		expect(match).toHaveLength(2)
		expect(match?.[0]).toEqual(
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		)
		expect(match?.[1]).toEqual(
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ/year"
		)
		const stringWithoutToken = "sdiufhsdifhdsif"
		match = stringWithoutToken.match(pax2pay.cde.Card.Token.globalPattern)
		expect(match).toBeNull()
	})
})
