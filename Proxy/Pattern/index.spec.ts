import { pax2pay } from "../../index"
import { Plain } from "../Configuration/Tokenize/Text/Plain"

const examplePlainConfig: Plain = {
	type: "plain",
	entryDelimiter: "&",
	equalsDelimiter: "=",
	card: {
		pan: "cardnumber",
		csc: "csc",
		expires: "expiry",
	},
	set: [
		{
			find: "cardnumber",
			value: "$(masked)",
		},
		"csc",
		{
			find: "token",
			value: "$(token)",
		},
		{
			find: "asd",
			value: "$(token)",
		},
	],
}

const examplePlainConfigLongerDelimiters: Plain = {
	...examplePlainConfig,
	entryDelimiter: "&&&",
	equalsDelimiter: "===",
}

const plainPattern = new pax2pay.cde.Proxy.Pattern.Plain(examplePlainConfig)
const plainPatternLongerDelimiters = new pax2pay.cde.Proxy.Pattern.Plain(examplePlainConfigLongerDelimiters)
const xmlPattern = new pax2pay.cde.Proxy.Pattern.Xml()

const exampleXml =
	"<card>\n\t<cardNumber>1234123412341234</cardNumber>\n\t<csc>987</csc>\n\t<someOtherInfo>apojarigraiog</someOtherInfo>\n\t<expires>12/24</expires>\n</card>"

const examplePlain = "cardnumber=1234123412341234&csc=789&asd=qwe&expiry=0925"
const examplePlainLongerDelimiters = "cardnumber===1234123412341234&&&csc===789&&&asd===qwe&&&expiry===0925"

describe("@pax2pay/model.Proxy.Pattern", () => {
	it("xml extract string", async () => {
		expect(xmlPattern.extract(exampleXml, "cardNumber")).toEqual("1234123412341234")
		expect(xmlPattern.extract(exampleXml, "csc")).toEqual("987")
		expect(xmlPattern.extract(exampleXml, "expires")).toEqual("12/24")
	})

	it("xml extract regexp", async () => {
		expect(xmlPattern.extract(exampleXml, new RegExp("cardNumber"))).toEqual("1234123412341234")
		expect(xmlPattern.extract(exampleXml, new RegExp("csc"))).toEqual("987")
		expect(xmlPattern.extract(exampleXml, new RegExp("expires"))).toEqual("12/24")
	})

	it("apply", async () => {
		let newExample = xmlPattern.apply(exampleXml, "cardNumber", "1111222233334444")
		expect(xmlPattern.extract(newExample, "cardNumber")).toEqual("1111222233334444")
		newExample = xmlPattern.apply(newExample, "csc", "123")
		expect(xmlPattern.extract(newExample, "csc")).toEqual("123")
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
		const replaced = xmlPattern.apply(rs, "CVV", "token/stuff")
		expect(replaced).toEqual(expected)
	})

	it("getInPlain string", async () => {
		expect(plainPattern.extract(examplePlain, "cardnumber")).toEqual("1234123412341234")
		expect(plainPattern.extract(examplePlain, "csc")).toEqual("789")
		expect(plainPattern.extract(examplePlain, "asd")).toEqual("qwe")
		expect(plainPattern.extract(examplePlain, "expiry")).toEqual("0925")

		expect(plainPatternLongerDelimiters.extract(examplePlainLongerDelimiters, "cardnumber")).toEqual("1234123412341234")
		expect(plainPatternLongerDelimiters.extract(examplePlainLongerDelimiters, "csc")).toEqual("789")
		expect(plainPatternLongerDelimiters.extract(examplePlainLongerDelimiters, "asd")).toEqual("qwe")
		expect(plainPatternLongerDelimiters.extract(examplePlainLongerDelimiters, "expiry")).toEqual("0925")
	})

	it("getInPlain regex", async () => {
		expect(plainPattern.extract(examplePlain, new RegExp("cardnumber"))).toEqual("1234123412341234")
		expect(plainPattern.extract(examplePlain, new RegExp("csc"))).toEqual("789")
		expect(plainPattern.extract(examplePlain, new RegExp("asd"))).toEqual("qwe")
		expect(plainPattern.extract(examplePlain, new RegExp("expiry"))).toEqual("0925")

		expect(plainPatternLongerDelimiters.extract(examplePlainLongerDelimiters, new RegExp("cardnumber"))).toEqual(
			"1234123412341234"
		)
		expect(plainPatternLongerDelimiters.extract(examplePlainLongerDelimiters, new RegExp("csc"))).toEqual("789")
		expect(plainPatternLongerDelimiters.extract(examplePlainLongerDelimiters, new RegExp("asd"))).toEqual("qwe")
		expect(plainPatternLongerDelimiters.extract(examplePlainLongerDelimiters, new RegExp("expiry"))).toEqual("0925")
	})

	it("setInPlain", async () => {
		let newExample = plainPattern.apply(examplePlain, "cardnumber", "1111222233334444")
		expect(plainPattern.extract(newExample, "cardnumber")).toEqual("1111222233334444")
		newExample = plainPattern.apply(newExample, "csc", "123")
		expect(plainPattern.extract(newExample, "csc")).toEqual("123")
		newExample = plainPattern.apply(newExample, "expiry", "1133")
		expect(plainPattern.extract(newExample, "expiry")).toEqual("1133")
	})
})
