(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

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

	const catIcon = 'cat';
	const iconRightArr = (
				<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#E94E4E"/>
				</svg>);

	registerBlockType('fv/issledovanie', {
		title: 'Исследование',
		icon: catIcon,
		category: 'common',
		keywords: ['Исследование', 'issledovanie', 'фке', 'art'],
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
			title4: {
				type: 'string',
				default: ''
			},
			description4: {
				type: 'string',
				default: ''
			},
			label6: {
				type: 'string',
				default: ''
			},
			title6: {
				type: 'string',
				default: ''
			},
			description6: {
				type: 'string',
				default: ''
			},
			pdf1: {
				type: 'object',
				default: {}
			},
			pdf2: {
				type: 'object',
				default: {}
			},
			pdf3: {
				type: 'object',
				default: {}
			},
			pdf4: {
				type: 'object',
				default: {}
			},
			image1: {
				type: 'object',
				default: {}
			},
			image2: {
				type: 'object',
				default: {}
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
				title4,
				description4,
				title6,
				description6,
				label6,
				pdf1,
				pdf2,
				pdf3,
				pdf4,
				image1,
				image2,
				desktopBackground,
            tabletBackground,
            mobileBackground,
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
						<p>PDF исследование</p>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({
									pdf1: {
										url: media.url,
										id: media.id,
									}
								});
							}}
							allowedTypes={['pdf']}
							render={({ open }) => (
								<div style={{'display': 'flex', 'gap': '10px', 'marginBottom': '20px'}}>
									<Button onClick={open} isPrimary isLarge>
										{pdf1 && pdf1.url 
											? 'Изменить PDF 1' 
											: 'Выбрать PDF 1'}
									</Button>
									{pdf1 && pdf1.url && <Button isPrimary className={'delete-pdf'} onClick={() => setAttributes({ 
										pdf1: {
											url: '',
											id: null,
										}
									})}>Удалить PDF</Button>}
								</div>
								
							)}
						/>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({
									pdf2: {
										url: media.url,
										id: media.id,
									}
								});
							}}
							allowedTypes={['pdf']}
							render={({ open }) => (
								<div style={{'display': 'flex', 'gap': '10px', 'marginBottom': '20px'}}>
									<Button onClick={open} isPrimary isLarge>
										{pdf2 && pdf2.url 
											? 'Изменить PDF 2' 
											: 'Выбрать PDF 2'}
									</Button>
									{pdf2 && pdf2.url && <Button isPrimary className={'delete-pdf'} onClick={() => setAttributes({ 
										pdf2: {
											url: '',
											id: null,
										}
									})}>Удалить PDF</Button>}
								</div>
								
							)}
						/>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({
									pdf3: {
										url: media.url,
										id: media.id,
									}
								});
							}}
							allowedTypes={['pdf']}
							render={({ open }) => (
								<div style={{'display': 'flex', 'gap': '10px', 'marginBottom': '20px'}}>
									<Button onClick={open} isPrimary isLarge>
										{pdf3 && pdf3.url 
											? 'Изменить PDF 3' 
											: 'Выбрать PDF 3'}
									</Button>
									{pdf3 && pdf3.url && <Button isPrimary className={'delete-pdf'} onClick={() => setAttributes({ 
										pdf3: {
											url: '',
											id: null,
										}
									})}>Удалить PDF</Button>}
								</div>
								
							)}
						/>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({
									pdf4: {
										url: media.url,
										id: media.id,
									}
								});
							}}
							allowedTypes={['pdf']}
							render={({ open }) => (
								<div style={{'display': 'flex', 'gap': '10px'}}>
									<Button onClick={open} isPrimary isLarge>
										{pdf4 && pdf4.url 
											? 'Изменить PDF 4' 
											: 'Выбрать PDF 4'}
									</Button>
									{pdf4 && pdf4.url && <Button isPrimary className={'delete-pdf'} onClick={() => setAttributes({ 
										pdf4: {
											url: '',
											id: null,
										}
									})}>Удалить PDF</Button>}
								</div>
								
							)}
						/>
					</PanelRow>
					<PanelRow>
						<BackgroundImageUploader
							desktopBackground={desktopBackground}
							tabletBackground={tabletBackground}
							mobileBackground={mobileBackground}
							setAttributes={setAttributes}
							isSelected={isSelected}
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
					<RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>
					<div className={'container'}>
						<div className={'item first-item'}>
							<div className={'left'}>
								<RichText
									tagName="span"
									onChange={(value) => setAttributes({ title1: value })}
									value={title1}
									placeholder="Заголовок..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									onChange={(value) => setAttributes({ description1: value })}
									value={description1}
									placeholder="Описание..."
									// allowedFormats={[]}
								/>
								{ pdf1 && pdf1.url && <a href={pdf1.url} target={'_blank'} area-label={'pdf1'} className={'pdf-btn-open'}>Смотреть исследование полностью <span>{iconRightArr}</span></a> }
							</div>
							<div className={'right'}>
								<picture>
									<source 
										srcset={mobileBackground?.url} 
										media="(max-width: 766px)" 
									/>
									<source 
										srcset={tabletBackground?.url} 
										media="(min-width: 767px) and (max-width: 1024px)" 
									/>
									<source 
										srcset={desktopBackground?.url} 
										media="(min-width: 1025px)" 
									/>
									<img 
										src={desktopBackground?.url} 
										alt="Фон" 
										className="bg-image-steps" 
									/>
								</picture>
							</div>
						</div>
						<div className={'item second-item'}>
							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ title2: value })}
								value={title2}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={(value) => setAttributes({ description2: value })}
								value={description2}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
							{ pdf2 && pdf2.url && <a href={pdf2.url} target={'_blank'} area-label={'pdf2'} className={'pdf-btn-open'} >Скачать исследование <span>{iconRightArr}</span></a> }
						</div>
						<div className={'item third-item'}>
							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ title3: value })}
								value={title3}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={(value) => setAttributes({ description3: value })}
								value={description3}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
							{ pdf3 && pdf3.url && <a href={pdf3.url} target={'_blank'} area-label={'pdf3'} className={'pdf-btn-open'} >Скачать исследование <span>{iconRightArr}</span></a> }
						</div>
						<div className={'item fourth-item'}>
							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ title4: value })}
								value={title4}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={(value) => setAttributes({ description4: value })}
								value={description4}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
							{ pdf4 && pdf4.url && <a href={pdf4.url} target={'_blank'} area-label={'pdf4'} className={'pdf-btn-open'} >Скачать исследование <span>{iconRightArr}</span></a> }
						</div>
						<div className={'item fifth-item'}>
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
						<div className={'item sixth-item'}>
							<RichText
								tagName="span"
								className={'label'}
								onChange={(value) => setAttributes({ label6: value })}
								value={label6}
								placeholder="label..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="span"
								className={'title'}
								onChange={(value) => setAttributes({ title6: value })}
								value={title6}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={(value) => setAttributes({ description6: value })}
								value={description6}
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
				description,
				title1,
				description1,
				title2,
				description2,
				title3,
				description3,
				title4,
				description4,
				title6,
				description6,
				label6,
				pdf1,
				pdf2,
				pdf3,
				pdf4,
				image1,
				image2,
				desktopBackground,
            tabletBackground,
            mobileBackground,
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'wrapper'}>
					{title && <RichText.Content tagName="h2" value={title} />}
					{description && <RichText.Content tagName="p" value={description} />}
					<div className={'container'}>
						<div className={'item first-item'}>
							<div className={'left'}>
								{ title1 && <RichText.Content tagName="span" value={title1} /> }
								{ description1 && <RichText.Content tagName="p" value={description1} /> }
								{ pdf1 && pdf1.url && <a href={pdf1.url} target={'_blank'} area-label={'pdf1'} className={'pdf-btn-open'}>Смотреть исследование полностью <span>{iconRightArr}</span></a> }
							</div>
							<div className={'right'}>
								<picture>
									<source 
										srcset={mobileBackground?.url} 
										media="(max-width: 766px)" 
									/>
									<source 
										srcset={tabletBackground?.url} 
										media="(min-width: 767px) and (max-width: 1024px)" 
									/>
									<source 
										srcset={desktopBackground?.url} 
										media="(min-width: 1025px)" 
									/>
									<img 
										src={desktopBackground?.url} 
										alt="Фон" 
										className="bg-image-steps" 
									/>
								</picture>
							</div>
						</div>
						<div className={'item second-item'}>
							{ title2 && <RichText.Content tagName="span" value={title2} /> }
							{ description2 && <RichText.Content tagName="p" value={description2} /> }
							{ pdf2 && pdf2.url && <a href={pdf2.url} target={'_blank'} area-label={'pdf2'} className={'pdf-btn-open'} >Скачать исследование <span>{iconRightArr}</span></a> }
						</div>
						<div className={'item third-item'}>
							{ title3 && <RichText.Content tagName="span" value={title3} /> }
							{ description3 && <RichText.Content tagName="p" value={description3} /> }
							{ pdf3 && pdf3.url && <a href={pdf3.url} target={'_blank'} area-label={'pdf3'} className={'pdf-btn-open'} >Скачать исследование <span>{iconRightArr}</span></a> }
						</div>
						<div className={'item fourth-item'}>
							{ title4 && <RichText.Content tagName="span" value={title4} /> }
							{ description4 && <RichText.Content tagName="p" value={description4} /> }
							{ pdf4 && pdf4.url && <a href={pdf4.url} target={'_blank'} area-label={'pdf4'} className={'pdf-btn-open'} >Скачать исследование <span>{iconRightArr}</span></a> }
						</div>
						<div className={'item fifth-item'}>
							{ image2 && image2.url && 
								<img 
									src={image2.url} 
									alt={image2.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
						</div>
						<div className={'item sixth-item'}>
							{ label6 && <RichText.Content className={'label'} tagName="span" value={label6} /> }
							{ title6 && <RichText.Content className={'title'} tagName="span" value={title6} /> }
							{ description6 && <RichText.Content tagName="p" value={description6} /> }
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

})(
	window.wp
);
