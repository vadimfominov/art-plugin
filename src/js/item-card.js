(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { useSelect, useDispatch } = wp.data;

	const { InspectorControls, MediaUpload } = wp.blockEditor;

	const { PanelBody, PanelRow, Button, SelectControl, DatePicker, ToggleControl } = wp.components;

	const { useState, useEffect } = wp.element

	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);

	const iconPlay = (<svg width="23" height="38" viewBox="0 0 23 38" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M23 19L0.5 37.1865L0.500002 0.813466L23 19Z" fill="#535353" />
	</svg>);

	const iconArray = (<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M2.86713 7.056L0.563125 3.6L2.86713 0.144H4.62713L2.48313 3.6L4.62713 7.056H2.86713ZM2.09913 4.336V2.88H7.85913V4.336H2.09913Z" fill="#8F8F8F" />
	</svg>);

	registerBlockType('fv/item-card', {
		title: 'Карточка',
		icon: catIcon,
		category: 'common',
		keywords: ['Карточка', 'фке', 'rfhnf', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			newTitle: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			price: {
				type: 'string',
				default: ''
			},
			subdescription: {
				type: 'string',
				default: ''
			},
			selectedShift: {
				type: 'string',
				default: ''
			},
			startDate: {
				type: 'string',
				default: ''
			},
			endDate: {
				type: 'string',
				default: ''
			},
			daysCount: {
				type: 'string',
				default: ''
			},
			dateRange: {
				type: 'string',
				default: ''
			},
			selectedAges: {
				type: 'array',
				default: []
			},
			ages: {
				type: 'array',
				default: Array.from({ length: 12 }, (_, i) => i + 7)
			},
			video: {
				type: 'object',
				default: null
			},
			postTypeName: {
				type: 'string',
				default: ''
			},
			postTypeN: {
				type: 'string',
				default: ''
			},
			city: {
				type: 'string',
				default: ''
			},
			place: {
				type: 'string',
				default: ''
			},
			newPlace: {
				type: 'string',
				default: ''
			},
			videoText: {
				type: 'string',
				default: 'Повозрастное распределение мест на смене (Видео~ 3 минуты)'
			},
			desktopBackground: {
				type: 'object',
				default: {},
			},
			tabletBackground: {
				type: 'object',
				default: {},
			},
			mobileBackground: {
				type: 'object',
				default: {},
			},
			inPlace: {
				type: 'boolean',
				default: null
			},
			inSertific: {
				type: 'boolean',
				default: null
			},
			inActive: {
				type: 'boolean',
				default: null
			},
			inActiveOld: {
				type: 'boolean',
				default: null
			},
			currentPostID: {
				type: 'string',
				default: ''
			},
			textForImage: {
				type: 'string',
				default: 'Размещение в лагере формируется по гендерному признаку, поэтому наличие мест (зеленая кнопка) в группе может означать в том числе свободные места либо только для девочек, либо только для мальчиков'
			}
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				title,
				newTitle,
				newPlace,
				description,
				price,
				subdescription,
				selectedShift,
				daysCount,
				dateRange,
				selectedAges,
				ages,
				video,
				startDate,
				endDate,
				postTypeName,
				postTypeN,
				videoText,
				desktopBackground,
				tabletBackground,
				mobileBackground,
				city,
				place,
				inPlace,
				inActive,
				inActiveOld,
				inSertific,
				textForImage
			},
			className,
			isSelected,
			setAttributes
		} = props;

		// Изменяем инициализацию состояний
		const [isStartDateOpen, setIsStartDateOpen] = useState(false);
		const [isEndDateOpen, setIsEndDateOpen] = useState(false);

		// Функция валидации даты начала
		const handleStartDateChange = (date) => {
			const selectedDate = new Date(date);
			if (selectedDate >= today) {
				// Сохраняем дату в формате ISO string
				setAttributes({ startDate: selectedDate.toISOString() });// Если конечная дата меньше новой начальной, очищаем её
				if (endDate && new Date(endDate) < selectedDate) {
					setAttributes({ endDate: '' });
				}
				setIsStartDateOpen(false);
			}
		};

		// Функция валидации даты окончания
		const handleEndDateChange = (date) => {
			const selectedDate = new Date(date);
			const minDate = startDate ? new Date(startDate) : today;

			if (selectedDate >= minDate) {
				setAttributes({ endDate: selectedDate.toISOString() });
				setIsEndDateOpen(false);
			}
		};

		// Получаем текущую дату
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Обновляем атрибуты при изменении состояний
		useEffect(() => {
			setAttributes({
				startDate: startDate,
				endDate: endDate
			});
		}, [startDate, endDate]);

		// Функция для правильного окончания слова "день"
		const getDaysWord = (number) => {
			const cases = [2, 0, 1, 1, 1, 2];
			const titles = ['день', 'дня', 'дней'];
			return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
		};

		useEffect(() => {
			// Расчет количества дней
			let formattedDaysCount = '';
			let formattedDateRange = '';

			if (startDate && endDate) {
				const start = new Date(startDate);
				const end = new Date(endDate);

				// Обнуляем время, чтобы учитывать только дату
				start.setHours(0, 0, 0, 0);
				end.setHours(0, 0, 0, 0);

				// Расчет количества дней
				const diffTime = Math.abs(end - start);
				const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
				formattedDaysCount = `${diffDays} ${getDaysWord(diffDays)}`;

				// Форматирование диапазона дат
				const formatDate = (date) => {
					const day = date.getDate().toString().padStart(2, '0');
					const month = (date.getMonth() + 1).toString().padStart(2, '0');
					const year = date.getFullYear().toString().substr(-2);
					return `${day}.${month}${date === end ? '.' + year : ''}`;
				};

				formattedDateRange = `${formatDate(start)} — ${formatDate(end)}`;
			}

			setAttributes({
				daysCount: formattedDaysCount,
				dateRange: formattedDateRange
			});
		}, [startDate, endDate]);

		const handleAgeChange = (age) => {
			const newSelectedAges = selectedAges.includes(age)
				? selectedAges.filter(item => item !== age)
				: [...selectedAges, age].sort((a, b) => a - b); // добавляем сортировку

			setAttributes({ selectedAges: newSelectedAges });
		};

		const postType = useSelect(select => select('core/editor').getCurrentPostType(), []);

		const postTypeData = useSelect(select =>
			select('core').getPostType(postType)
			, [postType]);

		setAttributes({ postTypeName: postTypeData.name });

		useEffect(() => setAttributes({ postTypeN: postType }), [postType]);

		const { editPost } = useDispatch('core/editor');
		const { getEditedPostAttribute } = useSelect(select => select('core/editor'));

		useEffect(() => {
			const titleInput = document.querySelector('.title .rich-text');
			if (titleInput) {
				const observer = new MutationObserver(() => {
					const newTitle = titleInput.textContent || titleInput.innerText;
					const currentTitle = getEditedPostAttribute('title');

					if (newTitle !== currentTitle) {
						editPost({ title: newTitle });
					}
				});

				observer.observe(titleInput, {
					childList: true,
					characterData: true,
					subtree: true
				});

				return () => observer.disconnect();
			}
		}, [editPost, getEditedPostAttribute]);

		let shiftRanges = [];

		if (postType === 'art-community') {
			shiftRanges = [
				{ label: 'Все выезды', value: 'all' },
				{ label: '1 выезд', value: '1 выезд' },
				{ label: '2 выезд', value: '2 выезд' },
				{ label: '3 выезд', value: '3 выезд' },
				{ label: '4 выезд', value: '4 выезд' },
				{ label: '5 выезд', value: '5 выезд' },
				{ label: '6 выезд', value: '6 выезд' },
				{ label: 'Межсезонье', value: 'Межсезонье' },
			];
		} else {
			shiftRanges = [
				{ label: 'Все смены', value: 'all' },
				{ label: '1 смена', value: '1 смена' },
				{ label: '2 смена', value: '2 смена' },
				{ label: '3 смена', value: '3 смена' },
				{ label: '4 смена', value: '4 смена' },
				{ label: 'Весна', value: 'Весна' },
				{ label: 'Осень', value: 'Осень' },
				{ label: 'Зима', value: 'Зима' },
			];
		}

		const inPostType = postTypeN === 'travel-by-city';

		useEffect(() => {
			// Если newTitle пустой или совпадает с текущим title, обновляем его
			if (!newTitle || newTitle === title) {
				setAttributes({ newTitle: title });
			}
		}, [title]); // Зависимость от title

		useEffect(() => {
			// Если newPlace пустой или совпадает с текущим place, обновляем его
			if (!newPlace || newPlace === place) {
				setAttributes({ newPlace: place });
			}
		}, [place]); // Зависимость от title

		const cleanPrice = price?.replace(/<[^>]*>/g, '').trim();

		const [isEditingPlace, setIsEditingPlace] = useState(false);

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					{!inPostType && <PanelRow>
						<p>Выберите смену</p>
						<SelectControl
							value={selectedShift}
							options={shiftRanges}
							onChange={(value) => setAttributes({ selectedShift: value })}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
						/>
					</PanelRow>}
					{!inPostType && <PanelRow>
						<p>Выберите площадоку</p>
						<SelectControl
							value={place}
							options={[
								{ label: 'Список площадок', value: '' },
								{ label: 'Золотая Долина', value: 'Золотая Долина' },
								// { label: 'Ленинградец', value: 'Ленинградец' },
								{ label: 'Сверхновая', value: 'Сверхновая' },
								{ label: 'Розендорф', value: 'Розендорф' },
								{ label: 'Ввести своё значение', value: '__custom__' }
							]}
							onChange={(value) => {
								if (value === '__custom__') {
									setAttributes({ place: '' });
									setIsEditingPlace(true);
								} else {
									setAttributes({ place: value });
								}
							}}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
						/>
					</PanelRow>}

					{!inPostType && <PanelRow>
						<p>Выберите город</p>
						<SelectControl
							value={city}
							options={[
								{ label: 'Список городов', value: '' },
								{ label: 'Москва', value: 'Москва' },
								{ label: 'Санкт-Петербург', value: 'Санкт-Петербург' }
							]}
							onChange={(value) => setAttributes({ city: value })}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
						/>
					</PanelRow>}

					<PanelRow>
						<p>Выберите возраст</p>
						<div className="age-checkboxes">
							{ages.map(age => (
								<label key={age} className="age-checkbox"><input
									type="checkbox"
									checked={selectedAges.includes(age)}
									onChange={() => handleAgeChange(age)}
								/>
									<span>{age} лет</span>
								</label>
							))}
						</div>
					</PanelRow>

					<PanelRow>
						<p>Наличие мест</p>
						<ToggleControl
							checked={inPlace}
							onChange={() => setAttributes({ inPlace: !inPlace })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>

					<PanelRow>
						<p>Открыть продажи для всех клиентов</p>
						<ToggleControl
							checked={inActive}
							onChange={() => setAttributes({ inActive: !inActive })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>

					<PanelRow>
						<p>Открыть продажи для "старичков"</p>
						<ToggleControl
							checked={inActiveOld}
							onChange={() => setAttributes({ inActiveOld: !inActiveOld })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>

					<PanelRow>
						<p>Наличие сертификата</p>
						<ToggleControl
							checked={inSertific}
							onChange={() => setAttributes({ inSertific: !inSertific })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>

				</PanelBody>
				<PanelBody
					title="Выберите дату"
					initialOpen={false}
				>
					<PanelRow>
						<div className="date-range-picker">
							<div className="date-picker-wrapper">
								<p>Начало</p>
								<Button
									variant="secondary"
									onClick={() => setIsStartDateOpen(true)}
								>
									{startDate
										? new Date(startDate).toLocaleDateString()
										: 'Выбрать дату начала'}
								</Button>
								{isStartDateOpen && (
									<div className="calendar-popup">
										<DatePicker
											currentDate={startDate ? new Date(startDate) : null}
											onChange={handleStartDateChange}
											minDate={today}
										/>
									</div>
								)}
							</div>

							<div className="date-picker-wrapper">
								<p>Конец</p>
								<Button
									variant="secondary"
									onClick={() => setIsEndDateOpen(true)}
								>
									{endDate
										? new Date(endDate).toLocaleDateString()
										: 'Выбрать дату окончания'}
								</Button>

								{isEndDateOpen && (
									<div className="calendar-popup">
										<DatePicker
											currentDate={endDate ? new Date(endDate) : null}
											onChange={handleEndDateChange}
											minDate={startDate ? new Date(startDate) : today}
										/>
									</div>
								)}
							</div>
						</div>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title="Настройки видео"
					initialOpen={false}
				>
					<PanelRow>
						<MediaUpload
							onSelect={(video) => {
								setAttributes({ video });
							}}
							allowedTypes={['video']}
							value={video ? video.id : ''}
							render={({ open }) => (
								<Button
									onClick={open}
									variant="secondary"
								>
									{!video ? 'Загрузить видео' : 'Изменить видео'}
								</Button>
							)}
						/>
						{video &&
							<Button
								onClick={() => {
									setAttributes({ video: null });
								}}
								variant="link"
								isDestructive
							>
								Удалить
							</Button>
						}
					</PanelRow>
				</PanelBody>
				<PanelBody
					title="Загрузить изображение"
					initialOpen={false}
				>
					<BackgroundImageUploader
						desktopBackground={desktopBackground}
						tabletBackground={tabletBackground}
						mobileBackground={mobileBackground}
						setAttributes={setAttributes}
						isSelected={isSelected}
					/>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className="wrapper">

					<button className={'go-back-btn'}>{iconArray} вернуться к выбору</button>

					<div className={'container'}>

						<div className={'left-img'}>
							<div className={'left-container'}>
								{desktopBackground?.url ? (
									<img
										src={desktopBackground?.url}
										alt={'ПК фон'}
										className={'bg-image img-for-block bg-image-desktop'}
									/>
								) : <div className={'mask bg-image img-for-block bg-image-desktop'}></div>}
								{tabletBackground?.url ? (
									<img
										src={tabletBackground?.url}
										alt="Планшет фон"
										className="bg-image img-for-block bg-image-tablet"
									/>
								) : <div className={'mask bg-image img-for-block bg-image-tablet'}></div>}
								{mobileBackground?.url ? (
									<img
										src={mobileBackground?.url}
										alt="Телефон фон"
										className="bg-image img-for-block bg-image-mobile"
									/>
								) : <div className={'mask bg-image img-for-block bg-image-mobile'}></div>}
								{city && <span className={'city-label'}>{city}</span>}
								{daysCount && <span className={'count-days'}>{daysCount}</span>}
								{postTypeName && <span className={'camp-section'}>{postTypeName}</span>}
							</div>
							<RichText
								tagName="p"
								onChange={value => setAttributes({ textForImage: value })}
								value={textForImage}
								placeholder={'Заголовок...'}
							/>
							{video && <div className={'video-open'}>
								<RichText
									tagName="p"
									onChange={value => setAttributes({ videoText: value })}
									value={videoText}
									placeholder="Текст..."
								/>
							</div>}
						</div>

						<div className={'right-content'}>

							<div className="age-checkboxes">
								{selectedAges.map(age => (
									<span key={age} className="age-checkbox">{age} лет</span>
								))}
							</div>
							<div className={'title'}>
								<RichText
									tagName="span"
									onChange={value => setAttributes({ title: value })}
									value={title}
									placeholder={'Заголовок...'}
								/>
							</div>

							{!inPostType
								? <>
									<div className={'info-date'}>{dateRange} ({selectedShift})</div>
									{
										!isEditingPlace
											? <span>{place}</span>
											: <RichText
												tagName="span"
												onChange={value => setAttributes({ place: value })}
												value={place}
												placeholder="Текст..."
											/>}
								</>
								: <span>{dateRange}</span>
							}

							<RichText
								tagName="p"
								onChange={value => setAttributes({ description: value })}
								value={description}
								placeholder="Текст..."
							/>
							<div className={'price-card'}>
								<RichText
									tagName="span"
									onChange={value => setAttributes({ price: value })}
									value={price}
									placeholder="55 000₽"
								/>
							</div>
							<button
								className={`leave-application modal-form ${inPlace ? 'green' : 'red'}`}
								data-titleform={postTypeName + ': ' + title}
								data-titleproduct={title}
								data-referer={window.location.href}
								data-datestart={startDate}
							>
								{inPlace ? 'Оставить заявку' : 'Мест нет — запись в резерв'}
							</button>
							<RichText
								tagName="p"
								onChange={value => setAttributes({ subdescription: value })}
								value={subdescription}
								placeholder="Текст..."
							/>


						</div>

					</div>

					<div className={'random-posts-container'} >
						<h3>Смотрите также</h3>

						<div className={'random-posts'} id="random-posts-container" data-loaded="true" data-current-post-id="">

							<div className={`item-card card-17 skills-courses`}>
								<div class="top-item-section item-section">
									<span class="label-card">{postTypeName}</span>
									<span class="date-card">{dateRange} {selectedShift ? `(${selectedShift})` : ''}</span>
									<RichText
										tagName="span"
										className={'place-card'}
										onChange={value => setAttributes({ newPlace: value })}
										value={newPlace}
										placeholder={'Место...'}
									/>
									<div class="title-card">
										<RichText
											tagName="span"
											onChange={value => setAttributes({ newTitle: value })}
											value={newTitle}
											placeholder={'Заголовок...'}
										/>
									</div>
									<div class="ages-card">({formatAgeRange(selectedAges)})</div>
								</div>
								<div class="bottom-item-section item-section">
									<div class="days-card">{daysCount}</div>
									<div class="price-card">{cleanPrice}</div>
									<button class={`modal-form green`}>Оставить заявку</button>
									<button class={`more green`}>Подробнее {iconArray}</button>
								</div>
							</div>

						</div>
					</div>
				</div>

				{video && videoModal(video)}

			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				title,
				description,
				price,
				daysCount,
				subdescription,
				dateRange,
				selectedShift,
				startDate,
				endDate,
				selectedAges,
				video,
				postTypeName,
				videoText,
				desktopBackground,
				tabletBackground,
				mobileBackground,
				city,
				place,
				inPlace,
				inActive,
				inActiveOld,
				postTypeN,
				textForImage
			},
			className
		} = props;

		const inPostType = postTypeN === 'travel-by-city';

		return (
			<div className={className}>
				<div className="wrapper">

					<button className={'go-back-btn'}>{iconArray} вернуться к выбору</button>

					<div className={'container'}>

						<div className={'left-img'}>
							<div className={'left-container'}>
								{desktopBackground?.url ? (
									<img
										src={desktopBackground?.url}
										alt={'ПК фон'}
										className={'bg-image img-for-block bg-image-desktop'}
									/>
								) : <div className={'mask'}></div>}
								{tabletBackground?.url ? (
									<img
										src={tabletBackground?.url}
										alt="Планшет фон"
										className="bg-image img-for-block bg-image-tablet"
									/>
								) : <div className={'mask'}></div>}
								{mobileBackground?.url ? (
									<img
										src={mobileBackground?.url}
										alt="Телефон фон"
										className="bg-image img-for-block bg-image-mobile"
									/>
								) : <div className={'mask'}></div>}
								{city && <span className={'city-label'}>{city}</span>}
								{daysCount && <span className={'count-days'}>{daysCount}</span>}
								{postTypeName && <span className={'camp-section'}>{postTypeName}</span>}
							</div>

							{textForImage && <RichText.Content tagName="p" value={textForImage} />}
							{video && <div className={'video-open'}>
								<RichText.Content tagName="p" value={videoText} />
							</div>}
						</div>

						<div className={'right-content'}>

							{selectedAges && <div className="age-checkboxes">
								{selectedAges.map(age => (
									<span key={age} className="age-checkbox">{age} лет</span>
								))}
							</div>}

							{title && <div className={'title'}><RichText.Content tagName="span" value={title} /></div>}

							{!inPostType
								? <>
									<div className={'info-date'}
										data-start-date={startDate}
										data-end-date={endDate}>{dateRange ? dateRange : "01.06 — 21.06.25"} ({selectedShift})</div>
									{place && <span>{place}</span>}
								</>
								: <span>{dateRange}</span>
							}

							{description && <RichText.Content tagName="p" value={description} />}
							{price && <div className={'price-card'}>
								<RichText.Content tagName="span" value={price} />
							</div>}

							<button
								className={`leave-application modal-form ${inPlace ? 'green' : 'red'}`}
							>
								{inPlace ? 'Оставить заявку' : 'Мест нет — запись в резерв'}
							</button>
							{subdescription && <RichText.Content tagName="p" value={subdescription} />}

						</div>

					</div>

					<div className={'random-posts-container'} >
						<h3>Смотрите также</h3>
						<div
							className="random-posts"
							id="random-posts-container"
							data-current-post-id=""
						></div>
					</div>

				</div>

				{video && videoModal(video)}

			</div>
		)
	};

	function videoModal(video) {

		return (<div class={'videoModal'}>
			<div className={'modal-wrapper-video'}>
				<div class={'modal-content-video'}>
					<button className={'close-modal-video'}></button>
					<video
						src={video.url}
						preload="none"
						frameborder="0"
						allow="autoplay; encrypted-media"
						id={'videoFrame'}
					>
						<source src={video.url} type="video/mp4"></source>
					</video>
					<span class={'play-video'}>{iconPlay}</span>
				</div>
			</div>
		</div>);
	}

	function BackgroundImageUploader(props) {
		const { desktopBackground, tabletBackground, mobileBackground, setAttributes, isSelected } = props

		const onSelectImage = (device, img) => {
			if (device === 'desktop') {
				setAttributes({ desktopBackground: { id: img.id, url: img.url, alt: img.alt } });
			} else if (device === 'tablet') {
				setAttributes({ tabletBackground: { id: img.id, url: img.url, alt: img.alt } });
			} else if (device === 'mobile') {
				setAttributes({ mobileBackground: { id: img.id, url: img.url, alt: img.alt } });
			}
		};

		const removeImage = (device) => {
			if (device === 'desktop') {
				setAttributes({ desktopBackground: null });
			} else if (device === 'tablet') {
				setAttributes({ tabletBackground: null });
			} else if (device === 'mobile') {
				setAttributes({ mobileBackground: null });
			}
		};

		const renderImageUpload = (device, imgURL) =>
			!imgURL ? (
				<MediaUpload
					onSelect={(img) => onSelectImage(device, img)}
					allowedTypes={['image']}
					render={({ open }) => (
						<Button
							className="components-button is-secondary"
							onClick={open}
						>
							{`Добавить фон для ${device}`}
						</Button>
					)}
				/>
			) : (
				<>
					<img src={imgURL} alt={`Фон для ${device}`} style={{ width: '100%', height: 'auto' }} />
					{isSelected && (
						<Button className="remove-image" onClick={() => removeImage(device)}>
							{`Удалить фон для ${device}`}
						</Button>
					)}
				</>
			);

		return (
			<div>
				<h4>Изображение для ПК</h4>
				{renderImageUpload('desktop', desktopBackground?.url)}

				<h4>Изображение для планшета</h4>
				{renderImageUpload('tablet', tabletBackground?.url)}

				<h4>Изображение для телефона</h4>
				{renderImageUpload('mobile', mobileBackground?.url)}
			</div>
		);
	};

	function formatAgeRange(ages) {
		// Сортируем массив по возрастанию (на случай, если он не отсортирован)
		const sortedAges = [...ages].sort((a, b) => a - b);

		// Получаем минимальный и максимальный возраст
		const minAge = Math.min(...sortedAges);
		const maxAge = Math.max(...sortedAges);

		// Форматируем строку
		return `${minAge} - ${maxAge} лет`;
	}

})(
	window.wp
);
