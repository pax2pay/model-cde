import { pax2pay } from "../../../../../index"
import { configurations } from "./configurations"
import { dataset, jsons } from "./dataset"

describe("pax2pay.cde.Proxy.Configuration.Tokenize.Json", () => {
	it("set ", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(
			configurations.monthYear,
			dataset.cardModelFormat
		)
		expect(card).toEqual(dataset.cardModelFormat.card)
		const token: pax2pay.cde.Card.Token =
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		const processed = pax2pay.cde.Proxy.Configuration.Tokenize.Json.process(
			configurations.monthYear,
			token,
			dataset.cardModelFormat
		)
		expect(processed).toEqual({
			card: {
				expires: [2, 22],
				pan: "456789******7890",
				token: "4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ",
			},
		})
	})

	it("process to encrypted ", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(
			configurations.encrypted,
			dataset.cardModelFormat
		)
		expect(card).toEqual(dataset.cardModelFormat.card)
		const token: pax2pay.cde.Card.Token =
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		const processed = pax2pay.cde.Proxy.Configuration.Tokenize.Json.process(
			configurations.encrypted,
			token,
			dataset.cardModelFormat
		)
		expect(processed).toEqual({
			card: {
				expires: [2, 22],
				pan: "456789******7890",
				token: "0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			},
		})
	})

	it("process, masked and encrypted as pan", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(
			configurations.maskedAndEncrypted,
			dataset.cardModelFormat
		)
		expect(card).toEqual(dataset.cardModelFormat.card)
		const token: pax2pay.cde.Card.Token =
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		const processed = pax2pay.cde.Proxy.Configuration.Tokenize.Json.process(
			configurations.maskedAndEncrypted,
			token,
			dataset.cardModelFormat
		)
		expect(processed).toEqual({
			card: {
				expires: [2, 22],
				pan: "456789******7890/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg",
			},
		})
	})

	it("process, whole token + ***", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(
			configurations.modulrToken,
			dataset.cardModulrNames
		)
		expect(card).toEqual({ pan: "4567890123457890", csc: "987", expires: [0, 0] })
		const token: pax2pay.cde.Card.Token =
			"4567897890/16/0000/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		const processed = pax2pay.cde.Proxy.Configuration.Tokenize.Json.process(
			configurations.modulrToken,
			token,
			dataset.cardModulrNames
		)
		expect(processed).toEqual({
			pan: "4567897890/16/0000/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ",
			cvv2: "***",
		})
	})

	it("extract, date list string 2, 22", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(
			configurations.monthYear,
			dataset.cardExpiryListString
		)
		expect(pax2pay.cde.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string -", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(
			configurations.expires,
			dataset.cardExpiryStringDash
		)
		expect(pax2pay.cde.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string .", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(
			configurations.expires,
			dataset.cardExpiryStringDot
		)
		expect(pax2pay.cde.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string /", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(
			configurations.expires,
			dataset.cardExpiryStringSlash
		)
		expect(pax2pay.cde.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string 222", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(
			configurations.expires,
			dataset.cardExpiryStringConcat
		)
		expect(pax2pay.cde.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date list string 2, 2022", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(
			configurations.monthYear,
			dataset.cardExpiryListStringFullYear
		)
		expect(pax2pay.cde.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date list number 2, 2022", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(
			configurations.monthYear,
			dataset.cardExpiryListFullYear
		)
		expect(pax2pay.cde.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, without expiry", () => {
		const card = pax2pay.cde.Proxy.Configuration.Tokenize.Json.extract(configurations.noExpires, dataset.cardNoExpiry)
		expect(pax2pay.cde.Card.is(card))
		expect(card).toEqual({
			pan: "1234123412341234",
			csc: "123",
			expires: [0, 0],
		})
	})

	it("is", async () => {
		expect(
			jsons.map(item => pax2pay.cde.Proxy.Configuration.Tokenize.Json.is(item)).every(item => item == true)
		).toBeTruthy()
		expect(
			pax2pay.cde.Proxy.Configuration.Tokenize.Json.is({
				type: "json",
				card: {
					pan: "pan",
					csc: "cvv2",
				},
				set: [
					{
						find: "pan",
						value: "$(masked)",
					},
					"cvv2",
					{
						find: "token",
						value: "$(token)",
					},
					{
						find: "encrypted",
						value: "$(encrypted)",
					},
				],
			})
		).toBeTruthy()
	})
})
