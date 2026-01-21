(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const { InspectorControls, MediaUpload } = wp.blockEditor;

	const { PanelBody, Button } = wp.components;

	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
		<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z"/>
		<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z"/>
		</g>
	</svg>);
	const iconOk = (<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="15" height="15.0001" rx="2.21781" transform="matrix(1 0 1.57327e-06 1 0 0)" fill="#30A933"/>
			<path d="M4.15069 7.80324L4.84178 7.09797L6.63509 8.86646L10.4308 5.08493L11.1325 5.7902L6.63509 10.2699L4.15069 7.80324Z" fill="white"/>
			</svg>);
	const iconForSlide1 = (<svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15.2344 0.78125H0.390625C0.174889 0.78125 0 0.956139 0 1.17187V16.0156C0 16.2314 0.174889 16.4062 0.390625 16.4062H15.2344C15.4501 16.4062 15.625 16.2314 15.625 16.0156V1.17187C15.625 0.956139 15.4501 0.78125 15.2344 0.78125Z" fill="#BEBEBE" fill-opacity="0.3"/>
			<path d="M33.9844 0.78125H19.1406C18.9249 0.78125 18.75 0.956139 18.75 1.17187V16.0156C18.75 16.2314 18.9249 16.4062 19.1406 16.4062H33.9844C34.2001 16.4062 34.375 16.2314 34.375 16.0156V1.17187C34.375 0.956139 34.2001 0.78125 33.9844 0.78125Z" fill="#BEBEBE" fill-opacity="0.3"/>
			</svg>);
	const iconForSlide2 = (<svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M6.16859 23.1016C6.16859 23.1016 2.95765 17.3828 1.60609 14.9063C-0.190788 11.6094 -0.487672 10.2188 0.754524 9.53125C1.52796 9.10156 2.59827 9.28125 3.25452 10.4219L4.78577 12.8594V3.30469C4.78577 3.30469 4.69202 0.78125 6.4889 0.78125C8.40297 0.78125 8.23891 3.30469 8.23891 3.30469V7.94531C8.23891 7.94531 9.24672 7.21875 10.4264 7.54688C11.028 7.71094 11.7311 8 12.1061 8.95313C12.1061 8.95313 14.5045 7.78906 15.6998 10.2656C15.6998 10.2656 18.4655 9.71875 18.4655 12.5859C18.4655 15.4531 15.0123 23.1016 15.0123 23.1016H6.16859Z" fill="#BEBEBE"/>
			</svg>);
	const leftArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8 1L1.56568 7.43431C1.25327 7.74673 1.25327 8.25327 1.56569 8.56568L8 15" stroke="#535353" stroke-linecap="round"/>
			</svg>);
	const rightArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 15L7.43432 8.56569C7.74674 8.25327 7.74673 7.74674 7.43432 7.43432L1 1" stroke="#535353" stroke-linecap="round"/>
			</svg>);
	const iconLine1 = (<svg className={'line table icon-line1'} width="752" height="281" viewBox="0 0 752 281" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M28 1L731 1C742.046 1 751 9.95431 751 21V120C751 131.046 742.046 140 731 140L461 140" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M18.2918 140V140C8.7418 140 1 147.742 1 157.292L1 261C1 270.941 9.05887 279 19 279V279" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M445 140.5L26.5 140.5" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M459 280L27 280" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);
	const iconLine1_1 = (<svg className={'line pc icon-line1_1'} width="632" height="281" viewBox="0 0 632 281" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M27.5 1L611 1C622.046 1 631 9.95431 631 21V120C631 131.046 622.046 140 611 140L468.611 140" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M18.2918 140V140C8.7418 140 1 147.742 1 157.292L1 261C1 270.941 9.05887 279 19 279V279" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M445 140.5L26.5 140.5" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M459 280L27 280" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);
	const iconLine2 = (<svg className={'line table icon-line2'} width="726" height="141" viewBox="0 0 726 141" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2 1L705 1C716.046 1 725 9.95431 725 21V120C725 131.046 716.046 140 705 140L435 140" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M419 140.5L0.5 140.5" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);
	const iconLine2_1 = (<svg className={'line pc icon-line2_1'} width="606" height="141" viewBox="0 0 606 141" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1.5 1L585 1C596.046 1 605 9.95431 605 21V120C605 131.046 596.046 140 585 140L442.611 140" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M419 140.5L0.5 140.5" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);
	const iconLine3 = (<svg className={'line table icon-line3'} width="752" height="281" viewBox="0 0 752 281" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M28 1L731 1C742.046 1 751 9.95431 751 21V120C751 131.046 742.046 140 731 140L461 140" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M18.2918 140V140C8.7418 140 1 147.742 1 157.292L1 261C1 270.941 9.05887 279 19 279V279" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M445 140.5L26.5 140.5" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M324 280L27 280" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);
	const iconLine3_1 = (<svg className={'line pc icon-line3_1'} width="632" height="281" viewBox="0 0 632 281" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M27.5 1L611 1C622.046 1 631 9.95431 631 21V120C631 131.046 622.046 140 611 140L468.611 140" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M18.2918 140V140C8.7418 140 1 147.742 1 157.292L1 261C1 270.941 9.05887 279 19 279V279" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M445 140.5L26.5 140.5" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M459 280L27 280" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);
	const iconLine4 = (<svg className={'line table icon-line4'} width="724" height="142" viewBox="0 0 724 142" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0 1L703 1C714.046 1 723 9.95431 723 21V120C723 131.046 714.046 140 703 140L433 140" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M417 141L56 141" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);
	const iconLine4_1 = (<svg className={'line pc icon-line4_1'} width="605" height="142" viewBox="0 0 605 142" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.5 1L584 1C595.046 1 604 9.95431 604 21V120C604 131.046 595.046 140 584 140L441.611 140" stroke="#30A933" stroke-dasharray="14 14"/>
			<path d="M418 141L125 141" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);

	const cities = [
		{ slug: 'sochi', name: 'Сочи' },
		{ slug: 'moscow', name: 'Москва' },
		{ slug: 'kaliningrad', name: 'Калининград' },
		{ slug: 'pskov', name: 'Псков' },
		{ slug: 'kazan', name: 'Казань' },
		{ slug: 'novgorod', name: 'Н. Новгород' },
	];

	// Регистрация блока
	registerBlockType('fv/travel-by-cities', {
		title: 'Поездки по городам',
		icon: catIcon,
		category: 'common',
		keywords: ['Поездки по городам', 'travel-by-cities', 'фке', 'art'],
		attributes: {
			title: { 
				type: 'string', 
				default: '' 
			},
			description: { type: 'string', default: '' },
			cards: {
            type: 'array',
            default: cities.map(city => ({
					slug: city.slug,
					titles: Array(3).fill(''),
					descriptions: Array(3).fill(''),
					gallery: { type: 'array', default: [] },
					label: { type: 'string', default: '' },
					stepTabsText: '',
					stepTabs2Text: '',
					stepLi1Text: '',
					stepLi2Text: '',
					stepLi3Text: '',
					stepLi4Text: '',
					stepLi5Text: '',
					stepLi6Text: '',
					stepLi7Text: '',
					stepLi8Text: '',
					stepLi9Text: '',
					stepLi10Text: '',
					stepLi11Text: '',
					stepLi12Text: '',
					stepLi13Text: '',
					cityImage: {
						type: 'object',
						default: {
							url: '',
							alt: '',
							id: null
						}
					}
            })),
			},
		},
		edit: Edit,
		save: Save,
	});

	// Компонент для отображения карточки
	function Card({ title, description, onTitleChange, onDescriptionChange }) {
		return (
			<div className="card-tab">
				<RichText
					tagName="span"
					value={title}
					onChange={onTitleChange}
					placeholder="Заголовок..."
					// allowedFormats={[]}
				/>
				<RichText
					tagName="p"
					value={description}
					onChange={onDescriptionChange}
					placeholder="Описание..."
					// allowedFormats={[]}
				/>
			</div>
		);
	}

	function LeftBlock({ slug = '', gallery = [], onGalleryUpdate, onGalleryDelete, label, onLabelChange }) {
		return (
		  	<div className="left-block">

				<div className={'icons-for-slider'}>
					<span className={'icon-1'}>{iconForSlide1}</span>
					<span className={'icon-2'}>{iconForSlide2}</span>
				</div>

				<div className={'slider-box'}>
					<MediaUpload
						onSelect={onGalleryUpdate}
						gallery
						multiple
						value={gallery.map(img => img.id)}
						allowedTypes={['image']}
						render={({ open }) => (
							<div className={`gallery-slider-${slug} slider-block`}>
								<Button onClick={open} isPrimary>
									{gallery.length > 0 ? 'Изменить галерею' : 'Добавить галерею'}
								</Button>
								{gallery.length > 0 && (
									<Button 
										onClick={onGalleryDelete} 
										isDestructive
										className="delete-gallery-btn"
									>
										Удалить галерею
									</Button>
								)}
								
								{gallery.map((img, index) => (
									<div className={'gallery-preview slide'}>
										<img 
											key={index} 
											src={img.url} 
											alt={img.alt || ''} 
											className="gallery-thumb"
										/>
									</div>
								))}
								
							</div>
						)}
					/>
				</div>

				<div className={`gallery-slider-${slug}-pagination-btns slider-pagination`}>
					<span className={'left-btn'}>{leftArr}</span>
					<span className={'right-btn'}>{rightArr}</span>
				</div>

				<RichText
					tagName="span"
					className="label-gallery"
					value={label}
					onChange={onLabelChange}
					placeholder="Подпись..."
					// allowedFormats={[]}
				/>

		  	</div>
		);
	}

	function CityImageUpload({ cityImage, onUpdate, onRemove }) {
		return (
			<>
				<MediaUpload
					onSelect={onUpdate}
					allowedTypes={['image']}
					value={cityImage?.id}
					render={({ open }) => (
					<>
						{!cityImage?.url && (
							<Button onClick={open} isPrimary>
							Выбрать картинку города
							</Button>
						)}
						
						{cityImage?.url && (
							<>
								<img 
									src={cityImage.url} 
									alt={cityImage.alt} 
									className={'city-image'}
									style={{ maxWidth: '100%' }}
								/>
								<div className="city-image-controls">
									<Button onClick={open} isSecondary>
										Заменить
									</Button>
									<Button onClick={onRemove} isDestructive>
										Удалить
									</Button>
								</div>
							</>
						)}
					</>
					)}
				/>
				

			</>
		);
	}

	function Edit(props) {
		
		const {
			attributes: { title, description, cards },
			className,
			setAttributes,
		} = props;

		const updateCard = (cityIndex, cardIndex, field, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					// Создаем глубокую копию объекта города
					const updatedCity = { 
						...city,
						titles: [...city.titles],
						descriptions: [...city.descriptions]
					};
					
					if (field === 'title') {
						updatedCity.titles[cardIndex] = value;
					} else if (field === 'description') {
						updatedCity.descriptions[cardIndex] = value;
					}
					
					return updatedCity;
				}
				return city;
			});
			
			setAttributes({ cards: newCards });
		};

		const updateGallery = (cityIndex, newGallery) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return {
						...city,
						gallery: newGallery.map(img => ({
							id: img.id,
							url: img.url,
							alt: img.alt
						}))
					};
				}
				return city;
			});
			
			setAttributes({ cards: newCards });
		};	

		// Добавим функцию для обновления подписи
		const updateLabel = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
			if (idx === cityIndex) {
				return {
					...city,
					label: value
				};
			}
			return city;
			});
			setAttributes({ cards: newCards });
		};

		const updateStepTabsText = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepTabsText: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepTabs2Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepTabs2Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi1Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi1Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi2Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi2Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi3Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi3Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi4Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi4Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi5Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi5Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi6Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi6Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi7Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi7Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi8Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi8Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi9Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi9Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi10Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi10Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi11Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi11Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi12Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi12Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		const updateStepLi13Text = (cityIndex, value) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return { ...city, stepLi13Text: value };
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};

		const updateCityImage = (cityIndex, media) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return {
						...city,
						cityImage: {
						url: media.url,
						alt: media.alt,
						id: media.id
						}
					};
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};
		 
		const removeCityImage = (cityIndex) => {
			const newCards = cards.map((city, idx) => {
				if (idx === cityIndex) {
					return {
						...city,
						cityImage: {
							url: '',
							alt: '',
							id: null
						}
					};
				}
				return city;
			});
			setAttributes({ cards: newCards });
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки блока" initialOpen={true}>
						{/* Дополнительные настройки можно добавить здесь */}
					</PanelBody>
				</InspectorControls>
				<div id="uslugi" className={className}>
					<div className="wrapper">
						<RichText
							tagName="h2"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							placeholder="Укажите заголовок..."
							// allowedFormats={['core/text-color']}
						/>
						<RichText
							tagName="p"
							value={description}
							onChange={(value) => setAttributes({ description: value })}
							placeholder="Укажите описание..."
							// allowedFormats={[]}
						/>
						<div className="select-block">
							<span className="select-title">Сочи</span>
							<ul className="select-ul">
								{cities.map((city) => (
									<li key={city.slug} data-slug={city.slug} className={`${city.slug === 'sochi' ? 'active' : ''}`}>
										{city.name}
									</li>
								))}
							</ul>
						</div>
						<div className="content-tab">
                    	{cities.map((city, cityIndex) => {
                        
                        return (
									<div key={city.slug} className={`item-tab ${city.slug} ${city.slug === 'sochi' ? 'active' : ''}`}>

										<div className={'container-tab'}>

											<LeftBlock 
												slug={city.slug}
												gallery={cards[cityIndex].gallery}
												onGalleryUpdate={(newGallery) => updateGallery(cityIndex, newGallery)}
												onGalleryDelete={() => updateGallery(cityIndex, [])}
												label={cards[cityIndex].label}
												onLabelChange={(value) => updateLabel(cityIndex, value)}
											/>

											<div className="right-block">
												{[0, 1, 2].map((cardIndex) => (
													<Card
														key={cardIndex}
														title={cards[cityIndex].titles[cardIndex]}
														description={cards[cityIndex].descriptions[cardIndex]}
														onTitleChange={(value) => updateCard(cityIndex, cardIndex, 'title', value)}
														onDescriptionChange={(value) => updateCard(cityIndex, cardIndex, 'description', value)}
													/>
												))}
											</div>

										</div>

										<div className={'container-step-tabs'}>
											
											<div className={'first-block'}>

												<RichText
													tagName="span"
													className="step-tabs-content"
													value={cards[cityIndex].stepTabsText}
													onChange={(value) => updateStepTabsText(cityIndex, value)}
													placeholder="Введите текст..."
												/>
												<div className={'icons-for-slider'}>
													<span className={'icon-1'}>{iconForSlide1}</span>
													<span className={'icon-2'}>{iconForSlide2}</span>
												</div>
												<div className={'skroll-container first-skroll-container'}>

													{city.slug === 'sochi' && (<>{iconLine1}{iconLine1_1}</>)}
													{city.slug === 'moscow' && (<>{iconLine2}{iconLine2_1}</>)}
													{city.slug === 'kaliningrad' && (<>{iconLine2}{iconLine2_1}</>)}
													{city.slug === 'pskov' && (<>{iconLine2}{iconLine2_1}</>)}
													{city.slug === 'kazan' && (<>{iconLine4}{iconLine4_1}</>)}
													{city.slug === 'novgorod' && (<>{iconLine3}{iconLine3_1}</>)}

													<ul className={'step-ul-content'}>
														<RichText
															tagName="li"
															className="step-li-content"
															value={cards[cityIndex].stepLi1Text}
															onChange={(value) => updateStepLi1Text(cityIndex, value)}
															placeholder="Введите текст..."
														/>
														<RichText
															tagName="li"
															className="step-li-content"
															value={cards[cityIndex].stepLi2Text}
															onChange={(value) => updateStepLi2Text(cityIndex, value)}
															placeholder="Введите текст..."
														/>
														<RichText
															tagName="li"
															className="step-li-content"
															value={cards[cityIndex].stepLi3Text}
															onChange={(value) => updateStepLi3Text(cityIndex, value)}
															placeholder="Введите текст..."
														/>
														<RichText
															tagName="li"
															className="step-li-content"
															value={cards[cityIndex].stepLi4Text}
															onChange={(value) => updateStepLi4Text(cityIndex, value)}
															placeholder="Введите текст..."
														/>
														<RichText
															tagName="li"
															className="step-li-content"
															value={cards[cityIndex].stepLi5Text}
															onChange={(value) => updateStepLi5Text(cityIndex, value)}
															placeholder="Введите текст..."
														/>
														{city.slug !== 'kazan' && <>
															<RichText
																tagName="li"
																className="step-li-content"
																value={cards[cityIndex].stepLi6Text}
																onChange={(value) => updateStepLi6Text(cityIndex, value)}
																placeholder="Введите текст..."
															/></>
														}
														{city.slug === 'sochi' && <>
															<RichText
																tagName="li"
																className="step-li-content"
																value={cards[cityIndex].stepLi7Text}
																onChange={(value) => updateStepLi7Text(cityIndex, value)}
																placeholder="Введите текст..."
															/>
															<RichText
																tagName="li"
																className="step-li-content"
																value={cards[cityIndex].stepLi8Text}
																onChange={(value) => updateStepLi8Text(cityIndex, value)}
																placeholder="Введите текст..."
															/>
															<RichText
																tagName="li"
																className="step-li-content"
																value={cards[cityIndex].stepLi9Text}
																onChange={(value) => updateStepLi9Text(cityIndex, value)}
																placeholder="Введите текст..."
															/></>
														}

														{city.slug === 'novgorod' && <>
															<RichText
																tagName="li"
																className="step-li-content"
																value={cards[cityIndex].stepLi7Text}
																onChange={(value) => updateStepLi7Text(cityIndex, value)}
																placeholder="Введите текст..."
															/>
															<RichText
																tagName="li"
																className="step-li-content"
																value={cards[cityIndex].stepLi8Text}
																onChange={(value) => updateStepLi8Text(cityIndex, value)}
																placeholder="Введите текст..."
															/></>
														}
														
													</ul>
												</div>
												
												{city.slug === 'moscow' && <>
													<RichText
														tagName="div"
														className="step-tabs-content"
														value={cards[cityIndex].stepTabs2Text}
														onChange={(value) => updateStepTabs2Text(cityIndex, value)}
														placeholder="Введите текст..."
													/>
													<div className={'icons-for-slider'}>
														<span className={'icon-1'}>{iconForSlide1}</span>
														<span className={'icon-2'}>{iconForSlide2}</span>
													</div>
													<div className={'scroll-container last-skroll-container'}>
														<ul className={'step-ul-content'}>
															<RichText
																tagName="li"
																className="step-li-content"
																value={cards[cityIndex].stepLi10Text}
																onChange={(value) => updateStepLi10Text(cityIndex, value)}
																placeholder="Введите текст..."
															/>
															<RichText
																tagName="li"
																className="step-li-content"
																value={cards[cityIndex].stepLi11Text}
																onChange={(value) => updateStepLi11Text(cityIndex, value)}
																placeholder="Введите текст..."
															/>
															<RichText
																tagName="li"
																className="step-li-content"
																value={cards[cityIndex].stepLi12Text}
																onChange={(value) => updateStepLi12Text(cityIndex, value)}
																placeholder="Введите текст..."
															/>
															<RichText
																tagName="li"
																className="step-li-content"
																value={cards[cityIndex].stepLi13Text}
																onChange={(value) => updateStepLi13Text(cityIndex, value)}
																placeholder="Введите текст..."
															/>
														</ul>
													</div>
													
												</>}
											</div>

											<div className={'second-block'}>
												<CityImageUpload
													cityImage={cards[cityIndex].cityImage}
													onUpdate={(media) => updateCityImage(cityIndex, media)}
													onRemove={() => removeCityImage(cityIndex)}
												/>
											</div>

										</div>

									</div>
                        );
                    	})}
                	</div>
					</div>
				</div>
			</>
		);
	}

	// Компонент для сохранения
	function Save(props) {
		const {
			attributes: { title, description, cards },
			className,
		} = props;

		return (
			<div id="uslugi" className={className}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<div className="select-block">
						<span className="select-title">Сочи</span>
						<ul className="select-ul">
							{cities.map((city) => (
								<li key={city.slug} data-slug={city.slug} className={`${city.slug === 'sochi' ? 'active' : ''}`}>
									{city.name}
								</li>
							))}
						</ul>
					</div>
					<div className="content-tab">
						{cities.map((city, cityIndex) => {
							const card = cards.find(c => c.slug === city.slug) || { gallery: [] };

							return (
								<div key={city.slug} className={`item-tab ${city.slug} ${city.slug === 'sochi' ? 'active' : ''}`}>
									<div className={'container-tab'}>

										<div className="left-block">

											<div className={'icons-for-slider'}>
												<span className={'icon-1'}>{iconForSlide1}</span>
												<span className={'icon-2'}>{iconForSlide2}</span>
											</div>

											<div className={'slider-box'}>
												{card.gallery.length > 0 && (
													<div className={`gallery-slider-${city.slug} slider-block`}>
														{card.gallery.map((img, index) => (
															<div className={'gallery-preview slide'}>
																<img 
																	key={index} 
																	src={img.url} 
																	alt={img.alt} 
																	className="gallery-image"
																/>
															</div>
														))}
													</div>
												)}
											</div>

											<div className={`gallery-slider-${city.slug}-pagination-btns slider-pagination`}>
												<span className={'left-btn'}>{leftArr}</span>
												<span className={'right-btn'}>{rightArr}</span>
											</div>

											<span className={'label-gallery'}>
												<RichText.Content tagName="span" value={card.label} />
											</span>
										</div>

										<div className="right-block">

											{[0, 1, 2].map((cardIndex) => {
												const descriptions = cards[cityIndex].descriptions[cardIndex];
												const titles = cards[cityIndex].titles[cardIndex];
												return (
													<div key={cardIndex} className="card-tab">
														<span>{iconOk} {titles}</span>
														<p>{descriptions}</p>
													</div>
												)
											})}

										</div>

									</div>
									<div className={'container-step-tabs'}>

										<div className={'first-block'}>
											<RichText.Content
												tagName="div"
												className="step-tabs-content"
												value={card.stepTabsText}
											/>
											<div className={'icons-for-slider'}>
												<span className={'icon-1'}>{iconForSlide1}</span>
												<span className={'icon-2'}>{iconForSlide2}</span>
											</div>
											<div className={'skroll-container first-skroll-container'}>
												
												{city.slug === 'sochi' && (<>{iconLine1}{iconLine1_1}</>)}
												{city.slug === 'moscow' && (<>{iconLine2}{iconLine2_1}</>)}
												{city.slug === 'kaliningrad' && (<>{iconLine2}{iconLine2_1}</>)}
												{city.slug === 'pskov' && (<>{iconLine2}{iconLine2_1}</>)}
												{city.slug === 'kazan' && (<>{iconLine4}{iconLine4_1}</>)}
												{city.slug === 'novgorod' && (<>{iconLine3}{iconLine3_1}</>)}

												<ul className={'step-ul-content'}>
													<RichText.Content
														tagName="li"
														className="step-li-content"
														value={card.stepLi1Text}
													/>
													<RichText.Content
														tagName="li"
														className="step-li-content"
														value={card.stepLi2Text}
													/>
													<RichText.Content
														tagName="li"
														className="step-li-content"
														value={card.stepLi3Text}
													/>
													<RichText.Content
														tagName="li"
														className="step-li-content"
														value={card.stepLi4Text}
													/>
													<RichText.Content
														tagName="li"
														className="step-li-content"
														value={card.stepLi5Text}
													/>
													{city.slug !== 'kazan' && <>
														<RichText.Content
															tagName="li"
															className="step-li-content"
															value={card.stepLi6Text}
														/></>
													}
													{city.slug === 'sochi' && <>
														<RichText.Content
															tagName="li"
															className="step-li-content"
															value={card.stepLi7Text}
														/>
														<RichText.Content
															tagName="li"
															className="step-li-content"
															value={card.stepLi8Text}
														/>
														<RichText.Content
															tagName="li"
															className="step-li-content"
															value={card.stepLi9Text}
														/>
													</>}
													{city.slug === 'novgorod' && <>
														<RichText.Content
															tagName="li"
															className="step-li-content"
															value={card.stepLi7Text}
														/>
														<RichText.Content
															tagName="li"
															className="step-li-content"
															value={card.stepLi8Text}
														/>
													</>}
												</ul>
											</div>
											{city.slug === 'moscow' && <>
												<RichText.Content
													tagName="div"
													className="step-tabs-content"
													value={card.stepTabs2Text}
												/>
												<div className={'icons-for-slider'}>
													<span className={'icon-1'}>{iconForSlide1}</span>
													<span className={'icon-2'}>{iconForSlide2}</span>
												</div>
												<div className={'skroll-container last-skroll-container'}>
													<ul className={'step-ul-content'}>
														<RichText.Content
															tagName="li"
															className="step-li-content"
															value={card.stepLi10Text}
														/>
														<RichText.Content
															tagName="li"
															className="step-li-content"
															value={card.stepLi11Text}
														/>
														<RichText.Content
															tagName="li"
															className="step-li-content"
															value={card.stepLi12Text}
														/>
														<RichText.Content
															tagName="li"
															className="step-li-content"
															value={card.stepLi13Text}
														/>
													</ul>
												</div>
											</>}
										</div>

										<div className={'second-block'}>
											{card.cityImage?.url && (
												<img
													src={card.cityImage.url}
													alt={card.cityImage.alt}
													className="city-image"
												/>
											)}
										</div>

									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}

})(window.wp);
