function catalog() {
	const tabs = document.querySelectorAll('.catalog__tab'),
		goodLinks = document.querySelectorAll('.catalog-item__link'),
		carousel = document.querySelector('.catalog-item__carousel'),
		frontSide = document.querySelector('.catalog-item__frontside'),
		backSide = document.querySelector('.catalog-item__backside')
	tabs.forEach(item => {
		item.addEventListener('click', e => {
			tabs.forEach(item => {
				item.classList.remove('catalog__tab_active')
			})
			item.classList.toggle('catalog__tab_active')
		})
	})
	frontSide.classList.toggle('catalog-item__frontside_active')
	// backSide.classList.toggle('catalog-item__backside_active')
	goodLinks.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault()
			frontSide.classList.toggle('catalog-item__frontside_active')
			backSide.classList.toggle('catalog-item__backside_active')
		})
	})
}

export default catalog
