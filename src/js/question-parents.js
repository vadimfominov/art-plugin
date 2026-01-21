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
		SelectControl
	} = wp.components;

	const {
		useState,
		useEffect
	} = wp.element

	const catIcon = 'cat'

	registerBlockType('fv/question-parents', {
		title: 'Вопросы родителей',
		icon: catIcon,
		category: 'common',
		keywords: ['Вопросы родителей', 'question parents', 'фке', 'art'],
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
			title2: {
				type: 'string',
				default: ''
			},
			description2: {
				type: 'string',
				default: ''
			},
			title3: {
				type: 'string',
				default: ''
			},
			description3: {
				type: 'string',
				default: ''
			},
			leftTitle: {
				type: 'string',
				default: ''
			},
			rightDescription: {
				type: 'string',
				default: ''
			},
			image: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
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
				description1,
				title2,
				description2,
				title3,
				description3,
				leftTitle,
				rightDescription,
				image
			},
			className,
			isSelected,
			setAttributes
		} = props;
		
		return [
			<InspectorControls>
				<PanelBody
					title="Ссылки на соцсети"
					initialOpen={true}
				>
					{/* <PanelRow>
						<TextControl
							label="Имя пользователя VK"
							onChange={(newValue) => setAttributes({ vk: newValue })}
							value={vk}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow> */}
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
						<RichText
							tagName="p"
							onChange={ description => setAttributes({ description })}
							value={description}
							placeholder="Описание..."
							// allowedFormats={[]}
						/>
						<div className={'items'}>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText
									tagName="span"
									onChange={ title1 => setAttributes({ title1 })}
									value={title1}
									placeholder="Заголовок..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									onChange={ description1 => setAttributes({ description1 })}
									value={description1}
									placeholder="Описание..."
									// allowedFormats={[]}
								/>
							</div>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText
									tagName="span"
									onChange={ title2 => setAttributes({ title2 })}
									value={title2}
									placeholder="Заголовок..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									onChange={ description2 => setAttributes({ description2 })}
									value={description2}
									placeholder="Описание..."
									// allowedFormats={[]}
								/>
							</div>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText
									tagName="span"
									onChange={ title3 => setAttributes({ title3 })}
									value={title3}
									placeholder="Заголовок..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									onChange={ description3 => setAttributes({ description3 })}
									value={description3}
									placeholder="Описание..."
									// allowedFormats={[]}
								/>
							</div>
						</div>
					</div>

					<div className={'bottom-container'}>
						<div className={'title-block'}>
							<RichText
								tagName="span"
								onChange={ leftTitle => setAttributes({ leftTitle })}
								value={leftTitle}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'description-block'}>
							<RichText
								tagName="p"
								onChange={ rightDescription => setAttributes({ rightDescription })}
								value={rightDescription}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'image-block'}>
							{
								!image || !image.url ? 
									<MediaUpload
										onSelect={(media) => {
											setAttributes({
												image: {
													url: media.url,
													id: media.id,
													alt: media.alt || ''
												}
											});
										}}
										allowedTypes={['image']}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{image && image.url 
													? <img src={image.url} alt={image.alt} width="100%" height="auto" /> 
													: 'Выбрать картинку'}
											</Button>
										)}
									/>
									: 
									<>
										<img src={image.url} alt={image.alt} width="100%" height="auto" />
										{isSelected && (
											<Button 
												onClick={() => setAttributes({ 
													image: {
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
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				title,
				description,
				title1,
				description1,
				title2,
				description2,
				title3,
				description3,
				leftTitle,
				rightDescription,
				image
			},
			className
		} = props;

		const parts = rightDescription.split('<br>');

		return (
			<div className={className}>
				<div className={'wrapper'}>

					<RichText.Content tagName="h2" value={title} />

					<div className={'container'}>
						<RichText.Content tagName="p" value={description} />
						<div className={'items'}>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText.Content tagName="span" value={title1} />
								<RichText.Content tagName="p" value={description1} />
							</div>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText.Content tagName="span" value={title2} />
								<RichText.Content tagName="p" value={description2} />
							</div>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText.Content tagName="span" value={title3} />
								<RichText.Content tagName="p" value={description3} />
							</div>
						</div>
					</div>

					<div className={'bottom-container'}>
						<div className={'title-block'}>
							<RichText.Content tagName="span" value={leftTitle} />
						</div>
						<div className={'description-block'}>
							{ parts.map((part, index) => (
								<p key={index} dangerouslySetInnerHTML={{ __html: part }} />
							)) }
						</div>
						<div className={'image-block'}>
							{ image && image.url && 
								<img 
									src={image.url} 
									alt={image.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
						</div>
					</div>

				</div>
			</div>
		)
  	};

})(
	window.wp
);
