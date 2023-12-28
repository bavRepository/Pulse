function advantages() {
	const nameClassArray = ['swing', 'jump', 'heart']
	let animateElemRect

	const icons = document.querySelectorAll('.advantages-icon img'),
		promoIcons = document.querySelectorAll('.promo-icon img')

	function getRandomName(num) {
		return nameClassArray[Math.floor(Math.random() * num)]
	}

	window.addEventListener('scroll', showAnimation)

	function showAnimation() {
		if (icons.length === 0) {
			return
		}

		;[...icons, ...promoIcons].forEach(item => {
			setRandomClass(item)
		})
		function setRandomClass(elem) {
			animateElemRect = elem.getBoundingClientRect()
			if (
				(animateElemRect.top >= 0 && animateElemRect.top <= 550) ||
				(animateElemRect.top < 0 && animateElemRect.bottom >= -50)
			) {
				if (elem.classList.length < 1) {
					elem.classList.add(getRandomName(3))
					setTiming()
				}
			}
			function setTiming() {
				setTimeout(() => {
					elem.classList.forEach(item => {
						elem.classList.remove(item)
					})
				}, 4500)
			}
		}
	}
}

export default advantages
