(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload } = wp.blockEditor;
	const { PanelBody, PanelRow, ToggleControl, Button } = wp.components;

	const catIcon = 'cat'

	registerBlockType('fv/expert-approach', {
		title: 'Экспертный подход',
		icon: catIcon,
		category: 'common',
		keywords: ['Экспертный подход', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			titleBlock1: {
				type: 'string',
				default: ''
			},
			titleBlock1_1: {
				type: 'string',
				default: ''
			},
			titleBlock2: {
				type: 'string',
				default: ''
			},
			titleBlock3: {
				type: 'string',
				default: ''
			},
			titleBlock4: {
				type: 'string',
				default: ''
			},
			descriptionFirst: {
				type: 'string',
				default: '',
			},
			descriptionSecond: {
					type: 'string',
					default: '',
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
			svgContent: {
				type: 'string',
				default: '',
			},
			svgContent2: {
				type: 'string',
				default: '',
			},
			svgContent3: {
				type: 'string',
				default: '',
			},
			svgContent4: {
				type: 'string',
				default: '',
			},
			svgContent2_1: {
				type: 'string',
				default: '',
			},
			svgContent2_2: {
				type: 'string',
				default: '',
			},
			svgContent2_3: {
				type: 'string',
				default: '',
			},
			svgContent2_4: {
				type: 'string',
				default: '',
			},
			svgContent2_5: {
				type: 'string',
				default: '',
			},
			svgContent2_6: {
				type: 'string',
				default: '',
			},
			svgContent2_7: {
				type: 'string',
				default: '',
			},
			svgContent2_8: {
				type: 'string',
				default: '',
			},
			svgContent2_9: {
				type: 'string',
				default: '',
			},
			svgContent2_10: {
				type: 'string',
				default: '',
			},
			svgContent2_11: {
				type: 'string',
				default: '',
			},
			svgContent2_12: {
				type: 'string',
				default: '',
			},
			svgContent2_13: {
				type: 'string',
				default: '',
			},
			svgContent2_14: {
				type: 'string',
				default: '',
			},
			svgContent2_15: {
				type: 'string',
				default: '',
			},
			svgContent2_16: {
				type: 'string',
				default: '',
			},
			svgContent2_17: {
				type: 'string',
				default: '',
			},
			svgContent2_18: {
				type: 'string',
				default: '',
			},
			svgContent2_19: {
				type: 'string',
				default: '',
			},
			svgContent2_20: {
				type: 'string',
				default: '',
			},
			svgContent2_21: {
				type: 'string',
				default: '',
			},
			svgContent2_22: {
				type: 'string',
				default: '',
			},
			svgContent2_23: {
				type: 'string',
				default: '',
			},
			svgContent2_24: {
				type: 'string',
				default: '',
			},
			inBlock: {
				type: 'boolean',
				default: false
			},
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				title,
				titleBlock1,
				titleBlock1_1,
				titleBlock2,
				titleBlock3,
				titleBlock4,
				descriptionFirst,
				descriptionSecond,
				desktopBackground,
            tabletBackground,
            mobileBackground,
				svgContent,
				svgContent2,
				svgContent3,
				svgContent4,
				inBlock
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

		const svgContentKeys = Array.from({ length: 24 }, (_, i) => `svgContent2_${i + 1}`);

		const svgBlocks = svgContentKeys.map((svgKey, index) => (
			<div key={index}>
				{isSelected ? (
					<>
					<MediaUpload
						allowedTypes={['image/svg+xml']}
						onSelect={(media) => fetchSVGContent(media.url, svgKey)}
						render={({ open }) => (
							<Button onClick={open} className={'svg-icon-wrapper'}>
								{props.attributes[svgKey]
									? <div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: props.attributes[svgKey] }}></div>
									: 'Выбрать SVG'
								}
							</Button>
						)}
					/>
					{props.attributes[svgKey] && (
						<Button
							variant="link"
							isDestructive
							style={{ padding: '0 8px' }}
							onClick={() => {
								props.setAttributes({ [svgKey]: '' });
							}}
						>
							Удалить
						</Button>
					)}
					</>
				) : (
					<div key={index} className="svg-icon-wrapper">
						{props.attributes[svgKey] && (
								<div dangerouslySetInnerHTML={{ __html: props.attributes[svgKey] }} />
						)}
					</div>
				)}
			</div>
		));

		return [
			<InspectorControls>
				<PanelBody 
					title="Настройки блока"
					initialOpen={false}
					>
					<PanelRow>
						<p>Картинка для блока</p>
						<BackgroundImageUploader
							desktopBackground={desktopBackground}
							tabletBackground={tabletBackground}
							mobileBackground={mobileBackground}
							setAttributes={setAttributes}
							isSelected={isSelected}
						/>
					</PanelRow>
					<PanelRow>
						<p>Добавить блок с логотипами</p>
						<ToggleControl
							checked={inBlock}
							onChange={() => setAttributes({ inBlock: !inBlock })}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className="wrapper">
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<div className={'container'}>
						<div className={'item item-first-child'}>
							<RichText
								tagName="h3"
								onChange={ value => setAttributes({ titleBlock1: value }) }
								value={titleBlock1}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							{isSelected ? (
								<MediaUpload
									allowedTypes={['image/svg+xml']}
									onSelect={ media => fetchSVGContent(media.url, 'svgContent')}
									render={({ open }) => (
										<Button onClick={open} className={'svg-icon-wrapper'}>
											{ svgContent 
												? <div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent }}></div> 
												: 'Выбрать SVG'
											}
										</Button>
									)}
								/>
							) : (
								<div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent }} />
							)}
							{isSelected ? (
								<MediaUpload
									allowedTypes={['image/svg+xml']}
									onSelect={ media => fetchSVGContent(media.url, 'svgContent2')}
									render={({ open }) => (
										<Button onClick={open} className={'svg-icon-wrapper'}>
											{ svgContent2 
												? <div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent2 }}></div> 
												: 'Выбрать SVG'
											}
										</Button>
									)}
								/>
							) : (
								<div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent2 }} />
							)}
							{isSelected ? (
								<MediaUpload
									allowedTypes={['image/svg+xml']}
									onSelect={ media => fetchSVGContent(media.url, 'svgContent3')}
									render={({ open }) => (
										<Button onClick={open} className={'svg-icon-wrapper'}>
											{ svgContent3 
												? <div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent3 }}></div> 
												: 'Выбрать SVG'
											}
										</Button>
									)}
								/>
							) : (
								<div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent3 }} />
							)}
							{isSelected ? (
								<MediaUpload
									allowedTypes={['image/svg+xml']}
									onSelect={ media => fetchSVGContent(media.url, 'svgContent4')}
									render={({ open }) => (
										<Button onClick={open} className={'svg-icon-wrapper'}>
											{ svgContent4 
												? <div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent4 }}></div> 
												: 'Выбрать SVG'
											}
										</Button>
									)}
								/>
							) : (
								<div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent4 }} />
							)}
						</div>
						{inBlock && <div className={'item item-second-child'}>
							<RichText
								tagName="h3"
								onChange={ value => setAttributes({ titleBlock1_1: value }) }
								value={titleBlock1_1}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<div className={'svg-container'}>
								{svgBlocks}
							</div>
						</div>}
						<div className={'item item-third-child'}>
							<RichText
								tagName="h3"
								onChange={ value => setAttributes({ titleBlock2: value }) }
								value={titleBlock2}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ value => setAttributes({ descriptionFirst: value })}
								value={descriptionFirst}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'item item-fourth-child'}>
							<RichText
								tagName="h3"
								onChange={ value => setAttributes({ titleBlock3: value }) }
								value={titleBlock3}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'item item-fifth-child'}>
							<RichText
								tagName="h3"
								onChange={ value => setAttributes({ titleBlock4: value }) }
								value={titleBlock4}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<div className={'container-list'}>
								<RichText
									tagName="p"
									onChange={ value => setAttributes({ descriptionSecond: value }) }
									value={descriptionSecond}
									placeholder="Описание...."
									// allowedFormats={[]}
								/>
							</div>
							
						</div>
						<div className={'item item-last-child'}>
							<picture>
								{/* Для мобильных устройств (до 770px) */}
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
										className="bg-image" 
								/>
							</picture>
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
				titleBlock1,
				titleBlock2,
				titleBlock3,
				titleBlock4,
				titleBlock1_1,
				descriptionFirst,
				descriptionSecond,
				desktopBackground,
            tabletBackground,
            mobileBackground,
				svgContent,
				svgContent2,
				svgContent3,
				svgContent4,
				svgContent2_1,
				svgContent2_2,
				svgContent2_3,
				svgContent2_4,
				svgContent2_5,
				svgContent2_6,
				svgContent2_7,
				svgContent2_8,
				svgContent2_9,
				svgContent2_10,
				svgContent2_11,
				svgContent2_12,
				svgContent2_13,
				svgContent2_14,
				svgContent2_15,
				svgContent2_16,
				svgContent2_17,
				svgContent2_18,
				svgContent2_19,
				svgContent2_20,
				svgContent2_21,
				svgContent2_22,
				svgContent2_23,
				svgContent2_24,
				inBlock
			},
			attributes,
			className
		} = props;

		const partsFirst = descriptionFirst.split('<br>');
		const firstWrappedInP = partsFirst.map((part, index) => <p className={'p-block-' + index} key={index}>{part}</p>);

		const partsSecond = descriptionSecond.split('<br>');
		const secondWrappedInP = partsSecond.map((part, index) => <p className={'p-block-' + index} key={index}>{part}</p>);

		// Генерация ключей для SVG контента
		const svgContentKeys = Array.from({ length: 24 }, (_, i) => `svgContent2_${i + 1}`);

		// Создаем массив блоков для отображения SVG контента
		const svgBlocks = svgContentKeys.map((svgKey, index) => (
			<div key={index} className="svg-icon-wrapper">
				{attributes[svgKey] && (
					<div dangerouslySetInnerHTML={{ __html: attributes[svgKey] }} />
				)}
			</div>
		));

		return (
			<div className={className}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<div className="container">
						<div className={"item item-first-child"}>
							<RichText.Content tagName="h3" value={titleBlock1} />
							{svgContent && (
								<div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent }} />
							)}
							{svgContent2 && (
								<div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent2 }} />
							)}
							{svgContent3 && (
								<div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent3 }} />
							)}
							{svgContent4 && (
								<div className={'svg-icon-wrapper'} dangerouslySetInnerHTML={{ __html: svgContent4 }} />
							)}
						</div>
						{inBlock && <div className={"item item-second-child"}>
							<RichText.Content tagName="h3" value={titleBlock1_1} />
							<div className={'svg-container'}>
								{svgBlocks}
							</div>
						</div>}
						<div className="item item-third-child">
							<RichText.Content tagName="h3" value={titleBlock2} />
							{firstWrappedInP}
						</div>
						<div className="item item-fourth-child">
							<RichText.Content tagName="h3" value={titleBlock3} />
							
						</div>
						<div className="item item-fifth-child">
							<RichText.Content tagName="h3" value={titleBlock4} />
							<div className={'container-list'}>
								{secondWrappedInP}
							</div>
						</div>
						<div className={'item item-last-child'}>
							<picture>
								{/* Для мобильных устройств (до 770px) */}
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
										className="bg-image" 
								/>
							</picture>
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
				<p>Изображение для ПК</p>
				{renderImageUpload('desktop', desktopBackground?.url)}

				<p>Изображение для планшета</p>
				{renderImageUpload('tablet', tabletBackground?.url)}

				<p>Изображение для телефона</p>
				{renderImageUpload('mobile', mobileBackground?.url)}
			</div>
		);
  	};

})(
	window.wp
);
