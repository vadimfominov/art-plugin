(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { useSelect, useDispatch } = wp.data;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { TextControl, PanelBody, PanelRow, Button, SelectControl, DatePicker, ToggleControl } = wp.components;
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

	registerBlockType("fv/item-card-skills", {
		title: 'Карточка 2',
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
			newDescription: {
				type: 'string',
				default: ''
			},
			teacherTitle: {
				type: 'string',
				default: ''
			},
			placeTitle: {
				type: 'string',
				default: ''
			},
			titleCount: {
				type: 'string',
				default: ''
			},
			infoDate: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			description2: {
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
			agesClass: {
				type: 'array',
				default: Array.from({ length: 11 }, (_, i) => i + 1)
			},
			video: {
				type: 'object',
				default: null
			},
			postTypeName: {
				type: 'string',
				default: ''
			},
			place: {
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
			inActive: {
				type: 'boolean',
				default: null
			},
			currentPostID: {
				type: 'string',
				default: ''
			},
			selectedTime: {
				type: 'string',
				default: ''
			},
			contentList1: {
				type: 'string',
				default: ''
			},
			contentList2: {
				type: 'string',
				default: ''
			},
			contentList3: {
				type: 'string',
				default: ''
			},
			titleList1: {
				type: 'string',
				default: ''
			},
			titleList2: {
				type: 'string',
				default: ''
			},
			titleList3: {
				type: 'string',
				default: ''
			},
			postTypeTitle: {
				type: 'string',
				default: ''
			},
			postTypeN: {
				type: 'string',
				default: ''
			},
			teacherDateTitle: {
				type: 'string',
				default: ''
			},
		},
		edit: Edit,
		save: Save
	});
	function Edit(props) {
		const {
			attributes: {
				title,
				newTitle,
				newDescription,
				placeTitle,
				titleCount,
				infoDate,
				description,
				description2,
				price,
				subdescription,
				selectedShift,
				teacherTitle,
				daysCount,
				dateRange,
				selectedAges,
				ages,
				video,
				startDate,
				selectedTime,
				endDate,
				postTypeName,
				postTypeN,
				videoText,
				desktopBackground,
				tabletBackground,
				mobileBackground,
				place,
				inPlace,
				inActive,
				selectedPosts,
				agesClass,
				contentList1,
				contentList2,
				contentList3,
				titleList1,
				titleList2,
				titleList3,
				postTypeTitle,
				teacherDateTitle
			},
			className,
			isSelected,
			setAttributes
		} = props;
		// Получаем текущую дату
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		// Обновляем атрибуты при изменении состояний
		useEffect(() => setAttributes({ startDate }), [startDate]);
		// Для возраста
		const handleAgeChange = (age) => {
			const newSelectedAges = selectedAges.includes(age)
				? selectedAges.filter(item => item !== age)
				: [...selectedAges, age].sort((a, b) => a - b);
			setAttributes({ selectedAges: newSelectedAges });
		};
		// Получаю название post_type
		const postType = useSelect(select => select('core/editor').getCurrentPostType(), []);
		const postTypeData = useSelect(select =>
			select('core').getPostType(postType)
			, [postType]);
		// Устанавливаем начальное значение postTypeName, если оно еще не задано
		useEffect(() => {
			if (postTypeData && !postTypeName) {
				setAttributes({ postTypeName: postTypeData.name });
			}
		}, [postTypeData, postTypeName, setAttributes]);
		useEffect(() => {
			setAttributes({ postTypeN: postType });
		}, [postType]);
		// Для дублирования заголовка карточки
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
		
		let inCard = postType !== 'psychologist';
		let inPostType = postType === 'proficiency-testing';
		let ageTitleClass = inPostType ? ' класс' : ' лет';
		useEffect(() => {
			// Если newTitle пустой или совпадает с текущим title, обновляем его
			if (!newTitle || newTitle === title) {
				setAttributes({ newTitle: title });
			}
		}, [title]); // Зависимость от title
		
		const cleanPrice = price?.replace(/<[^>]*>/g, '').trim();
		const blockProps = useBlockProps();

		const width_block = titleList2.length > 0 ? '' : 'width-block';

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					{
						inCard
							? <>
								{inPostType
									? <PanelRow>
										<p>Выберите класс</p>
										<div className="age-checkboxes">
											{agesClass.map(age => (
												<label key={age} className="age-checkbox class"><input
													type="checkbox"
													checked={selectedAges.includes(age)}
													onChange={() => handleAgeChange(age)}
												/>
													<span>{age} класс</span>
												</label>
											))}
										</div>
									</PanelRow>
									: <PanelRow>
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
											<label key={'родители'} className="age-checkbox"><input
												type="checkbox"
												checked={selectedAges.includes('родители')}
												onChange={() => handleAgeChange('родители')}
											/>
												<span>родители</span>
											</label>
										</div>
									</PanelRow>}
							</>
							: <>
								<PanelRow>
									<p>Место проведения</p>
									<TextControl
										value={placeTitle} // Значение поля ввода
										onChange={placeTitle => setAttributes({ placeTitle })} // Обработчик изменения
										__nextHasNoMarginBottom={true}
										__next40pxDefaultSize={true}
									/>
								</PanelRow>
							</>
					}
					<PanelRow>
						<p>Наличие мест</p>
						<ToggleControl
							checked={inPlace}
							onChange={() => setAttributes({ inPlace: !inPlace })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
					<PanelRow>
						<p>Открыть для продаж</p>
						<ToggleControl
							checked={inActive}
							onChange={() => setAttributes({ inActive: !inActive })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
				</PanelBody>
				{inCard && <PanelBody
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
				</PanelBody>}
				{inCard && <PanelBody
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
				</PanelBody>}
			</InspectorControls>,
			<div {...blockProps}>
				<div className="wrapper">
					{inCard && <button className={'go-back-btn'}>{iconArray} вернуться к выбору</button>}
					<div className={'container'}>
						{inCard && <div className={'left-img'}>

								<picture>
									{/* Для мобильных устройств (до 770px) */}
									<source
										srcset={mobileBackground?.url}
										media="(max-width: 769px)"
									/>
									{/* Для планшетов (от 770px до 1024px) */}
									<source
										srcset={tabletBackground?.url}
										media="(min-width: 770px) and (max-width: 1024px)"
									/>
									{/* Для десктопов (от 1025px и выше) */}
									<source
										srcset={desktopBackground?.url}
										media="(min-width: 1025px)"
									/>
									{/* Фолбек для браузеров, которые не поддерживают <picture> */}
									<img
										src={desktopBackground?.url}
										alt="Фон"
										className="bg-image"
									/>
								</picture>
							
							<div className={'count-days'}>
								<RichText
									tagName="span"
									onChange={value => setAttributes({ titleCount: value })}
									value={titleCount}
									placeholder={'Текст...'}
								/>
							</div>
							<RichText
								tagName="span"
								className={'camp-section'}
								onChange={value => setAttributes({ postTypeName: value })}
								value={postTypeName}
								placeholder={'Текст...'}
							/>
						</div>}
						<div className={'right-content'}>
							{inCard && <div className="age-checkboxes">
								{selectedAges.map(age => (
									<span key={age} className={age === 'родители' ? "parents age-checkbox " + postTypeN : "age-checkbox " + postTypeN}>
										{age === 'родители' ? age : age + ageTitleClass}
									</span>
								))}
							</div>}
							<div className={'title'}>
								<RichText
									tagName="span"
									onChange={value => setAttributes({ title: value })}
									value={title}
									placeholder={'Заголовок...'}
								/>
							</div>
							{
								inCard
									? <>
										<RichText
											tagName="div"
											className={'info-date'}
											onChange={teacherDateTitle => setAttributes({ teacherDateTitle })}
											value={teacherDateTitle}
											placeholder={'Текст...'}
										/>
										<RichText
											tagName="span"
											onChange={teacherTitle => setAttributes({ teacherTitle })}
											value={teacherTitle}
											placeholder={'Текст...'}
										/>
									</>
									: <>
										<span>Место проведения — {placeTitle}</span>
									</>
							}
							{inCard && <RichText
								tagName="p"
								onChange={value => setAttributes({ description: value })}
								value={description}
								placeholder="Текст..."
							/>}
							{inCard && <div className={'list-section-skills ' + postTypeN}>
								<div className={'list-block ' + width_block}>
									<RichText
										key='titleList1'
										tagName="span"
										value={titleList1}
										onChange={titleList1 => setAttributes({ titleList1 })}
										placeholder={'Заголовок списка...'}
									/>
									<RichText
										key='contentList1'
										tagName="ul"
										value={contentList1}
										onChange={contentList1 => setAttributes({ contentList1 })}
										placeholder="Введите текст..."
									/>
								</div>
								{!inPostType && <>
									<div className={'list-block'}>
										<RichText
											key='titleList2'
											tagName="span"
											value={titleList2}
											onChange={titleList2 => setAttributes({ titleList2 })}
											placeholder={'Заголовок списка...'}
										/>
										<RichText
											key='contentList2'
											tagName="ul"
											value={contentList2}
											onChange={contentList2 => setAttributes({ contentList2 })}
											placeholder="Введите текст..."
										/>
									</div>
									<div className={'list-block last-list-block'}>
										<RichText
											key='titleList3'
											tagName="span"
											value={titleList3}
											onChange={titleList3 => setAttributes({ titleList3 })}
											placeholder={'Заголовок списка...'}
										/>
										<RichText
											tagName="ul"
											value={contentList3}
											onChange={contentList3 => setAttributes({ contentList3 })}
											placeholder="Введите текст..."
										/>
									</div>
								</>
								}
								{inPostType && <RichText
									tagName="p"
									onChange={value => setAttributes({ description2: value })}
									value={description2}
									placeholder="Текст..."
								/>}
							</div>}
							<div className={'bottom-block'}>
								<div className={'price-card'}>
									<RichText
										tagName="span"
										onChange={value => setAttributes({ price: value })}
										value={price}
										placeholder="55 000 ₽"
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
								{inCard && <RichText
									tagName="p"
									onChange={value => setAttributes({ subdescription: value })}
									value={subdescription}
									placeholder="Текст..."
								/>}
							</div>
							{video && <div className={'video-open'}>
								<RichText
									tagName="p"
									onChange={value => setAttributes({ videoText: value })}
									value={videoText}
									placeholder="Текст..."
								/>
							</div>}
						</div>
					</div>
					<div className={'random-posts-container'} >
						<h3>Смотрите также</h3>
						<div className={'random-posts'} id="random-posts-container" data-loaded="true" data-current-post-id="">
							<div className={`item-card card-17 skills-courses`}>
								<div class="top-item-section item-section">
									<span class="label-card">{postTypeName}</span>
									<span class="date-card">{dateRange}</span>
									<span class="place-card">Золотая Долина</span>
									<div class="title-card">
										<RichText
											tagName="span"
											onChange={value => setAttributes({ newTitle: value })}
											value={newTitle}
											placeholder={'Заголовок...'}
										/>
									</div>
									<div class="ages-card">
										<RichText
											tagName="span"
											onChange={value => setAttributes({ newDescription: value })}
											value={newDescription}
											placeholder={'Описиние...'}
										/>
									</div>
								</div>
								<div class="bottom-item-section item-section">
									<div class="days-card">{daysCount}</div>
									<div class="price-card">{cleanPrice ? cleanPrice : ''}</div>
									<button class="modal-form green">Оставить заявку</button>
									<button class="more green" >Подробнее {iconArray}</button>
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
				placeTitle,
				title,
				newTitle,
				newDescription,
				titleCount,
				infoDate,
				description,
				description2,
				price,
				daysCount,
				subdescription,
				dateRange,
				selectedShift,
				startDate,
				selectedTime,
				endDate,
				selectedAges,
				video,
				postTypeName,
				videoText,
				desktopBackground,
				tabletBackground,
				mobileBackground,
				place,
				inPlace,
				inActive,
				teacherTitle,
				contentList1,
				contentList2,
				contentList3,
				titleList1,
				titleList2,
				titleList3,
				postTypeN,
				teacherDateTitle
			}
		} = props;
		
		const parts1 = contentList1.split('<br>');
		const parts2 = contentList2.split('<br>');
		const parts3 = contentList3.split('<br>');
		let inCard = postTypeN !== 'psychologist';
		let inPostType = postTypeN === 'proficiency-testing';
		let ageTitleClass = inPostType ? ' класс' : ' лет';
		const blockProps = useBlockProps.save();

		const width_block = titleList2.length > 0 ? '' : 'width-block';

		return (
			<div {...blockProps}>
				<div className="wrapper">
					<button className={'go-back-btn'}>{iconArray} вернуться к выбору</button>
					<div className={'container'}>
						<div className={'left-img'}>
							
								<picture>
									{/* Для мобильных устройств (до 770px) */}
									<source
										srcset={mobileBackground?.url}
										media="(max-width: 769px)"
									/>
									{/* Для планшетов (от 770px до 1024px) */}
									<source
										srcset={tabletBackground?.url}
										media="(min-width: 770px) and (max-width: 1024px)"
									/>
									{/* Для десктопов (от 1025px и выше) */}
									<source
										srcset={desktopBackground?.url}
										media="(min-width: 1025px)"
									/>
									{/* Фолбек для браузеров, которые не поддерживают <picture> */}
									<img
										src={desktopBackground?.url}
										alt="Фон"
										className="bg-image"
									/>
								</picture>

							{titleCount && <div className={'count-days'}>
								<span>{titleCount}</span>
							</div>}
							{postTypeName && <span className={'camp-section'}>{postTypeName}</span>}
						</div>
						<div className={'right-content'}>
							<div className="age-checkboxes">
								{selectedAges.map(age => (
									<span key={age} className={age === 'родители' ? "parents age-checkbox " + postTypeN : "age-checkbox " + postTypeN}>
										{age === 'родители' ? age : age + ageTitleClass}
									</span>
								))}
							</div>
							<div className={'title'}>
								<RichText.Content tagName="span" value={title} />
							</div>
							{inCard
								? <>
									<RichText.Content tagName="div" className={'info-date'} value={teacherDateTitle} />
									<RichText.Content tagName="span" value={teacherTitle} />
								</>
								: <>
									<span>Место проведения — {placeTitle}</span>
								</>
							}
							<RichText.Content tagName="p" value={description} />
							<div className={'list-section-skills ' + postTypeN}>
								
								<div className={'list-block ' + width_block}>
									<RichText.Content tagName="span" value={titleList1} />
									<ul>
										{parts1.map((part, index) => (
											<li key={index} dangerouslySetInnerHTML={{ __html: part }} />
										))}
									</ul>
								</div>

								{contentList2 && <div className={'list-block '}>
									<RichText.Content tagName="span" value={titleList2} />
									<ul>
										{parts2.map((part, index) => (
											<li key={index} dangerouslySetInnerHTML={{ __html: part }} />
										))}
									</ul>
								</div>}

								{contentList3 && <div className={'list-block last-list-block'}>
									<RichText.Content tagName="span" value={titleList3} />
									<ul>
										{parts3.map((part, index) => (
											<li key={index} dangerouslySetInnerHTML={{ __html: part }} />
										))}
									</ul>
								</div>}

								{description2 && <RichText.Content tagName="span" value={description2} />}

							</div>
							<div className={'bottom-block'}>
								<div className={'price-card'}>
									<RichText.Content tagName="span" value={price} />
								</div>
								<button
									className={`leave-application modal-form ${inPlace ? 'green' : 'red'}`}
								>
									{inPlace ? 'Оставить заявку' : 'Мест нет — запись в резерв'}
								</button>
								{subdescription && <RichText.Content tagName="p" value={subdescription} />}
							</div>
							{video && <div className={'video-open'}>
								<RichText.Content tagName="p" value={videoText} />
							</div>}
						</div>
					</div>
					{postTypeN !== 'proficiency-testing' && inCard && <div className={'random-posts-container'} >
						<h3>Смотрите также</h3>
						<div
							className="random-posts"
							id="random-posts-container"
							data-current-post-id=""
						></div>
					</div>}
				</div>
				{video && videoModal(video)}
			</div>
		)
	};
	function videoModal(video) {
		return (<div className={'videoModal'}>
			<div className={'modal-wrapper-video'}>
				<div className={'modal-content-video'}>
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
					<span className={'play-video'}>{iconPlay}</span>
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
					<img src={imgURL} alt={'photo'} style={{ width: '100%', height: 'auto' }} />
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
})(
	window.wp
);