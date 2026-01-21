(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload } = wp.blockEditor;
	const { PanelBody, PanelRow, Button, ToggleControl } = wp.components;
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

	registerBlockType('fv/children-live', {
		title: 'Где живут дети',
		icon: catIcon,
		category: 'common',
		keywords: ['children live', 'Где живут дети', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			title_tab1: {
				type: 'string',
				default: ''
			},
			title_tab2: {
				type: 'string',
				default: ''
			},
			title_tab3: {
				type: 'string',
				default: ''
			},
			firstParkHotelData: {
				type: 'array',
				default: [{ title: '', description: '', label: '' }],
			},
			secondParkHotelData: {
				type: 'array',
				default: [{ title: '', description: '', label: '' }],
			},
			thirdParkHotelData: {
				type: 'array',
				default: [{ title: '', description: '', label: '' }],
			},
			firstColumnsP: {
				type: 'number',
				default: 4,
			},
			secondColumnsP: {
				type: 'number',
				default: 4,
			},
			thirdColumnsP: {
				type: 'number',
				default: 4,
			},
			inActiveTab: {
				type: 'boolean',
				default: null
			},
			inActiveTab2: {
				type: 'boolean',
				default: null
			},
			gallery: {
				type: 'array',
				default: []
			},
			gallery2: {
				type: 'array',
				default: []
			},
			gallery3: {
				type: 'array',
				default: []
			},
			inBlock: {
				type: 'boolean',
				default: false
			},
		},
		supports: { anchor: true },
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				title,
				title_tab1,
				title_tab2,
				title_tab3,
				firstParkHotelData,
				secondParkHotelData,
				thirdParkHotelData,
				firstColumnsP,
				secondColumnsP,
				thirdColumnsP,
				inActiveTab,
				inActiveTab2,
				gallery,
				gallery2,
				gallery3,
				inBlock,
			},
			className,
			setAttributes
		} = props;

		const adjustDataArray = (dataArray, columns, template) => {
			if (columns > dataArray.length) {
				// Если больше, добавляем новые объекты
				const newDataArray = [...dataArray];
				while (newDataArray.length < columns) {
					newDataArray.push(template);
				}
				return newDataArray;
			}
			if (columns < dataArray.length) {
				// Если меньше, удаляем лишние объекты
				return dataArray.slice(0, columns);
			}
			return dataArray;
		};

		useEffect(() => {
			const updatedFirstParkHotelData = adjustDataArray(firstParkHotelData, firstColumnsP, { title: '', description: '', label: '' });
			setAttributes({ firstParkHotelData: updatedFirstParkHotelData });
		}, [firstColumnsP]);

		useEffect(() => {
			const updatedSecondParkHotelData = adjustDataArray(secondParkHotelData, secondColumnsP, { title: '', description: '', label: '' });
			setAttributes({ secondParkHotelData: updatedSecondParkHotelData });
		}, [secondColumnsP]);

		useEffect(() => {
			const updatedThirdParkHotelData = adjustDataArray(thirdParkHotelData, thirdColumnsP, { title: '', description: '', label: '' });
			setAttributes({ thirdParkHotelData: updatedThirdParkHotelData });
		}, [thirdColumnsP]);

		const updatedFirstParkHotelData = (index, key, value) => {
			const newFirstParkHotelData = [...firstParkHotelData];
			newFirstParkHotelData[index][key] = value;
			setAttributes({ firstParkHotelData: newFirstParkHotelData });
		};

		const updatedSecondParkHotelData = (index, key, value) => {
			const newSecondParkHotelData = [...secondParkHotelData];
			newSecondParkHotelData[index][key] = value;
			setAttributes({ secondParkHotelData: newSecondParkHotelData });
		};
		const updatedThirdParkHotelData = (index, key, value) => {
			const newThirdParkHotelData = [...thirdParkHotelData];
			newThirdParkHotelData[index][key] = value;
			setAttributes({ thirdParkHotelData: newThirdParkHotelData });
		};

		const firstParkHotel = Array.from({ length: secondColumnsP }, (x, index2) => (
			<div key={index2} className={'card-tab'}>
				<RichText
					tagName="span"
					onChange={value => updatedFirstParkHotelData(index2, 'label', value)}
					value={firstParkHotelData[index2]?.label}
					placeholder="label..."
				// allowedFormats={[]}
				/>
				<RichText
					tagName="p"
					onChange={value => updatedFirstParkHotelData(index2, 'title', value)}
					value={firstParkHotelData[index2]?.title}
					placeholder="Заголовок..."
				// allowedFormats={[]}
				/>
				<RichText
					tagName="p"
					onChange={value => updatedFirstParkHotelData(index2, 'description', value)}
					value={firstParkHotelData[index2]?.description}
					placeholder="Описание..."
				// allowedFormats={[]}
				/>
			</div>
		));

		const secondParkHotel = Array.from({ length: secondColumnsP }, (x, index) => (
			<div key={index} className={'card-tab'}>
				<RichText
					tagName="span"
					onChange={value => updatedSecondParkHotelData(index, 'label', value)}
					value={secondParkHotelData[index]?.label}
					placeholder="label..."
				// allowedFormats={[]}
				/>
				<RichText
					tagName="p"
					onChange={value => updatedSecondParkHotelData(index, 'title', value)}
					value={secondParkHotelData[index]?.title}
					placeholder="Заголовок..."
				// allowedFormats={[]}
				/>
				<RichText
					tagName="p"
					onChange={value => updatedSecondParkHotelData(index, 'description', value)}
					value={secondParkHotelData[index]?.description}
					placeholder="Описание..."
				// allowedFormats={[]}
				/>
			</div>
		));

		const thirdParkHotel = Array.from({ length: secondColumnsP }, (x, index3) => (
			<div key={index3} className={'card-tab'}>
				<RichText
					tagName="span"
					onChange={value => updatedThirdParkHotelData(index3, 'label', value)}
					value={thirdParkHotelData[index3]?.label}
					placeholder="label..."
				/>
				<RichText
					tagName="p"
					onChange={value => updatedThirdParkHotelData(index3, 'title', value)}
					value={thirdParkHotelData[index3]?.title}
					placeholder="Заголовок..."
				/>
				<RichText
					tagName="p"
					onChange={value => updatedThirdParkHotelData(index3, 'description', value)}
					value={thirdParkHotelData[index3]?.description}
					placeholder="Описание..."
				/>
			</div>
		));

		// Обработчик выбора галереи
		const onSelectGallery = (images) => {
			setAttributes({ gallery: images });
		};

		// Обработчик изменения подписи
		const updateCaption = (index, caption) => {
			const newGallery = [...gallery];
			newGallery[index].caption = caption;
			setAttributes({ gallery: newGallery });
		};

		// Обработчик выбора галереи
		const onSelectGallery2 = (images) => {
			setAttributes({ gallery2: images });
		};

		// Обработчик изменения подписи
		const updateCaption2 = (index, caption) => {
			const newGallery = [...gallery2];
			newGallery[index].caption = caption;
			setAttributes({ gallery2: newGallery });
		};
		// Обработчик выбора галереи
		const onSelectGallery3 = (images) => {
			setAttributes({ gallery3: images });
		};

		// Обработчик изменения подписи
		const updateCaption3 = (index, caption) => {
			const newGallery = [...gallery3];
			newGallery[index].caption = caption;
			setAttributes({ gallery3: newGallery });
		};

		const handleTabClick = (event) => {
			const listItem = event.target.closest('li');
			if (!listItem) return;

			// Остановить всплытие события, если клик был на тексте
			event.stopPropagation();

			const currentSelectUl = listItem.parentElement;
			if (currentSelectUl) {
				currentSelectUl.querySelectorAll('li').forEach((li) => {
					li.classList.remove('active');
				});
				listItem.classList.add('active');
				currentSelectUl.classList.remove('active');
			}

			const selectBlock = listItem.closest('.select-block');
			if (selectBlock) {
				const selectTitle = selectBlock.querySelector('.select-title');
				if (selectTitle) {
					selectTitle.classList.remove('active');
					const name = listItem.textContent;
					selectTitle.textContent = name;
				}

				const slug = listItem.getAttribute('data-slug');

				const contentTab = selectBlock.nextElementSibling;
				if (contentTab && contentTab.classList.contains('content-tab')) {
					const itemTabs = contentTab.querySelectorAll('.item-tab');
					itemTabs.forEach((itemTab) => {
						if (itemTab.classList.contains(slug)) {
							contentTab.querySelectorAll('.item-tab').forEach((otherTab) => {
								otherTab.classList.remove('active');
							});
							itemTab.classList.add('active');
						}
					});
				}
			}
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
						<p>Включить вкладки 2</p>
						<ToggleControl
							checked={inActiveTab}
							onChange={() => setAttributes({ inActiveTab: !inActiveTab })}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
					</PanelRow>
					<PanelRow>
						<p>Включить вкладки 3</p>
						<ToggleControl
							checked={inActiveTab2}
							onChange={() => setAttributes({ inActiveTab2: !inActiveTab2 })}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
					</PanelRow>
					<PanelRow>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-left' }}>
							<p>Галерея 1</p>
							<MediaUpload
								allowedTypes={['image']}
								multiple={true}
								gallery={true}
								value={gallery.map(img => img.id)}
								onSelect={onSelectGallery}
								render={({ open }) => (
									<Button onClick={open} isPrimary isLarge>
										{gallery.length > 0 ? 'Изменить галерею' : 'Создать галерею'}
									</Button>
								)}
							/>
						</div>
					</PanelRow>
					{inActiveTab && <PanelRow>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-left' }}>
							<p>Галерея 2</p>
							<MediaUpload
								allowedTypes={['image']}
								multiple={true}
								gallery={true}
								value={gallery2.map(img => img.id)}
								onSelect={onSelectGallery2}
								render={({ open }) => (
									<Button onClick={open} isPrimary isLarge>
										{gallery2.length > 0 ? 'Изменить галерею' : 'Создать галерею'}
									</Button>
								)}
							/>
						</div>
					</PanelRow>}
					{inActiveTab2 && <PanelRow>
						<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-left' }}>
							<p>Галерея 3</p>
							<MediaUpload
								allowedTypes={['image']}
								multiple={true}
								gallery={true}
								value={gallery3.map(img => img.id)}
								onSelect={onSelectGallery3}
								render={({ open }) => (
									<Button onClick={open} isPrimary isLarge>
										{gallery3.length > 0 ? 'Изменить галерею' : 'Создать галерею'}
									</Button>
								)}
							/>
						</div>
					</PanelRow>}
					
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className={'wrapper'}>

					<RichText
						tagName="h2"
						onChange={title => setAttributes({ title })}
						value={title}
						placeholder="Укажите заголовок..."
					/>

					{inActiveTab && <div className={'select-block'}>
						<ul className={'select-ul'}>
							<li data-slug={'first'} className={'active'} onClick={handleTabClick}>
								<RichText
									tagName="span"
									onChange={(value) => setAttributes({ title_tab1: value })}
									value={title_tab1}
									placeholder="Укажите заголовок..."
								/>
							</li>
							<li data-slug={'second'} onClick={handleTabClick}>
								<RichText
									tagName="span"
									onChange={(value) => setAttributes({ title_tab2: value })}
									value={title_tab2}
									placeholder="Укажите заголовок..."
								/>
							</li>
							{inActiveTab2 && <li data-slug={'third'} onClick={handleTabClick}>
								<RichText
									tagName="span"
									onChange={(value) => setAttributes({ title_tab3: value })}
									value={title_tab3}
									placeholder="Укажите заголовок..."
								/>
							</li>}
						</ul>
					</div>}

					<div className={'content-tab'}>

						<div className={'item-tab first active'}>

							<div className="left-block">{firstParkHotel}</div>

							<div className={'slider-container'}>

								<div className={'icons-for-slider'}>
									<span className={'icon-1'}>{iconForSlide1}</span>
									<span className={'icon-2'}>{iconForSlide2}</span>
								</div>

								<div className={'slider-box'}>
									<ul className={'slider-tab1-1 slider-block'}>
										{gallery.length > 0 && gallery.map((image, index) => (
											<li key={index} className={'slide item-' + (index + 1)}>
												<img
													src={image.url}
													alt={image.alt || ''}
													width="100%"
													height="auto"
												/>
												<RichText
													tagName="span"
													value={image.caption || ''}
													onChange={(value) => updateCaption(index, value)}
													placeholder="Добавьте подпись..."
												/>
											</li>
										))}
									</ul>
								</div>

								<ul className={'slider-tab1-1-thumbnail'}>
									{gallery.length > 0 && gallery.map((image, index) => {
										return (
											<li key={index} className={'slide item-' + (index + 1)}>
												{image?.url && (
													<img
														src={image.url}
														alt={image.alt || ''}
														className={'image-for-slide'}
														width={"80px"}
														height={"80px"}
													/>
												)}
											</li>
										)
									})}

								</ul>

								<div className={'slider-tab1-1-pagination-btns slider-pagination'}>
									<span className={'left-btn'}>{leftArr}</span>
									<span className={'right-btn'}>{rightArr}</span>
								</div>
							</div>

						</div>

						{inActiveTab && <div className={'item-tab second'}>
							<div className="left-block">{secondParkHotel}</div>
							<div className={'slider-container'}>

								<div className={'icons-for-slider'}>
									<span className={'icon-1'}>{iconForSlide1}</span>
									<span className={'icon-2'}>{iconForSlide2}</span>
								</div>

								<div className={'slider-box'}>
									<ul className={'slider-tab2-1 slider-block'}>
										{gallery2.length > 0 && gallery2.map((image, index) => (
											<li key={index} className={'slide item-' + (index + 1)}>
												<img
													src={image.url}
													alt={image.alt || ''}
													width="100%"
													height="auto"
												/>
												<RichText
													tagName="span"
													value={image.caption || ''}
													onChange={(value) => updateCaption2(index, value)}
													placeholder="Добавьте подпись..."
												/>
											</li>
										))}
									</ul>
								</div>

								<ul className={'slider-tab2-1-thumbnail'}>
									{gallery2.length > 0 && gallery2.map((image, index) => {
										return (
											<li key={index} className={'slide item-' + (index + 1)}>
												{image?.url && (
													<img
														src={image.url}
														alt={image.alt || ''}
														className={'image-for-slide'}
														width={"80px"}
														height={"80px"}
													/>
												)}
											</li>
										)
									})}
								</ul>

								<div className={'slider-tab2-1-pagination-btns slider-pagination'}>
									<span className={'left-btn'}>{leftArr}</span>
									<span className={'right-btn'}>{rightArr}</span>
								</div>
							</div>
						</div>}

						{inActiveTab && inActiveTab2 && <div className={'item-tab third'}>
							<div className="left-block">{thirdParkHotel}</div>
							<div className={'slider-container'}>

								<div className={'icons-for-slider'}>
									<span className={'icon-1'}>{iconForSlide1}</span>
									<span className={'icon-2'}>{iconForSlide2}</span>
								</div>

								<div className={'slider-box'}>
									<ul className={'slider-tab3-1 slider-block'}>
										{gallery3.length > 0 && gallery3.map((image, index) => (
											<li key={index} className={'slide item-' + (index + 1)}>
												<img
													src={image.url}
													alt={image.alt || ''}
													width="100%"
													height="auto"
												/>
												<RichText
													tagName="span"
													value={image.caption || ''}
													onChange={(value) => updateCaption3(index, value)}
													placeholder="Добавьте подпись..."
												/>
											</li>
										))}
									</ul>
								</div>

								<ul className={'slider-tab3-1-thumbnail'}>
									{gallery3.length > 0 && gallery3.map((image, index) => {
										return (
											<li key={index} className={'slide item-' + (index + 1)}>
												{image?.url && (
													<img
														src={image.url}
														alt={image.alt || ''}
														className={'image-for-slide'}
														width={"80px"}
														height={"80px"}
													/>
												)}
											</li>
										)
									})}
								</ul>

								<div className={'slider-tab3-1-pagination-btns slider-pagination'}>
									<span className={'left-btn'}>{leftArr}</span>
									<span className={'right-btn'}>{rightArr}</span>
								</div>
							</div>
						</div>}

					</div>

				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				title,
				title_tab1,
				title_tab2,
				title_tab3,
				firstParkHotelData,
				secondParkHotelData,
				thirdParkHotelData,
				inActiveTab,
				inActiveTab2,
				gallery,
				gallery2,
				gallery3,
				inBlock,
			},
			className
		} = props;

		if (!inBlock) {
			return null;
		}

		return (
			<div className={className}>
				<div className={'wrapper'}>

					<RichText.Content tagName="h2" value={title} />

					{inActiveTab && <div className={'select-block'}>
						<ul className={'select-ul'}>
							<li data-slug={'first'} className={'active'}>
								<RichText.Content tagName="span" value={title_tab1} />
							</li>
							<li data-slug={'second'}>
								<RichText.Content tagName="span" value={title_tab2} />
							</li>
							{inActiveTab2 && <li data-slug={'third'}>
								<RichText.Content tagName="span" value={title_tab3} />
							</li>}
						</ul>
					</div>}

					<div className={'content-tab'}>

						<div className={'item-tab first active'}>
							<div className="left-block">
								{firstParkHotelData.map((block, index) => (
									<div key={index} className={'card-tab'}>
										<RichText.Content tagName="span" value={block.label} />
										<RichText.Content tagName="p" value={block.title} />
										<RichText.Content tagName="p" value={block.description} />
									</div>
								))}
							</div>
							<div className={'slider-container'}>
								<div className={'icons-for-slider'}>
									<span className={'icon-1'}>{iconForSlide1}</span>
									<span className={'icon-2'}>{iconForSlide2}</span>
								</div>
								<div className={'slider-box'}>
									<ul className={'slider-tab1-1 slider-block'}>
										{gallery.length > 0 && gallery.map((image, index) => (
											<li key={index} className={'slide item-' + (index + 1)}>
												<img
													src={image.url}
													alt={image.alt || ''}
													width="100%"
													height="auto"
												/>
												{image.caption && <RichText.Content tagName="span" value={image.caption} />}
											</li>
										))}
									</ul>
								</div>
								<ul className={'slider-tab1-1-thumbnail'}>
									{gallery.length > 0 && gallery.map((image, index) => {
										return (
											<li key={index} className={'slide item-' + (index + 1)}>
												{image?.url && (
													<img
														src={image.url}
														alt={image.alt || ''}
														className={'image-for-slide'}
														width={"80px"}
														height={"80px"}
													/>
												)}
											</li>
										)
									})}
								</ul>
								<div className={'slider-tab1-1-pagination-btns slider-pagination'}>
									<span className={'left-btn'}>{leftArr}</span>
									<span className={'right-btn'}>{rightArr}</span>
								</div>
							</div>
						</div>

						{inActiveTab && <div className={'item-tab second'}>
							<div className="left-block">
								{secondParkHotelData.map((block, index) => (
									<div key={index} className={'card-tab'}>
										<RichText.Content tagName="span" value={block.label} />
										<RichText.Content tagName="p" value={block.title} />
										<RichText.Content tagName="p" value={block.description} />
									</div>
								))}
							</div>
							<div className={'slider-container'}>
								<div className={'icons-for-slider'}>
									<span className={'icon-1'}>{iconForSlide1}</span>
									<span className={'icon-2'}>{iconForSlide2}</span>
								</div>
								<div className={'slider-box'}>
									<ul className={'slider-tab2-1 slider-block'}>
										{gallery2.length > 0 && gallery2.map((image, index) => (
											<li key={index} className={'slide item-' + (index + 1)}>
												<img
													src={image.url}
													alt={image.alt || ''}
													width="100%"
													height="auto"
												/>
												{image.caption && <RichText.Content tagName="span" value={image.caption} />}
											</li>
										))}
									</ul>
								</div>

								<ul className={'slider-tab2-1-thumbnail'}>
									{gallery2.length > 0 && gallery2.map((image, index) => {
										return (
											<li key={index} className={'slide item-' + (index + 1)}>
												{image?.url && (
													<img
														src={image.url}
														alt={image.alt || ''}
														className={'image-for-slide'}
														width={"80px"}
														height={"80px"}
													/>
												)}
											</li>
										)
									})}
								</ul>

								<div className={'slider-tab2-1-pagination-btns slider-pagination'}>
									<span className={'left-btn'}>{leftArr}</span>
									<span className={'right-btn'}>{rightArr}</span>
								</div>
							</div>
						</div>}

						{inActiveTab && inActiveTab2 && <div className={'item-tab third'}>
							<div className="left-block">
								{thirdParkHotelData.map((block, index) => (
									<div key={index} className={'card-tab'}>
										<RichText.Content tagName="span" value={block.label} />
										<RichText.Content tagName="p" value={block.title} />
										<RichText.Content tagName="p" value={block.description} />
									</div>
								))}
							</div>
							<div className={'slider-container'}>
								<div className={'icons-for-slider'}>
									<span className={'icon-1'}>{iconForSlide1}</span>
									<span className={'icon-2'}>{iconForSlide2}</span>
								</div>
								<div className={'slider-box'}>
									<ul className={'slider-tab3-1 slider-block'}>
										{gallery3.length > 0 && gallery3.map((image, index) => (
											<li key={index} className={'slide item-' + (index + 1)}>
												<img
													src={image.url}
													alt={image.alt || ''}
													width="100%"
													height="auto"
												/>
												{image.caption && <RichText.Content tagName="span" value={image.caption} />}
											</li>
										))}
									</ul>
								</div>

								<ul className={'slider-tab3-1-thumbnail'}>
									{gallery3.length > 0 && gallery3.map((image, index) => {
										return (
											<li key={index} className={'slide item-' + (index + 1)}>
												{image?.url && (
													<img
														src={image.url}
														alt={image.alt || ''}
														className={'image-for-slide'}
														width={"80px"}
														height={"80px"}
													/>
												)}
											</li>
										)
									})}
								</ul>

								<div className={'slider-tab3-1-pagination-btns slider-pagination'}>
									<span className={'left-btn'}>{leftArr}</span>
									<span className={'right-btn'}>{rightArr}</span>
								</div>
							</div>
						</div>}

					</div>

				</div>
			</div>
		)
	};

})(
	window.wp
);
