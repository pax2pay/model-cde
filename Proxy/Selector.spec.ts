import * as model from "../index"

describe("@pax2pay/model.Proxy.Selector", () => {
	;[
		[{ foo: { bar: 42 } }, "foo.bar", 42] as const,
		[{ foo: { bar: [{}, { value: 42 }] } }, "foo.bar[1].value", 42] as const,
		[{ foo: { bar: [[{}], [{ value: 42 }]] } }, "foo.bar[1][0].value", 42] as const,
	].map(([data, selector, expected]) =>
		it("get " + selector, () => expect(model.Proxy.Selector.get(data, selector)).toEqual(expected))
	)
	;[
		[{ foo: { bar: 42 } }, "foo.bar", "1337", { foo: { bar: "1337" } }] as const,
		[
			{ foo: { bar: [{}, { value: 42 }] } },
			"foo.bar[1].value",
			"1337",
			{ foo: { bar: [{}, { value: "1337" }] } },
		] as const,
		[
			{ foo: { bar: [[{}], [{ value: 42 }]] } },
			"foo.bar[1][0].value",
			"1337",
			{ foo: { bar: [[{}], [{ value: "1337" }]] } },
		] as const,
	].map(([data, selector, value, expected]) =>
		it("set " + selector, () => expect(model.Proxy.Selector.set(data, selector, value)).toEqual(expected))
	)
})
