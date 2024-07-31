import * as model from "../index"

const exampleXml =
	"<card>\n\t<cardNumber>1234123412341234</cardNumber>\n\t<csc>987</csc>\n\t<someOtherInfo>apojarigraiog</someOtherInfo>\n\t<expires>12/24</expires>\n</card>"

const examplePlain = "cardnumber=1234123412341234&csc=789&asd=qwe&expiry=0925"
const examplePlainLongerDelimiters = "cardnumber===1234123412341234&&&csc===789&&&asd===qwe&&&expiry===0925"

describe("@pax2pay/model.Proxy.Pattern", () => {
	it("getInXml string", async () => {
		expect(model.Proxy.Pattern.getInXml(exampleXml, "cardNumber")).toEqual("1234123412341234")
		expect(model.Proxy.Pattern.getInXml(exampleXml, "csc")).toEqual("987")
		expect(model.Proxy.Pattern.getInXml(exampleXml, "expires")).toEqual("12/24")
	})

	it("getInXml regexp", async () => {
		expect(model.Proxy.Pattern.getInXml(exampleXml, new RegExp("cardNumber"))).toEqual("1234123412341234")
		expect(model.Proxy.Pattern.getInXml(exampleXml, new RegExp("csc"))).toEqual("987")
		expect(model.Proxy.Pattern.getInXml(exampleXml, new RegExp("expires"))).toEqual("12/24")
	})

	it("setInXml", async () => {
		let newExample = model.Proxy.Pattern.setInXml(exampleXml, "cardNumber", "1111222233334444")
		expect(model.Proxy.Pattern.getInXml(newExample, "cardNumber")).toEqual("1111222233334444")
		newExample = model.Proxy.Pattern.setInXml(newExample, "csc", "123")
		expect(model.Proxy.Pattern.getInXml(newExample, "csc")).toEqual("123")
	})

	it("shouldnt replace itself badly when theres a substring", () => {
		// the DeploymentID contains a substring of the CVV
		const rs = `
		  <soap:Body>
		    <GetCardResponse
		      xmlns="http://cpapi.conferma.com/">
		      <GetCardResult CardPoolName="Online Syndicator Account" DeploymentID="113981428" Type="General">
		        <General>
		          <Name>coop</Name>
		          <ConsumerReference>adfgdafg</ConsumerReference>
		          <Amount Currency="GBP" Value="382"/>
		          <PaymentRange EndDate="2023-10-31T00:00:00Z" StartDate="2023-10-24T00:00:00Z"/>
		        </General>
		        <Card>
		          <Name>Coop Travel</Name>
		          <Number>5555444433332222</Number>
		          <Type>CA</Type>
		          <ExpiryDate Month="4" Year="2025"/>
		          <CVV>139</CVV>
		          <Provider ID="1" Name="Barclaycard Commercial"/>
		        </Card>
		        <Identifiers/>
		      </GetCardResult>
		    </GetCardResponse>
		  </soap:Body>
		</soap:Envelope>
		`
		const expected = `
		  <soap:Body>
		    <GetCardResponse
		      xmlns="http://cpapi.conferma.com/">
		      <GetCardResult CardPoolName="Online Syndicator Account" DeploymentID="113981428" Type="General">
		        <General>
		          <Name>coop</Name>
		          <ConsumerReference>adfgdafg</ConsumerReference>
		          <Amount Currency="GBP" Value="382"/>
		          <PaymentRange EndDate="2023-10-31T00:00:00Z" StartDate="2023-10-24T00:00:00Z"/>
		        </General>
		        <Card>
		          <Name>Coop Travel</Name>
		          <Number>5555444433332222</Number>
		          <Type>CA</Type>
		          <ExpiryDate Month="4" Year="2025"/>
		          <CVV>token/stuff</CVV>
		          <Provider ID="1" Name="Barclaycard Commercial"/>
		        </Card>
		        <Identifiers/>
		      </GetCardResult>
		    </GetCardResponse>
		  </soap:Body>
		</soap:Envelope>
		`
		const replaced = model.Proxy.Pattern.setInXml(rs, "CVV", "token/stuff")
		expect(replaced).toEqual(expected)
	})

	it("getInPlain string", async () => {
		expect(model.Proxy.Pattern.getInPlain(examplePlain, "cardnumber", "&", "=")).toEqual("1234123412341234")
		expect(model.Proxy.Pattern.getInPlain(examplePlain, "csc", "&", "=")).toEqual("789")
		expect(model.Proxy.Pattern.getInPlain(examplePlain, "asd", "&", "=")).toEqual("qwe")
		expect(model.Proxy.Pattern.getInPlain(examplePlain, "expiry", "&", "=")).toEqual("0925")

		expect(model.Proxy.Pattern.getInPlain(examplePlainLongerDelimiters, "cardnumber", "&&&", "===")).toEqual(
			"1234123412341234"
		)
		expect(model.Proxy.Pattern.getInPlain(examplePlainLongerDelimiters, "csc", "&&&", "===")).toEqual("789")
		expect(model.Proxy.Pattern.getInPlain(examplePlainLongerDelimiters, "asd", "&&&", "===")).toEqual("qwe")
		expect(model.Proxy.Pattern.getInPlain(examplePlainLongerDelimiters, "expiry", "&&&", "===")).toEqual("0925")
	})

	it("getInPlain regex", async () => {
		expect(model.Proxy.Pattern.getInPlain(examplePlain, new RegExp("cardnumber"), "&", "=")).toEqual("1234123412341234")
		expect(model.Proxy.Pattern.getInPlain(examplePlain, new RegExp("csc"), "&", "=")).toEqual("789")
		expect(model.Proxy.Pattern.getInPlain(examplePlain, new RegExp("asd"), "&", "=")).toEqual("qwe")
		expect(model.Proxy.Pattern.getInPlain(examplePlain, new RegExp("expiry"), "&", "=")).toEqual("0925")

		expect(
			model.Proxy.Pattern.getInPlain(examplePlainLongerDelimiters, new RegExp("cardnumber"), "&&&", "===")
		).toEqual("1234123412341234")
		expect(model.Proxy.Pattern.getInPlain(examplePlainLongerDelimiters, new RegExp("csc"), "&&&", "===")).toEqual("789")
		expect(model.Proxy.Pattern.getInPlain(examplePlainLongerDelimiters, new RegExp("asd"), "&&&", "===")).toEqual("qwe")
		expect(model.Proxy.Pattern.getInPlain(examplePlainLongerDelimiters, new RegExp("expiry"), "&&&", "===")).toEqual(
			"0925"
		)
	})

	it("setInPlain", async () => {
		let newExample = model.Proxy.Pattern.setInPlain(examplePlain, "cardnumber", "1111222233334444", "&", "=")
		expect(model.Proxy.Pattern.getInPlain(newExample, "cardnumber", "&", "=")).toEqual("1111222233334444")
		newExample = model.Proxy.Pattern.setInPlain(newExample, "csc", "123", "&", "=")
		expect(model.Proxy.Pattern.getInPlain(newExample, "csc", "&", "=")).toEqual("123")
		newExample = model.Proxy.Pattern.setInPlain(newExample, "expiry", "1133", "&", "=")
		expect(model.Proxy.Pattern.getInPlain(newExample, "expiry", "&", "=")).toEqual("1133")
	})
})
