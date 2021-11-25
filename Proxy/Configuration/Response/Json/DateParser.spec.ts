import * as model from "../../../../index"

describe("dates separated by char", () => {
	it("-", () => {
		const date = "12-24"
		const month = model.Proxy.Configuration.Response.DateParser.parseMonth(date)
		const year = model.Proxy.Configuration.Response.DateParser.parseYear(date)

		expect(month).toEqual(12)
		expect(year).toEqual(24)
	})

	it(".", () => {
		const date = "12.24"
		const month = model.Proxy.Configuration.Response.DateParser.parseMonth(date)
		const year = model.Proxy.Configuration.Response.DateParser.parseYear(date)

		expect(month).toEqual(12)
		expect(year).toEqual(24)
	})

	it("/", () => {
		const date = "12/24"
		const month = model.Proxy.Configuration.Response.DateParser.parseMonth(date)
		const year = model.Proxy.Configuration.Response.DateParser.parseYear(date)

		expect(month).toEqual(12)
		expect(year).toEqual(24)
	})
})

describe("non-separated date", () => {
	it("1224", () => {
		const date = "1224"
		const month = model.Proxy.Configuration.Response.DateParser.parseMonth(date)
		const year = model.Proxy.Configuration.Response.DateParser.parseYear(date)

		expect(month).toEqual(12)
		expect(year).toEqual(24)
	})

	it("122", () => {
		const date = "122"
		const month = model.Proxy.Configuration.Response.DateParser.parseMonth(date)
		const year = model.Proxy.Configuration.Response.DateParser.parseYear(date)

		expect(month).toEqual(1)
		expect(year).toEqual(22)
	})
})
