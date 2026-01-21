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

		console.log(form);
		

		if (form.id === 'currect-email-auth-form') {
			return;
		}

		const submitButton = form.querySelector('button[type="submit"]');
		if (!submitButton) return; // Если кнопки отправки нет, пропускаем форму

		const originalButtonText = submitButton.innerHTML;

		// form.addEventListener('submit', function (e) {
		// 	e.preventDefault();

		// 	// Изменяем текст кнопки и делаем её неактивной
		// 	submitButton.textContent = 'Отправка...';
		// 	submitButton.disabled = true;

		// 	const formData = new FormData(form);
		// 	let data = {};

		// 	// Преобразуем FormData в обычный объект
		// 	for (let [key, value] of formData.entries()) {
		// 		data[key] = value;
		// 	}

		// 	let slugUrl = '';
		// 	if (this.dataset.slug === 'transfer') {
		// 		slugUrl = 'wp/v2/send-mail-transfer';
		// 	} else {
		// 		slugUrl = 'wp/v2/form-submissions';
		// 	}

		// 	fetch(`${wpApiSettings.root}${slugUrl}`, {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			'X-WP-Nonce': wpApiSettings.nonce
		// 		},
		// 		body: JSON.stringify(data)
		// 	})
		// 		.then(response => {
		// 			if (!response.ok) {
		// 				throw new Error('Network response was not ok');
		// 			}
		// 			return response.json();
		// 		})
		// 		.then(result => {
		// 			form.reset(); // Сбрасываем форму после успешной отправки

		// 			const message = result.response.data.message;

		// 			// Если форма находится внутри модального окна
		// 			const hiddenModel = form.closest('.hidden-model');

		// 			if (hiddenModel) {
		// 				const modalWrapper = hiddenModel.querySelector('.modal-wrapper');
		// 				modalWrapper.style.opacity = '0';
		// 				setTimeout(() => {
		// 					modalWrapper.style.transition = 'opacity 0.3s ease';
		// 					modalWrapper.style.zIndex = '-9999';
		// 					document.querySelector('body').classList.toggle('overflow-modal');
		// 				}, 300);
		// 			}

		// 			const testDrive = form.closest('.test-drive-section');

		// 			if (testDrive) {
		// 				const modalWrapper = testDrive.querySelector('.modal-wrapper');
		// 				modalWrapper.style.opacity = '0';
		// 				setTimeout(() => {
		// 					modalWrapper.style.transition = 'opacity 0.3s ease';
		// 					modalWrapper.style.zIndex = '-9999';
		// 					document.querySelector('body').classList.toggle('overflow-modal');
		// 				}, 30000);
		// 			}

		// 			const modalContent = form?.querySelector('.container-step');
		// 			modalContent && modalContent.classList.remove('active');

		// 			// Показать сообщение пользователю
		// 			showResponse(message);
		// 		})
		// 		.catch(error => {
		// 			console.error('Error:', error);
		// 			alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
		// 		})
		// 		.finally(() => {
		// 			// Возвращаем исходный текст кнопки и делаем её активной
		// 			submitButton.innerHTML = originalButtonText;
		// 			submitButton.disabled = false;
		// 		});

		// });
	});

	document.querySelectorAll('.back-step').forEach(button => {
		button.addEventListener('click', function () {
			const modalContent = this.closest('.container-step');
			modalContent.classList.remove('active');
		});
	});

});