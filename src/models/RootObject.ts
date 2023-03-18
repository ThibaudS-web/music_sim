import Track from "./Track"

class RootObject {
	electronic: Track[]
	country: Track[]
	pop: Track[]
	rock: Track[]
	worldwide: Track[]
	constructor(
		electronic: Track[],
		country: Track[],
		pop: Track[],
		rock: Track[],
		worldwide: Track[]
	) {
		this.electronic = electronic
		this.country = country
		this.pop = pop
		this.rock = rock
		this.worldwide = worldwide
	}
}

export default RootObject
