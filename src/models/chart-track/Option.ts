import Action2 from "./Action2"
import Beacondata from "./Beacondata"

class Option {
	caption: string
	actions: Action2[]
	beacondata: Beacondata
	image: string
	type: string
	listcaption: string
	overflowimage: string
	colouroverflowimage: boolean
	providername: string
	constructor(
		caption: string,
		actions: Action2[],
		beacondata: Beacondata,
		image: string,
		type: string,
		listcaption: string,
		overflowimage: string,
		colouroverflowimage: boolean,
		providername: string
	) {
		this.caption = caption
        this.actions = actions
        this.beacondata = beacondata
		this.image = image
		this.type = type
		this.listcaption = listcaption
		this.overflowimage = overflowimage
		this.colouroverflowimage = colouroverflowimage
		this.providername = providername
	}
}

export default Option