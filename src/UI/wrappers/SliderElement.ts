class SliderElement {
	genre: string
	base_URL = "src/assets/images-genres"
	active: boolean
	wrapperElement: HTMLElement
	image: HTMLImageElement | null

	constructor(genre: string) {
		this.genre = genre
		this.active = false
		this.wrapperElement = document.createElement("div")
		this.image = null
	}

	getHTML() {
		const element = `
         
                 <img
                    data-genre="${this.genre}"
                    class="image-genre"
                    src="${this.base_URL}/${this.genre}.png"
                    alt="${this.genre} image"
                />
                <p>${this.genre}</p>
           
        `
		this.wrapperElement.classList.add("image-genre-container")
		this.wrapperElement.innerHTML = element
		this.sizeChange()
		return this.wrapperElement
	}

	sizeChange() {
		console.log(this.active)
		if (this.active) {
			this.wrapperElement.classList.add("active-genre")
		} else {
			this.wrapperElement.classList.remove("active-genre")
		}
	}
}

export default SliderElement
