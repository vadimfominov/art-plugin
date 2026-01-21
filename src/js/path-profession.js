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

	registerBlockType('fv/path-profession', {
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

		return (
			<div className={className}>
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
