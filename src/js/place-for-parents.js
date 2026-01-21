(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const { InspectorControls, MediaUpload } = wp.blockEditor;

	const {
		PanelBody,
		PanelRow,
		Button,
		RangeControl
	} = wp.components;

	const { useEffect } = wp.element

	const catIcon = 'cat'

	registerBlockType('fv/place-for-parents', {
		title: 'Пространство для родителей',
		icon: catIcon,
		category: 'common',
		keywords: ['Пространство для родителей', 'place for parents', 'yfi jgsn', 'фке', 'art'],
		attributes: {
			title: {
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
			description1: {
				type: 'string',
				default: ''
			},
			description2: {
				type: 'string',
				default: ''
			},
			description3: {
				type: 'string',
				default: ''
			},
			description4: {
				type: 'string',
				default: ''
			},
			image4: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			}
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				title,
				title1,
				title2,
				title3,
				title4,
				description1,
				description2,
				description3,
				description4,
				image4
			},
			className,
			isSelected,
			setAttributes
		} = props;
		
		return [
			<></>,
			<div className={className}>
				<div className="wrapper">
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>

					<div className={'item-block first-item-block'}>
						{
							!image4 || !image4.url ? 
								<MediaUpload
									onSelect={(media) => {
										setAttributes({
											image4: {
												url: media.url,
												id: media.id,
												alt: media.alt || ''
											}
										});
									}}
									allowedTypes={['image']}
									render={({ open }) => (
										<Button onClick={open} isPrimary isLarge>
											{image4 && image4.url 
												? <img src={image4.url} alt={image4.alt} width="100%" height="auto" /> 
												: 'Выбрать картинку'}
										</Button>
									)}
								/>
								: 
								<>
									<img src={image4.url} alt={image4.alt} width="100%" height="auto" />
									{isSelected && (
										<Button 
											onClick={() => setAttributes({ 
												image4: {
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

					<div className={'right-block'}>
						<div className={'item-block'}>
							<RichText
								tagName="span"
								onChange={ value => setAttributes({ title2: value })}
								value={title2}
								placeholder="Укажите заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ value => setAttributes({ description2: value })}
								value={description2}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
						</div>

						<div className={'item-block'}>
							<RichText
								tagName="span"
								onChange={ value => setAttributes({ title3: value })}
								value={title3}
								placeholder="Укажите заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ value => setAttributes({ description3: value })}
								value={description3}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
						</div>

						<div className={'item-block  last-item-block'}>
							<RichText
								tagName="span"
								onChange={ value => setAttributes({ title4: value })}
								value={title4}
								placeholder="Укажите заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ value => setAttributes({ description4: value })}
								value={description4}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
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
				title1,
				title2,
				title3,
				title4,
				description1,
				description2,
				description3,
				description4,
				image4
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<div className={'item-block first-item-block'}>
						{ image4 && image4.url && 
							<img 
								src={image4.url} 
								alt={image4.alt || ''} 
								width="100%" 
								height="auto" 
							/>
						}
						
						<RichText.Content tagName="span" value={title1} />
						<RichText.Content tagName="p" value={description1} />
					</div>
					<div className={'right-block'}>
						<div className={'item-block'}>
							<RichText.Content tagName="span" value={title2} />
							<RichText.Content tagName="p" value={description2} />
						</div>

						<div className={'item-block'}>
							<RichText.Content tagName="span" value={title3} />
							<RichText.Content tagName="p" value={description3} />
						</div>

						<div className={'item-block  last-item-block'}>
							<RichText.Content tagName="span" value={title4} />
							<RichText.Content tagName="p" value={description4} />
						</div>
					</div>
				</div>
			</div>
		)
  	};

})(window.wp);