(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { useSelect, getCurrentPostType, useDispatch } = wp.data;

	const { apiFetch } = wp;

	const {
		InspectorControls,
		MediaUpload,
	} = wp.blockEditor;

	const {
		TextControl,
		PanelBody,
		PanelRow,
		Button,
		SelectControl,
		DatePicker,
		ToggleControl
	} = wp.components;

	const {
		useState,
		useEffect
	} = wp.element

	const catIcon = 'cat';

	const iconPlay = (<svg width="23" height="38" viewBox="0 0 23 38" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M23 19L0.5 37.1865L0.500002 0.813466L23 19Z" fill="#535353"/>
			</svg>);

	const iconArray = (<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2.86713 7.056L0.563125 3.6L2.86713 0.144H4.62713L2.48313 3.6L4.62713 7.056H2.86713ZM2.09913 4.336V2.88H7.85913V4.336H2.09913Z" fill="#8F8F8F"/>
			</svg>);

	const leftArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8 1L1.56568 7.43431C1.25327 7.74673 1.25327 8.25327 1.56569 8.56568L8 15" stroke="#535353" stroke-linecap="round"/>
			</svg>);

	const rightArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 15L7.43432 8.56569C7.74674 8.25327 7.74673 7.74674 7.43432 7.43432L1 1" stroke="#535353" stroke-linecap="round"/>
			</svg>);

	registerBlockType('fv/item-merch', {
		title: 'Карточка для мерча',
		icon: catIcon,
		category: 'common',
		keywords: ['Карточка для мерча', 'Мерч', 'фке', 'rfhnf', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			titleCount: {
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
			selectedSize: {
				type: 'array',
				default: []
		  	},
			selectedColor: {
				type: 'array',
				default: []
		  	},
			ages: {
				type: 'array',
				default: Array.from({length: 12}, (_, i) => i + 7)
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
			place: {
				type: 'string',
            default: ''
			},
			videoText: {
				type: 'string',
            default: ''
			},
			gallery: {
				type: 'array',
				default: []
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
			currentPostID: {
				type: 'string',
            default: ''
			},
			textForImage: {
				type: 'string',
            default: ''
			}
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				title,
				description,
				price,
				titleCount,
				selectedSize,
				selectedColor,
				gallery,
				desktopBackground,
            tabletBackground,
            mobileBackground,
				inActive,
			},
			className,
			isSelected,
			setAttributes
		} = props;

		const sizeRanges = [
			{ label: 'S', value: 'S' },
			{ label: 'M', value: 'M' },
			{ label: 'L', value: 'L' },
			{ label: 'XL', value: 'XL' },
			{ label: 'XXL', value: 'XXL' },
			{ label: '60', value: '60' },
			{ label: '122', value: '122' },
			{ label: '140', value: '140' },
			{ label: '152', value: '152' },
		];

		const colored = `conic-gradient( red 60deg, orange 60deg 120deg, yellow 120deg 180deg, green 180deg 240deg, blue 240deg 300deg, purple 300deg )`;

		const colorRanges = [
			{ label: '#F5F5F7', value: '#F5F5F7', title: 'Белый' },
			{ label: '#000000', value: '#000000', title: 'Черный' },
			{ label: '#E82E2E', value: '#E82E2E', title: 'Красный' },
			{ label: 'colored', value: 'colored', title: 'Цветной' },
	  	];

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

		const handleSizeChange = (size) => {
			// Проверяем, включает ли selectedSize текущий размер
			const newSelectedSize = selectedSize.includes(size)
				? selectedSize.filter(item => item !== size) // Если да, удаляем его
				: [...selectedSize, size]; // Если нет, добавляем его
			// Сортируем newSelectedSize в соответствии с порядком в sizeRanges
			const sortedSelectedSize = newSelectedSize.sort((a, b) => {
				return sizeRanges.findIndex(item => item.value === a) - sizeRanges.findIndex(item => item.value === b);
			});
			// Обновляем атрибуты с отсортированным массивом
			setAttributes({ selectedSize: sortedSelectedSize });
	  	};

		const handleColorChange = (color) => {
			// Проверяем, является ли цвет из массива colorRanges
			const isColorInRanges = colorRanges.some(range => range.value === color);
			if (isColorInRanges) {
				const newSelectedColor = selectedColor.includes(color) 
					? selectedColor.filter(item => item !== color) // Если цвет уже выбран, удаляем его
					: [...selectedColor, color]; // Если цвет не выбран, добавляем его
				setAttributes({ selectedColor: newSelectedColor });
			}
		};

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
					>

					<PanelRow>
						<p>Выберите размер</p>
						<div className="size-checkboxes">
							{sizeRanges.map((size, index) => (
								<label key={index} className="size-checkbox">
									<input
										type="checkbox"
										checked={selectedSize.includes(size.value)}
										onChange={() => handleSizeChange(size.value)}
									/>
									<span>{size.value}</span>
								</label>
							))}
						</div>
					</PanelRow>

					<PanelRow>
						<p>Выберите цвет</p>
						<div className="color-checkboxes">
							{colorRanges.map((color, index) => {
								let currentColor = color.value === 'colored' ? colored : color.value;
								return (
									<label style={{'background': currentColor}} key={index} className="color-checkbox">
										<input
											type="checkbox"
											checked={selectedColor.includes(color.value)}
											onChange={() => handleColorChange(color.value)}
										/>
										<span></span>
									</label>
								)
							})}
						</div>
					</PanelRow>

					<PanelRow>
						<p>Открыть для продаж</p>
						<ToggleControl
							checked={inActive}
							onChange={() => setAttributes({ inActive: !inActive })}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>

				</PanelBody>

				<PanelBody 
					title="Загрузить изображения"
					initialOpen={false}
					>
						<GalleryUploader
							gallery={gallery}
							setAttributes={setAttributes}
							isSelected={isSelected}
						/>
				</PanelBody>

			</InspectorControls>,
			<div className={className}>
				<div className="wrapper">
					
					<button className={'go-back-btn'}>{iconArray} вернуться к выбору</button>

					<div className={'container container-merch'}>

						<div className={'left-img'}>

							<div className={'left-container'}>

								{gallery.length > 0 && (
									<div className="gallery-slider-merch slider-block" data-imgurl={gallery[0]['url']}>
										{gallery.map((img, index) => (
											<div className="gallery-preview slide">
												<img
													key={index}
													src={img.url}
													alt={img.alt || ''}
													className="gallery-image"
												/>
											</div>
										))}
									</div>
									
								)}

								<div className={'gallery-slider-merch-pagination-btns slider-pagination'}>
									<span className={'left-btn'}>{leftArr}</span>
									<span className={'right-btn'}>{rightArr}</span>
								</div>
								
								<div className={'camp-section'}>
									<RichText
										tagName="span"
										onChange={ value => setAttributes({ titleCount: value })}
										value={titleCount}
										placeholder={'Текст...'}
										// allowedFormats={['']}
									/>
								</div>

							</div>

						</div>

						<div className={'right-content'}>

							<div className={'title title-merch'}>
								<RichText
									tagName="span"
									onChange={ value => setAttributes({ title: value })}
									value={title}
									placeholder={'Заголовок...'}
									// allowedFormats={['']}
								/>
							</div>

							{selectedColor.length > 0 && <div className={'change-item'}>
								<span>Цвет</span>
								<div className="color-checkboxes">
									{selectedColor.map((color, index) => {
										let currentColor = color === 'colored' ? colored : color;
										return (
											<span key={index} style={{'background': currentColor}} data-color={color} className="color-checkbox"></span>
										)
									})}
								</div>
							</div>}
							{selectedSize.length > 0 && <div className={'change-item'}>
								<span>Размер</span>
								<div className="size-checkboxes">
									{selectedSize.map((size, index) => (
										<span key={index} data-size={size} className="size-checkbox">{size}</span>
									))}
								</div>
							</div>}

							<RichText
								tagName="p"
								onChange={ value => setAttributes({ description: value })}
								value={description}
								placeholder="Текст..."
								// allowedFormats={[]}
							/>

							<div className={'price-card'}>
								<RichText
									tagName="span"
									onChange={ value => setAttributes({ price: value })}
									value={price}
									placeholder="55 000₽"
									// allowedFormats={[]}
								/>
							</div>
							<button 
								className={`leave-application buy-order green`}
								data-price="23000"
								data-id="23000"
								>Оставить заявку</button>
						</div>

					</div>

					<div className={'random-posts-container'} >
							<h3>Смотрите также</h3>
						<div className={'random-posts'} id="random-posts-container" data-loaded="true" data-current-post-id="">
						</div>
					</div>
					
				</div>

			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				title,
				description,
				price,
				titleCount,
				selectedSize,
				selectedColor,
				gallery,
				desktopBackground,
            tabletBackground,
            mobileBackground,
				postTypeN,
			},
			className
		} = props;

		const colored = `conic-gradient( red 60deg, orange 60deg 120deg, yellow 120deg 180deg, green 180deg 240deg, blue 240deg 300deg, purple 300deg )`;

		const colorRanges = [
			{ label: '#F5F5F7', value: '#F5F5F7', title: 'Белый' },
			{ label: '#000000', value: '#000000', title: 'Черный' },
			{ label: '#E82E2E', value: '#E82E2E', title: 'Красный' },
			{ label: 'colored', value: 'colored', title: 'Цветной' },
		];

		const cleanPrice = price.replace(/[^0-9]/g, '');

		return (
			<div className={className}>
				<div className="wrapper">
					
					<button className={'go-back-btn'}>{iconArray} вернуться к выбору</button>

					<div className={'container container-merch'}>

						<div className={'left-img'}>
							<div className={'left-container'}>

								{gallery.length > 0 && (
									<div className="gallery-slider-merch slider-block" data-imgurl={gallery[0]['url']}>
										{gallery.map((img, index) => (
											<div className="gallery-preview slide">
												<img
													key={index}
													src={img.url}
													alt={img.alt || ''}
													className="gallery-image"
												/>
											</div>
										))}
									</div>
								)}

								<div className={'gallery-slider-merch-pagination-btns slider-pagination'}>
									<span className={'left-btn'}>{leftArr}</span>
									<span className={'right-btn'}>{rightArr}</span>
								</div>

								{titleCount && <span className={'camp-section'}>{titleCount}</span>}
							</div>

						</div>

						<div className={'right-content'}>
							
							{title && <div className={'title title-merch'}><RichText.Content tagName="span" value={title} /></div>}
							
							{selectedColor.length > 0 && <div className={'change-item'}>
								<span>Цвет</span>
								<div className="color-checkboxes">
									{selectedColor.map((color, index) => {
										let currentColor = color === 'colored' ? colored : color;
										console.log(color)
										return (
											<span key={index} style={{'background': currentColor}} data-color={colorRanges.find(c => c.value == color)?.title} className="color-checkbox"></span>
										)
									})}
								</div>
							</div>}
							{selectedSize.length > 0 && <div className={'change-item'}>
								<span>Размер</span>
								<div className="size-checkboxes">
									{selectedSize.map((size, index) => (
										<span key={index} data-size={size} className="size-checkbox">{size}</span>
									))}
								</div>
							</div>}

							{description && <RichText.Content tagName="p" value={description} />}
							{price && <div className={'price-card'}>
								<RichText.Content tagName="span" value={price} />
							</div>}
							
							<button 
								className={`leave-application buy-order green`}
								data-price={cleanPrice}
								data-id="1"
								>Оставить заявку</button>
							
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

			</div>
		)
  	};

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


	function GalleryUploader({ gallery, setAttributes, isSelected }) {
		const onSelectGallery = (newGallery) => {
			setAttributes({ gallery: newGallery.map(img => ({
				id: img.id,
				url: img.url,
				alt: img.alt
			})) });
		};

		const removeGallery = () => {
			setAttributes({ gallery: [] });
		};

		return (
			<div>
				<MediaUpload
					onSelect={onSelectGallery}
					gallery
					multiple
					value={gallery.map(img => img.id)}
					allowedTypes={['image']}
					render={({ open }) => (
						<div>
							<Button onClick={open} isPrimary>
								{gallery.length > 0 ? 'Изменить галерею' : 'Добавить галерею'}
							</Button>
							{gallery.length > 0 && (
								<Button onClick={removeGallery} isDestructive>
										Удалить галерею
								</Button>
							)}
							<div className="gallery-preview">
								{gallery.map((img, index) => (
									<img
										key={index}
										src={img.url}
										alt={img.alt || ''}
										className="gallery-thumb"
									/>
								))}
							</div>
						</div>
					)}
				/>
			</div>
		);
  	}

})(
	window.wp
);
