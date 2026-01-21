(function (wp) {

	// cd art.loc/wp-content/plugins/art-plugin

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

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
		ToggleControl
	} = wp.components;

	const {
		useState,
		useEffect
	} = wp.element

	const catIcon = 'cat'

	registerBlockType('fv/that-price', {
		title: 'Что входит в стоимость',
		icon: catIcon,
		category: 'common',
		keywords: ['that-price', 'фке', 'art'],
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
			title2: {
				type: 'string',
				default: ''
			},
			title3: {
				type: 'string',
				default: ''
			},
			title4: {
				type: 'string',
				default: ''
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
			image3: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
		  	},
			image4: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
		  	},
			imageAll: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
		  	},
			inActiveBlock: {
				type: 'boolean',
				default: null
			},
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				title,
				description,
				title1,
				title2,
				title3,
				title4,
				image1,
				image2,
				image3,
				image4,
				imageAll,
				inActiveBlock
			},
			className,
			isSelected,
			setAttributes
		} = props;
		
		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					<PanelRow>
						<p>Включить 4й блок</p>
						<ToggleControl
							checked={inActiveBlock}
							onChange={() => setAttributes({ inActiveBlock: !inActiveBlock })}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<div className={'container'}>
						<div className={'item'}>
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
							<RichText
								tagName="span"
								onChange={ title1 => setAttributes({ title1 })}
								value={title1}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'item'}>
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
							<RichText
								tagName="span"
								onChange={ title2 => setAttributes({ title2 })}
								value={title2}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'item'}>
							{
								!image3 || !image3.url ? 
									<MediaUpload
										onSelect={(media) => {
											setAttributes({
												image3: {
													url: media.url,
													id: media.id,
													alt: media.alt || ''
												}
											});
										}}
										allowedTypes={['image']}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{image3 && image3.url 
													? <img src={image3.url} alt={image3.alt} width="100%" height="auto" /> 
													: 'Выбрать картинку'}
											</Button>
										)}
									/>
									: 
									<>
										<img src={image3.url} alt={image3.alt} width="100%" height="auto" />
										{isSelected && (
											<Button 
												onClick={() => setAttributes({ 
													image3: {
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
							<RichText
								tagName="span"
								onChange={ title3 => setAttributes({ title3 })}
								value={title3}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={`item ${!inActiveBlock ? 'item-image' : ''}`}>
							{
								!imageAll || !imageAll.url ? 
									<MediaUpload
										onSelect={(media) => {
											setAttributes({
												imageAll: {
													url: media.url,
													id: media.id,
													alt: media.alt || ''
												}
											});
										}}
										allowedTypes={['image']}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{imageAll && imageAll.url 
													? <img src={imageAll.url} alt={imageAll.alt} width="100%" height="auto" /> 
													: 'Выбрать картинку'}
											</Button>
										)}
									/>
									: 
									<>
										<img src={imageAll.url} alt={imageAll.alt} width="100%" height="auto" />
										{isSelected && (
											<Button 
												onClick={() => setAttributes({ 
													imageAll: {
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
							{inActiveBlock && <RichText
								tagName="span"
								onChange={ title4 => setAttributes({ title4 })}
								value={title4}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>}
						</div>
					</div>
					<RichText
						tagName="p"
						onChange={ description => setAttributes({ description })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>
				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				title,
				description,
				title1,
				title2,
				title3,
				title4,
				image1,
				image2,
				image3,
				image4,
				imageAll,
				inActiveBlock
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<div className={'container'}>
						<div className={'item'}>
							{ image1 && image1.url && 
								<img 
									src={image1.url} 
									alt={image1.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
							<RichText.Content tagName="span" value={title1} />
						</div>
						<div className={'item'}>
							{ image2 && image2.url && 
								<img 
									src={image2.url} 
									alt={image2.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
							<RichText.Content tagName="span" value={title2} />
						</div>
						<div className={'item'}>
							{ image3 && image3.url && 
								<img 
									src={image3.url} 
									alt={image3.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
							<RichText.Content tagName="span" value={title3} />
						</div>
						<div className={`item ${!inActiveBlock ? 'item-image' : ''}`}>
							{ imageAll && imageAll.url && 
								<img 
									src={imageAll.url} 
									alt={imageAll.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
							{title4 && <RichText.Content tagName="span" value={title4} />}
						</div>
					</div>
					{description && <RichText.Content tagName="p" value={description} />}
				</div>
			</div>
		)
  	};

})(
	window.wp
);
