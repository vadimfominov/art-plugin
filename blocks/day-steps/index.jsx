(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const {
		InspectorControls,
		MediaUpload, useBlockProps
	} = wp.blockEditor;
	const {
		TextControl,
		PanelBody,
		PanelRow,
		Button,
		SelectControl
	} = wp.components;
	const { useState, useEffect } = wp.element
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconLine1 = (<svg width="407" height="811" viewBox="0 0 407 811" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.999969 -1.77031e-05L0.999956 312C0.999955 339.614 23.3857 362 51 362L356 362C383.614 362 406 384.386 406 412L406 683C406 710.614 383.614 733 356 733L46.3317 733C21.4789 733 1.33166 753.147 1.33166 778V778L1.33166 810.5" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);
	const iconLine2 = (<svg className={'svg-icon'} width="612" height="919" viewBox="0 0 612 919" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.5 -2.66858e-05L0.49999 232C0.499987 303.797 58.703 362 130.5 362L481 362C552.797 362 611 420.203 611 492L611 744C611 815.797 552.797 874 481 874L46 874C21.1472 874 1.00002 894.147 1.00002 919V919" stroke="#30A933" stroke-dasharray="14 14"/>
			</svg>);
	registerBlockType("fv/day-steps", {
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
		const blockProps = useBlockProps();

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
			<div {...blockProps}>
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
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
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