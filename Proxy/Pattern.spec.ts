import * as model from "../index"

const example =
	"<card>\n\t<cardNumber>1234123412341234</cardNumber>\n\t<csc>987</csc>\n\t<someOtherInfo>apojarigraiog</someOtherInfo>\n\t<expires>12/24</expires>\n</card>"

describe("@pax2pay/model.Proxy.Pattern", () => {
	it("get string", async () => {
		expect(model.Proxy.Pattern.get(example, "cardNumber")).toEqual("1234123412341234")
		expect(model.Proxy.Pattern.get(example, "csc")).toEqual("987")
		expect(model.Proxy.Pattern.get(example, "expires")).toEqual("12/24")
	})

	it("get regexp", async () => {
		expect(model.Proxy.Pattern.get(example, new RegExp("cardNumber"))).toEqual("1234123412341234")
		expect(model.Proxy.Pattern.get(example, new RegExp("csc"))).toEqual("987")
		expect(model.Proxy.Pattern.get(example, new RegExp("expires"))).toEqual("12/24")
	})

	it("set", async () => {
		let newExample = model.Proxy.Pattern.set(example, "cardNumber", "1111222233334444")
		expect(model.Proxy.Pattern.get(newExample, "cardNumber")).toEqual("1111222233334444")
		newExample = model.Proxy.Pattern.set(newExample, "csc", "123")
		expect(model.Proxy.Pattern.get(newExample, "csc")).toEqual("123")
	})
})
