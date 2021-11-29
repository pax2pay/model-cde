describe("xml", () => {
	it("parse", () => {
		const parser = new DOMParser()

		const body = parser.parseFromString(
			`<soap:Body>
	<GetCardResponse 
		xmlns="http://cpapi.conferma.com/">
      <GetCardResult CardPoolName="Paxport Group UK - GBP" DeploymentID="57627609" Type="General">
        <General>
          <Name>mcom</Name>
          <ConsumerReference>lucym_LJLK6t8xAPD5d7RJYD</ConsumerReference>
          <Amount Currency="GBP" Value="1"/>
          <PaymentRange EndDate="2021-12-02T00:00:00Z" StartDate="2021-11-25T00:00:00Z"/>
        </General>
        <Card>
          <Name>PAXPORT GROUP UK LIMITED</Name>
          <Number>556107******0104</Number>
          <Type>CA</Type>
          <ExpiryDate Month="9" Year="2023"/>
          <CVV>358</CVV>
          <Provider ID="1" Name="Barclaycard Commercial"/>
        </Card>
        <Identifiers/>
      </GetCardResult>
    </GetCardResponse>
  </soap:Body>
</soap:Envelope>`,
			"application/xml"
		)
		console.log(body)
	})
})
