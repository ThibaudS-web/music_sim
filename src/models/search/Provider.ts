import Action3 from "./Action3"
import Images2 from "./Images2"

class Provider {
	caption: string
	images: Images2
	actions: Action3[]
	type: string
	constructor(caption: string, images: Images2, actions: Action3[], type: string) {
		this.caption = caption
		this.images = images
		this.actions = actions
		this.type = type
	}
}

export default Provider
