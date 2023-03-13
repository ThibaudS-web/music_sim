import Action from "./Action2"
import Option from "./Option"

class Hub {
	type: string
	image: string
	actions: Action[]
	options: Option[]
	explicit: boolean
	displayname: string
	constructor(
		type: string,
		image: string,
		actions: Action[],
		options: Option[],
		explicit: boolean,
		displayname: string
	) {
		this.type = type
		this.image = image
		this.actions = actions
		this.options = options
		this.explicit = explicit
		this.displayname = displayname
	}
}

export default Hub
