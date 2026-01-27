window.addEventListener('load', function () {

	// Функция для получения GET параметров из URL
	function getQueryParam(param) {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(param);
	}

	// Функция для симуляции клика
	function simulateClick(element) {
		if (!element) return;

		// Создаём событие клика
		const clickEvent = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true
		});

		// Диспатчим событие
		element.dispatchEvent(clickEvent);

		// Также вызываем onclick если он есть
		if (typeof element.onclick === 'function') {
			element.onclick();
		}

		// Вызываем click() метод
		element.click();
	}

	// Основная функция
	function checkCityAndClick() {
		// Получаем значение параметра city
		const city = getQueryParam('city');

		// Проверяем, что city=Москва (с учетом разных вариантов написания)
		if (city && city.toLowerCase() === 'москва') {
			// Находим все элементы с data-slug="second"
			const elements = document.querySelectorAll('[data-slug="second"]');

			// Симулируем клик по каждому элементу
			elements.forEach((element, index) => {
				simulateClick(element);
			});
		}
	}

	// Запускаем после полной загрузки DOM
	document.addEventListener('DOMContentLoaded', checkCityAndClick);

	// Также запускаем при динамической загрузке контента
	if (typeof MutationObserver !== 'undefined') {
		const observer = new MutationObserver(function (mutations) {
			checkCityAndClick();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	}

	function getUrlParam(name) {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(name);
	}

	function activateCityFromUrl() {
		const cityParam = getUrlParam('city');

		if (!cityParam) {
			// Если параметра нет - активируем "Все города"
			const allCitiesCheckbox = document.querySelector('input[name="city"][data-city="all"]');
			if (allCitiesCheckbox) {
				allCitiesCheckbox.checked = true;
				allCitiesCheckbox.closest('.checkbox').classList.add('active');
			}
			return;
		}

		const cityCheckboxes = document.querySelectorAll('input[name="city"][data-city]');

		// Сбрасываем все
		cityCheckboxes.forEach(checkbox => {
			checkbox.checked = false;
			checkbox.closest('.checkbox').classList.remove('active');
		});

		// Ищем чекбокс по data-city
		const targetCheckbox = Array.from(cityCheckboxes).find(checkbox => {
			return checkbox.dataset.city === cityParam;
		});

		if (targetCheckbox) {
			targetCheckbox.checked = true;
			targetCheckbox.closest('.checkbox').classList.add('active');
		} else {
			// Если город не найден - активируем "Все города"
			const allCitiesCheckbox = document.querySelector('input[name="city"][data-city="all"]');
			if (allCitiesCheckbox) {
				allCitiesCheckbox.checked = true;
				allCitiesCheckbox.closest('.checkbox').classList.add('active');
			}
		}
	}

	// Запускаем при загрузке
	activateCityFromUrl();

	const IS_MOBILE = window.innerWidth < 767;
	const IS_TABLE = window.innerWidth > 767 && window.innerWidth < 1025;
	const IS_DESKTOP = window.innerWidth > 1025;
	const USE_PARAMS = new URLSearchParams(window.location.search);
	const PAGE_TEMPLATE_DEFAULT = document.querySelector('.page-template-default');
	const CURRENT_URL = window.location.href;
	const CURRENT_PAGE = PAGE_TEMPLATE_DEFAULT && wpData?.page_id;

	const eventsTemplates = document.querySelectorAll('.events-template');

	// Перебираем каждый блок
	eventsTemplates?.forEach(template => {
		// Находим кнопку внутри текущего блока
		const viewServiceBtn = template.querySelector('.view-services');

		if (viewServiceBtn) {
			// Добавляем обработчик клика
			viewServiceBtn.addEventListener('click', function (e) {
				e.preventDefault();

				// Находим целевой модальный блок
				const modal = document.querySelector('.wp-block-fv-program-modal-events');
				const modalСontent = modal?.querySelector('.modal-wrapper');

				if (modalСontent) {
					modalСontent.style.opacity = '0';
					modalСontent.style.transition = 'opacity 0.3s ease';
					modalСontent.style.zIndex = '999';
					setTimeout(() => {
						modalСontent.style.opacity = '1';
						modalСontent.style.position = 'fixed';
						document.querySelector('body').classList.add('overflow-modal');
					}, 10);
				}
			});
		}
	});


	document.body.addEventListener('click', (e) => {

		const button = e.target.closest('.play-audio');
		if (button) {
			// Находим ближайшего родителя с классом .slide
			const slideParent = button.closest('.slide');
			if (slideParent) {
				// Получаем значение атрибута data-audio
				const audioUrl = slideParent.getAttribute('data-audio');
				if (audioUrl) {
					// Открываем ссылку в новой вкладке
					window.open(audioUrl, '_blank');
				}
			}

		};
	});

	// Запуск видео из ВК
	const playVideoVK = document.querySelector('.play-video-vk');
	if (playVideoVK) {
		playVideoVK.addEventListener('click', function () {
			const blockForVideo = this.closest('.container-block-for-video');

			if (blockForVideo) {

				blockForVideo.querySelector('.content-image').style.opacity = '0';
				blockForVideo.querySelector('.content-image').style.height = '0';
				this.style.display = 'none';

				blockForVideo.querySelector('.content-video').style.opacity = '1';
				blockForVideo.querySelector('.content-video').style.height = '100%';

			}
		});
	}

	// Обработчик кнопки "Назад"
	const btnBackMerch = document.querySelector('.go-back-btn-merch');
	if (btnBackMerch) {
		btnBackMerch.addEventListener('click', function () {
			const modalCart = this.closest('.wp-block-fv-modal-cart');
			if (modalCart) {
				modalCart.style.opacity = '0';
				setTimeout(() => {
					modalCart.style.transition = 'opacity 0.3s ease';
					modalCart.style.zIndex = '-9999';
					document.querySelector('body').classList.remove('overflow-modal');
				}, 300);
			}
		});
	}

	const inMerchCart = document.querySelector('.in-merch');
	if (inMerchCart) {
		inMerchCart.addEventListener('click', function () {
			const modalCart = document.querySelector('.wp-block-fv-modal-cart');
			if (modalCart) {
				modalCart.style.opacity = '0';
				modalCart.style.transition = 'opacity 0.3s ease';
				modalCart.style.zIndex = '999';
				setTimeout(() => {
					modalCart.style.opacity = '1';
					modalCart.style.position = 'fixed';
					document.querySelector('body').classList.add('overflow-modal');
				}, 10);
			}
		})
	}

	// Массив для хранения информации о товарах
	let refererItems = [];

	// Обработчик кнопки "Оформить заказ"

	document.body.addEventListener('click', (e) => {
		if (e.target.matches('.buy-order')) {
			const button = e.target;
			const containerMerch = button.closest('.container-merch');
			if (containerMerch) {
				const imageSrc = containerMerch.querySelector('.gallery-slider-merch').dataset.imgurl;
				const title = containerMerch.querySelector('.title-merch').textContent;
				const colorCheckboxes = containerMerch.querySelector('.color-checkboxes').innerHTML;
				const sizeCheckboxes = containerMerch.querySelector('.size-checkboxes').innerHTML;
				const selectedColor = containerMerch.querySelector('.color-checkboxes .active')?.dataset.color || '';
				const selectedSize = containerMerch.querySelector('.size-checkboxes .active')?.dataset.size || '';
				const price = +button.dataset.price;
				const id = button.dataset.id;

				if (selectedColor.length > 0 && selectedSize.length > 0) {

					const newItemCart = document.createElement('div');
					// newItemCart.className = `item-cart card-${id}`;
					newItemCart.className = `item-cart card-${id}-${selectedColor}-${selectedSize}`;
					const updatePrice = price.toLocaleString('ru-RU');

					newItemCart.innerHTML = `
						<div class="left-item-cart">
							<div class="left-block-merch">
								<img class="image-merch" src="${imageSrc}" alt="">
							</div>
							<div class="right-block-merch">
								<span class="title-merch">${title}</span>
								<div class="change-item">
									<span>Цвет</span>
									<div class="color-checkboxes">
										${colorCheckboxes}
									</div>
								</div>
								<div class="change-item">
									<span>Размер</span>
									<div class="size-checkboxes">
										${sizeCheckboxes}
									</div>
								</div>
							</div>
						</div>
						<div class="right-item-cart">
							<div class="qty">
								<span class="btn-qty minus"></span>
								<span class="qty-number">1</span>
								<span class="btn-qty plus"></span>
							</div>
							<div class="price-product" data-price="${price}">
								<span class="price">${updatePrice}</span>₽
							</div>
						</div>
					`;

					// Помечаем выбранный цвет и размер
					const newColorCheckboxes = newItemCart.querySelectorAll('.color-checkboxes .color-checkbox');
					const newSizeCheckboxes = newItemCart.querySelectorAll('.size-checkboxes .size-checkbox');

					newColorCheckboxes.forEach(checkbox => {
						if (checkbox.dataset.color === selectedColor) {
							checkbox.classList.add('active');
						}
					});

					newSizeCheckboxes.forEach(checkbox => {
						if (checkbox.dataset.size === selectedSize) {
							checkbox.classList.add('active');
						}
					});

					const containerCart = document.querySelector('.container-cart');
					if (containerCart) {
						containerCart.appendChild(newItemCart);
						recalculateTotal();
					}

					const modalWrapperMerch = e.target.closest('.modal-wrapper');
					if (modalWrapperMerch) {
						modalWrapperMerch.style.opacity = '0';
						setTimeout(() => {
							modalWrapperMerch.style.transition = 'opacity 0.3s ease';
							modalWrapperMerch.style.zIndex = '-9999';
							document.querySelector('body').classList.remove('overflow-modal');
							modalWrapperMerch.remove();
						}, 300);
					}

					const modalCart = document.querySelector('.wp-block-fv-modal-cart');
					if (modalCart) {
						modalCart.style.opacity = '0';
						modalCart.style.transition = 'opacity 0.3s ease';
						modalCart.style.zIndex = '999';
						setTimeout(() => {
							modalCart.style.opacity = '1';
							modalCart.style.position = 'fixed';
							document.querySelector('body').classList.add('overflow-modal');
						}, 10);
					}

					const uniqueId = `card-${id}-${selectedColor}-${selectedSize}`;
					const itemInfo = `${title}: Цвет - ${selectedColor}, Размер - ${selectedSize}, Стоимость - ${updatePrice}₽, Кол-во - 1шт.`;

					// Добавляем информацию о товаре в массив
					refererItems[uniqueId] = itemInfo;

					// Обновляем значение input[name=referer]
					const refererInput = document.querySelector('input[name=referer]');
					if (refererInput) {
						refererInput.value = Object.values(refererItems).join(' | ');
					}

					const countCart = +inMerchCart.querySelector('span').textContent;
					inMerchCart.querySelector('span').textContent = countCart + 1;

				} else if (selectedSize.length > 0) {
					alert('Выберите цвет');
				} else if (selectedColor.length > 0) {
					alert('Выберите размер');
				} else {
					alert('Выберите цвет и размер');
				}

			}
		}
	});

	document.addEventListener('click', function (e) {
		if (e.target.matches('.btn-qty')) {
			const isPlus = e.target.classList.contains('plus');
			const itemCart = e.target.closest('.item-cart');
			if (itemCart) {
				const qtyElement = itemCart.querySelector('.qty-number');
				let currentQty = parseInt(qtyElement.textContent, 10);

				if (isPlus) {
					currentQty++;
				} else if (currentQty > 0) {
					currentQty--;
				}

				qtyElement.textContent = currentQty;

				if (currentQty === 0) {
					itemCart.remove();

					const countCart = +inMerchCart.querySelector('span').textContent;
					inMerchCart.querySelector('span').textContent = countCart - 1;

					// Удаляем информацию о товаре из массива
					const uniqueId = itemCart.className.split(' ')[1];
					delete refererItems[uniqueId];
				} else {
					// Обновляем информацию о товаре в массиве
					const title = itemCart.querySelector('.title-merch').textContent;
					const selectedColor = itemCart.querySelector('.color-checkboxes .active')?.dataset.color || '';
					const selectedSize = itemCart.querySelector('.size-checkboxes .active')?.dataset.size || '';
					const priceElement = itemCart.querySelector('.price-product');
					const price = parseFloat(priceElement.dataset.price).toLocaleString('ru-RU');
					const uniqueId = itemCart.className.split(' ')[1];
					const itemInfo = `${title}: Цвет - ${selectedColor}, Размер - ${selectedSize}, Стоимость - ${price}₽, Кол-во - ${currentQty}шт.`;

					refererItems[uniqueId] = itemInfo;

				}

				// Обновляем значение input[name=referer]
				const refererInput = document.querySelector('input[name=referer]');
				if (refererInput) {
					refererInput.value = Object.values(refererItems).join(' | ');
				}

				updateTotalPrice(itemCart, currentQty);
			}
		}
	});

	// Функция для обновления общей стоимости товара в текущей карточке
	function updateTotalPrice(itemCart, currentQty) {
		const priceElement = itemCart.querySelector('.price-product');
		const unitPrice = parseFloat(priceElement.dataset.price);
		const totalPrice = unitPrice * currentQty;

		priceElement.querySelector('.price').textContent = totalPrice.toLocaleString('ru-RU');
		recalculateTotal();
	}

	// Функция для пересчета общей стоимости всех товаров в корзине
	function recalculateTotal() {
		let totalSum = 0;
		document.querySelectorAll('.price-product').forEach(function (priceElement) {
			const currentQty = parseInt(priceElement.closest('.item-cart').querySelector('.qty-number').textContent, 10);
			const unitPrice = parseFloat(priceElement.dataset.price);
			totalSum += unitPrice * currentQty;
		});

		const totalElement = document.querySelector('.result-price .price');
		if (totalElement) {
			totalElement.textContent = totalSum.toLocaleString('ru-RU');
		}

		const titleFormInput = document.querySelector('input[name=titleForm]');
		if (titleFormInput) {
			titleFormInput.value = totalSum.toLocaleString('ru-RU') + '₽';
		}
	}

	// Вызываем функцию пересчета общей стоимости при загрузке страницы
	recalculateTotal();

	document.addEventListener('click', (event) => {
		// Проверяем, что клик был на элементе с классом size-checkbox или color-checkbox
		if (event.target.classList.contains('size-checkbox') || event.target.classList.contains('color-checkbox')) {
			// Найдем родительский элемент с классом size-checkboxes или color-checkboxes
			const parent = event.target.closest('.size-checkboxes, .color-checkboxes');

			if (parent) {
				// Проверяем, находится ли кликнутый элемент внутри корзины

				// Удаляем класс 'active' у всех span с классом size-checkbox или color-checkbox внутри этой группы
				const spans = parent.querySelectorAll('.size-checkbox, .color-checkbox');
				spans.forEach(span => span.classList.remove('active'));

				// Добавляем класс 'active' к кликнутому элементу
				event.target.classList.add('active');

				if (parent.closest('.wp-block-fv-modal-cart')) {
					// Обновляем информацию о товаре в массиве
					const itemCart = parent.closest('.item-cart');
					if (itemCart) {
						const title = itemCart.querySelector('.title-merch').textContent;
						const selectedColor = itemCart.querySelector('.color-checkboxes .active')?.dataset.color || '';
						const selectedSize = itemCart.querySelector('.size-checkboxes .active')?.dataset.size || '';
						const priceElement = itemCart.querySelector('.price-product');
						const price = parseFloat(priceElement.dataset.price).toLocaleString('ru-RU');
						const currentQty = parseInt(itemCart.querySelector('.qty-number').textContent, 10);
						const uniqueId = itemCart.className.split(' ')[1];
						const itemInfo = `${title}: Цвет - ${selectedColor}, Размер - ${selectedSize}, Стоимость - ${price}₽, Кол-во - ${currentQty}шт.`;

						refererItems[uniqueId] = itemInfo;

						// Обновляем значение input[name=referer]
						const refererInput = document.querySelector('input[name=referer]');
						if (refererInput) {
							refererInput.value = Object.values(refererItems).join(' | ');
						}
					}
				}
			}
		}
	});

	document.body.addEventListener('click', (e) => {
		if (e.target.matches('.modal-form-merch')) {
			const cardId = e.target.closest('.item-card').classList[1].replace('card-', '');
			const post = allPosts.find(p => p.id === parseInt(cardId));

			if (post) {
				// Сохраняем текущую позицию прокрутки
				saveScrollPosition();

				const modal = post.content.rendermerch;
				const rendered = post.content.rendered;

				// Преобразуем строку HTML в DOM-элемент
				const renderedDOM = new DOMParser().parseFromString(rendered, 'text/html');

				// Создаем модальное окно
				const modalWrapper = document.createElement('div');
				modalWrapper.className = 'modal-wrapper';
				modalWrapper.innerHTML = `<div class="modal-content">${modal}</div>`;

				// Добавляем стили для анимации
				modalWrapper.style.opacity = '0';
				modalWrapper.style.transition = 'opacity 0.3s ease';
				modalWrapper.style.zIndex = '999';
				document.body.appendChild(modalWrapper);

				// Запускаем анимацию появления
				setTimeout(() => {
					modalWrapper.style.opacity = '1';
					document.querySelector('body').classList.add('overflow-modal');
				}, 10);

				// Получаем предыдущий элемент
				const previousElement = modalWrapper.previousElementSibling;
				if (previousElement && previousElement.classList.contains('modal-wrapper')) {
					previousElement.style.opacity = '0';
					setTimeout(() => {
						previousElement.remove();
					}, 300);
				}

				// Добавляем элементы .color-checkboxes и .size-checkboxes из rendered в модальное окно
				const renderedColors = renderedDOM.querySelector('.color-checkboxes');
				const renderedSizes = renderedDOM.querySelector('.size-checkboxes');

				const modalColors = modalWrapper.querySelector('.color-checkboxes');
				const modalSizes = modalWrapper.querySelector('.size-checkboxes');

				if (renderedColors) {
					modalColors.innerHTML = renderedColors.innerHTML;
				}

				if (renderedSizes) {
					modalSizes.innerHTML = renderedSizes.innerHTML;
				}
			}
		}

		if (e.target.matches('.close-modal-merch')) {
			const modalWrapperMerch = e.target.closest('.modal-wrapper');
			modalWrapperMerch.style.opacity = '0';
			setTimeout(() => {
				modalWrapperMerch.style.transition = 'opacity 0.3s ease';
				modalWrapperMerch.style.zIndex = '-9999';
				document.querySelector('body').classList.remove('overflow-modal');
			}, 300);
		}
	});

	function initializeSlider(sliderClass, countSlider) {

		const slider = document.querySelector('.' + sliderClass);
		if (!slider || slider.classList.contains('initialized')) return;

		slider.classList.add('initialized');

		slider.style.visibility = 'hidden';
		slider.style.opacity = '0';

		const images = slider.querySelectorAll('img');

		const imagePromises = Array.from(images).map(img => {
			return new Promise((resolve, reject) => {
				if (img.complete) {
					resolve();
				} else {
					img.onload = resolve;
					img.onerror = reject;
				}
			});
		});

		Promise.all(imagePromises).then(() => {
			let startX;
			const items = slider.querySelectorAll('.slide');
			const paginationBtns = document.querySelector('.' + sliderClass + '-pagination-btns');
			const sliderThumbnail = document.querySelector('.' + sliderClass + '-thumbnail');
			const thumbnails = sliderThumbnail && sliderThumbnail.querySelectorAll('.slide');

			const leftBtn = paginationBtns?.querySelector('.left-btn');
			const rightBtn = paginationBtns?.querySelector('.right-btn');

			const items_length = items.length;

			if (items_length === 2) {
				paginationBtns.remove();
			}

			// Инициализация ширины слайдов
			updateSliderWidth(slider, countSlider);

			// widthSlide

			const itemWidth = items[0].offsetWidth;
			const containerWidth = slider.offsetWidth;
			const maxOffset = -(items_length * itemWidth - containerWidth);

			const currentUpdateOffset = Math.round(containerWidth / itemWidth);

			let currentOffset = 0;
			let currentSlide = 0;

			let isDragging = false, startPosition = 0, currentPosition = 0, moveDifference = 0;
			let isAnimating = false; // Флаг для блокировки перетаскивания во время анимации

			function updateThumbnailsVisibility() {
				if (!thumbnails) return;

				const visibleThumbnails = 9;
				const halfVisible = Math.floor(visibleThumbnails / 2);

				let startIndex = currentSlide - halfVisible;
				let endIndex = currentSlide + halfVisible;

				if (startIndex < 0) {
					startIndex = 0;
					endIndex = visibleThumbnails - 1;
				}

				if (endIndex >= thumbnails.length) {
					endIndex = thumbnails.length - 1;
					startIndex = endIndex - (visibleThumbnails - 1);
				}

				thumbnails.forEach((thumb, index) => {
					if (index >= startIndex && index <= endIndex) {
						thumb.style.display = 'block';
					} else {
						thumb.style.display = 'none';
					}
				});
			}

			function updateActiveThumbnail() {
				thumbnails && thumbnails.forEach((thumb, index) => {
					if (index === Math.abs(currentOffset / itemWidth)) {
						thumb.classList.add('active');
					} else {
						thumb.classList.remove('active');
					}
				});
			}

			function updateSliderPosition() {
				slider.style.transform = `translateX(${currentOffset}px)`;
				updateActiveThumbnail();
				updateThumbnailsVisibility();
			}

			thumbnails && thumbnails.forEach((thumbnail, index) => {
				thumbnail && thumbnail.addEventListener('click', () => {
					currentOffset = -index * itemWidth;
					currentSlide = index;
					updateSliderPosition();
				});
			});

			leftBtn?.addEventListener('click', function () {
				if (!isAnimating) {
					isAnimating = true;

					if (currentSlide === 0) {
						// Переход на последний слайд
						currentOffset = maxOffset;
						currentSlide = items_length - currentUpdateOffset;
					} else {
						currentOffset += itemWidth;
						currentSlide--;
					}
					updateSliderPosition();
					setTimeout(() => isAnimating = false, 300); // Сброс флага после анимации
				}

			});

			rightBtn?.addEventListener('click', function () {
				if (!isAnimating) {
					isAnimating = true;

					if (currentSlide + currentUpdateOffset === items_length) {
						// Переход на первый слайд
						currentOffset = 0;
						currentSlide = 0;
					} else {
						currentOffset -= itemWidth;
						currentSlide++;
					}
					updateSliderPosition();
					setTimeout(() => isAnimating = false, 300); // Сброс флага после анимации
				}
			});

			function handleDragStart(e) {
				if (e.target.closest('.rich-text') || isAnimating) return;
				e.preventDefault();
				isDragging = true;
				startPosition = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
				startX = startPosition;
				moveDifference = 0;
			}

			function handleDragMove(e) {
				if (!isDragging || isAnimating) return;
				if (e.target.closest('.rich-text')) return;
				e.preventDefault();
				currentPosition = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
				moveDifference = startPosition - currentPosition;

				if (Math.abs(startX - currentPosition) > 10) {
					slider.style.transform = `translateX(${currentOffset - moveDifference}px)`;
				}
			}

			function handleDragEnd() {
				if (!isDragging || isAnimating) return;
				isDragging = false;

				if (Math.abs(startX - currentPosition) > 10) {
					isAnimating = true;

					if (moveDifference > itemWidth / 3) { // Порог для перелистывания
						if (currentSlide + currentUpdateOffset === items_length) {
							// Переход на первый слайд
							currentOffset = 0;
							currentSlide = 0;
						} else {
							currentOffset -= itemWidth;
							currentSlide++;
						}
					} else if (moveDifference < -itemWidth / 3) {
						if (currentSlide === 0) {
							// Переход на последний слайд
							currentOffset = maxOffset;
							currentSlide = items_length - currentUpdateOffset;
						} else {
							currentOffset += itemWidth;
							currentSlide--;
						}
					}

					updateSliderPosition();
					setTimeout(() => isAnimating = false, 300); // Сброс флага после анимации
				}
			}

			slider.addEventListener('mousedown', handleDragStart);
			document.addEventListener('mousemove', handleDragMove);
			document.addEventListener('mouseup', handleDragEnd);
			slider.addEventListener('mouseleave', handleDragEnd);

			slider.addEventListener('touchstart', handleDragStart, { passive: false });
			// 			slider.addEventListener('touchmove', handleDragMove, { passive: false });
			slider.addEventListener('touchmove', (e) => {
				e.preventDefault(); // Явно предотвращаем поведение по умолчанию
				handleDragMove(e);
			}, { passive: false });
			slider.addEventListener('touchend', handleDragEnd);

			window.addEventListener('resize', () => {
				updateSliderWidth(slider, countSlider);
				updateSliderPosition();
			});

			updateSliderPosition();
		})
			.catch(error => {
				console.error('Ошибка при загрузке изображений:', error);
			})
			.finally(() => {
				slider.style.visibility = 'visible';
				slider.style.opacity = '1';
				slider.classList.add('loaded');
			});

	}

	function updateSliderWidth(slider, countSlider) {
		const items = slider.querySelectorAll('.slide');
		const items_length = items.length;

		let widthSlide = '';
		if (countSlider === 4) {
			widthSlide = IS_MOBILE && '50%' || IS_TABLE && '33.33333%' || IS_DESKTOP && '25%';
		} else if (countSlider === 3) {
			widthSlide = IS_MOBILE && '100%' || IS_TABLE && '50%' || IS_DESKTOP && '33.33333%';
		} else if (countSlider === 1) {
			widthSlide = IS_MOBILE && '100%' || IS_TABLE && '100%' || IS_DESKTOP && '100%';
		}

		slider.style.gridTemplateColumns = `repeat(${items_length}, ${widthSlide})`;
	}

	setTimeout(function () {
		if (document.querySelector('.gallery-slider-merch')) {
			initializeSlider('gallery-slider-merch', 1);
		}
		if (document.querySelector('.slider-team-block')) {
			initializeSlider('slider-team-block', 4);
		}
		if (document.querySelector('.slider-space')) {
			initializeSlider('slider-space', 1);
		}
		if (document.querySelector('.big-slider')) {
			initializeSlider('big-slider', 4);
		}
		if (document.querySelector('.slider-tab1')) {
			initializeSlider('slider-tab1', 1);
		}
		if (document.querySelector('.slider-tab2')) {
			initializeSlider('slider-tab2', 1);
		}
		if (document.querySelector('.slider-tab1-1')) {
			initializeSlider('slider-tab1-1', 1);
		}
		if (document.querySelector('.slider-tab2-1')) {
			initializeSlider('slider-tab2-1', 1);
		}
		if (document.querySelector('.slider-tab3-1')) {
			initializeSlider('slider-tab3-1', 1);
		}
		if (document.querySelector('.our-excursion')) {
			initializeSlider('our-excursion', 3);
		}
		if (document.querySelector('.our-excursion-2')) {
			initializeSlider('our-excursion-2', 3);
		}
		if (document.querySelector('.our-reviews')) {
			initializeSlider('our-reviews', 3);
		}
		if (document.querySelector('.our-reviews-tab')) {
			initializeSlider('our-reviews-tab', 3);
		}
		if (document.querySelector('.our-reviews-tab-2')) {
			initializeSlider('our-reviews-tab-2', 3);
		}
		if (document.querySelector('.gallery-slider-sochi')) {
			initializeSlider('gallery-slider-sochi', 1);
		}
		if (document.querySelector('.gallery-slider-moscow')) {
			initializeSlider('gallery-slider-moscow', 1);
		}
		if (document.querySelector('.gallery-slider-kaliningrad')) {
			initializeSlider('gallery-slider-kaliningrad', 1);
		}
		if (document.querySelector('.gallery-slider-pskov')) {
			initializeSlider('gallery-slider-pskov', 1);
		}
		if (document.querySelector('.gallery-slider-kazan')) {
			initializeSlider('gallery-slider-kazan', 1);
		}
		if (document.querySelector('.gallery-slider-novgorod')) {
			initializeSlider('gallery-slider-novgorod', 1);
		}
		if (document.querySelector('.our-reviews-modal')) {
			initializeSlider('our-reviews-modal', 3);
		}
	}, 300);

	function saveScrollPosition() {
		const scrollPosition = window.scrollY || window.pageYOffset;
		localStorage.setItem('scrollPosition', scrollPosition);
	}

	function restoreScrollPosition() {
		const scrollPosition = localStorage.getItem('scrollPosition');
		if (scrollPosition) {
			window.scrollTo(0, parseInt(scrollPosition));
			localStorage.removeItem('scrollPosition'); // Очищаем сохранённое значение
		}
	}

	// Инициализация истории
	history.pushState({ isBackNavigation: false }, document.title, location.href);

	window.addEventListener('popstate', function (event) {
		// Проверяем, был ли это наш искусственный state
		if (event.state && event.state.isBackNavigation) {
			return;
		}

		const goBackButton = document.querySelector('.go-back-btn');
		if (goBackButton) {
			// Сохраняем текущую позицию прокрутки
			saveScrollPosition();

			// Добавляем флаг в history state
			history.replaceState({ isBackNavigation: true }, document.title, location.href);

			// Инициируем клик по кнопке
			goBackButton.click();

			// Восстанавливаем историю
			setTimeout(() => {
				history.pushState({ isBackNavigation: false }, document.title, location.href);
				restoreScrollPosition();
			}, 100);
		}
	});

	// Флаг для отслеживания программного перехода
	let isProgrammaticBack = false;

	history.pushState({}, document.title, location.href);

	window.addEventListener('popstate', function (event) {
		if (isProgrammaticBack) {
			isProgrammaticBack = false;
			return;
		}

		const goBackButton = document.querySelector('.go-back-btn');
		if (goBackButton) {
			saveScrollPosition();

			isProgrammaticBack = true;
			history.pushState({}, document.title, location.href);

			goBackButton.click();

			setTimeout(() => {
				restoreScrollPosition();
			}, 100);
		}
	});


	const filterForm = document.querySelector('.search-filter-wrapper input[name="filterform"]');
	const filterFormValue = filterForm?.value.trim();

	filterFormValue ? localStorage.setItem('filter', filterFormValue) : localStorage.setItem('filter', '');

	const menuForDesktop = document.querySelector('.menu-for-desktop');
	const websiteMobileMenu = document.querySelector('.website-mobile-menu');

	const menuItems = menuForDesktop?.querySelectorAll('.menu-item-has-children');
	const menuItemsMobile = websiteMobileMenu?.querySelectorAll('.menu-item-has-children');

	menuItems?.forEach(function (menuItem) {
		let timeoutId;

		function showMenu() {
			clearTimeout(timeoutId);
			menuItem.classList.add('no-active');
			const subMenu = menuItem.querySelector('.sub-menu');
			if (subMenu) {
				subMenu.classList.add('no-active');
			}
		}

		function hideMenu() {
			timeoutId = setTimeout(() => {
				menuItem.classList.remove('no-active');
				const subMenu = menuItem.querySelector('.sub-menu');
				if (subMenu) {
					subMenu.classList.remove('no-active');
				}
			}, 300); // 300 мс задержка
		}

		menuItem.addEventListener('mouseenter', showMenu);
		menuItem.addEventListener('mouseleave', hideMenu);

		// Добавляем обработчики для подменю
		const subMenu = menuItem.querySelector('.sub-menu');
		if (subMenu) {
			subMenu.addEventListener('mouseenter', showMenu);
			subMenu.addEventListener('mouseleave', hideMenu);
		}
	});

	let lastScrollTop = 0;
	const navbar = document.querySelector('.wp-block-fv-header-block');

	if (navbar) {
		window.addEventListener('scroll', function () {
			let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

			if (currentScroll < 20) {
				navbar.classList.remove('active');
			} else {
				navbar.classList.add('active');
			}

			lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
		});
	}



	// menuItemsMobile.forEach(function(menuItem) {
	// 	let timeoutId;

	// 	function showMenu() {
	// 		clearTimeout(timeoutId);
	// 		menuItem.classList.add('no-active');
	// 		const subMenu = menuItem.querySelector('.sub-menu');
	// 		if (subMenu) {
	// 			subMenu.classList.add('no-active');
	// 		}
	// 	}

	// 	function hideMenu() {
	// 		timeoutId = setTimeout(() => {
	// 			menuItem.classList.remove('no-active');
	// 			const subMenu = menuItem.querySelector('.sub-menu');
	// 			if (subMenu) {
	// 				subMenu.classList.remove('no-active');
	// 			}
	// 		}, 300); // 300 мс задержка
	// 	}

	// 	menuItem.addEventListener('mouseenter', showMenu);
	// 	menuItem.addEventListener('mouseleave', hideMenu);

	// 	// Добавляем обработчики для подменю
	// 	const subMenu = menuItem.querySelector('.sub-menu');
	// 	if (subMenu) {
	// 		subMenu.addEventListener('mouseenter', showMenu);
	// 		subMenu.addEventListener('mouseleave', hideMenu);
	// 	}
	// });

	// Находим элемент с классом .menu-icon
	let menuIcon = document.querySelector('.menu-icon');

	// Добавляем обработчик события на клик
	menuIcon?.addEventListener('click', function () {
		// Переключаем класс .active для .menu-icon
		this.classList.toggle('active');

		// Переключаем класс .active для .website-mobile-menu
		const websiteMobileMenu = document.querySelector('.website-mobile-menu');
		if (websiteMobileMenu) {
			websiteMobileMenu.classList.toggle('active');
		}

		// Переключаем класс .active-menu для body
		document.body.classList.toggle('active-menu');
	});

	// if (localStorage.getItem('sales') !== null) {
	// 	localStorage.removeItem('sales');
	// 	console.log('Ключ "sales" удален из localStorage');
	// }

	// Проверяем, есть ли параметр 'sales'
	if (USE_PARAMS.has('sales')) {
		const salesValue = USE_PARAMS.get('sales');

		localStorage.setItem('sales', salesValue);
		// Удаляем параметр 'sales' из URL
		USE_PARAMS.delete('sales');
		// Формируем новый URL
		const newUrl = window.location.pathname + (USE_PARAMS.toString() ? '?' + USE_PARAMS.toString() : '');
		// Заменяем текущий URL без перезагрузки страницы
		window.history.replaceState({}, document.title, newUrl);
	}

	const parentContainer = document.querySelector('.page');

	// Добавляем обработчик события на родительский элемент
	parentContainer?.addEventListener('click', (event) => {
		// Проверяем, был ли клик по .title-card или его дочерним элементам
		const titleCard = event.target.closest('.title-card');
		if (titleCard) {
			// Находим соответствующий элемент .more внутри того же блока
			const moreButton = titleCard.closest('.item-section').nextElementSibling.querySelector('.more');

			// Если кнопка .more найдена, имитируем клик
			if (moreButton) {
				moreButton.click();
			}
		}
	});

	function wrapTextInTag(tag, className, searchString) {
		const regex = new RegExp(`(${searchString})`, 'gi');

		function highlightText(node) {
			if (node.nodeType === Node.TEXT_NODE) {
				const parentNode = node.parentNode;
				const textContent = node.textContent;

				// Проверка: родительский узел не должен быть "highlight"
				if (regex.test(textContent) && !parentNode.classList.contains(className)) {
					// Создаём временный контейнер для вставки HTML
					const tempContainer = document.createElement('span');
					tempContainer.innerHTML = textContent.replace(
						regex,
						`<${tag} class="${className}">$1</${tag}>`
					);

					// Заменяем текущий текстовый узел на его содержимое
					while (tempContainer.firstChild) {
						parentNode.insertBefore(tempContainer.firstChild, node);
					}
					parentNode.removeChild(node);
				}
			} else if (node.nodeType === Node.ELEMENT_NODE) {
				// Пропускаем уже обернутые узлы
				if (!node.classList.contains(className)) {
					for (let child of Array.from(node.childNodes)) {
						highlightText(child);
					}
				}
			}
		}

		highlightText(document.body);
	}


	if (PAGE_TEMPLATE_DEFAULT) {

		wrapTextInTag('em', 'highlight', '«лагер');
		wrapTextInTag('em', 'highlight', '«академ');

	}

	const testDrive = document.querySelector('.wp-block-fv-test-drive');

	if (testDrive) {
		const testDriveOpen = testDrive.querySelector('.test-drive-open');

		testDriveOpen.addEventListener('click', function (e) {
			e.preventDefault();

			const formTestDriveModal = testDrive.querySelector('.modal-wrapper');

			if (formTestDriveModal) {
				formTestDriveModal.style.opacity = '0';
				formTestDriveModal.style.transition = 'opacity 0.3s ease';
				formTestDriveModal.style.zIndex = '9999';
				document.querySelector('body').classList.toggle('overflow-modal');
				setTimeout(() => {
					formTestDriveModal.style.opacity = '1';
				}, 10);
			}
		});

	}

	const testDriveTabs = document.querySelector('.wp-block-fv-test-drive-tabs');
	if (testDriveTabs) {
		const testDriveOpenButtons = testDriveTabs.querySelectorAll('.test-drive-open');

		testDriveOpenButtons.forEach(button => {
			button.addEventListener('click', function (e) {
				e.preventDefault();

				const formTestDriveModal = testDriveTabs.querySelector('.modal-wrapper');

				if (formTestDriveModal) {
					formTestDriveModal.style.opacity = '0';
					formTestDriveModal.style.transition = 'opacity 0.3s ease';
					formTestDriveModal.style.zIndex = '9999';
					document.querySelector('body').classList.toggle('overflow-modal');
					setTimeout(() => {
						formTestDriveModal.style.opacity = '1';
					}, 10);
				}
			});
		});
	}

	function createTimeline(items) {
		const container = document.createElement('div');
		container.classList.add('timeline-container');

		items.forEach((item, index) => {
			const timelineItem = document.createElement('div');
			timelineItem.classList.add('timeline-item');

			// Разделяем время и описание
			if (item) {
				const [time, description] = item.split('—');

				// Создаем элемент времени
				const timeElement = document.createElement('div');
				timeElement.classList.add('timeline-time');
				timeElement.textContent = time;

				// Создаем элемент описания
				const descElement = document.createElement('div');
				descElement.classList.add('timeline-description');
				descElement.textContent = description;

				// Добавляем в контейнер
				timelineItem.appendChild(timeElement);
				timelineItem.appendChild(descElement);
				container.appendChild(timelineItem);
			}

		});

		return container;
	}

	const mobileContainer = document.querySelector('.mobile-container')
	if (mobileContainer) {
		const dataContent = mobileContainer?.getAttribute('data-content');
		if (dataContent) {
			const schedule = JSON.parse(dataContent);
			mobileContainer?.appendChild(createTimeline(schedule));
		}

	}


	const accordionItems = document.querySelectorAll('.question-item');

	if (accordionItems) {
		accordionItems.forEach(item => {
			item.addEventListener('click', function () {
				const answer = this.nextElementSibling;
				const isActive = this.classList.contains('active');

				// Закрываем все открытые элементы
				accordionItems.forEach(otherItem => {
					otherItem.classList.remove('active');
					otherItem.nextElementSibling.style.maxHeight = '0';
				});

				// Если текущий элемент не был активен, открываем его
				if (!isActive) {
					this.classList.add('active');
					answer.style.maxHeight = answer.scrollHeight + 'px';
				}
			});
		});
	}

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const targetId = this.getAttribute('href').substring(1);
			const targetElement = document.getElementById(targetId);

			if (targetElement) {
				const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		});
	});

	this.setTimeout(() => {

		const seePosts = document.querySelector('.see-posts-container');
		const moreBtns = seePosts?.querySelectorAll('.more');

		moreBtns && moreBtns.forEach(btn => {
			const modalFormBtn = btn.previousElementSibling;
			btn.setAttribute('data-referer', CURRENT_URL);
			modalFormBtn.setAttribute('data-referer', CURRENT_URL);
		});

		const modalStepsForm = document.querySelector('.modal-steps-form');
		if (modalStepsForm) {
			const titleForm = modalStepsForm.querySelector('input[name="titleForm"]');
			const titleProduct = modalStepsForm.querySelector('input[name="titleProduct"]');
			const referer = modalStepsForm.querySelector('input[name="referer"]');
			const dataStart = modalStepsForm.querySelector('input[name="dataStart"]');

			titleForm.value = 'Общая заявка';
			titleProduct.value = 'Общая заявка';
			referer.value = CURRENT_URL || '';
			dataStart.value = '';
		}

		const formTestDriveModal = document.querySelector('#form-test-drive-modal');
		if (formTestDriveModal) {
			const referer = formTestDriveModal.querySelector('input[name="referer"]');
			referer.value = CURRENT_URL || '';
		}

	}, 300)

	let allPosts = null;

	const currentAllPosts = (posts) => allPosts = posts;

	const fetchAllPosts = async () => {

		const salesValue = localStorage.getItem('sales') ? localStorage.getItem('sales') : '';
		const filterValue = localStorage.getItem('filter') ? localStorage.getItem('filter') : '';

		const params = new URLSearchParams();

		if (salesValue) params.append('sales', salesValue);
		if (filterValue) params.append('filter', filterValue);

		try {

			const responses = await fetch(`${wpApiSettings.root}custom/v1/all-posts?${params.toString()}`, {
				headers: {
					'X-WP-Nonce': wpApiSettings.nonce,
					'Content-Type': 'application/json'
				}
			});
			const data = await responses.json();
			// Combine all posts into a single array
			const allPosts = Object.values(data).flat();

			currentAllPosts(allPosts);

			// Инициализация с выбранным первым фильтром
			// Список ID страниц, на которых должен выполняться запрос
			// 42 – Лагерь профессий
			// 44 – АРТ Комьюнити
			// 46 – Академия навыков
			// 788 – Узная Город
			// 50 – Курсы
			// 1190 – Консультация психолога
			const allowedPagesFilter = ["42", "44", "46", "788", "50", "1190"];

			// Проверяем, находится ли текущая страница в списке разрешённых
			if (allowedPagesFilter.includes(CURRENT_PAGE)) {
				filterPosts();
			}

			const randomPostsContainerCatalog = document.getElementById('random-posts-container-catalog');
			if (randomPostsContainerCatalog) {
				loadRandomPosts(randomPostsContainerCatalog);
				randomPostsContainerCatalog.dataset.loaded = 'true';
			}

			return allPosts;
		} catch (error) {
			console.error('Error fetching posts:', error);
			return [];
		}
	};

	const pageGroups = {
		"group1": ["42", "44", "46", "788"], // Группа для art-community, career-camp и других
		"group2": ["50", "1190"],           // Группа для psychologist и skills-courses
		"group3": ["2363"]                 // Группа для proficiency-testing  "48" - для DEV
	};

	// Находим группу для текущей страницы
	let currentGroupKey = null;

	for (const [groupKey, pageIds] of Object.entries(pageGroups)) {
		if (pageIds.includes(CURRENT_PAGE)) {
			currentGroupKey = groupKey;
			break;
		}
	}

	let isDataFromLocalStorage = false;

	if (currentGroupKey) {
		// Формируем ключ для localStorage на основе группы
		const localStorageKey = `group_${currentGroupKey}`;
		const storedData = localStorage.getItem(localStorageKey);

		// Флаг для определения, были ли данные взяты из localStorage

		if (storedData) {
			const { data, timestamp } = JSON.parse(storedData);

			// Проверяем, прошёл ли час с момента сохранения данных
			const currentTime = Date.now();
			// const oneHourInMs = 60 * 60 * 1000; // 1 час в миллисекундах
			const oneHourInMs = 3000; // 1 час в миллисекундах

			if (currentTime - timestamp < oneHourInMs) {
				currentAllPosts(data); // Записываем данные в currentAllPosts
				isDataFromLocalStorage = true; // Устанавливаем флаг
			}
		}

		if (!isDataFromLocalStorage) {
			fetchAllPosts().then(data => {

				// Сохраняем данные в localStorage с меткой времени
				const newData = {
					data,
					timestamp: Date.now() // Текущее время
				};
				localStorage.setItem(localStorageKey, JSON.stringify(newData));

				// Записываем данные в currentAllPosts
				currentAllPosts(data);
			});
		}

	}


	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.type === 'childList') {

				const randomPostsContainer = document.getElementById('random-posts-container');
				if (randomPostsContainer && !randomPostsContainer.dataset.loaded) {
					loadRandomPosts(randomPostsContainer);
					randomPostsContainer.dataset.loaded = 'true';
				}

			}

		});
	});

	observer.observe(document.body, { childList: true, subtree: true });

	function loadRandomPosts(container) {

		// Текущий пост
		const currentPostId = container.dataset.currentPostId;

		// Фильтруем посты, исключая текущий
		const filteredPosts = allPosts.filter(post => post.id !== parseInt(currentPostId));
		const resultFilteredPosts = filteredPosts.filter(post => post.inPlace);

		// Выбираем 4 случайных поста
		const randomPosts = getRandomElements(resultFilteredPosts, 4);

		let html = '';
		const filter = randomPosts[0]?.filter;

		if (filter === 'cources') {
			html = randomPosts.map(post => {
				const {
					content: {
						postTypeName,
						dateRange,
						selectedAges,
						price,
					},
					id,
					type,
					title,
					selected_place,
					selected_city,
					inPlace,
					inCard,
					placeTitle,
					titleCount
				} = post;

				const classPlace = inPlace ? 'green' : 'red';
				const titlePlace = inPlace ? 'Оставить заявку' : 'Мест нет — запись в резерв';
				const ages = selectedAges === 'родители - родители лет' ? 'родители' : selectedAges;

				const currentSkillsDate = formatDateSkills(dateRange);
				const typeIndex = type === 'travel-by-city';
				let cleanPrice = price?.replace(/<[^>]*>/g, '').trim();
				let cleanTitle = title?.replace(/<(?!\/?br\s*\/?>)[^>]+>/gi, '').trim();
				const activeClass = inPlace ? 'active-class' : 'no-active-class';
				// const active_class = selected_place.trim() === 'Москва' ? 'active' : '';
				const active_class = '';

				const placeCard = selected_city.length > 0 ? selected_city : selected_place;

				const card = `
					<div class="item-card card-${id} ${type}">
						<div class="top-item-section item-section">
								${postTypeName === 'Консультации психолога' ? '' : `<span class="label-card">${postTypeName}</span>`}
								${typeIndex
						? `<span class="place-card">${dateRange}</span>`
						: inCard
							? `<span class="date-card">${dateRange}</span>
											<span class="place-card ${active_class}">${placeCard}</span>`
							: `<span class="place-card">${placeTitle && 'Место проведения — ' + placeTitle}</span>`
					}
								<div class="title-card">${cleanTitle}</div>
								${postTypeName === 'Консультации психолога' ? '' : `<div class="ages-card">(${ages})</div>`}
						</div>
						<div class="bottom-item-section item-section">
								${postTypeName === 'Консультации психолога' ? '' : `<div class="days-card">${titleCount}</div>`}
								<div class="price-card">${cleanPrice ? cleanPrice : ''}</div>
								${inCard
						? titlePlace === 'Оставить заявку'
							? `<button 
												class="modal-form ${classPlace}"
												data-titleform="${postTypeName + ': ' + cleanTitle}"
												data-titleproduct="${cleanTitle}"
												data-referer="${window.location.href}"
												data-datestart="${postTypeName === 'Консультации психолога' ? '' : currentSkillsDate}"
											>${titlePlace}</button>`
							: ``
						: `<button 
											class="modal-form ${classPlace}"
											data-titleform="${postTypeName + ': ' + cleanTitle}"
											data-titleproduct="${cleanTitle}"
											data-referer="${window.location.href}"
											data-datestart="${postTypeName === 'Консультации психолога' ? '' : currentSkillsDate}"
										>${titlePlace}</button>`
					}
								
								${inCard
						? `<button 
											class="more ${classPlace} ${activeClass}"
											data-titleform="${postTypeName + ': ' + cleanTitle}"
											data-titleproduct="${cleanTitle}"
											data-referer="${window.location.href}"
											data-datestart="${currentSkillsDate}"
										>Подробнее ${iconArray}</button>`
						: ``
					}
							</div>
					  </div>`;

				return card;
			}).join('');

		} else if (filter === 'merch') {
			html = randomPosts.map(post => {
				const {
					content: {
						price,
					},
					id,
					type,
					title,
					bgImage,
				} = post;

				const classPlace = 'green';
				// const	activeClass = inPlace ? 'active-class' : 'no-active-class';

				let cleanPrice = price?.replace(/<[^>]*>/g, '').trim();
				let cleanTitle = title?.replace(/<[^>]*>/g, '').trim();

				const urlImg = bgImage[0] ? bgImage[0]['url'] : '#';

				const card = `
					<div class="item-card card-${id} ${type}">

							<div class="top-item-section item-section">
							<div class="image-merch"><img src="${urlImg}" alt="Thumbnail"/></div>
								<div class="title-card">${cleanTitle}</div>
							</div>

							<div class="bottom-item-section item-section">

								<div class="price-card">${cleanPrice ? cleanPrice : ''}</div>
								<button 
									class="modal-form-merch ${classPlace}"
									data-titleform="${'Мерч' + ': ' + cleanTitle}"
									data-titleproduct="${cleanTitle}"
									data-referer="${window.location.href}"
								>Оставить заявку</button>
								<button 
									class="more ${classPlace}"
									data-titleform="${'Мерч' + ': ' + cleanTitle}"
									data-titleproduct="${cleanTitle}"
									data-referer="${window.location.href}"
								>Подробнее ${iconArray}</button>

							</div>

					</div>`;


				return card;
			}).join('');
		} else {
			html = randomPosts.map(post => {
				const {
					content: {
						postTypeName,
						dateRange,
						selectedAges,
						daysCount,
						price,
					},
					id,
					type,
					title,
					selected_shift,
					selected_place,
					selected_city,
					inPlace
				} = post;

				const classPlace = inPlace ? 'green' : 'red';
				const titlePlace = inPlace ? 'Оставить заявку' : 'Мест нет — запись в резерв';
				const shift = selected_shift ? `(${selected_shift})` : '';
				const ages = selectedAges === 'родители - родители лет' ? 'родители' : selectedAges;

				const currentDate = formatDateRange(dateRange);
				const newCurrentDate = newFormatDateRange(dateRange);
				const typeIndex = type === 'travel-by-city';
				let cleanPrice = price?.replace(/<[^>]*>/g, '').trim();
				let cleanTitle = title?.replace(/<(?!\/?br\s*\/?>)[^>]+>/gi, '').trim();
				// const active_class = selected_place.trim() === 'Москва' ? 'active' : '';
				const active_class = '';

				const placeCard = selected_city.length > 0 ? selected_city : selected_place;

				const card = `
					<div class="item-card card-${id} ${type}">
						<div class="top-item-section item-section">
								<span class="label-card">${postTypeName}</span>
								${typeIndex
						? `<span class="place-card">${dateRange}</span>`
						: `<span class="date-card">${dateRange} ${shift}</span>
											<span class="place-card ${active_class}">${placeCard}</span>`
					}
								<div class="title-card">${cleanTitle}</div>
								<div class="ages-card">(${ages})</div>
						</div>
						<div class="bottom-item-section item-section">
								<div class="days-card">${daysCount}</div>
								<div class="price-card">${cleanPrice ? cleanPrice : ''}</div>
							<button 
								class="modal-form ${classPlace}"
								data-titleform="${postTypeName + ': ' + cleanTitle}"
								data-titleproduct="${cleanTitle}"
								data-referer="${window.location.href}"
								data-datestart="${currentDate}"
							>${titlePlace}</button>
							<button 
								class="more ${classPlace}"
								data-titleform="${postTypeName + ': ' + cleanTitle}"
								data-titleproduct="${cleanTitle}"
								data-referer="${window.location.href}"
								data-datestart="${currentDate}"
							>Подробнее ${iconArray}</button>
						</div>
					</div>`;

				return card;
			}).join('');
		}

		// Вставляем HTML в контейнер
		container.innerHTML = html;

	}

	// Функция для выбора случайных элементов из массива
	function getRandomElements(array, count) {
		const shuffled = array.sort(() => 0.5 - Math.random());
		return shuffled.slice(0, count);
	}

	document.addEventListener('click', function (e) {
		const itemCard = e.target.closest('.wp-block-fv-item-card');

		if (itemCard) {
			const video = itemCard?.querySelector('video');
			const playVideo = e.target.closest('.play-video');

			if (e.target.closest('.video-open')) {
				const modalWrapper = itemCard.querySelector('.modal-wrapper-video');
				if (modalWrapper) {
					modalWrapper.style.opacity = '0';
					modalWrapper.style.transition = 'opacity 0.3s ease';
					modalWrapper.style.zIndex = '9999';
					document.querySelector('body').classList.add('overflow-modal');
					setTimeout(() => {
						modalWrapper.style.opacity = '1';
					}, 10);
				}
			}

			if (e.target.closest('.close-modal-video')) {
				if (video) {
					const nextElement = video.nextElementSibling;
					if (nextElement && nextElement.classList.contains('play-video')) {
						nextElement.style.transition = 'opacity 0.3s ease';
						nextElement.style.opacity = '1';
						nextElement.style.zIndex = '999999';
					}
					video.pause();
				}
				const modalWrapper = itemCard.querySelector('.modal-wrapper-video');
				if (modalWrapper) {
					modalWrapper.style.opacity = '0';
					setTimeout(() => {
						modalWrapper.style.transition = 'opacity 0.3s ease';
						modalWrapper.style.zIndex = '-9999';
						document.querySelector('body').classList.remove('overflow-modal');
					}, 300);
				}
			}

			if (playVideo) {

				if (video) {
					video.play();
					playVideo.style.transition = 'opacity 0.3s ease';
					playVideo.style.opacity = '0';
					playVideo.style.zIndex = '-999999';
				}
			}

			if (e.target === video) {
				const nextElement = video.nextElementSibling;
				if (nextElement && nextElement.classList.contains('play-video')) {
					nextElement.style.transition = 'opacity 0.3s ease';
					nextElement.style.opacity = '1';
					nextElement.style.zIndex = '999999';
				}
				video.pause();
			}

			if (video) {
				video.addEventListener('ended', function () {
					const playVideo = itemCard.querySelector('.play-video');
					if (playVideo) {
						playVideo.style.transition = 'opacity 0.3s ease';
						playVideo.style.opacity = '1';
						playVideo.style.zIndex = '999999';
					}
				});
			}

		}
	});

	const programModal = document.querySelector('.wp-block-fv-program-modal.hidden-model');

	if (programModal) {

		document.addEventListener('click', function (e) {
			const modalWrapper = programModal?.querySelector('.modal-wrapper');
			if (e.target.matches('.modal-form')) {
				const colorClass = e.target.closest('.item-card') ? e.target.closest('.item-card').classList[2] : e.target.closest('.modal-content').classList[1];
				let textForm = modalWrapper?.querySelector('.title-modal').innerHTML;

				if (colorClass === 'skills-academy') {
					textForm = '<span><mark style="background-color:rgba(0, 0, 0, 0);color:#7b8bff" class="has-inline-color">Оставьте заявку в&nbsp;Академию навыков</mark> в&nbsp;2 шага и&nbsp;дождитесь звонка администратора</span>';
				} else if (colorClass === 'art-community') {
					textForm = '<span><mark style="background-color:rgba(0, 0, 0, 0);color:#e82e2e" class="has-inline-color">Оставьте заявку в&nbsp;ART Community</mark> в&nbsp;2 шага и&nbsp;дождитесь звонка администратора</span>';
				} else if (colorClass === 'travel-by-city') {
					textForm = '<span><mark style="background-color:rgba(0, 0, 0, 0);color:#30a933" class="has-inline-color">Оставьте заявку на&nbsp;Путешествия для&nbsp;подростков «Узнай город» в&nbsp;2&nbsp;шага</mark> и&nbsp;дождитесь звонка администратора</span>';
				} else if (colorClass === 'career-camp') {
					textForm = '<span><mark style="background-color:rgba(0, 0, 0, 0);color:#30a933" class="has-inline-color">Оставьте заявку на&nbsp;программу лагерь</mark> в&nbsp;2 шага и&nbsp;дождитесь звонка администратора</span>';
				} else {
					textForm = textForm;
				}


				if (modalWrapper) {
					const modalContent = modalWrapper.querySelector('.modal-content');
					// Сохраняем нужный класс
					const targetClass = modalContent.classList[0];
					// Оставляем только нужный класс
					modalContent.className = targetClass;
					modalContent.classList.add(colorClass);
					modalWrapper.querySelector('.title-modal').innerHTML = textForm;
					modalWrapper.style.opacity = '0';
					modalWrapper.style.transition = 'opacity 0.3s ease';
					modalWrapper.style.zIndex = '9999';
					document.querySelector('body').classList.toggle('overflow-modal');
					setTimeout(() => {
						modalWrapper.style.opacity = '1';
					}, 10);
				}
			}
		});
	}


	const programModalWithCity = document.querySelector('.wp-block-fv-program-modal-with-city.hidden-model');



	if (programModalWithCity) {
		document.addEventListener('click', function (e) {
			const modalWrapper = programModalWithCity?.querySelector('.modal-wrapper');
			if (e.target.matches('.modal-form')) {
				const colorClass = e.target.closest('.item-card') ? e.target.closest('.item-card').classList[2] : e.target.closest('.modal-content').classList[1];
				let textForm = modalWrapper.querySelector('.title-modal').innerHTML;

				if (colorClass === 'skills-academy') {
					textForm = '<span><mark style="background-color:rgba(0, 0, 0, 0);color:#7b8bff" class="has-inline-color">Оставьте заявку в&nbsp;Академию навыков</mark> в&nbsp;2 шага и&nbsp;дождитесь звонка администратора</span>';
				} else if (colorClass === 'art-community') {
					textForm = '<span><mark style="background-color:rgba(0, 0, 0, 0);color:#e82e2e" class="has-inline-color">Оставьте заявку в&nbsp;ART Community</mark> в&nbsp;2 шага и&nbsp;дождитесь звонка администратора</span>';
				} else if (colorClass === 'travel-by-city') {
					textForm = '<span><mark style="background-color:rgba(0, 0, 0, 0);color:#30a933" class="has-inline-color">Оставьте заявку на&nbsp;Путешествия для&nbsp;подростков «Узнай город» в&nbsp;2&nbsp;шага</mark> и&nbsp;дождитесь звонка администратора</span>';
				} else if (colorClass === 'career-camp') {
					textForm = '<span><mark style="background-color:rgba(0, 0, 0, 0);color:#30a933" class="has-inline-color">Оставьте заявку на&nbsp;программу лагерь</mark> в&nbsp;2 шага и&nbsp;дождитесь звонка администратора</span>';
				} else {
					textForm = textForm;
				}


				if (modalWrapper) {
					const modalContent = modalWrapper.querySelector('.modal-content');
					// Сохраняем нужный класс
					const targetClass = modalContent.classList[0];
					// Оставляем только нужный класс
					modalContent.className = targetClass;
					modalContent.classList.add(colorClass);
					modalWrapper.querySelector('.title-modal').innerHTML = textForm;
					modalWrapper.style.opacity = '0';
					modalWrapper.style.transition = 'opacity 0.3s ease';
					modalWrapper.style.zIndex = '9999';
					document.querySelector('body').classList.toggle('overflow-modal');
					setTimeout(() => {
						modalWrapper.style.opacity = '1';
					}, 10);
				}
			}
		});
	}



	const closeModals = document.querySelectorAll('.close-modal');

	closeModals?.forEach(closeBtn => {
		closeBtn.addEventListener('click', function (e) {
			e.preventDefault();
			const modalWrapper = this.closest('.modal-wrapper');

			if (modalWrapper) {
				// Анимация закрытия
				modalWrapper.style.opacity = '0';

				setTimeout(() => {
					modalWrapper.style.transition = 'opacity 0.3s ease';
					modalWrapper.style.zIndex = '-9999';
					document.querySelector('body').classList.toggle('overflow-modal');
				}, 300);

				// Сброс состояния формы и активного шага
				const containerStep = modalWrapper.querySelector('.container-step');
				const form = modalWrapper.querySelector('form');

				if (containerStep) {
					containerStep.classList.remove('active');
				}

				if (form) {
					form.reset();
				}
			}
		});
	});

	// Закрытие по ESC
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			const modalWrapper = document.querySelector('.modal-wrapper');
			if (modalWrapper) {
				modalWrapper.style.opacity = '0';
				setTimeout(() => {
					modalWrapper.style.transition = 'opacity 0.3s ease';
					modalWrapper.style.zIndex = '-9999';
					document.querySelector('body').classList.toggle('overflow-modal');
				}, 300);
				modalWrapper?.querySelector('.container-step').classList.remove('active');
				modalWrapper?.querySelector('form').reset();
			}
		}
	});

	document.addEventListener('click', function (e) {

		const modalWrapper = e.target;
		if (modalWrapper.classList.contains('modal-wrapper')) {
			modalWrapper.style.opacity = '0';
			setTimeout(() => {
				modalWrapper.style.transition = 'opacity 0.3s ease';
				modalWrapper.style.zIndex = '-9999';
				document.querySelector('body').classList.toggle('overflow-modal');
			}, 300);
			modalWrapper?.querySelector('.container-step')?.classList.remove('active');
			modalWrapper?.querySelector('form')?.reset();
		}

		if (modalWrapper.classList.contains('modal-wrapper-video')) {
			modalWrapper.style.opacity = '0';
			const video = modalWrapper.querySelector('video');
			setTimeout(() => {
				modalWrapper.style.transition = 'opacity 0.3s ease';
				modalWrapper.style.zIndex = '-9999';
			}, 300);
			if (video) {
				const nextElement = video.nextElementSibling;
				if (nextElement && nextElement.classList.contains('play-video')) {
					nextElement.style.transition = 'opacity 0.3s ease';
					nextElement.style.opacity = '1';
					nextElement.style.zIndex = '999999';
				}
				video.pause();
			}
		}

	});

	const searchInput = document.querySelector('.search-filter-wrapper input[name="s"]');
	const programCheckboxes = document.querySelectorAll('.program-filter-item input[type="checkbox"]');
	const cityCheckboxes = document.querySelectorAll('.city-filter-item input[type="checkbox"]');
	const ageCheckboxes = document.querySelectorAll('.age-filter-item input[type="checkbox"]');
	const sizeCheckboxes = document.querySelectorAll('.size-filter-item input[type="checkbox"]');
	const placeCheckboxes = document.querySelectorAll('.place-filter-item input[type="checkbox"]');
	const seasonCheckboxes = document.querySelectorAll('.season-filter-item input[type="checkbox"]');
	const daysCheckboxes = document.querySelectorAll('.days-filter-item input[type="checkbox"]');
	const shiftCheckboxes = document.querySelectorAll('.shift-filter-item input[type="checkbox"]');
	const certificateCheckboxes = document.querySelectorAll('.certificate-filter-item input[type="checkbox"]');
	const postsContainer = document.getElementById('filtered-posts-container');
	const resultContentFilter = document.querySelector('.result-content-filter');

	// Создаем прелоадер
	function createPreloader() {
		const preloader = document.createElement('div');
		preloader.id = 'preloader';
		preloader.className = 'preloader';

		const spinner = document.createElement('div');
		spinner.className = 'spinner';

		preloader.appendChild(spinner);

		// Добавляем прелоадер в начало контейнера
		// postsContainer?.insertBefore(preloader, postsContainer.firstChild);
		resultContentFilter?.insertBefore(preloader, resultContentFilter.firstChild);

		return preloader;
	}

	// Создаем прелоадер при загрузке скрипта
	const preloader = createPreloader();

	// Функции для показа и скрытия прелоадера
	function showPreloader() {
		preloader.style.display = 'flex';
		postsContainer && (postsContainer.style.minHeight = '200px');
	}

	function hidePreloader() {
		preloader.style.display = 'none';
		postsContainer && (postsContainer.style.minHeight = ''); // Сбрасываем минимальную высоту
	}

	async function fetchPosts(postTypes = null, city = null, ages = null, size = null, place = null, season = null, days = null, shift = null, certificate = null, search = null, filter = null, sales = null, user_id = 0) {
		const params = new URLSearchParams();

		if (postTypes && postTypes.length > 0) params.append('post_types', postTypes.join(','));
		if (city && city.length > 0) params.append('city', city.join(','));
		if (ages && ages.length > 0) params.append('ages', ages.join(','));
		if (size && size.length > 0) params.append('size', size);
		if (place && place.length > 0) params.append('place', place);
		if (season && season.length > 0) params.append('season', season);
		if (days && days.length > 0) params.append('days', days);
		if (shift && shift.length > 0) params.append('shift', shift);
		if (certificate && certificate.length > 0) params.append('certificate', certificate);
		if (search) params.append('search', search);
		if (filter) params.append('filter', filter);
		if (sales) params.append('sales', sales);
		if (user_id) params.append('user_id', user_id);

		const url = `${wpApiSettings.root}programs-filter/v1/posts?${params.toString()}`;

		try {
			const response = await fetch(url, {
				headers: {
					'X-WP-Nonce': wpApiSettings.nonce,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error('Error response:', response.status, errorText);
				throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
			}

			const text = await response.text();

			if (!text || text.trim() === '') {
				return []; // Возвращаем пустой массив, если ответ пустой
			}

			const posts = JSON.parse(text);

			return Array.isArray(posts) ? posts : [];

		} catch (error) {
			console.error('Error fetching posts:', error);
			return []; // Возвращаем пустой массив в случае любой ошибки
		}
	}

	const filterPosts = async () => {

		showPreloader();

		const replaceSpacesWithPlus = (str) => {
			return str.replace(/ /g, '+');
		};

		// Получаем значение из поля поиска
		const searchValue = searchInput?.value.trim();
		const filterFormValue = filterForm?.value.trim();

		// Получаем выбранные программы
		const selectedPrograms = Array.from(programCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.dataset.program);

		// Получаем выбранные City

		const selectedCity = [...new Set(Array.from(cityCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.dataset.city === 'all' ? 'all'
				: checkbox.dataset.city?.split(',').map(city => city)
			).flat())];

		// Получаем выбранные возрасты
		const selectedAges = [...new Set(Array.from(ageCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.dataset.age === 'all' ? 'all'
				: checkbox.dataset.age?.split(',').map(age => age)
			).flat())];

		// Получаем выбранные Size
		const selectedSize = [...new Set(Array.from(sizeCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.dataset.size === 'all' ? 'all'
				: checkbox.dataset.size?.split(',').map(size => size)
			).flat())];

		const selectedPlace = [...new Set(Array.from(placeCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.dataset.place === 'all'
				? 'all'
				: checkbox.dataset.place
			))];

		const encodedPlace = selectedPlace.map(replaceSpacesWithPlus);

		const selectedSeason = [...new Set(Array.from(seasonCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.dataset.season))];

		const selectedDays = [...new Set(Array.from(daysCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.dataset.days))];

		const selectedShift = [...new Set(Array.from(shiftCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.dataset.shift === 'all'
				? 'all'
				: checkbox.dataset.shift
			))];

		const encodedShifts = selectedShift.map(replaceSpacesWithPlus);

		const selectedCertificate = [...new Set(Array.from(certificateCheckboxes)
			.filter(checkbox => checkbox.checked)
			.map(checkbox => checkbox.dataset.certificate === 'all'
				? 'all'
				: checkbox.dataset.certificate
			))];

		const salesValue = localStorage.getItem('sales') ? localStorage.getItem('sales') : '';

		try {

			// Получаем посты с учетом фильтров
			const posts = await fetchPosts(
				selectedPrograms,
				selectedCity,
				selectedAges,
				selectedSize,
				encodedPlace,
				selectedSeason,
				selectedDays,
				encodedShifts,
				selectedCertificate,
				searchValue,
				filterFormValue,
				salesValue
			);

			currentPage = 1;

			updatePostsDisplay(posts, filterFormValue);

		} catch (error) {
			console.error('Error filtering posts:', error);
		} finally {

			setTimeout(() => {
				hidePreloader();
			}, 300);

		}
	}

	const iconArray = `<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M2.86713 7.056L0.563125 3.6L2.86713 0.144H4.62713L2.48313 3.6L4.62713 7.056H2.86713ZM2.09913 4.336V2.88H7.85913V4.336H2.09913Z" fill="#8F8F8F"/>
				</svg>`;

	function formatDateRange(dateRange) {
		// Разбиваем диапазон дат
		const [startDate, endDate] = dateRange?.split(" — ");
		if (startDate && endDate) {
			// Получаем день и месяц из первой даты (формат ДД.ММ)
			const [day, month] = startDate?.split(".");
			// Получаем год из второй даты (формат ДД.ММ.ГГ или ДД.ММ.ГГГГ)
			const year = endDate.split(".")[2] || "20" + endDate.split(".")[1];

			// Формируем результат в формате ДД-ММ-ГГГГ
			return `${year}-${month}-${day}`;
		} else {
			return '';
		}

	}

	function formatDateSkills(input) {
		// Словарь для преобразования месяцев
		const months = {
			'января': '01',
			'февраля': '02',
			'марта': '03',
			'апреля': '04',
			'мая': '05',
			'июня': '06',
			'июля': '07',
			'августа': '08',
			'сентября': '09',
			'октября': '10',
			'ноября': '11',
			'декабря': '12',
		};

		// Извлекаем день и месяц из строки
		const [, day, monthName] = input.match(/(\d{1,2})\s+(\S+)/);

		// Получаем текущий год (последние две цифры)
		const year = 25;

		// Преобразуем месяц в числовой формат
		const month = months[monthName];

		// Форматируем день, добавляем ведущий ноль при необходимости
		const formattedDay = day.padStart(2, '0');

		// Собираем итоговую дату в формате YY-MM-DD
		return `${year}-${month}-${formattedDay}`;
	}

	function newFormatDateRange(dateString) {
		// Разделяем строку на две даты
		const [startDate, endDate] = dateString?.split(' — ');
		if (endDate) {
			// Извлекаем месяц и год из второй даты (которая содержит год)
			const [day, month, year] = endDate?.split('.');

			// Создаем объект Date для получения названия месяца
			const date = new Date(`20${year}`, month - 1); // Год в формате "24" -> 2024

			// Массив с названиями месяцев
			const months = [
				'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
				'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
			];

			// Получаем название месяца
			const monthName = months[date.getMonth()];

			// Формируем итоговую строку
			return `${monthName} 20${year}г.`;
		} else {
			return '';
		}

	}

	const postsPerPage = 9; // Количество постов на странице
	let currentPage = 1; // Текущая страница
	let currentPosts = []; // Текущие отфильтрованные посты
	let currentPostsFilter = [];

	function updatePostsDisplay(postsIDS, filter) {

		const pagination = document.getElementById('pagination');

		if (!postsIDS.length) {
			postsContainer && (postsContainer.innerHTML = '<div class="no-content"><p>По заданным фильтрам ничего не найдено. <br>Попробуйте изменить критерий поиска.</p></div>');
			if (pagination) {
				pagination.innerHTML = ''
			}
			return;
		}

		currentPosts = postsIDS.map(id => allPosts.find(post => post.id === id));
		updatePagination(); // Обновляем пагинацию
		displayPosts(); // Отображаем посты для текущей страницы

	}

	function displayPosts() {

		const startIndex = (currentPage - 1) * postsPerPage;
		const endIndex = startIndex + postsPerPage;
		const postsToShow = currentPosts.slice(startIndex, endIndex); // Получаем посты для текущей страницы

		let html = '';

		html = postsToShow.map(post => {

			const {
				content: {
					postTypeName,
					dateRange,
					selectedAges,
					selectedSize,
					daysCount,
					price,
				},
				id,
				type,
				title,
				bgImage,
				selected_shift,
				selected_place,
				selected_city,
				inPlace,
				placeTitle,
				titleCount
			} = post;

			if (type === 'merch-camp') {

				const classPlace = 'green';
				// const	activeClass = inPlace ? 'active-class' : 'no-active-class';

				let cleanPrice = price?.replace(/<[^>]*>/g, '').trim();
				let cleanTitle = title?.replace(/<[^>]*>/g, '').trim();

				const urlImg = bgImage[0] ? bgImage[0]['url'] : '#';

				const card = `
					<div class="item-card card-${id} ${type}">

							<div class="top-item-section item-section">
								<div class="image-merch"><img src="${urlImg}" alt="Thumbnail"/></div>
								<div class="title-card">${cleanTitle}</div>
							</div>

							<div class="bottom-item-section item-section">

								<div class="price-card">${cleanPrice ? cleanPrice : ''}</div>
								<button 
									class="modal-form-merch ${classPlace}"
									data-titleform="${'Мерч' + ': ' + cleanTitle}"
									data-titleproduct="${cleanTitle}"
									data-referer="${window.location.href}"
								>Оставить заявку</button>
								<button 
									class="more ${classPlace}"
									data-titleform="${'Мерч' + ': ' + cleanTitle}"
									data-titleproduct="${cleanTitle}"
									data-referer="${window.location.href}"
								>Подробнее ${iconArray}</button>

							</div>

					</div>`;

				return card;
			} else {

				const classPlace = inPlace ? 'green' : 'red';
				const titlePlace = inPlace ? 'Оставить заявку' : 'Мест нет — запись в резерв';
				const activeClass = inPlace ? 'active-class' : 'no-active-class';

				const shift = selected_shift ? `(${selected_shift})` : '';
				const ages = selectedAges === 'родители - родители лет' ? 'родители' : selectedAges;
				const currentDate = formatDateRange(dateRange);
				const currentSkillsDate = formatDateSkills(dateRange);

				let cleanPrice = price?.replace(/<[^>]*>/g, '').trim();
				let cleanTitle = title?.replace(/<(?!\/?br\s*\/?>)[^>]+>/gi, '').trim();

				const datestart = type === 'psychologist'
					? ''
					: type === 'skills-courses'
						? currentSkillsDate
						: currentDate;

				// const active_class = selected_place.trim() === 'Москва' ? 'active' : '';
				const active_class = '';

				const placeCard = selected_city.length > 0 ? selected_city : selected_place;

				const card = `
					<div class="item-card card-${id} ${type}">

							<div class="top-item-section item-section">
								${type === 'psychologist' ? '' : `<span class="label-card">${postTypeName}</span>`}
								${type === 'travel-by-city'
						? `<span class="place-card">${dateRange}</span>`
						: type === 'skills-courses'
							? `<span class="date-card">${dateRange}</span>
											<span class="place-card">${placeCard}</span>`
							: type === 'psychologist'
								? `<span class="place-card">${placeTitle && 'Место проведения — ' + placeTitle}</span>`
								: `<span class="date-card">${dateRange} ${shift}</span>
												<span class="place-card ${active_class}">${placeCard}</span>`
					}
								<div class="title-card">${cleanTitle}</div>
								${type === 'psychologist' ? '' : `<div class="ages-card">(${ages})</div>`}
							</div>

							<div class="bottom-item-section item-section">
								${type === 'psychologist'
						? ''
						: type === 'skills-courses'
							? `<div class="days-card">${titleCount}</div>`
							: `<div class="days-card">${daysCount}</div>`
					}
								<div class="price-card">${cleanPrice ? cleanPrice : ''}</div>
								${type !== 'skills-courses'
						? `<button 
											class="modal-form ${classPlace}"
											data-titleform="${postTypeName + ': ' + cleanTitle}"
											data-titleproduct="${cleanTitle}"
											data-referer="${window.location.href}"
											data-datestart="${datestart}"
										>${titlePlace}</button>`
						: titlePlace === 'Оставить заявку'
							? `<button 
											class="modal-form ${classPlace}"
											data-titleform="${postTypeName + ': ' + cleanTitle}"
											data-titleproduct="${cleanTitle}"
											data-referer="${window.location.href}"
											data-datestart="${datestart}"
										>${titlePlace}</button>`
							: `<button 
											class="modal-form ${classPlace}"
											data-titleform="${postTypeName + ': ' + cleanTitle}"
											data-titleproduct="${cleanTitle}"
											data-referer="${window.location.href}"
											data-datestart="${datestart}"
										>${titlePlace}</button>`
					}
								${type !== 'psychologist'
						? `<button 
												class="more ${classPlace}"
												data-titleform="${postTypeName + ': ' + cleanTitle}"
												data-titleproduct="${cleanTitle}"
												data-referer="${window.location.href}"
												data-datestart="${datestart}"
											>Подробнее ${iconArray}</button>`
						: ``
					}
							</div>

					</div>`;
				return card;
			}

		}).join('');

		postsContainer && (postsContainer.innerHTML = html);
	}

	const iconForPagination = `<svg width="13" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 4.40488C0.671325 4.40488 0.404881 4.67132 0.404881 5C0.404881 5.32868 0.671325 5.59512 1 5.59512V4.40488ZM18.4208 5.42081C18.6532 5.1884 18.6532 4.8116 18.4208 4.57919L14.6335 0.791873C14.4011 0.559465 14.0243 0.559465 13.7919 0.791873C13.5595 1.02428 13.5595 1.40109 13.7919 1.6335L17.1584 5L13.7919 8.3665C13.5595 8.59891 13.5595 8.97572 13.7919 9.20813C14.0243 9.44054 14.4011 9.44054 14.6335 9.20813L18.4208 5.42081ZM1 5.59512H18V4.40488H1V5.59512Z" fill="#30A933"/>
				</svg>`;

	function updatePagination() {
		const totalPosts = currentPosts.length;
		const totalPages = Math.ceil(totalPosts / postsPerPage);
		const pagination = document.getElementById('pagination');

		if (pagination) {
			pagination.innerHTML = '';

			if (totalPages > 1) {
				// Добавляем стрелку влево, если текущая страница не первая
				if (currentPage > 1) {
					const prevButton = document.createElement('button');
					prevButton.innerHTML = `<span class="pagination-arrow-left">${iconForPagination}</span>`;
					prevButton.addEventListener('click', () => {
						currentPage--;
						updatePagination();
						displayPosts();
					});
					pagination.appendChild(prevButton);
				}

				// Логика отображения страниц
				if (totalPages <= 5) {
					// Показываем все страницы, если их 5 или меньше
					for (let i = 1; i <= totalPages; i++) {
						createPageButton(i);
					}
				} else {
					// Показываем первую страницу и троеточие, если текущая страница далеко от начала
					if (currentPage > 3) {
						createPageButton(1);
						createEllipsis();
					}

					// Показываем две предыдущие, текущую и две следующие страницы
					const startPage = Math.max(1, currentPage - 2);
					const endPage = Math.min(totalPages, currentPage + 2);
					for (let i = startPage; i <= endPage; i++) {
						createPageButton(i);
					}

					// Показываем троеточие и последнюю страницу, если текущая страница далеко от конца
					if (currentPage < totalPages - 2) {
						createEllipsis();
						createPageButton(totalPages);
					}
				}

				// Добавляем стрелку вправо, если текущая страница не последняя
				if (currentPage < totalPages) {
					const nextButton = document.createElement('button');
					nextButton.innerHTML = `<span class="pagination-arrow-right">${iconForPagination}</span>`;
					nextButton.addEventListener('click', () => {
						currentPage++;
						updatePagination();
						displayPosts();
					});
					pagination.appendChild(nextButton);
				}
			}
		}

	}

	// Вспомогательная функция для создания кнопки страницы
	function createPageButton(pageNumber) {
		const pagination = document.getElementById('pagination');
		if (pagination) {
			const pageButton = document.createElement('button');
			pageButton.innerText = pageNumber;
			if (pageNumber === currentPage) {
				pageButton.disabled = true;
			}
			pageButton.addEventListener('click', () => {
				currentPage = pageNumber;
				updatePagination();
				displayPosts();
			});
			pagination.appendChild(pageButton);
		}

	}

	// Вспомогательная функция для создания троеточия
	function createEllipsis() {
		const pagination = document.getElementById('pagination');
		if (pagination) {
			const ellipsis = document.createElement('span');
			ellipsis.innerText = '...';
			pagination.appendChild(ellipsis);
		}

	}

	document.addEventListener('click', function (e) {

		if (e.target.classList.contains('more')) {

			const cardId = e.target.closest('.item-card').classList[1].replace('card-', '');
			const post = allPosts.find(p => p.id === parseInt(cardId));
			const colorClass = e.target.closest('.item-card').classList[2];

			if (post) {
				// Сохраняем текущую позицию прокрутки
				saveScrollPosition();

				const modal = post.content.rendered;

				// Создаем модальное окно
				const modalWrapper = document.createElement('div');
				modalWrapper.className = 'modal-wrapper modal-card';
				modalWrapper.innerHTML = `<div class="modal-content ${colorClass} ${cardId}">${modal}</div>`;

				const buyOrder = modalWrapper.querySelector('.buy-order');
				if (buyOrder) {
					const sliderMerch = modalWrapper.querySelector('.gallery-slider-merch');
					if (!!sliderMerch) {

						const imagePromises = Array.from(sliderMerch.querySelectorAll('img')).map(img => {
							return new Promise((resolve, reject) => {
								img.onload = resolve;
								img.onerror = reject;
							});
						});

						Promise.all(imagePromises)
							.then(() => {
								// modalWrapper.querySelector('.slider-preloader').remove();
								if (!!sliderMerch) {
									initializeSlider('gallery-slider-merch', 1);
								}
							})
							.catch(error => {
								console.error('Ошибка загрузки изображений:', error);
								// modalWrapper.querySelector('.slider-preloader').innerHTML = '<p>Не удалось загрузить изображения.</p>';
							});


					}
					modalWrapper.querySelector('.buy-order').dataset.id = 0 + cardId
				}

				// Добавляем стили для анимации
				modalWrapper.style.opacity = '0';
				modalWrapper.style.transition = 'opacity 0.3s ease';
				modalWrapper.style.zIndex = '999';
				document.body.appendChild(modalWrapper);

				const randomPosts = modalWrapper?.querySelector('#random-posts-container')
				randomPosts?.setAttribute('data-current-post-id', cardId);

				// Запускаем анимацию появления
				setTimeout(() => {
					modalWrapper.style.opacity = '1';
					document.querySelector('body').classList.add('overflow-modal');
				}, 10);

				// Получаем предыдущий элемент
				const previousElement = modalWrapper.previousElementSibling;
				if (previousElement) {
					previousElement.style.opacity = '0';
					setTimeout(() => {
						previousElement.remove();
					}, 300);
				}
			}

		}
	})

	// Добавляем обработчик закрытия модального окна
	document.addEventListener('click', function (e) {
		if (e.target.matches('.go-back-btn')) {
			const modalWrapper = e.target.closest('.modal-wrapper');
			if (modalWrapper) {
				modalWrapper.style.opacity = '0';
				setTimeout(() => {
					modalWrapper.remove();
					document.querySelector('body').classList.toggle('overflow-modal');
				}, 300);
			}
		}
	});

	// Закрытие по клику на кнопку
	document.addEventListener('click', function (e) {
		if (e.target.classList.contains('go-back-btn')) {
			e.target.closest('.modal-wrapper').remove();
		}
	});

	// Добавляем обработчики для всех чекбоксов
	const allCheckboxes = [
		...programCheckboxes,
		...cityCheckboxes,
		...ageCheckboxes,
		...sizeCheckboxes,
		...placeCheckboxes,
		...seasonCheckboxes,
		...daysCheckboxes,
		...shiftCheckboxes,
		...certificateCheckboxes
	];

	// Функция для группировки чекбоксов по их родительским контейнерам
	function groupCheckboxes(checkboxes) {
		const groups = new Map();

		checkboxes.forEach(checkbox => {
			const parent = checkbox.closest('.filter-items-group'); // Укажите класс или селектор группы
			if (parent) {
				if (!groups.has(parent)) {
					groups.set(parent, []);
				}
				groups.get(parent).push(checkbox);
			}

		});

		return groups;
	}

	// Группируем все чекбоксы
	const checkboxGroups = groupCheckboxes(allCheckboxes);

	// Функция для обработки изменения состояния чекбокса
	function handleCheckboxChange(e) {
		const checkbox = e.target;
		const parentGroup = checkbox.closest('.filter-items-group');
		const groupCheckboxes = checkboxGroups.get(parentGroup);

		// Проверяем, есть ли группа и достаточно ли в ней чекбоксов
		if (groupCheckboxes && groupCheckboxes.length >= 3) {
			const firstCheckbox = groupCheckboxes[0];

			// Если нажат не первый чекбокс
			if (checkbox !== firstCheckbox) {
				// Отжимаем первый чекбокс, если он был нажат
				if (firstCheckbox.checked) {
					firstCheckbox.checked = false;
					// firstCheckbox.dispatchEvent(new Event('change')); // Триггерим событие change
				}
			}
		}

		// Обновляем класс active
		checkbox.closest('.checkbox').classList.toggle('active', checkbox.checked);

		filterPosts();
	}

	// Добавляем обработчики событий для всех чекбоксов
	allCheckboxes.forEach(checkbox => {

		checkbox.addEventListener('change', handleCheckboxChange);

		// Инициализация состояния active
		checkbox.closest('.checkbox').classList.toggle('active', checkbox.checked);
	});

	// Добавляем обработчик для поля поиска
	let timeoutId;
	searchInput?.addEventListener('input', () => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(filterPosts, 300); // Вызываем фильтр с задержкой
	});

	const titleBtn = document.querySelector('.filter-title-btn');
	const filterContainer = document.querySelector('.container-filter-items');
	titleBtn?.addEventListener('click', () => filterContainer.classList.toggle('active'));

	const searchBtn = document.querySelector('.filter-search-btn');
	const searchWrapper = document.querySelector('.search-filter-wrapper');
	searchBtn?.addEventListener('click', () => searchWrapper.classList.toggle('active'));

	const filterTitles = document.querySelectorAll('.filter-title');

	filterTitles.forEach(title => {
		title.addEventListener('click', function () {
			this.closest('.filter-wrapper').classList.toggle('active');
		});
	});

	document.querySelectorAll('.select-title').forEach(function (title) {
		title.addEventListener('click', function () {
			this.classList.toggle('active');
			const nextElement = this.nextElementSibling;
			if (nextElement && nextElement.classList.contains('select-ul')) {
				nextElement.classList.toggle('active');
			}
		});
	});

	// Находим все select-ul на странице
	document.querySelectorAll('.select-ul').forEach(function (selectUl) {
		// Находим все li внутри текущего select-ul
		selectUl.querySelectorAll('li').forEach(function (listItem) {
			listItem.addEventListener('click', function () {
				// Так как мы уже внутри конкретного select-ul, можно использовать родителя
				const currentSelectUl = this.parentElement;

				if (currentSelectUl) {
					// Убираем active у всех li в текущем select-ul
					currentSelectUl.querySelectorAll('li').forEach(function (li) {
						li.classList.remove('active');
					});
					this.classList.add('active');
					currentSelectUl.classList.remove('active');
				}

				const selectBlock = this.closest('.select-block');
				if (selectBlock) {
					const selectTitle = selectBlock?.querySelector('.select-title');
					if (selectTitle) {
						selectTitle.classList.remove('active');
						const name = this.textContent;
						selectTitle.textContent = name;
					}

					const slug = this.getAttribute('data-slug');

					const contentTab = selectBlock.nextElementSibling;
					if (contentTab && contentTab.classList.contains('content-tab')) {
						const itemTabs = contentTab.querySelectorAll('.item-tab');

						itemTabs.forEach(function (itemTab) {
							if (itemTab.classList.contains(slug)) {
								// Убираем active только у табов в текущем contentTab
								contentTab.querySelectorAll('.item-tab').forEach(function (otherTab) {
									otherTab.classList.remove('active');
								});
								itemTab.classList.add('active');
							}
						});
					}
				}
			});
		});
	});

	if (PAGE_TEMPLATE_DEFAULT) {

		const modalSlider = PAGE_TEMPLATE_DEFAULT.querySelector('.big-slider');
		const slides = modalSlider?.querySelectorAll('.slide-modal');

		if (slides) {
			slides.forEach(slide => {
				// Обработчик для touch-устройств
				slide.addEventListener('touchstart', function (e) {
					e.preventDefault();
					handleSlideClick(e);
				});

				// Обработчик для ПК
				slide.addEventListener('click', function (e) {
					e.preventDefault();
					handleSlideClick(e);
				});
			});

			function handleSlideClick(e) {

				const images = JSON.parse(e.currentTarget.getAttribute('data-images'));
				const filterImages = images.filter((el, index) => index !== 0);

				const imagesHTML = filterImages.map(url => `<li class="slide"><img src="${url}" loading="lazy" alt="Slider image"></li>`).join('');

				const modalWrapper = document.createElement('div');
				modalWrapper.className = 'slider-modal-wrapper';
				modalWrapper.innerHTML = `
						<div class="wrapper">
							<div class="slider-preloader active">
								<div class="spinner"></div>
							</div>
							<span class="close-slider-modal"></span>
							<ul class="modal-content modal-slider slider-block">
								${imagesHTML}
							</ul>
						</div>
				`;

				modalWrapper.style.opacity = '0';
				modalWrapper.style.transition = 'opacity 0.3s ease';
				modalWrapper.style.zIndex = '9999';
				document.body.appendChild(modalWrapper);

				requestAnimationFrame(() => {
					modalWrapper.style.opacity = '1';
					document.body.classList.add('overflow-modal');
				});

				const imagePromises = Array.from(modalWrapper.querySelectorAll('img')).map(img => {
					return new Promise((resolve, reject) => {
						img.onload = resolve;
						img.onerror = reject;
					});
				});

				Promise.all(imagePromises)
					.then(() => {
						modalWrapper.querySelector('.slider-preloader').remove();
						if (modalWrapper.querySelector('.modal-slider')) {
							initializeSlider('modal-slider', 1);
						}
					})
					.catch(error => {
						console.error('Ошибка загрузки изображений:', error);
						modalWrapper.querySelector('.slider-preloader').innerHTML = '<p>Не удалось загрузить изображения.</p>';
					});
			}

			document.addEventListener('click', function (e) {
				const modalSlider = e.target.closest('.slider-modal-wrapper');
				if (modalSlider) {
					if (e.target.closest('.close-slider-modal')) {
						modalSlider.style.opacity = '0';
						setTimeout(() => {
							modalSlider.style.transition = 'opacity 0.3s ease';
							modalSlider.style.zIndex = '-9999';
							document.body.classList.remove('overflow-modal');
							modalSlider.remove();
						}, 300);
					}
				}
			});
		}

	}

	const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, li');
	const prepositions = ['и', 'а', 'в', 'на', 'с', 'к', 'по', 'во', 'о', 'об', 'у', 'от', 'до', 'из', 'за', 'для', 'под', 'про', 'над', 'без', 'через', 'при', 'перед', 'или'];

	if (elements) {
		elements.forEach(element => {
			let text = element.innerHTML.replace(/\s+/g, ' ');
			if (text.length > 0) {
				const hasPreposition = prepositions.some(prep =>
					text.toLowerCase().includes(` ${prep} `)
				);
				if (hasPreposition) {
					prepositions.forEach(prep => {
						const regex = new RegExp(`(\\s${prep})\\s`, 'gi');
						text = text.replace(regex, `$1\u00A0`);
					});
					element.innerHTML = text;
				}
			}

		});
	}

	const addScrinshot = document.querySelector('.wp-block-fv-our-feedback');

	if (addScrinshot) {
		const scrinshotOpenButtons = addScrinshot.querySelectorAll('.add-scrinshot');
		// Добавляем обработчик для каждой кнопки
		scrinshotOpenButtons.forEach(button => {
			button.addEventListener('click', function (e) {
				e.preventDefault();

				// Получаем URL изображения из data-атрибута
				const dataImgurl = this.getAttribute('data-imgurl');

				// Находим модальное окно и его контент
				const formScrinshotModal = addScrinshot.querySelector('.modal-wrapper');
				const modalСontent = formScrinshotModal.querySelector('.modal-content');

				if (formScrinshotModal && modalСontent) {
					// Проверяем, есть ли уже тег <img> в modalСontent
					let imgElement = modalСontent.querySelector('img');

					if (!imgElement) {
						// Если тега <img> нет, создаём его
						imgElement = document.createElement('img');
						imgElement.alt = 'Скриншот'; // Добавляем альтернативный текст
						imgElement.style.width = '100%'; // Пример стилизации
						imgElement.style.height = 'auto'; // Пример стилизации
						modalСontent.append(imgElement); // Добавляем в конец modalСontent
					}

					// Обновляем src у существующего или нового тега <img>
					imgElement.src = dataImgurl;

					// Показываем модальное окно с анимацией
					formScrinshotModal.style.opacity = '0';
					formScrinshotModal.style.transition = 'opacity 0.3s ease';
					formScrinshotModal.style.zIndex = '9999';
					document.querySelector('body').classList.toggle('overflow-modal');

					setTimeout(() => {
						formScrinshotModal.style.opacity = '1';
					}, 10);
				}
			});
		});
	}

	const videoContainers = document.querySelectorAll('.video-section');

	videoContainers.forEach(container => {
		const videoBlocks = container.querySelectorAll('.slide');
		const sliderBox = container.querySelector('.slider-box');

		const options = {
			root: sliderBox,
			threshold: 0.5 // Видео будет остановлено, когда менее 50% его видно
		};

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				const video = entry.target.querySelector('video');
				const playVideo = entry.target.querySelector('.play-video');
				const imageForVideo = entry.target.querySelector('.image-for-video');
				const videoContent = entry.target.querySelector('.content-video');


				if (video && !entry.isIntersecting) {
					// Видео ушло за пределы видимости
					video.pause();
					if (playVideo) {
						playVideo.style.transition = 'opacity 0.3s ease';
						playVideo.style.opacity = '1';
						playVideo.style.zIndex = '99';
					}
					if (imageForVideo) {
						imageForVideo.style.transition = 'opacity 0.3s ease';
						imageForVideo.style.opacity = '1';
						imageForVideo.style.height = '100%';
					}
					if (videoContent) {
						videoContent.style.height = '0px';
					}
				}

			});
		}, options);

		videoBlocks.forEach(element => {

			const playVideo = element.querySelector('.play-video');

			if (playVideo) {

				const video = element.querySelector('video');
				const videoContent = element.querySelector('.content-video');
				const imageForVideo = element.querySelector('.image-for-video');

				if (video) {

					const createVolumeButton = () => {
						const button = document.createElement('button');
						button.classList.add('volume-toggle');
						button.style.position = 'absolute';
						button.style.bottom = '10px';
						button.style.right = '10px';
						button.style.background = 'none';
						button.style.border = 'none';
						button.style.cursor = 'pointer';
						button.style.zIndex = '100';

						// Иконки в виде SVG
						button.innerHTML = `
							<svg class="volume-icon" width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
									<!-- Иконка включения звука -->
									<path class="volume-on" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
							
									<!-- Перечеркнутая иконка выключения звука -->
									<path class="volume-off" style="display: none" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
									
									<!-- Линия перечеркивания (диагональный крест) -->
									<line x1="5" y1="19" x2="19" y2="5" stroke="white" stroke-width="2" stroke-linecap="round" class="volume-off-cross" />
							</svg>
						`;
						return button;
					};

					const playHandler = function (e) {
						e.preventDefault(); // Чтобы избежать повторных срабатываний

						if (video) {

							video.muted = true;
							const playPromise = video.play();

							if (playPromise !== undefined) {
								playPromise.then(() => {
									// Стили
									playVideo.style.transition = 'opacity 0.3s ease';
									playVideo.style.opacity = '0';
									playVideo.style.zIndex = '-99';
									imageForVideo.style.transition = 'opacity 0.3s ease';
									imageForVideo.style.opacity = '0';
									imageForVideo.style.height = '0px';
									videoContent.style.height = '100%';

									if (!element.querySelector('.volume-toggle')) {
										const volumeBtn = createVolumeButton();
										videoContent.appendChild(volumeBtn);

										// Добавляем обработчик для кнопки
										volumeBtn.addEventListener('click', () => {
											video.muted = !video.muted;

											const iconOn = volumeBtn.querySelector('.volume-on');
											const iconOff = volumeBtn.querySelector('.volume-off');
											const iconCross = volumeBtn.querySelector('.volume-off-cross'); // новая линия

											if (video.muted) {
												iconOn.style.display = 'none';
												iconOff.style.display = 'block';
												iconCross.style.display = 'block';
											} else {
												iconOn.style.display = 'block';
												iconOff.style.display = 'none';
												iconCross.style.display = 'none';
											}

										});
									}

									// Начинаем отслеживать видео
									observer.observe(element);
									// Добавляем обработчики паузы ТОЛЬКО ПОСЛЕ воспроизведения
									if ('ontouchstart' in window) {
										video.addEventListener('touchstart', pauseHandler, { passive: false });
									} else {
										video.addEventListener('click', pauseHandler);
									}
								}).catch(err => {
									console.error("Ошибка автовоспроизведения:", err);
								});
							}
						}
					};

					if ('ontouchstart' in window) {
						playVideo.addEventListener('touchstart', playHandler, { passive: false });
					} else {
						playVideo.addEventListener('click', playHandler);
					}

					const pauseHandler = function (e) {
						if (playVideo) {
							playVideo.style.transition = 'opacity 0.3s ease';
							playVideo.style.opacity = '1';
							playVideo.style.zIndex = '99';
							imageForVideo.style.transition = 'opacity 0.3s ease';
							imageForVideo.style.opacity = '1';
							imageForVideo.style.height = '100%';
							videoContent.style.height = '0px';
							video.pause();
						}

						const volumeBtn = element.querySelector('.volume-toggle');
						if (volumeBtn) {
							volumeBtn.remove();
						}

						observer.unobserve(element);
						if ('ontouchstart' in window) {
							video.removeEventListener('touchstart', pauseHandler);
						} else {
							video.removeEventListener('click', pauseHandler);
						}

					};

					video.addEventListener('volumechange', () => {
						const volumeBtn = element.querySelector('.volume-toggle');
						if (!volumeBtn) return;

						const iconOn = volumeBtn.querySelector('.volume-on');
						const iconOff = volumeBtn.querySelector('.volume-off');

						if (video.muted) {
							iconOn.style.display = 'none';
							iconOff.style.display = 'block';
						} else {
							iconOn.style.display = 'block';
							iconOff.style.display = 'none';
						}
					});

				}

			}

		});
	});

});


// This is code in send-file.js
window.addEventListener('load', function () {

	document.addEventListener('click', function (event) {
		// Проверяем, что клик произошел по кнопке с атрибутом data-titleform
		const button = event.target.closest('[data-titleform]');
		if (button) {
			// Получаем значения data-атрибутов кнопки
			const titleForm = button.getAttribute('data-titleform');
			const titleProduct = button.getAttribute('data-titleproduct');
			const referer = button.getAttribute('data-referer');
			const dateStart = button.getAttribute('data-datestart');

			// Находим форму с id #form-program-modal
			const form = document.querySelector('.hidden-model');
			if (form) {
				// Устанавливаем значения в скрытые инпуты формы
				form.querySelector('input[name="titleForm"]').value = titleForm || '';
				form.querySelector('input[name="titleProduct"]').value = titleProduct || '';
				form.querySelector('input[name="referer"]').value = referer || '';
				form.querySelector('input[name="dataStart"]').value = dateStart || '';
			}
		}
	});

	function validateInputs(container) {
		const inputs = container.querySelectorAll('input[required]');
		return Array.from(inputs).every(input => validateInput(input));
	}

	function validateInput(input) {
		const value = input.value.trim();

		// Проверка для пустых полей
		if (value === '' || input.classList.contains('error')) {
			return false;
		}

		// Проверка чекбоксов
		if (input.type === 'checkbox' && !input.checked) {
			return false;
		}

		// Проверка поля birthdate
		if (input.name === 'birthdate') {
			return validateBirthdate(value);
		}

		// Проверка email
		if (input.name === 'parentEmail') {
			const emailRegex = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|ru|tech))$/i;
			return emailRegex.test(value);
		}

		// Проверка телефона
		if (input.name === 'parentPhone') {
			return validatePhoneNumber(value);
		}

		return true; // Если тип инпута не требует специфической проверки
	}

	function validateBirthdate(value) {
		if (value.length !== 10) {
			return false;
		}

		const [day, month, year] = value.split('.').map(Number);
		const date = new Date(year, month - 1, day);
		return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
	}

	function createResponse(message) {
		const div = document.createElement('div');
		div.className = 'modal-response';
		div.innerHTML = `
			<div class="wrapper-respons">
				<span class="close-response"></span>
				<p class="text-response">${message}</p>
			</div>
		`;
		return div;
	}

	function showResponse(message) {

		const responseElement = createResponse(message);
		responseElement.style.opacity = '0';
		responseElement.style.transition = 'opacity 0.3s ease';
		responseElement.style.zIndex = '999999';
		document.body.appendChild(responseElement);

		// Добавляем обработчик для закрытия модального окна
		const closeButton = responseElement.querySelector('.close-response');
		closeButton.addEventListener('click', () => {
			responseElement.style.opacity = '0';
			responseElement.style.transition = 'opacity 0.3s ease';
			responseElement.style.zIndex = '-999999';
			setTimeout(() => {
				document.body.removeChild(responseElement);
			}, 300);
		});

		// Показываем модальное окно
		setTimeout(() => {
			responseElement.style.opacity = '1';
		}, 10);

		// Автоматически скрываем через 5 секунд
		setTimeout(() => {
			if (responseElement) {
				responseElement.style.opacity = '0';
				responseElement.style.transition = 'opacity 0.3s ease';
				responseElement.style.zIndex = '-999';
				if (responseElement) {
					setTimeout(() => {
						document.body.removeChild(responseElement);
					}, 300);
				}
			}
		}, 5000);

	}

	function updateButtonState(container) {
		const button = container.querySelector('button');
		if (validateInputs(container)) {
			button.disabled = false;
		} else {
			button.disabled = true;
		}
	}

	document.querySelectorAll('.fronted').forEach(container => {
		const inputs = container.querySelectorAll('input[required]');
		const button = container.querySelector('button');

		// Устанавливаем начальное состояние кнопки
		button.disabled = true;

		inputs.forEach(input => {
			input.addEventListener('input', function () {
				setCustomError(this, 'ok', '');
				updateButtonState(container);
			});

			input.addEventListener('blur', function () {
				if (this.value.trim() === '') {
					setCustomError(this, 'error', ''); // Это поле обязательно для заполнения
				} else {
					setCustomError(this, 'ok', '');
				}
				updateButtonState(container);
			});
		});

		button.addEventListener('click', function (event) {
			event.preventDefault();  // Предотвращаем действие по умолчанию
			if (!validateInputs(container)) {
				button.disabled = true;  // Снова делаем кнопку неактивной
				// Показываем ошибки для всех незаполненных полей
				inputs.forEach(input => {
					if (input.value.trim() === '') {
						setCustomError(input, 'error', ''); // Это поле обязательно для заполнения
					}
				});
			} else {
				const modalContent = this.closest('.container-step');
				modalContent.classList.add('active');
			}
		});

	});

	document.querySelectorAll('.backend').forEach(container => {
		const inputs = container.querySelectorAll('input[required]');
		const button = container.querySelector('button');

		// Устанавливаем начальное состояние кнопки
		button.disabled = true;

		inputs.forEach(input => {
			if (input.type === 'checkbox') {
				input.addEventListener('change', function () {
					updateButtonState(container);
				});
			} else if (input.type === 'email') {
				const emailRegex = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|ru|tech))$/i;
				let isValid = '';
				input.addEventListener('input', function () {
					setCustomError(this, 'ok', '');
					updateButtonState(container);
				});

				input.addEventListener('blur', function () {
					isValid = emailRegex.test(this.value);
					if (this.value.trim() === '') {
						setCustomError(this, 'error', ''); // Это поле обязательно для заполнения
					} else if (!isValid) {
						setCustomError(this, 'error', ''); // Некорректная почта
					} else {
						setCustomError(this, 'ok', '');
					}
					updateButtonState(container);
				});
			} else {
				input.addEventListener('input', function () {
					setCustomError(this, 'ok', '');
					updateButtonState(container);
				});

				input.addEventListener('blur', function () {
					if (this.value.trim() === '') {
						setCustomError(this, 'error', ''); //Это поле обязательно для заполнения
					} else {
						setCustomError(this, 'ok', '');
					}
					updateButtonState(container);
				});
			}
		});

	});

	const birthdateInputs = document.querySelectorAll('input[name="birthdate"]');
	birthdateInputs.forEach(input => {

		input.setAttribute('type', 'text');
		input.setAttribute('placeholder', 'ДД.ММ.ГГГГ');

		input.addEventListener('input', function (e) {
			let value = e.target.value;
			value = value.replace(/\D/g, '');
			let formatted = '';

			if (value.length > 0) {
				if (parseInt(value.substring(0, 2)) > 31) {
					value = '31' + value.substring(2);
				}
				formatted += value.substring(0, 2);

				if (value.length > 2) {
					if (parseInt(value.substring(2, 4)) > 12) {
						value = value.substring(0, 2) + '12' + value.substring(4);
					}
					formatted += '.' + value.substring(2, 4);
				}

				if (value.length > 4) {
					let currentYear = new Date().getFullYear();
					let inputYear = parseInt(value.substring(4, 8));
					if (inputYear > currentYear) {
						value = value.substring(0, 4) + currentYear.toString();
					}
					formatted += '.' + value.substring(4, 8);
				}
			}

			e.target.value = formatted;

			if (formatted.length === 10) {
				let [day, month, year] = formatted.split('.');
				day = parseInt(day, 10);
				month = parseInt(month, 10) - 1;
				year = parseInt(year, 10);

				let date = new Date(year, month, day);
				let isValid = date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;

				if (!isValid) {
					setCustomError(e.target, 'error', 'Пожалуйста, введите корректную дату');
				} else {
					setCustomError(e.target, 'ok', '');
				}
			} else {
				setCustomError(e.target, 'ok', '');
			}
		});

		input.addEventListener('keydown', function (e) {
			if (e.key === 'Backspace' && (e.target.value.endsWith('.') || e.target.value.length === 1)) {
				e.preventDefault();
				e.target.value = e.target.value.slice(0, -1);
			}
		});

		input.addEventListener('blur', function (e) {
			if (e.target.value.trim() === '') {
				setCustomError(e.target, 'error', ''); // Это поле обязательно для заполнения
			} else if (e.target.value.length < 10) {
				setCustomError(e.target, 'error', ''); // Пожалуйста, введите полную дату в формате ДД.ММ.ГГГГ
			} else {
				setCustomError(e.target, 'ok', '');
			}
		});

	});

	function setCustomError(input, status, errorMessage) {
		if (status === 'error') {
			input.classList.add('error');
			let errorElement = input.nextElementSibling;
			if (!errorElement || !errorElement.classList.contains('error-message')) {
				errorElement = document.createElement('span');
				errorElement.classList.add('error-message');
				input.parentNode.insertBefore(errorElement, input.nextSibling);
			}
			errorElement.textContent = errorMessage;
		} else {
			input.classList.remove('error');
			let errorElement = input.nextElementSibling;
			if (errorElement && errorElement.classList.contains('error-message')) {
				errorElement.remove();
			}
		}
	}

	function validatePhoneNumber(phoneNumber) {
		// Проверяем, что номер телефона соответствует формату "+7 (XXX) XXX-XX-XX"
		const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
		return phoneRegex.test(phoneNumber);
	}

	const allPhoneInputs = document.querySelectorAll('input[type="tel"]');
	allPhoneInputs.forEach(input => {

		input?.addEventListener('focus', function (e) {
			if (!e.target.value) {
				e.target.value = '+7 (';
				e.target.setSelectionRange(4, 4); // Устанавливаем курсор после скобки
			}
		});

		input?.addEventListener('blur', function (e) {
			if (e.target.value === '+7 (' || e.target.value === '+7') {
				e.target.value = '';
			}
			// Проверяем валидность номера при потере фокуса
			if (e.target.value && !validatePhoneNumber(e.target.value)) {
				setCustomError(e.target, 'error', ''); 	// Неверный формат номера телефона
			} else {
				setCustomError(e.target, 'ok', '');
			}
		});

		input?.addEventListener('input', function (e) {
			let value = e.target.value;
			let cleaned = value.replace(/[^\d+]/g, '');
			let isValid = '';
			if (!cleaned.startsWith('+7')) {
				cleaned = '+7' + cleaned.substring(cleaned.startsWith('+') ? 1 : 0);
			}
			let formatted = '';
			if (cleaned.length > 0) {
				formatted = cleaned.substring(0, 2); // +7
				if (cleaned.length > 2) {
					formatted += ' (' + cleaned.substring(2, 5);
				}
				if (cleaned.length > 5) {
					formatted += ') ' + cleaned.substring(5, 8);
				}
				if (cleaned.length > 8) {
					formatted += '-' + cleaned.substring(8, 10);
				}
				if (cleaned.length > 10) {
					formatted += '-' + cleaned.substring(10, 12);
				}
			}

			e.target.value = formatted;

			if (formatted.length === 18) {
				isValid = validatePhoneNumber(formatted);
				if (!isValid) {
					setCustomError(e.target, 'error', ''); 	// Неверный формат номера телефона
				} else {
					setCustomError(e.target, 'ok', '');
				}
			} else {
				setCustomError(e.target, 'ok', '');
			}

		});

		input?.addEventListener('keydown', function (e) {
			let value = e.target.value;
			if (e.key === 'Backspace' && value === '+7 (') {
				e.preventDefault();
			}
		});

		input?.addEventListener('click', function (event) {
			const cursorPosition = event.target.selectionStart;
			const value = event.target.value;
			if (value.length > 0) {
				let validPositions = [4]; // После открывающейся скобки
				if (value.length > 4) validPositions.push(5, 6, 7); // Внутри скобок
				if (value.length > 8) validPositions.push(9, 10, 11); // После скобок
				if (value.length > 12) validPositions.push(13, 14); // Первый блок после дефиса
				if (value.length > 15) validPositions.push(16, 17); // Второй блок после дефиса
				const closestPosition = validPositions.reduce((prev, curr) => {
					return (Math.abs(curr - cursorPosition) < Math.abs(prev - cursorPosition) ? curr : prev);
				});
				event.target.setSelectionRange(closestPosition, closestPosition);
			}
		});

		input?.addEventListener('keyup', function (event) {
			const cursorPosition = event.target.selectionStart;
			if (cursorPosition < 4) {
				event.target.setSelectionRange(4, 4);
			}
		});

	});

	// Находим все формы на странице
	const forms = document.querySelectorAll('form');

	forms.forEach(form => {

		if (form.id === 'currect-email-auth-form') {
			return;
		}

		const submitButton = form.querySelector('button[type="submit"]');
		if (!submitButton) return; // Если кнопки отправки нет, пропускаем форму

		const originalButtonText = submitButton.innerHTML;

		form.addEventListener('submit', function (e) {
			e.preventDefault();

			// Изменяем текст кнопки и делаем её неактивной
			submitButton.textContent = 'Отправка...';
			submitButton.disabled = true;

			const formData = new FormData(form);
			let data = {};

			// Преобразуем FormData в обычный объект
			for (let [key, value] of formData.entries()) {
				data[key] = value;
			}

			let slugUrl = '';
			if (this.dataset.slug === 'transfer') {
				slugUrl = 'wp/v2/send-mail-transfer';
			} else {
				slugUrl = 'wp/v2/form-submissions';
			}

			fetch(`${wpApiSettings.root}${slugUrl}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': wpApiSettings.nonce
				},
				body: JSON.stringify(data)
			})
				.then(response => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then(result => {
					form.reset(); // Сбрасываем форму после успешной отправки

					const message = result.response.data.message;

					// Если форма находится внутри модального окна
					const hiddenModel = form.closest('.hidden-model');

					if (hiddenModel) {
						const modalWrapper = hiddenModel.querySelector('.modal-wrapper');
						modalWrapper.style.opacity = '0';
						setTimeout(() => {
							modalWrapper.style.transition = 'opacity 0.3s ease';
							modalWrapper.style.zIndex = '-9999';
							document.querySelector('body').classList.toggle('overflow-modal');
						}, 300);
					}

					const testDrive = form.closest('.test-drive-section');

					if (testDrive) {
						const modalWrapper = testDrive.querySelector('.modal-wrapper');
						modalWrapper.style.opacity = '0';
						setTimeout(() => {
							modalWrapper.style.transition = 'opacity 0.3s ease';
							modalWrapper.style.zIndex = '-9999';
							document.querySelector('body').classList.toggle('overflow-modal');
						}, 30000);
					}

					const modalContent = form?.querySelector('.container-step');
					modalContent && modalContent.classList.remove('active');

					// Показать сообщение пользователю
					showResponse(message);
				})
				.catch(error => {
					console.error('Error:', error);
					alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
				})
				.finally(() => {
					// Возвращаем исходный текст кнопки и делаем её активной
					submitButton.innerHTML = originalButtonText;
					submitButton.disabled = false;
				});

		});
	});

	document.querySelectorAll('.back-step').forEach(button => {
		button.addEventListener('click', function () {
			const modalContent = this.closest('.container-step');
			modalContent.classList.remove('active');
		});
	});



});