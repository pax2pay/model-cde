import * as model from "../../../../../index"
import { configurations } from "./configurations"
import { dataset } from "./dataset"

describe("@pax2pay/model.Proxy.Configuration.Response", () => {
	it("set ", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configurations.monthYear, dataset.cardModelFormat)
		expect(card).toEqual(dataset.cardModelFormat.card)
		const token: model.Card.Token =
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		const processed = model.Proxy.Configuration.Response.Json.process(
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
		const card = model.Proxy.Configuration.Response.Json.extract(configurations.encrypted, dataset.cardModelFormat)
		expect(card).toEqual(dataset.cardModelFormat.card)
		const token: model.Card.Token =
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		const processed = model.Proxy.Configuration.Response.Json.process(
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
		const card = model.Proxy.Configuration.Response.Json.extract(
			configurations.maskedAndEncrypted,
			dataset.cardModelFormat
		)
		expect(card).toEqual(dataset.cardModelFormat.card)
		const token: model.Card.Token =
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		const processed = model.Proxy.Configuration.Response.Json.process(
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
		const card = model.Proxy.Configuration.Response.Json.extract(configurations.modulrToken, dataset.cardModulrNames)
		expect(card).toEqual({ pan: "4567890123457890", csc: "987", expires: [0, 0] })
		const token: model.Card.Token =
			"4567897890/16/0000/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		const processed = model.Proxy.Configuration.Response.Json.process(
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
		const card = model.Proxy.Configuration.Response.Json.extract(configurations.monthYear, dataset.cardExpiryListString)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string -", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configurations.expires, dataset.cardExpiryStringDash)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string .", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configurations.expires, dataset.cardExpiryStringDot)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string /", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configurations.expires, dataset.cardExpiryStringSlash)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string 222", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configurations.expires, dataset.cardExpiryStringConcat)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date list string 2, 2022", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(
			configurations.monthYear,
			dataset.cardExpiryListStringFullYear
		)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date list number 2, 2022", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(
			configurations.monthYear,
			dataset.cardExpiryListFullYear
		)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, without expiry", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configurations.noExpires, dataset.cardNoExpiry)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "1234123412341234",
			csc: "123",
			expires: [0, 0],
		})
	})
})
