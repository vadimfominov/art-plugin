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

	registerBlockType('fv/family-values', {
		title: 'family values',
		icon: catIcon,
		category: 'common',
		keywords: ['family-values', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			svgKey1: {
				type: 'string',
				default: ''
			},
			description1: {
				type: 'string',
				default: ''
			},
			label1: {
				type: 'string',
				default: ''
			},
			svgKey2: {
				type: 'string',
				default: ''
			},
			description2: {
				type: 'string',
				default: ''
			},
			label2: {
				type: 'string',
				default: ''
			},
			svgKey3: {
				type: 'string',
				default: ''
			},
			description3: {
				type: 'string',
				default: ''
			},
			label3: {
				type: 'string',
				default: ''
			},
			svgKey4: {
				type: 'string',
				default: ''
			},
			description4: {
				type: 'string',
				default: ''
			},
			label4: {
				type: 'string',
				default: ''
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
				svgKey1,
				description1,
				label1,
				svgKey2,
				description2,
				label2,
				svgKey3,
				description3,
				label3,
				svgKey4,
				description4,
				label4,
				desktopBackground,
				tabletBackground,
				mobileBackground,
			},
			className,
			isSelected,
			setAttributes
		} = props;

		const fetchSVGContent = async (url, svgContent) => {
			try {
				const response = await fetch(url);
				if (response.ok) {
					const text = await response.text();
					setAttributes({ [svgContent]: text });
				} else {
					console.error('Error fetching the SVG file.');
				}
			} catch (error) {
				console.error('Error:', error);
			}
		};
		
		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
					>
					<BackgroundImageUploader
						desktopBackground={desktopBackground}
						tabletBackground={tabletBackground}
						mobileBackground={mobileBackground}
						setAttributes={setAttributes}
						isSelected={isSelected}
					/>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className={'wrapper'}>
					{(isSelected || !!title) && <RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Заголовок..."
						// allowedFormats={['core/text-color']}
					/>}
					{(isSelected || !!description) && <RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>}
					<div className={'container-block-family'}>
					
						<div className={'container-family'}>

							<div className={'item'}>
								{isSelected ? (
									<MediaUpload
										allowedTypes={['image/svg+xml']}
										onSelect={(media) => fetchSVGContent(media.url, 'svgKey1')}
										render={({ open }) => (
											<Button onClick={open} className={'svg-icon-wrapper'}>
												{ svgKey1 ? svgBlock(svgKey1) : 'Выбрать SVG' }
											</Button>
										)}
									/>
									) : ( svgBlock(svgKey1) )}
								<RichText
									tagName="p"
									onChange={(value) => setAttributes({ description1: value })}
									value={description1}
									placeholder="Описание..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="span"
									onChange={(value) => setAttributes({ label1: value })}
									value={label1}
									placeholder="Описание..."
									// allowedFormats={['core/text-color']}
								/>
							</div>
							<div className={'item'}>
								{isSelected ? (
									<MediaUpload
										allowedTypes={['image/svg+xml']}
										onSelect={(media) => fetchSVGContent(media.url, 'svgKey2')}
										render={({ open }) => (
											<Button onClick={open} className={'svg-icon-wrapper'}>
												{svgKey2 ? svgBlock(svgKey2) : 'Выбрать SVG' }
											</Button>
										)}
									/>
									) : ( svgBlock(svgKey2)) }
								<RichText
									tagName="p"
									onChange={(value) => setAttributes({ description2: value })}
									value={description2}
									placeholder="Описание..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="span"
									onChange={(value) => setAttributes({ label2: value })}
									value={label2}
									placeholder="Описание..."
									// allowedFormats={['core/text-color']}
								/>
							</div>
							<div className={'item'}>
								{isSelected ? (
									<MediaUpload
										allowedTypes={['image/svg+xml']}
										onSelect={(media) => fetchSVGContent(media.url, 'svgKey3')}
										render={({ open }) => (
											<Button onClick={open} className={'svg-icon-wrapper'}>
												{svgKey3 ? svgBlock(svgKey3) : 'Выбрать SVG' }
											</Button>
										)}
									/>
									) : (svgBlock(svgKey3))}
								<RichText
									tagName="p"
									onChange={(value) => setAttributes({ description3: value })}
									value={description3}
									placeholder="Описание..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="span"
									onChange={(value) => setAttributes({ label3: value })}
									value={label3}
									placeholder="Описание..."
									// allowedFormats={['core/text-color']}
								/>
							</div>
							<div className={'item'}>
								{isSelected ? (
									<MediaUpload
										allowedTypes={['image/svg+xml']}
										onSelect={(media) => fetchSVGContent(media.url, 'svgKey4')}
										render={({ open }) => (
											<Button onClick={open} className={'svg-icon-wrapper'}>
												{svgKey4 ? svgBlock(svgKey4) : 'Выбрать SVG' }
											</Button>
										)}
									/>
									) : ( svgBlock(svgKey4) )
								}
								<RichText
									tagName="p"
									onChange={(value) => setAttributes({ description4: value })}
									value={description4}
									placeholder="Описание..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="span"
									onChange={(value) => setAttributes({ label4: value })}
									value={label4}
									placeholder="Описание..."
									// allowedFormats={['core/text-color']}
								/>
							</div>

						</div>
						<picture>
							{/* Для мобильных устройств (до 769px) — пустой srcset */}
							<source 
								srcset={mobileBackground?.url} 
								media="(max-width: 766px)" 
							/>
							{/* Для планшетов (от 770px до 1024px) */}
							<source 
									srcset={tabletBackground?.url} 
									media="(min-width: 767px) and (max-width: 1024px)" 
							/>
							{/* Для десктопов (от 1025px и выше) */}
							<source 
									srcset={desktopBackground?.url} 
									media="(min-width: 1025px)" 
							/>
							{/* Фолбек для браузеров, которые не поддерживают <picture> */}
							<img 
									src={desktopBackground?.url} 
									alt="Фон" 
									className="img-for-block" 
							/>
						</picture>
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
				svgKey1,
				description1,
				label1,
				svgKey2,
				description2,
				label2,
				svgKey3,
				description3,
				label3,
				svgKey4,
				description4,
				label4,
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
					<div className={'container-block-family'}>

						<div className={'container-family'}>
							<div className={'item'}>

								{ svgBlock(svgKey1) }
								{description1 && <RichText.Content tagName="p" value={description1} />}
								{label1 && <RichText.Content tagName="span" value={label1} />}

							</div>
							<div className={'item'}>

								{ svgBlock(svgKey2) }
								{description2 && <RichText.Content tagName="p" value={description2} />}
								{label2 && <RichText.Content tagName="span" value={label2} />}

							</div>
							<div className={'item'}>

								{ svgBlock(svgKey3) }
								{description3 && <RichText.Content tagName="p" value={description3} />}
								{label3 && <RichText.Content tagName="span" value={label3} />}

							</div>
							<div className={'item'}>

								{ svgBlock(svgKey4) }
								{description4 && <RichText.Content tagName="p" value={description4} />}
								{label4 && <RichText.Content tagName="span" value={label4} />}

							</div>
						</div>
						<picture>
							{/* Для мобильных устройств (до 769px) — пустой srcset */}
							<source 
								srcset={mobileBackground?.url} 
								media="(max-width: 766px)" 
							/>
							{/* Для планшетов (от 770px до 1024px) */}
							<source 
								srcset={tabletBackground?.url} 
								media="(min-width: 767px) and (max-width: 1024px)" 
							/>
							{/* Для десктопов (от 1025px и выше) */}
							<source 
								srcset={desktopBackground?.url} 
								media="(min-width: 1025px)" 
							/>
							{/* Фолбек для браузеров, которые не поддерживают <picture> */}
							<img 
								src={desktopBackground?.url} 
								alt="Фон" 
								className="img-for-block" 
							/>
						</picture>
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

	function svgBlock(svg) {
		return (<div className="svg-icon-wrapper">
					{svg && (
						<div dangerouslySetInnerHTML={{ __html: svg }} />
					)}
				</div>);
	}

})(
	window.wp
);
