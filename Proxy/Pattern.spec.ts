import { pax2pay } from "../index"

const example =
	"<card>\n\t<cardNumber>1234123412341234</cardNumber>\n\t<csc>987</csc>\n\t<someOtherInfo>apojarigraiog</someOtherInfo>\n\t<expires>12/24</expires>\n</card>"

describe("@pax2pay/pax2pay.cde.Proxy.Pattern", () => {
	it("get string", async () => {
		expect(pax2pay.cde.Proxy.Pattern.get(example, "cardNumber")).toEqual("1234123412341234")
		expect(pax2pay.cde.Proxy.Pattern.get(example, "csc")).toEqual("987")
		expect(pax2pay.cde.Proxy.Pattern.get(example, "expires")).toEqual("12/24")
	})

	it("get regexp", async () => {
		expect(pax2pay.cde.Proxy.Pattern.get(example, new RegExp("cardNumber"))).toEqual("1234123412341234")
		expect(pax2pay.cde.Proxy.Pattern.get(example, new RegExp("csc"))).toEqual("987")
		expect(pax2pay.cde.Proxy.Pattern.get(example, new RegExp("expires"))).toEqual("12/24")
	})

	it("set", async () => {
		let newExample = pax2pay.cde.Proxy.Pattern.set(example, "cardNumber", "1111222233334444")
		expect(pax2pay.cde.Proxy.Pattern.get(newExample, "cardNumber")).toEqual("1111222233334444")
		newExample = pax2pay.cde.Proxy.Pattern.set(newExample, "csc", "123")
		expect(pax2pay.cde.Proxy.Pattern.get(newExample, "csc")).toEqual("123")
	})

	it("should not replace itself badly when theres a substring", () => {
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
		const replaced = pax2pay.cde.Proxy.Pattern.set(rs, "CVV", "token/stuff")
		expect(replaced).toEqual(expected)
	})
})
