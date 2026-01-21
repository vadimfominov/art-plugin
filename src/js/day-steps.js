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

	const { useState, useEffect } = wp.element

	const catIcon = 'cat';
	const iconLine1 = (<svg width="407" height="811" viewBox="0 0 407 811" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.999969 -1.77031e-05L0.999956 312C0.999955 339.614 23.3857 362 51 362L356 362C383.614 362 406 384.386 406 412L406 683C406 710.614 383.614 733 356 733L46.3317 733C21.4789 733 1.33166 753.147 1.33166 778V778L1.33166 810.5" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);
	const iconLine2 = (<svg className={'svg-icon'} width="612" height="919" viewBox="0 0 612 919" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.5 -2.66858e-05L0.49999 232C0.499987 303.797 58.703 362 130.5 362L481 362C552.797 362 611 420.203 611 492L611 744C611 815.797 552.797 874 481 874L46 874C21.1472 874 1.00002 894.147 1.00002 919V919" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);

	registerBlockType('fv/day-steps', {
		title: 'Шаги по дням',
		icon: catIcon,
		category: 'common',
		keywords: ['day steps', 'фке', 'art'],
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
		},
		supports: { anchor: true },
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
				image1,
				title2,
				description2,
				image2,
				title3,
				description3,
				image3
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
					<div className={'wrapper-conteiner'}>
						<div className={'wrapper-mask'}>
					
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
								// allowedFormats={['core/text-color']}
							/>
							<div className={'container'}>
								{iconLine1}
								
								<div className={'item-day'}>
									<div className={'first-block'}>
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

								{iconLine2}

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
				description,
				title1,
				description1,
				image1,
				title2,
				description2,
				image2,
				title3,
				description3,
				image3
			},
			className
		} = props;

		const parts1 = description1.split('<br>');
		const parts2 = description2.split('<br>');
		const parts3 = description3.split('<br>');

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<div className={'wrapper-conteiner'}>
						<div className={'wrapper-mask'}>

							{title && <RichText.Content tagName="h2" value={title} />}
							{description && <RichText.Content tagName="p" value={description} />}

							<div className={'container'}>
								{iconLine1}
								
								<div className={'item-day'}>
									<div className={'first-block'}>
										<RichText.Content tagName="span" value={title1} />
										{ parts1.map((part, index) => (
											part && (<p key={index} dangerouslySetInnerHTML={{ __html: part }} />)
										)) }
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
										<RichText.Content tagName="span" value={title2} />
										{ parts2.map((part, index) => (
											part && (<p key={index} dangerouslySetInnerHTML={{ __html: part }} />)
										)) }
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
										<RichText.Content tagName="span" value={title3} />
										{ parts3.map((part, index) => (
											part && (<p key={index} dangerouslySetInnerHTML={{ __html: part }} />)
										)) }
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

								{iconLine2}

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
