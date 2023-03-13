import Hub2 from "../search/Hub2"
import Artist from "./Artist"
import Highlightsurls from "./HighLightsurls"
import Images from "./Images"
import Share from "./Share"

class Track {
	layout: string
	type: string
	key: string
	title: string
	subtitle: string
	share: Share
	images: Images
	hub: Hub2
	artists: Artist[]
	url: string
	highlightsurls: Highlightsurls
	properties: Record<string, never>
	constructor(
		layout: string,
		type: string,
		key: string,
		title: string,
		subtitle: string,
		share: Share,
		images: Images,
		hub: Hub2,
		artists: Artist[],
		url: string,
		highlightsurls: Highlightsurls,
		properties: Record<string, never>
	) {
		this.layout = layout
		this.type = type
		this.key = key
		this.title = title
		this.subtitle = subtitle
		this.share = share
		this.images = images
		this.hub = hub
		this.artists = artists
		this.url = url
		this.highlightsurls = highlightsurls
		this.properties = properties
	}
}

export default Track
