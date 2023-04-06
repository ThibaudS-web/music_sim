import Genres from "./enums/Genres"

export function switchMusicByGenre(genre: HTMLElement) {
	const genreType = genre.dataset.genre
	switch (genreType) {
		case Genres.rock:
			return Genres.rock
		case Genres.pop:
			return Genres.pop
		case Genres.electronic:
			return Genres.electronic
		case Genres.country:
			return Genres.country
		case Genres.worldwide:
			return Genres.worldwide
		default:
			console.error("Unknown genre!")
			return null
	}
}
