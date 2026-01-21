(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload } = wp.blockEditor;
	const { TextControl, PanelBody, PanelRow, Button, RangeControl, ToggleControl } = wp.components;
	const { useEffect } = wp.element

	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);

	const iconForSlide1 = (<svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M15.2344 0.78125H0.390625C0.174889 0.78125 0 0.956139 0 1.17187V16.0156C0 16.2314 0.174889 16.4062 0.390625 16.4062H15.2344C15.4501 16.4062 15.625 16.2314 15.625 16.0156V1.17187C15.625 0.956139 15.4501 0.78125 15.2344 0.78125Z" fill="#BEBEBE" fill-opacity="0.3" />
		<path d="M33.9844 0.78125H19.1406C18.9249 0.78125 18.75 0.956139 18.75 1.17187V16.0156C18.75 16.2314 18.9249 16.4062 19.1406 16.4062H33.9844C34.2001 16.4062 34.375 16.2314 34.375 16.0156V1.17187C34.375 0.956139 34.2001 0.78125 33.9844 0.78125Z" fill="#BEBEBE" fill-opacity="0.3" />
	</svg>);

	const iconForSlide2 = (<svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.16859 23.1016C6.16859 23.1016 2.95765 17.3828 1.60609 14.9063C-0.190788 11.6094 -0.487672 10.2188 0.754524 9.53125C1.52796 9.10156 2.59827 9.28125 3.25452 10.4219L4.78577 12.8594V3.30469C4.78577 3.30469 4.69202 0.78125 6.4889 0.78125C8.40297 0.78125 8.23891 3.30469 8.23891 3.30469V7.94531C8.23891 7.94531 9.24672 7.21875 10.4264 7.54688C11.028 7.71094 11.7311 8 12.1061 8.95313C12.1061 8.95313 14.5045 7.78906 15.6998 10.2656C15.6998 10.2656 18.4655 9.71875 18.4655 12.5859C18.4655 15.4531 15.0123 23.1016 15.0123 23.1016H6.16859Z" fill="#BEBEBE" />
	</svg>);

	const leftArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M8 1L1.56568 7.43431C1.25327 7.74673 1.25327 8.25327 1.56569 8.56568L8 15" stroke="#535353" stroke-linecap="round" />
	</svg>);

	const rightArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 15L7.43432 8.56569C7.74674 8.25327 7.74673 7.74674 7.43432 7.43432L1 1" stroke="#535353" stroke-linecap="round" />
	</svg>);

	const iconPlay = (<svg width="23" height="38" viewBox="0 0 23 38" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M23 19L0.5 37.1865L0.500002 0.813466L23 19Z" fill="#535353" />
	</svg>);

	registerBlockType('fv/our-excursion', {
		title: 'Наша экскурсия',
		icon: catIcon,
		category: 'common',
		keywords: ['Наша экскурсия', 'our excursion', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			blocksData: {
				type: 'array',
				default: [{ image: '', video: '', label: '' }],
			},
			slidesOrder: { // Новый атрибут
				type: 'array',
				default: [0] // Начальное значение (первый слайд)
			},
			slidesOrderString: { // Новый атрибут
				type: 'string',
				default: '' // Начальное значение (первый слайд)
			},
			fixedNumbers: {
				type: 'array',
				default: [] // Массив фиксированных номеров для карточек
			},
			columns: {
				type: 'number',
				default: 4,
			},
			classSlider: {
				type: 'string',
				default: ''
			},
			inBlock: {
				type: 'boolean',
				default: false
			},
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const { attributes, className, isSelected, setAttributes } = props;
		const { title, description, blocksData, columns, classSlider, slidesOrder, slidesOrderString, fixedNumbers, inBlock } = attributes;

		useEffect(() => {
			if (columns > blocksData.length) {
				// Добавляем новые слайды
				const newBlocksData = [...blocksData];
				while (newBlocksData.length < columns) {
					newBlocksData.push({ image: '', video: '', label: '' });
				}

				// Обновляем порядок: старые индексы + новые
				const newOrder = [...slidesOrder];
				const newFixedNumbers = [...fixedNumbers]; // Новые фиксированные номера

				for (let i = slidesOrder.length; i < columns; i++) {
					newOrder.push(i);
					newFixedNumbers.push(i + 1); // Назначаем фиксированный номер
				}

				setAttributes({
					blocksData: newBlocksData,
					slidesOrder: newOrder,
					fixedNumbers: newFixedNumbers // Обновляем фиксированные номера
				});
			} else if (columns < blocksData.length) {
				// Удаляем лишние слайды
				const newOrder = slidesOrder
					.filter(index => index < columns) // Оставляем только валидные индексы
					.slice(0, columns); // Обрезаем до нужного количества

				setAttributes({
					blocksData: blocksData.slice(0, columns),
					slidesOrder: newOrder,
					fixedNumbers: fixedNumbers.slice(0, columns) // Обрезаем фиксированные номера
				});
			}
		}, [columns]);

		const updateBlockData = (index, key, value) => {
			const newBlocksData = [...blocksData];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData: newBlocksData });
		};

		const blockItems = slidesOrder.map((orderIndex, displayIndex) => {
			const realIndex = orderIndex; // Реальный индекс в blocksData
			if (realIndex >= blocksData.length) return null; // Защита от несуществующих индексов

			const block = blocksData[realIndex];
			const fixedNumber = fixedNumbers[realIndex];

			const imageURL = block?.image?.url;
			const videoURL = block?.video?.url;
			const label = block?.label || '';

			return (
				<li key={displayIndex} className={'slide item-' + (displayIndex + 1)} >
					{/* Отображаем фиксированный номер */}
					<div className="fixed-number">{fixedNumber}</div>

					{!!videoURL ? (
						<>
							{imageURL && <img src={imageURL} alt={`test`} width={"100%"} height={"auto"} />}
							<MediaUpload
								onSelect={value => updateBlockData(realIndex, 'video', value)}
								allowedTypes={['video']}
								value={block?.video ? block.video.id : ''}
								render={({ open }) => (
									<Button onClick={open} variant="secondary">
										{!block?.video ? 'Загрузить видео' : videoFrame(videoURL)}
									</Button>
								)}
							/>
							{isSelected && (
								<>
									<Button onClick={() => updateBlockData(realIndex, 'video', null)} className={'remove-img remove-img-video'}>
										Удалить видео
									</Button>
									{imageURL && (
										<Button onClick={() => updateBlockData(realIndex, 'image', null)} className={'remove-img'}>
											Удалить картинку
										</Button>
									)}
									{!imageURL && (
										<MediaUpload
											allowedTypes={['image']}
											onSelect={value => updateBlockData(realIndex, 'image', value)}
											render={({ open }) => (
												<Button onClick={open} isPrimary isLarge>
													Добавить картинку
												</Button>
											)}
										/>
									)}
								</>
							)}
						</>
					) : !imageURL ? (
						<MediaUpload
							allowedTypes={['image']}
							onSelect={value => updateBlockData(realIndex, 'image', value)}
							render={({ open }) => (
								<Button onClick={open} isPrimary isLarge>
									{block?.image ? (
										<img src={imageURL} alt={`test`} width={"100%"} height={"auto"} />
									) : (
										'Выбрать картинку'
									)}
								</Button>
							)}
						/>
					) : (
						<>
							{imageURL && <img src={imageURL} alt={`test`} width={"100%"} height={"auto"} />}
							{isSelected && (
								<>
									<Button onClick={() => updateBlockData(realIndex, 'image', null)} className={'remove-img'}>
										Удалить картинку
									</Button>
									<MediaUpload
										onSelect={value => updateBlockData(realIndex, 'video', value)}
										allowedTypes={['video']}
										value={block?.video ? block.video.id : ''}
										render={({ open }) => (
											<Button onClick={open} variant="secondary" className={'add-video'}>
												{!block?.video ? 'Загрузить видео' : 'Удалить видео'}
											</Button>
										)}
									/>
								</>
							)}
						</>
					)}
					{(label || isSelected) && (
						<RichText
							key={realIndex}
							data-key={realIndex}
							tagName="span"
							value={label}
							onChange={(value) => updateBlockData(realIndex, 'label', value)}
							placeholder="Текст..."
						/>
					)}
				</li>
			);
		});

		// Функция для обработки изменения значения
		const handleOrderChange = (value, setAttributes) => {
			// Сохраняем оригинальное значение для сравнения
			const originalValue = value;
			const stringArray = originalValue.split(',')
			const newOrderNumber = stringArray.map(Number);
			const newOrder = newOrderNumber.map(el => el - 1);

			setAttributes({ slidesOrderString: originalValue });
			setAttributes({ slidesOrder: newOrder });

		};

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					<PanelRow>
						<p>Добавить блок на сайт</p>
						<ToggleControl
							checked={inBlock}
							onChange={() => setAttributes({ inBlock: !inBlock })}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
						/>
					</PanelRow>
					<PanelRow>
						<p>Количество элементов</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={columns}
							onChange={value => setAttributes({ columns: value })}
							min={1}
							max={12}
						/>
					</PanelRow>
					<PanelRow>
						<p>Порядок слайдов</p>
						<TextControl
							value={slidesOrderString}
							onChange={(value) => handleOrderChange(value, setAttributes)}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
							help={`Введите ${columns} цифр от 1 до ${columns} через запятую`}
						/>
						<Button
							onClick={() => {
								// Генерируем массив чисел от 1 до columns (например, [1, 2, 3, 4])
								const defaultNumbers = Array.from({ length: columns }, (_, i) => i + 1);

								// Преобразуем в строку с запятыми (например, "1,2,3,4")
								const defaultString = defaultNumbers.join(',');

								// Устанавливаем оба атрибута
								setAttributes({
									slidesOrderString: defaultString,
									slidesOrder: defaultNumbers.map(num => num - 1), // Преобразуем в индексы (0-based)
									fixedNumbers: defaultNumbers // Обновляем фиксированные номера
								});
							}}
							variant="secondary"
							style={{ marginTop: '8px' }}
						>
							Сбросить порядок
						</Button>
					</PanelRow>
					<PanelRow>
						<p>Добавить класс для слайдера</p>
						<TextControl
							onChange={value => setAttributes({ classSlider: value })}
							value={classSlider}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className="wrapper">

					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Заголовок..."
					// allowedFormats={['core/text-color']}
					/>

					<RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="Описание..."
					// allowedFormats={[]}
					/>

					<div className={'icons-for-slider'}>
						<span className={'icon-1'}>{iconForSlide1}</span>
						<span className={'icon-2'}>{iconForSlide2}</span>
					</div>

					<div className={'slider-container'}>
						<div className={'slider-box'}>
							<ul className={classSlider + ' slider-block'}>
								{blockItems}
							</ul>
						</div>
						<div className={classSlider + '-pagination-btns slider-pagination'}>
							<span className={'left-btn'}>{leftArr}</span>
							<span className={'right-btn'}>{rightArr}</span>
						</div>
					</div>

				</div>
			</div>
		];
	}

	function Save(props) {
		const { attributes, className } = props;
		const { title, description, blocksData, columns, classSlider, slidesOrder, inBlock } = attributes;

		if (!inBlock) {
			return null;
		}

		return (
			<div className={className}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<div className={'icons-for-slider'}>
						<span className={'icon-1'}>{iconForSlide1}</span>
						<span className={'icon-2'}>{iconForSlide2}</span>
					</div>
					<div className={'slider-container'}>
						<div className={'slider-box'}>
							<ul className={classSlider + ' slider-block'}>
								{slidesOrder.map((orderIndex, displayIndex) => {
									const block = blocksData[orderIndex];
									if (!block) return null;

									return (
										<li key={displayIndex} className={'slide item-' + (displayIndex + 1)}>
											{
												block.video?.url
													? block.image?.url && (
														<>
															<img
																src={block.image.url}
																alt={block.image.alt}
																className={'image-for-video'}
																width={"100%"}
																height={"auto"}
															/>
															{videoFrame(block.video.url)}
														</>
													)
													: block.image?.url && (
														<img
															src={block.image.url}
															alt={block.image.alt}
															className={'image-for-video'}
															width={"100%"}
															height={"auto"}
														/>
													)
											}
											{block.label && <span>{block.label}</span>}
										</li>
									);
								})}
							</ul>
						</div>
						<div className={classSlider + '-pagination-btns slider-pagination'}>
							<span className={'left-btn'}>{leftArr}</span>
							<span className={'right-btn'}>{rightArr}</span>
						</div>
					</div>
				</div>
			</div>
		)
	};

	function videoFrame(videoURL) {

		return (
			<div class={'content-video'}>
				<video
					src={videoURL}
					preload="none"
					frameborder="0"
					allow="autoplay; encrypted-media"
				>
					<source src={videoURL} type="video/mp4"></source>
				</video>
				<span class={'play-video'}>{iconPlay}</span>
			</div>
		);
	}

})(
	window.wp
);
