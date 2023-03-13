class Global {
	id: string
	listid: string
	name: string
	urlPath: string
	count: number

	constructor(id: string, listid: string, name: string, urlPath: string, count: number) {
		this.id = id
		this.listid = listid
		this.name = name
		this.urlPath = urlPath
		this.count = count
	}
}

export default Global
