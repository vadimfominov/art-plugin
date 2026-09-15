(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const {
		InspectorControls,
		MediaUpload, useBlockProps
	} = wp.blockEditor;
	const {
		PanelBody,
		Button,
	} = wp.components;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	registerBlockType("fv/path-profession", {
		title: 'Путь к профессии',
		icon: catIcon,
		category: 'common',
		keywords: ['path-profession', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			item1: {
				type: 'string',
				default: ''
			},
			item2: {
				type: 'string',
				default: ''
			},
			item3: {
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
			image4: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
			item5: {
				type: 'string',
				default: ''
			},
			item6: {
				type: 'string',
				default: ''
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
				item1,
				item2,
				item3,
				image3,
				image4,
				item5,
				item6,
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
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
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
					<div className={'container'}>
						<div className={'item'}>
							<RichText
								tagName="p"
								onChange={ item1 => setAttributes({ item1 })}
								value={item1}
								placeholder="Текст..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'item'}>
							<RichText
								tagName="p"
								onChange={ item2 => setAttributes({ item2 })}
								value={item2}
								placeholder="Текст..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={image3.url ? 'item item-image' : 'item'}>
							{
								// Показываем загрузку изображения только если нет текста
								(!item3 || item3.length === 0) ? (
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
								) : (
										// Если есть текст, показываем сообщение о невозможности загрузки изображения
										isSelected && (
											<div className="notice notice-warning">
												<p>Удалите текст, чтобы загрузить изображение</p>
											</div>
										)
								)
							}
							<RichText
								tagName="p"
								onChange={(item3) => {
										// При добавлении текста удаляем изображение
										if (item3.length > 0 && image3?.url) {
											setAttributes({
												item3,
												image3: {
														url: '',
														id: null,
														alt: ''
												}
											});
										} else {
											setAttributes({ item3 });
										}
								}}
								value={item3}
								placeholder="Текст..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'item item-image'}>
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
						<div className={'item'}>
							<RichText
								tagName="p"
								onChange={ item5 => setAttributes({ item5 })}
								value={item5}
								placeholder="Текст..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'item'}>
							<RichText
								tagName="p"
								onChange={ item6 => setAttributes({ item6 })}
								value={item6}
								placeholder="Текст..."
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
				description,
				item1,
				item2,
				item3,
				image3,
				image4,
				item5,
				item6,
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<div className={'container'}>
						<div className={'item'}>
							<RichText.Content tagName="p" value={item1} />
						</div>
						<div className={'item'}>
							<RichText.Content tagName="p" value={item2} />
						</div>
						<div className={image3.url ? 'item item-image' : 'item'}>
							{ image3 && image3.url && 
								<img 
									src={image3.url} 
									alt={image3.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
							{item3 && <RichText.Content tagName="p" value={item3} />}
						</div>
						<div className={'item item-image'}>
							{ image4 && image4.url && 
								<img 
									src={image4.url} 
									alt={image4.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
						</div>
						<div className={'item'}>
							<RichText.Content tagName="p" value={item5} />
						</div>
						<div className={'item'}>
							<RichText.Content tagName="p" value={item6} />
						</div>
					</div>
				</div>
			</div>
		)
  	};
})(
	window.wp
);