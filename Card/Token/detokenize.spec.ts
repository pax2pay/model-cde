import { pax2pay } from "../../index"

describe("@pax2pay/pax2pay.cde.Card.Token.detokenize", () => {
	it("RSA create + detokenize", async () => {
		const key: pax2pay.cde.Card.Token.Key = {
			private:
				"MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDI4Lm5sFxAUIg1zJAmAHkjVNGUQraEifC5vOcCBICfHn3vB+mrrE1dTfcHEgfM67OPwXe6h2UydVekHNRPby8ybuPZWy3ft4KPgNWBIudlVEQ8aaJhV2e1kwKZXQ7dOxvvoINGQS0dL3Kq+TZBL/MGXJREFwHayFXSMuV0gm7E6qLkb9k+k+4w+g9SVBi+otMt/PdreFQGATvNZ8K+9SUyd9OOat7XBizK5uOwdPxOOgW+mwYy27dchKG5dJKUbSAIrnODPfOH3Nmj8R93uoXefDrTtblRMRc69etTc2Xh1Vnk4CsEb0zpKPEA24YyBregU0+fH4krxBHUADAYgDhlAgMBAAECggEAAnnEo0AloD4ldVEKuy5PHx/ZpgwYh7UcjCxR/P7INck+6stm3G8JTkoxYh4vpmCGsvlbKZteGDkUbO5tjNkp3xogzuNE25WGkGwNOJx4oYtgS9DhLcs5F4gXgXcsBHaYGZGr1OLM/F5/+U5DllD8dzgzZTQZARxh9HtNYk3+dDOdDkFtKRj36hKCnpWlQ1F3Wnv+Ixqo/7IWzYtPUy1byybgLFQPjJDKyLf1IvqfFkXSAvSk/KDbB+kfmgnWdhWtM+swMX42Tew5XQHpYOBgkeexhLGV9/4kHC3Yoky6AnsbNaAP6l/Y/rpNxfkA9mj91367rbu1x7jKrweJfHzqawKBgQDx46J0pVVfeA4BunrslUODqf20JJ2XiKEo0YDhl2yZcaJF/OEAvC0mOJAi2eT0Ci/dVKHc7G2coQFs9thaJE51FrI7h+qRvl/+X5LHPxc3YTGrMLlv8NGyyAGFlIqXFkBWzd3IVax2LdcG23bu5tY5I6YSbUGAeunGnEKp5fCNvwKBgQDUmKDnGaj5ejRRZ/rZGeehCJPaSCI4y9DjJGfrwPqHrrELsFwbUd3nMJxNbUw0v4t/cXxFDtEpg8NLbII86j0nskwOK2OgOrbGm1hrRoC5Df62e+31CNQeiO3JHAwYZBFTXTYalLHwMy1Khn8bd8Iut5lEzgZOLY76vuVo+DKK2wKBgEEUzyP1TAgYxCQA6Yv4CSdGuIUciO45i6rw221XEZgjc9bC2EMbXkZ3V4iY+boTd5dkavyG/GL1Cu4naESwmg904NWVly5Je4h0bIiBWBzFYNi/jlUpBTLGD2rCcZt/GCaC01ZQfst5P+6PY+uZXjAXgFpa3RHVgEq4xlLyFAv/AoGAKVwgQZWeaBq8PvIpvT7q70tJ6HeMINyWIPqeNSFwHCGCVDHVWYNN1oKAhhezcbeqHfsoIA9H5fm6btwHYm53w1dOsJsEYNHLaUwjoYsv09DDMyFdJAS5r88X475PJBejv0ItGnK/Q2nRb+RGqkNcRdZ2PQqP83mtjV7CJu/SdW0CgYA2o2ZUADsUZHPxOzabJzPP59JnkwBbO/pt0TuRC9z0cv0AJh/oV/QSp/VQNb0ZAX3kLnzse2n5aQaGnJzh9G0tuZaoFEHOrZCKxyRT55cVaaRTJA1v37Kn81X93QxY8qxhmnSaKl0MNsLeIJk7Hl6qekcUqtKfyJNJ04REEvqBVw==",
			public:
				"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyOC5ubBcQFCINcyQJgB5I1TRlEK2hInwubznAgSAnx597wfpq6xNXU33BxIHzOuzj8F3uodlMnVXpBzUT28vMm7j2Vst37eCj4DVgSLnZVREPGmiYVdntZMCmV0O3Tsb76CDRkEtHS9yqvk2QS/zBlyURBcB2shV0jLldIJuxOqi5G/ZPpPuMPoPUlQYvqLTLfz3a3hUBgE7zWfCvvUlMnfTjmre1wYsyubjsHT8TjoFvpsGMtu3XIShuXSSlG0gCK5zgz3zh9zZo/Efd7qF3nw607W5UTEXOvXrU3Nl4dVZ5OArBG9M6SjxANuGMga3oFNPnx+JK8QR1AAwGIA4ZQIDAQAB",
		}
		expect(key).not.toBeUndefined()
		if (key) {
			const token = await pax2pay.cde.Card.Token.create(
				{
					pan: "4567890123457890",
					csc: "987",
					expires: [2, 21],
				},
				key
			)
			expect(token).toMatch(/4567897890\/16\/0221\/RSAAyOC\/[A-Za-z0-9\-_]+\/0/)
			if (!token)
				fail()
			else {
				expect(pax2pay.cde.Card.Token.is(token)).toEqual(true)
				expect(pax2pay.cde.Card.Token.unpack(token).salt).toEqual("0")
				const card = await pax2pay.cde.Card.Token.detokenize(token, key)
				expect(card).toMatchObject({
					pan: "4567890123457890",
					masked: "456789******7890",
					csc: "987",
					expires: [2, 21],
				})
			}
		}
	})
})
