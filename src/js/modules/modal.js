function modal() {
	const buttons = document.querySelectorAll('.button'),
		overlay = document.querySelector('.overlay'),
		crosses = document.querySelectorAll('.modal__close'),
		modals = document.querySelectorAll('.modal'),
		pageup = document.querySelector('.pageup'),
		smoothLinks = document.querySelectorAll("a[href^='#']")

	buttons.forEach(button => {
		button.addEventListener('click', e => {
			const target = e.target
			target.blur()
			if (target.getAttribute('data-modal') === 'consultation') {
				openModal('#consultation', true)
			} else if (target.getAttribute('data-modal') === 'order') {
				document.querySelectorAll('[data-modal="order"]').forEach((orderBtn, i) => {
					if (target === orderBtn) {
						const modal = document.querySelector('#order')
						modal.querySelector('.modal__descr').textContent = document.querySelectorAll('.catalog-item__title')[i].textContent
					}
				})
				openModal('#order', true)
			} else {
				openModal('#thanks')
			}
		})
	})

	function openModal(loc, backLayer = false) {
		if (backLayer) {
			overlay.classList.add('overlay_active')
		}

		document.querySelector(loc).classList.add('modal_active')
	}

	function closeModal(elem) {
		elem.closest('.modal').classList.remove('modal_active')
		overlay.classList.remove('overlay_active')
	}

	crosses.forEach(cross => {
		cross.addEventListener('click', e => {
			const target = e.target
			closeModal(target)
		})
	})

	document.addEventListener('keyup', e => {
		const key = e.key
		if (key === 'Escape') {
			modals.forEach(modal => {
				closeModal(modal)
				buttons.forEach(item => {
					item.blur()
				})
			})
		}
	})
	document.addEventListener('click', e => {
		modals.forEach(modal => {
			if (modal.classList.contains('modal_active')) {
				if (!e.target.getAttribute('data-modal')) {
					const withinBoundaries = e.composedPath().includes(modal)
					if (!withinBoundaries) {
						closeModal(modal)
					}
				}
			}
		})
	})

	// smooth scroll and pageup
	window.addEventListener('scroll', () => {
		if (window.scrollY > 1600) {
			pageup.classList.add('pageup_active')
		} else {
			pageup.classList.remove('pageup_active')
		}
	})
	smoothLinks.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault()
			const _href = link.getAttribute('href')
			document.querySelector(_href).scrollIntoView({
				behavior: 'smooth'
			})
		})
	})
}
export default modal
