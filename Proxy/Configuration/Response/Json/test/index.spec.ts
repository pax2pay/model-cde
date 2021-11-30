import * as model from "../../../../../index"
import { configurations } from "./configurations"
import { dataset } from "./dataset"

const configuration1 = configurations[0]
const configuration2 = configurations[1]
const configuration3 = configurations[2]
const data1 = dataset[0]
const data2 = dataset[1]
const data3 = dataset[2]
const data4 = dataset[3]
const data5 = dataset[4]
const data6 = dataset[5]
const data7 = dataset[6]
const data8 = dataset[7]
const data9 = dataset[8]
describe("@pax2pay/model.Proxy.Configuration.Response", () => {
	it("set ", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configuration1, data1)
		expect(card).toEqual(data1.card)
		const token: model.Card.Token =
			"4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ"
		const processed = model.Proxy.Configuration.Response.Json.process(configuration1, token, data1)
		expect(processed).toEqual({
			card: {
				expires: [2, 22],
				pan: "456789******7890",
				token: "4567897890/16/0221/1354/0ktG52FXmULx7-3mrj0smEWvJWwuJNA9eQNr8O8kBBKy_gvg/FlBUNQjpk4R9g_dcw6WYzQ",
			},
		})
	})

	it("extract, date list string 2, 22", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configuration1, data2)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string -", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configuration2, data3)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string .", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configuration2, data4)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string /", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configuration2, data5)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date string 222", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configuration2, data6)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date list string 2, 2022", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configuration1, data7)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, date list number 2, 2022", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configuration1, data8)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "4567890123457890",
			csc: "987",
			expires: [2, 22],
		})
	})

	it("extract, without expiry", () => {
		const card = model.Proxy.Configuration.Response.Json.extract(configuration3, data9)
		expect(model.Card.is(card))
		expect(card).toEqual({
			pan: "1234123412341234",
			csc: "123",
			expires: [0, 0],
		})
	})
})
