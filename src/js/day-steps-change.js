(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload } = wp.blockEditor;
	const { PanelBody, Button } = wp.components;
	const catIcon = 'cat';

	registerBlockType('fv/day-steps-change', {
		title: 'Шаги по дням, изменения',
		icon: catIcon,
		category: 'common',
		keywords: ['day steps', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			titleBlock: {
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
			image1: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
		  	},
			title2: {
				type: 'string',
				default: ''
			},
			description2: {
				type: 'string',
				default: ''
			},
			image2: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
		  	},
			title3: {
				type: 'string',
				default: ''
			},
			description3: {
				type: 'string',
				default: ''
			},
			image3: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
		  	},
			title4: {
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
		  	},
			title5: {
				type: 'string',
				default: ''
			},
			description5: {
				type: 'string',
				default: ''
			},
			image5: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
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
				titleBlock,
				description,
				title1,
				description1,
				image1,
				title2,
				description2,
				image2,
				title3,
				description3,
				image3,
				title4,
				description4,
				image4,
				title5,
				description5,
				image5
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
					
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className={'wrapper'}>
					
					<RichText
						tagName="h2"
						onChange={ title => setAttributes({ title })}
						value={ title }
						placeholder="Заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<RichText
						tagName="p"
						onChange={ description => setAttributes({ description })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>
					<RichText
						tagName="span"
						onChange={ titleBlock => setAttributes({ titleBlock })}
						value={titleBlock}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>
					<div className={'container'}>
						
						<div className={'item-day'}>
							<div className={'first-block'}>
								<span className={'count'}>01</span>
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
									placeholder="text..."
									// allowedFormats={['core/bold']}
								/>
							</div>
							<div className={'second-block'}>
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
							</div>
						</div>

						<div className={'item-day'}>
							<div className={'first-block'}>
								<span className={'count'}>02</span>
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
									placeholder="text..."
									// allowedFormats={['core/text-bold']}
								/>
							</div>
							<div className={'second-block'}>
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

						<div className={'item-day'}>
							<div className={'first-block'}>
								<span className={'count'}>01</span>
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
									placeholder="text..."
									// allowedFormats={['core/text-bold']}
								/>
							</div>
							<div className={'second-block'}>
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
							</div>
						</div>

						<div className={'item-day'}>
							<div className={'first-block'}>
								<span className={'count'}>04</span>
								<RichText
									tagName="span"
									onChange={ title4 => setAttributes({ title4 })}
									value={title4}
									placeholder="Заголовок..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									onChange={ description4 => setAttributes({ description4 })}
									value={description4}
									placeholder="text..."
									// allowedFormats={['core/text-bold']}
								/>
							</div>
							<div className={'second-block'}>
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
							</div>
						</div>

						<div className={'item-day'}>
							<div className={'first-block'}>
								<span className={'count'}>05</span>
								<RichText
									tagName="span"
									onChange={ title5 => setAttributes({ title5 })}
									value={title5}
									placeholder="Заголовок..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									onChange={ description5 => setAttributes({ description5 })}
									value={description5}
									placeholder="text..."
									// allowedFormats={['core/text-bold']}
								/>
							</div>
							<div className={'second-block'}>
								{
									!image5 || !image5.url ? 
										<MediaUpload
											onSelect={(media) => {
												setAttributes({
													image5: {
														url: media.url,
														id: media.id,
														alt: media.alt || ''
													}
												});
											}}
											allowedTypes={['image']}
											render={({ open }) => (
												<Button onClick={open} isPrimary isLarge>
													{image5 && image5.url 
														? <img src={image5.url} alt={image5.alt} width="100%" height="auto" /> 
														: 'Выбрать картинку'}
												</Button>
											)}
										/>
										: 
										<>
											<img src={image5.url} alt={image5.alt} width="100%" height="auto" />
											{isSelected && (
												<Button 
													onClick={() => setAttributes({ 
														image5: {
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
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				title,
				titleBlock,
				description,
				title1,
				description1,
				image1,
				title2,
				description2,
				image2,
				title3,
				description3,
				image3,
				title4,
				description4,
				image4,
				title5,
				description5,
				image5
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'wrapper'}>

					{title && <RichText.Content tagName="h2" value={title} />}
					{description && <RichText.Content tagName="p" value={description} />}

					{titleBlock && <RichText.Content tagName="span" value={titleBlock} />}

					<div className={'container'}>

						<div className={'item-day'}>
							<div className={'first-block'}>
								<span className={'count'}>01</span>
								<RichText.Content tagName="span" value={title1} />
								<RichText.Content tagName="p" value={description1} />
							</div>
							<div className={'second-block'}>
								{ image1 && image1.url && 
									<img 
										src={image1.url} 
										alt={image1.alt || ''} 
										width="100%" 
										height="auto" 
									/>
								}
							</div>
							
						</div>

						<div className={'item-day'}>
							<div className={'first-block'}>
								<span className={'count'}>02</span>
								<RichText.Content tagName="span" value={title2} />
								<RichText.Content tagName="p" value={description2} />
							</div>
							<div className={'second-block'}>
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

						<div className={'item-day'}>
							<div className={'first-block'}>
								<span className={'count'}>03</span>
								<RichText.Content tagName="span" value={title3} />
								<RichText.Content tagName="p" value={description3} />
							</div>
							<div className={'second-block'}>
								{ image3 && image3.url && 
									<img 
										src={image3.url} 
										alt={image3.alt || ''} 
										width="100%" 
										height="auto" 
									/>
								}
							</div>
						</div>

						<div className={'item-day'}>
							<div className={'first-block'}>
								<span className={'count'}>04</span>
								<RichText.Content tagName="span" value={title4} />
								<RichText.Content tagName="p" value={description4} />
							</div>
							<div className={'second-block'}>
								{ image4 && image4.url && 
									<img 
										src={image4.url} 
										alt={image4.alt || ''} 
										width="100%" 
										height="auto" 
									/>
								}
							</div>
						</div>

						<div className={'item-day'}>
							<div className={'first-block'}>
								<span className={'count'}>05</span>
								<RichText.Content tagName="span" value={title5} />
								<RichText.Content tagName="p" value={description5} />
							</div>
							<div className={'second-block'}>
								{ image5 && image5.url && 
									<img 
										src={image5.url} 
										alt={image5.alt || ''} 
										width="100%" 
										height="auto" 
									/>
								}
							</div>
						</div>

					</div>
						
				</div>
			</div>
		)
  	};

})(
	window.wp
);
