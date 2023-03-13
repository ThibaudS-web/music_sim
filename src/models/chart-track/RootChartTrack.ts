import Track from "./Track"

class RootTrackList {
	properties: Record<string, never>
	tracks: Track[]
	constructor(properties: Record<string, never>, tracks: Track[]) {
		this.properties = properties
		this.tracks = tracks
	}
}

export default RootTrackList
