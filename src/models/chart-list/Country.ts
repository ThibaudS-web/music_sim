import City from "./City"

class Country {
	id: string
	listid: string
	name: string
	cities: City[]
	momentum_listid?: string
	constructor(
		id: string,
		listid: string,
		name: string,
		cities: City[],
		momentum_listid?: string
	) {
		this.id = id
		this.listid = listid
		this.name = name
		this.cities = cities
		this.momentum_listid = momentum_listid
	}
}

export default Country
