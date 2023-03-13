import Genre from "./Genre"

class Global {
	genres: Genre[]
	constructor(genres: Genre[]) {
		this.genres = genres
	}
}
export default Global
