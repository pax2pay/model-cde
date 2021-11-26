import * as model from "../index"

describe("@pax2pay/model.Proxy.Selector", () => {
	;[
		"[4]",
		"test[0][1]",
		"list[11].test.foo[24]",
		"test[4]",
		"foo.bar",
		"foo.bar[42]",
		"foo[1337].bar",
		"42",
		"3d.test[0]",
	].map(selector => {
		it("is " + selector, () => expect(model.Proxy.Selector.is(selector)).toEqual(true))
	})
	;["[4a]", "test[a0][1]", "list[11.test.foo[24]", "test4]", "foo-bar"].map(selector => {
		it("is not " + selector, () => expect(model.Proxy.Selector.is(selector)).toEqual(false))
	})
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
