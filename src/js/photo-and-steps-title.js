(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload } = wp.blockEditor;
	const { PanelBody, PanelRow, Button, RangeControl } = wp.components;
	const { useEffect } = wp.element

	const catIcon = 'cat'
	const iconFigure1 = (<svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M39 29.5L27.278 8.25385C24.6388 3.47034 19.6076 0.5 14.1443 0.5L0 0.5" stroke="#30A933"/>
			</svg>);
	const iconFigure2 = (<svg width="130" height="35" viewBox="0 0 130 35" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 34.5L36.5185 4.53503C39.2244 2.25219 42.6506 1 46.1908 1H130" stroke="#30A933"/>
			</svg>);
	const iconFigure3 = (<svg width="51" height="41" viewBox="0 0 51 41" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 0.5L17.7689 32.0414C20.3727 36.939 25.4667 40 31.0134 40H51" stroke="#30A933"/>
			</svg>);
	const iconFigure4 = (<svg width="129" height="34" viewBox="0 0 129 34" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M128 1L93.4513 29.561C90.7624 31.7839 87.3827 33 83.8939 33H0" stroke="#30A933"/>
			</svg>);

	registerBlockType('fv/photo-and-steps-title', {
		title: 'Фото и шаги с заголовком',
		icon: catIcon,
		category: 'common',
		keywords: ['photo and steps with title', 'Фото и шаги с заголовком', 'return', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			titleBlock: {
				type: 'string',
				default: ''
			},
			columns: {
            type: 'number',
            default: 4,
        	},
			description: {
				type: 'string',
				default: ''
			},
			blocksData: {
				type: 'array',
				default: [{ title: '', description: '' }],
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
				titleBlock,
				description,
				columns,
				blocksData,
				desktopBackground,
            tabletBackground,
            mobileBackground,
			},
			className,
			isSelected,
			setAttributes
		} = props;

		useEffect(() => {
			if (columns > blocksData.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData];
				while (newBlocksData.length < columns) {
					newBlocksData.push({ description: '' });
				}
				setAttributes({ blocksData: newBlocksData });
			} else if (columns < blocksData.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData: blocksData.slice(0, columns) });
			}
	  	}, [columns]);

		const updateBlockData = (index, key, value) => {
			const newBlocksData = [...blocksData];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData: newBlocksData });
		};

		const blockItems = Array.from({ length: columns }, (x, index) => (
			<li key={index} className={'item-' + (index + 1)}>
				<span className={'icon'}></span>
				<RichText
					tagName="span"
					onChange={value => updateBlockData(index, 'title', value)}
					value={blocksData[index]?.title}
					placeholder="Заголовок..."
					// allowedFormats={[]}
				/>
				<RichText
					tagName="p"
					onChange={value => updateBlockData(index, 'description', value)}
					value={blocksData[index]?.description}
					placeholder="Описание..."
					// allowedFormats={[]}
				/>
			</li>
		));
		
		return [
			<InspectorControls>
				<PanelBody 
					title="Настройки фона"
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
				<div className="wrapper">
					
					
					<ul className={'list-block'}>
						{blockItems}
						<li className={'item-5'}>

							<RichText
								tagName="span"
								onChange={ titleBlock => setAttributes({ titleBlock })}
								value={titleBlock}
								placeholder="Заголовок..."
								// allowedFormats={['core/text-color']}
							/>

							<span className={'icon icon1'}></span>
							<span className={'icon icon2'}></span>
							<span className={'icon icon3'}></span>
							<span className={'icon icon4'}></span>

							<span className={'icn icon1-svg'}>{iconFigure1}</span>
							<span className={'icn icon2-svg'}>{iconFigure2}</span>
							<span className={'icn icon3-svg'}>{iconFigure3}</span>
							<span className={'icn icon4-svg'}>{iconFigure4}</span>
							
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

							<div className={'info-block'}>
								<RichText
									tagName="h2"
									onChange={ title => setAttributes({ title })}
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
							</div>
							
						</li>
					</ul>
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
				blocksData,
				desktopBackground,
            tabletBackground,
            mobileBackground,
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className="wrapper">
					
					<ul className={'list-block'}>
						{blocksData.map((block, index) => (
							<li key={index} className={'item-' + (index + 1)}>
								<span className={'icon'}></span>
								<RichText.Content tagName="span" value={block.title} />
								<RichText.Content tagName="p" value={block.description} />
							</li>
						))}
						<li className={'item-5'}>

							{titleBlock && <RichText.Content tagName="span" value={titleBlock} />}

							<span className={'icon icon1'}></span>
							<span className={'icon icon2'}></span>
							<span className={'icon icon3'}></span>
							<span className={'icon icon4'}></span>

							<span className={'icn icon1-svg'}>{iconFigure1}</span>
							<span className={'icn icon2-svg'}>{iconFigure2}</span>
							<span className={'icn icon3-svg'}>{iconFigure3}</span>
							<span className={'icn icon4-svg'}>{iconFigure4}</span>

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
							
							<div className={'info-block'}>
								{title && <RichText.Content tagName="h2" value={title} />}
								{description && <RichText.Content tagName="p" value={description} />}
							</div>

						</li>
					</ul>
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
