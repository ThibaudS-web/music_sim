
	import SliderElement from "./SliderElement"

	class Slider {
		elements: SliderElement[]
		elementsDisplayed: SliderElement[]
		nodeParent: HTMLElement
		wrapper: HTMLElement

		constructor(elements: SliderElement[], nodeParent: HTMLElement) {
			this.elements = elements
			this.nodeParent = nodeParent
			this.wrapper = document.createElement("div")
			this.elementsDisplayed = this.elements.slice(0, 3)
		

		}

		getHTML() {
			const templateSlider = `
				<div id="slider-wrapper"></div> 
			`

			this.nodeParent.innerHTML = templateSlider

			this.wrapper = this.nodeParent.querySelector("#slider-wrapper")!

			//DEBUGGING
			// const nameGenre = (elements: SliderElement[]) => elements.map(el => ({ name: el.genre }))
			// console.table(nameGenre(this.elements))
			// console.table(nameGenre(this.elements.slice(0, 3)))

			const middleIndex = Math.floor(this.elementsDisplayed.length / 2)

			this.elementsDisplayed.forEach((element, index) => {
				switch (index) {
					case middleIndex:
						element.active = true
						element.setClickOnSlideElementForMovingOnSlider(() => null)
						break
					case 0:
						element.active = false
						element.setClickOnSlideElementForMovingOnSlider(() => {
							this.slideRight()
							this.getHTML()
						})
						break
					case 2:
						element.active = false
						element.setClickOnSlideElementForMovingOnSlider(() => {
							this.slideLeft()
							this.getHTML()
						})
						break
					default:
						console.error("in getHTML(): Index not used for cases!")
				}
				this.wrapper.appendChild(element.getHTML())
			})
		}

		slideRight() {
			const lastElement = this.elements[this.elements.length - 1]

			for (let i = this.elements.length - 1; i > 0; i--) {
				this.elements[i] = this.elements[i - 1]
			}

			this.elements[0] = lastElement
			this.elementsDisplayed = this.elements.slice(0, 3)
		}

		slideLeft() {
			const firstElement = this.elements[0]

			for (let i = 0; i < this.elements.length - 1; i++) {
				this.elements[i] = this.elements[i + 1]
			}

			this.elements[this.elements.length - 1] = firstElement
			this.elementsDisplayed = this.elements.slice(0, 3)


		}
	}

	export default Slider
