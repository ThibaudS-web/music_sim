import Action from "../chart-track/Action"
import Option from "../chart-track/Option"
import Provider from "./Provider"

class Hub2 {
	type: string
	image: string
	actions: Action[]
	options: Option[]
	providers: Provider[]
	explicit: boolean
	displayname: string
	constructor(
		type: string,
		image: string,
		actions: Action[],
		options: Option[],
		providers: Provider[],
		explicit: boolean,
		displayname: string
	) {
		this.type = type
		this.image = image
		this.actions = actions
		this.options = options
		this.providers = providers
		this.explicit = explicit
		this.displayname = displayname
	}
}

export default Hub2
