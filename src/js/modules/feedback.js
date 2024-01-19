function feedback() {
	const comments = document.querySelectorAll('.feedback-item')
	let elemPosData = {},
		windowPosData = {}
	function animateCHecking() {
		function setElemCoord(elem) {
			elemPosData.top = elem.getBoundingClientRect().top + window.scrollY
			elemPosData.bot = elem.getBoundingClientRect().bottom + window.scrollY

			windowPosData.top = window.scrollY
			windowPosData.bot = window.scrollY + document.documentElement.clientHeight
		}
		comments.forEach(item => {
			setElemCoord(item)
			if (elemPosData.top - item.clientHeight / 2 < windowPosData.bot && elemPosData.bot - item.clientHeight / 2 > windowPosData.top) {
				if (!item.classList.contains('fade-out')) {
					item.classList.add('fade-out')
				}
			}
		})
	}
	window.addEventListener('scroll', animateCHecking)
	animateCHecking()
}
export default feedback
