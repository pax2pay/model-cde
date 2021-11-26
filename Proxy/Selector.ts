export type Selector = string

export namespace Selector {
	export function is(value: Selector | any): value is Selector {
		return typeof value == "string" && /^(\w|\[\\d+\])(\.(\w|\[\\d+\]))*$/.test(value)
	}

	function parse(selector: Selector): (string | number)[] {
		return selector
			.split(".")
			.flatMap(property => (property.endsWith("]") ? property.split("[") : property))
			.map(property => (property.endsWith("]") ? Number.parseInt(property.substr(0, property.length - 1)) : property))
	}
	export function get<T = any>(data: any, selector: Selector | (string | number)[]): T {
		let result: any
		if (typeof selector == "string")
			result = get(data, parse(selector))
		else
			result = selector.length == 0 ? data : get(data[selector[0]], selector.slice(1))
		return result as T
	}
	export function set(data: any, selector: Selector | (string | number)[], value: any): any {
		let result: any
		if (typeof selector == "string")
			result = set(data, parse(selector), value)
		else
			result =
				selector.length == 1 && !Array.isArray(data) && value == undefined
					? (({ [selector[0]]: _, ...left }) => left)(data)
					: selector.length == 0
					? value
					: Object.assign(Array.isArray(data) ? [...data] : { ...data }, {
							[selector[0]]: set(data[selector[0]], selector.slice(1), value),
					  })
		return result
	}
}
