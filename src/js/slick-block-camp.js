(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText, MediaUpload, InspectorControls } = wp.blockEditor || wp.editor;
	const { PanelBody, PanelRow, Button, TextControl } = wp.components;

	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
		<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z"/>
		<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z"/>
		</g>
	</svg>);

	registerBlockType('fv/slick-block-camp', {
		title: 'Бегущая строка для лагеря',
		icon: catIcon,
		category: 'common',
		keywords: ['Бегущая строка', 'slick block', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			title1: {
				type: 'string',
				default: ''
			},
			description1: {
				type: 'string',
				default: ''
			},
			gallery: {
				type: 'array',
				default: []
			},
			image1: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
			image2: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
			spead: {
				type: 'string',
				default: ''
			},
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: { title, description, title1, description1, image1, image2, gallery, spead },
			setAttributes,
			className,
			isSelected
		} = props;

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

		return [
			<InspectorControls>
				<PanelBody
					title="Ссылки на соцсети"
					initialOpen={true}
				>
					<PanelRow>
						<p>Скорость анимации</p>
						<TextControl
							onChange={ spead => setAttributes({ spead })}
							value={spead}
							__nextHasNoMarginBottom={ true }
							__next40pxDefaultSize={ true }
						/>
					</PanelRow>
					<PanelRow>
						<p>Обновить галерею</p>
						<MediaUpload
							allowedTypes={['image']}
							multiple={true}
							gallery={true}
							value={gallery.map(img => img.id)}
							onSelect={onSelectGallery}
							render={({ open }) => (
								<Button onClick={open} isPrimary isLarge>
									{gallery.length > 0 ? 'Изменить галерею' : 'Добавить галерею'}
								</Button>
							)}
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
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>
					
				</div>

				<div className={'container-block'}>
					<ul className="slick-ul">
						{gallery.map((image, index) => (
							<li key={index} className="item-img">
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
									// allowedFormats={[]}
								/>
							</li>
						))}
					</ul>
				</div>

				<div className={'wrapper'}>
					<div className={'container-section'}>
						{
							!image1 || !image1.url ? 
								<MediaUpload
									onSelect={(media) => {
										setAttributes({
											image1: {
												url: media.url,
												id: media.id,
												alt: media.alt || ''
											}
										});
									}}
									allowedTypes={['image']}
									render={({ open }) => (
										<Button onClick={open} isPrimary isLarge>
											{image1 && image1.url 
												? <img src={image1.url} alt={image1.alt} width="100%" height="auto" /> 
												: 'Выбрать картинку'}
										</Button>
									)}
								/>
								: 
								<>
									<img src={image1.url} alt={image1.alt} width="100%" height="auto" />
									{isSelected && (
										<Button 
											onClick={() => setAttributes({ 
												image1: {
													url: '',
													id: null,
													alt: ''
												}
											})} 
											className={'remove-img'}
										>
											Удалить картинку
										</Button>
									)}
								</>
						}
						<div className={'text-block'}>
							<RichText
								tagName="span"
								onChange={ value => setAttributes({ title1: value })}
								value={title1}
								placeholder="Укажите заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ value => setAttributes({ description1: value })}
								value={description1}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
						</div>
						{
							!image2 || !image2.url ? 
								<MediaUpload
									onSelect={(media) => {
										setAttributes({
											image2: {
												url: media.url,
												id: media.id,
												alt: media.alt || ''
											}
										});
									}}
									allowedTypes={['image']}
									render={({ open }) => (
										<Button onClick={open} isPrimary isLarge>
											{image2 && image2.url 
												? <img src={image2.url} alt={image2.alt} width="100%" height="auto" /> 
												: 'Выбрать картинку'}
										</Button>
									)}
								/>
								: 
								<>
									<img src={image2.url} alt={image2.alt} width="100%" height="auto" />
									{isSelected && (
										<Button 
											onClick={() => setAttributes({ 
												image2: {
													url: '',
													id: null,
													alt: ''
												}
											})} 
											className={'remove-img'}
										>
											Удалить картинку
										</Button>
									)}
								</>
						}
					</div>
				</div>
				
			</div>
		]
	}

	function Save(props) {
		const {
			attributes: { title, description, title1, description1, image1, image2, gallery, spead },
			className
		} = props;

		const actualSpead = spead.length > 0 ? spead : 100;

		return (
			<div className={className}>
				<div className="wrapper">
					{title && <RichText.Content tagName="h2" value={title} />}
					{description && <RichText.Content tagName="p" value={description} />}
				</div>

				<style>
					{`
						.crawl-line .slick-ul {
							animation: sbsAnimation ${actualSpead}s infinite linear;
						}
					`}
				</style>

				<div className={'container-block'}>
					<ul className="slick-ul">
						{gallery.map((image, index) => (
							<li key={index} className="item-img">
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

				<div className={'wrapper'}>
					<div className={'container-section'}>
						{ image1 && image1.url && 
							<img 
								src={image1.url} 
								alt={image1.alt || ''} 
								width="100%" 
								height="auto" 
							/>
						}
						<div className={'text-block'}>
							{title1 && <RichText.Content tagName="span" value={title1} />}
							{description1 && <RichText.Content tagName="p" value={description1} />}
						</div>
						{ image2 && image2.url && 
							<img 
								src={image2.url} 
								alt={image2.alt || ''} 
								width="100%" 
								height="auto" 
							/>
						}
					</div>
				</div>
				
			</div>
		);
	}
})(window.wp);