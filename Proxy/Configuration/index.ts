import { Request } from "./Request"
import { Response } from "./Response"

export interface Configuration {
	id: string
	request: Request
	response: Response
}
