export interface Request {
	authentication?: string | (string | undefined)[]
	url: string
	process?: boolean
}
