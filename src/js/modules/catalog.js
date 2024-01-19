function catalog() {
	const tabs = document.querySelectorAll('.catalog__tab'),
		catalogList = document.querySelectorAll('.catalog__content'),
		frontLinks = document.querySelectorAll('.catalog-item__link'),
		backLinks = document.querySelectorAll('.catalog-item__back'),
		frontSide = document.querySelectorAll('.catalog-item__front'),
		backSide = document.querySelectorAll('.catalog-item__details')

	// set all goods to the front side
	frontSide.forEach(item => {
		item.classList.toggle('catalog-item__front_active')
	})

	function settTabClickRelatedContent() {
		tabs.forEach((item, i) => {
			item.addEventListener('click', () => {
				tabs.forEach(item => {
					item.classList.remove('catalog__tab_active')
				})
				item.classList.add('catalog__tab_active')
				catalogList.forEach(item => {
					item.classList.remove('catalog__content_active')
				})
				catalogList[i].classList.add('catalog__content_active')
			})
		})
	}

	function switchCardFromFrontToBackSide(e, i) {
		e.preventDefault()
		frontSide[i].classList.toggle('catalog-item__front_active')
		backSide[i].classList.toggle('catalog-item__details_active')
	}

	frontLinks.forEach((item, i) => {
		item.addEventListener('click', e => switchCardFromFrontToBackSide(e, i))
	})

	backLinks.forEach((item, i) => {
		item.addEventListener('click', e => switchCardFromFrontToBackSide(e, i))
	})

	settTabClickRelatedContent()
}
export default catalog
