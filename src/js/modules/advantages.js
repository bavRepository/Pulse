function advantages() {
	const nameClassArray = ['swing', 'jump', 'heart'],
		objElemPos = {},
		windowPos = {}
	let animateElemRect

	const advantagesIcons = document.querySelectorAll('.advantages-icon img'),
		promoIcons = document.querySelectorAll('.promo-icon img')

	function getRandomName(num) {
		return nameClassArray[Math.floor(Math.random() * num)]
	}

	window.addEventListener('scroll', showAnimation)

	function showAnimation() {
		if (advantagesIcons.length === 0) {
			return
		}

		;[...advantagesIcons, ...promoIcons].forEach(item => {
			setRandomClass(item)
		})
		function setRandomClass(elem) {
			objElemPos.top = window.scrollY + elem.getBoundingClientRect().top
			objElemPos.bot = window.scrollY + elem.getBoundingClientRect().bottom
			windowPos.top = window.scrollY
			windowPos.bot = window.scrollY + document.documentElement.clientHeight

			animateElemRect = elem.getBoundingClientRect()
			if (objElemPos.bot > windowPos.top && objElemPos.top < windowPos.bot) {
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
