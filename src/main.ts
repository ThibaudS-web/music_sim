import FetchingMusic from "./services/FetchingMusic"

const audio = document.querySelector("audio") as HTMLAudioElement
const fetchMusic = new FetchingMusic()

fetchMusic.searchPlaylist().then((data) => {
	const uriAudio = data.tracks.hits[2].track.hub.actions[1]?.uri
	console.log(data.tracks.hits[2].track.hub.actions[1]?.uri)
	if (uriAudio) audio.src = 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview124/v4/b9/ad/4d/b9ad4d69-48f0-5e9f-62e0-da1b5e4ead82/mzaf_12427924919897479748.plus.aac.ep.m4a'
})

// console.log(data.tracks.hits[0].track.hub.actions[1].uri)



 