class Action {
	name: string
	type: string
	id?: string
	uri?: string
	constructor(name: string, type: string, id?: string, uri?: string) {
		this.name = name
		this.type = type
		this.id = id
		this.uri = uri
	}
}

export default Action
