(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload } = wp.blockEditor;
	const { PanelBody, Button, ColorPalette } = wp.components;
	const catIcon = 'cat';
	const iconRightArr = (
				<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#E94E4E"/>
				</svg>
				);

	registerBlockType('fv/support-parents-block', {
		title: 'Поддержка родителей',
		icon: catIcon,
		category: 'common',
		keywords: ['Поддержка родителей', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: 'Знаем, что путь воспитания и развития ребёнка бывает трудным, поэтому поддерживаем родителей на каждом шагу'
			},
			titleBlock1: {
				type: 'string',
				default: 'Вместе находим лучшие решения по вопросам воспитания и развития'
			},
			titleBlock2: {
				type: 'string',
				default: 'Услуги АРТ Личности продуманы так, чтобы вам было удобно — мы ценим и экономим ваше время'
			},
			titleBlock3: {
				type: 'string',
				default: 'Открытый Telegram-канал «Раз-Два-Три» с полезной информацией о воспитании и профориентации'
			},
			descriptionBlock: {
				type: 'string',
				default: 'Подписывайтесь, на телеграм-канал чтобы получить поддержку и ответы на вопросы, которые важны для вас и ребёнка!'
			},
			link: {
				type: 'string',
				default: ''
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
			customBlockColor: {
				type: 'string',
				default: '#f5f5f7',
			},
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				title,
				titleBlock1,
				titleBlock2,
				titleBlock3,
				descriptionBlock,
				link,
				desktopBackground,
				tabletBackground,
				mobileBackground,
				customBlockColor
			},
			className,
			isSelected,
			setAttributes
		} = props;

		return [
			<InspectorControls>
				<PanelBody
					title="Фон для блока"
					initialOpen={true}
				>
					<p>Цвет фона блока</p>
					<ColorPalette
						colors={[
							{ name: 'Бежевый', color: '#fffaed' },
							{ name: 'Коралловый', color: '#FF7F50' },
							{ name: 'Серый', color: '#f5f5f7' },
							{ name: 'Лавандовый', color: '#E6E6FA' },
						]}
						value={customBlockColor}
						clearable={true}
						disableCustomColors={false}
						onChange={ color => setAttributes({ customBlockColor: color }) }
					/>
				</PanelBody>
				<PanelBody 
					title="Загрузи картинку"
					initialOpen={true}
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
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<div className={'list-block'}>
						<div className={'left-block'}>
							<div className={'item-block'} style={{ backgroundColor: customBlockColor }}>
								<span className={'icon-curcle'}></span>
								<RichText
									tagName="h3"
									onChange={ value => setAttributes({ titleBlock1: value }) }
									value={titleBlock1}
									placeholder="Укажите заголовок..."
									// allowedFormats={[]}
								/>
							</div>
							<div className={'item-block'} style={{ backgroundColor: customBlockColor }}>
								<span className={'icon-curcle'}></span>
								<RichText
									tagName="h3"
									onChange={ value => setAttributes({ titleBlock2: value }) }
									value={titleBlock2}
									placeholder="Укажите заголовок..."
									// allowedFormats={[]}
								/>
							</div>
						</div>
						<div className={'item-block last-child'} style={{ backgroundColor: customBlockColor }}>
							
							<picture>
								{/* Для мобильных устройств (до 769px) — пустой srcset */}
								<source 
									srcset={mobileBackground?.url}  
									media="(max-width: 766px)" 
								/>
								{/* Для планшетов (от 767px до 1024px) */}
								<source 
									srcset={tabletBackground?.url} 
									media="(min-width: 767px) and (max-width: 1024px)" 
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
										className="img-for-block" 
								/>
							</picture>

							<div className={'right-block'}>
								<span className={'icon-curcle'}></span>
								<RichText
									tagName="h3"
									onChange={ value => setAttributes({ titleBlock3: value }) }
									value={titleBlock3}
									placeholder="Укажите заголовок..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									onChange={ value => setAttributes({ descriptionBlock: value }) }
									value={descriptionBlock}
									placeholder="Укажите заголовок..."
									// allowedFormats={[]}
								/>
								<div className={'btn-link'}>
									<RichText
										tagName="span"
										onChange={ value => setAttributes({ link: value }) }
										value={link}
										placeholder="Подписаться..."
										// allowedFormats={['core/link']}
									/>
									<span className={'icon'}>{iconRightArr}</span>
								</div>
							</div>
							
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
				titleBlock1,
				titleBlock2,
				titleBlock3,
				descriptionBlock,
				link,
				desktopBackground,
				tabletBackground,
				mobileBackground,
				customBlockColor
			},
			className
		} = props;

		const parts = descriptionBlock.split('<br>');

		return (
			<div className={className}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<div className={'list-block'}>
						<div className={'left-block'}>
							<div className={'item-block'} style={{ backgroundColor: customBlockColor }}>
								<span className={'icon-curcle'}></span>
								<RichText.Content tagName="h3" value={titleBlock1} />
							</div>
							<div className={'item-block'} style={{ backgroundColor: customBlockColor }}>
								<span className={'icon-curcle'}></span>
								<RichText.Content tagName="h3" value={titleBlock2} />
							</div>
						</div>
						
						<div className={'item-block last-child'} style={{ backgroundColor: customBlockColor }}>
							<picture>
								{/* Для мобильных устройств (до 769px) — пустой srcset */}
								<source 
									srcset={mobileBackground?.url} 
									media="(max-width: 766px)" 
								/>
								{/* Для планшетов (от 770px до 1024px) */}
								<source 
										srcset={tabletBackground?.url} 
										media="(min-width: 767px) and (max-width: 1024px)" 
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
										className="img-for-block" 
								/>
							</picture>
							
							<div className={'right-block'}>
								<span className={'icon-curcle'}></span>
								<RichText.Content tagName="h3" value={titleBlock3} />
								{ parts.map((part, index) => (
									<p key={index} dangerouslySetInnerHTML={{ __html: part }} />
								)) }
								{link && <div className={'btn-link'}>
									<RichText.Content tagName="span" value={link} />
									<span className={'icon'}>{iconRightArr}</span>
								</div>}
							</div>
						</div>
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

	function ImgUploader(props) {

		const { img, setAttributes, isSelected } = props

		const onSelectImage = ( img ) => {
			setAttributes({ img: { id: img.id, url: img.url, alt: img.alt } });
		};
  
		const removeImage = () => {
			setAttributes({ img: null });
		};
  
		const renderImageUpload = ( imgURL ) =>
			!imgURL ? (
				<MediaUpload
					onSelect={ img => onSelectImage( img ) }
					allowedTypes={['image']}
					render={({ open }) => (
						<Button
							className="components-button is-secondary"
							onClick={open}
						>
							{`Добавить картинку`}
						</Button>
					)}
				/>
			) : (
				<>
					<img src={imgURL} alt={`Картинка для блока`} style={{ width: '100%', height: 'auto' }} />
					{isSelected && (
						<Button className="remove-image" onClick={ () => removeImage() }>
							{`Удалить картинку`}
						</Button>
					)}
				</>
			);
  
		return (
			<div>
				<p>Изображение для блока</p>
				{ renderImageUpload(img?.url) }
			</div>
		);
  	};

})(
	window.wp
);
