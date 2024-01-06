function carousel() {
	const slider = document.querySelector('.slider'),
		slideCounterCurrent = document.querySelector('.slider__current'),
		sliderCarousel = document.querySelector('.slider__carousel'),
		slideCounterTotal = document.querySelector('.slider__total'),
		arrowLeft = document.querySelector('.slider__arrow-left'),
		arrowRight = document.querySelector('.slider__arrow-right'),
		slides = document.querySelectorAll('.slider__slide'),
		dots = []

	let sliderWidth,
		slideIndex = 0,
		sliderEngine,
		startDrag = 0,
		changeDragCoord = 0,
		isLoopStopped = false

	function renderStartElements() {
		const dotsHtml = document.createElement('up')
		dotsHtml.classList.add('slider__dots')
		slider.append(dotsHtml)
		for (let i = 0; i < slides.length; i++) {
			const dot = document.createElement('li')
			dot.classList.add('slider__dot')
			dot.setAttribute('data-slide-index', i)
			dotsHtml.append(dot)
			dots.push(dot)
			if (i === 0) {
				dot.classList.add('slider__dot_active')
			}
			dot.addEventListener('click', e => dotSlideSwitcher(e, i))
		}
		initCurrentSlideIndex(slideIndex)
		initTotalSlidesCount()
	}

	function resizeInit() {
		sliderWidth = deleteNonDigits(window.getComputedStyle(slider).width)
		sliderCarousel.style.width = sliderWidth * slides.length + 'px'
		slides.forEach(item => {
			item.style.width = sliderWidth + 'px'
		})
		translateCarousel()
	}

	function stopSliderEngine() {
		isLoopStopped = true
		clearInterval(sliderEngine)
	}

	function shiftingSlideIndex(sign = '+') {
		stopSliderEngine()
		if (sign === '-') {
			slideIndex--
			if (slideIndex < 0) {
				slideIndex = slides.length - 1
			}
		} else if (sign === '+') {
			slideIndex++
			if (slideIndex >= slides.length) {
				slideIndex = 0
			}
		} else {
			throw new Error('You have used wrong math sign ' + sign + "\nEither '-' or '+' could be")
		}
	}

	function restartEngine(delay) {
		isLoopStopped = false
		loopingOnSliderEngine(delay)
	}
	function slideLeft() {
		arrowLeft.addEventListener('click', () => {
			swipeRight()
		})
	}

	function slideRight() {
		arrowRight.addEventListener('click', () => {
			swipeLeft()
		})
	}

	function loopingOnSliderEngine(delay = 4500) {
		sliderEngine = setInterval(() => {
			if (!isLoopStopped) {
				slideIndex++
				if (slideIndex >= slides.length) {
					slideIndex = 0
				}
				dotStyleCleaner(slideIndex)
				initCurrentSlideIndex(slideIndex)
				translateCarousel()
			}
		}, delay)
	}

	function swipeLeft() {
		getPausedOffAfterArrowsAndDotsClick()
		shiftingSlideIndex()
		dotStyleCleaner(slideIndex)
		initCurrentSlideIndex(slideIndex)
		translateCarousel()
		restartEngine(4800)
	}
	function swipeRight() {
		getPausedOffAfterArrowsAndDotsClick()
		shiftingSlideIndex('-')
		dotStyleCleaner(slideIndex)
		initCurrentSlideIndex(slideIndex)
		translateCarousel()
		restartEngine(4800)
	}

	function getSliderPausedAfterSlideClick() {
		slides.forEach(item => {
			item.addEventListener('click', () => {
				slider.classList.toggle('addBorder')
				isLoopStopped = !isLoopStopped
				if (!isLoopStopped) {
					restartEngine(4800)
				} else {
					clearInterval(sliderEngine)
				}
			})
		})
	}

	// PC
	slider.addEventListener('dragstart', e => {
		startDrag = e.clientX
	})
	slider.addEventListener('dragover', e => {
		e.preventDefault()
		let touch = e.clientX
		changeDragCoord = startDrag - touch
	})
	slider.addEventListener('dragend', getSwiped)
	function getSwiped() {
		if (changeDragCoord > 0) {
			swipeLeft()
		} else {
			swipeRight()
		}
	}
	// Mobile, Tablet

	slider.addEventListener('touchstart', e => {
		startDrag = e.touches[0].clientX
	})

	slider.addEventListener('touchmove', e => {
		e.preventDefault()
		let touch = e.touches[0].clientX
		changeDragCoord = startDrag - touch
	})

	slider.addEventListener('touchend', getSwiped)

	function getPausedOffAfterArrowsAndDotsClick() {
		if (isLoopStopped) {
			isLoopStopped = !isLoopStopped
			slider.classList.toggle('addBorder')
			restartEngine()
		}
	}

	function initCurrentSlideIndex(count) {
		count++
		if (count < 10) {
			slideCounterCurrent.textContent = `0${count}`
		} else {
			slideCounterCurrent.textContent = count
		}
	}

	function initTotalSlidesCount() {
		if (slides.length < 10) {
			slideCounterTotal.textContent = `0${slides.length}`
		} else {
			slideCounterTotal.textContent = slides.length
		}
	}

	function translateCarousel() {
		sliderCarousel.style.transform = `translateX(-${slideIndex * sliderWidth}px)`
	}

	function dotSlideSwitcher(e, index) {
		getPausedOffAfterArrowsAndDotsClick()
		stopSliderEngine()
		dotStyleCleaner(index)
		slideIndex = Number(e.target.getAttribute('data-slide-index'))
		translateCarousel()
		initCurrentSlideIndex(slideIndex)
		restartEngine(4800)
	}

	function dotStyleCleaner(count) {
		console.log(count)
		dots.forEach(item => {
			item.classList.remove('slider__dot_active')
		})
		dots[count].classList.add('slider__dot_active')
	}

	function deleteNonDigits(str) {
		return Number(str.replace(/\D/gi, ''))
	}

	renderStartElements()
	resizeInit()
	slideLeft()
	slideRight()
	loopingOnSliderEngine()
	getSliderPausedAfterSlideClick()
	window.addEventListener('resize', resizeInit)
}

export default carousel
