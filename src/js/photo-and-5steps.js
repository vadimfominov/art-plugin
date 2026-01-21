(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload } = wp.blockEditor;
	const { PanelBody, PanelRow, Button, RangeControl } = wp.components;
	const { useEffect } = wp.element

	const catIcon = 'cat'
	const iconFigure1 = (<svg width="65" height="44" viewBox="0 0 65 44" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M64 43.5L45.2391 8.42521C42.6293 3.54613 37.5455 0.5 32.0123 0.5H0.5" stroke="#30A933"/>
			</svg>);
	const iconFigure2 = (<svg width="129" height="35" viewBox="0 0 129 35" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.5 34.5L35.5002 4.59573C38.2163 2.27506 41.6715 1 45.244 1H129" stroke="#E82E2E"/>
			</svg>);
	const iconFigure3 = (<svg width="62" height="39" viewBox="0 0 62 39" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.5 1L16.7169 30.2696C19.36 35.04 24.384 38 29.8376 38H61.5" stroke="#30A933"/>
			</svg>);
	const iconFigure4 = (<svg width="61" height="39" viewBox="0 0 61 39" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M60.5 1L44.7526 30.1327C42.1327 34.9796 37.0665 38 31.557 38H0" stroke="#30A933"/>
			</svg>);
	const iconFigure5 = (<svg width="130" height="33" viewBox="0 0 130 33" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M129 0.5L93.3864 28.7515C90.7346 30.8551 87.4492 32 84.0642 32H0" stroke="#E82E2E"/>
			</svg>);

	registerBlockType('fv/photo-and-5steps', {
		title: 'Фото и 5 шагов',
		icon: catIcon,
		category: 'common',
		keywords: ['photo and 5steps', 'return', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			columns: {
            type: 'number',
            default: 5,
        	},
			description: {
				type: 'string',
				default: ''
			},
			blocksData: {
				type: 'array',
				default: [{ description: '' }],
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
				<RichText
					tagName="p"
					onChange={value => updateBlockData(index, 'description', value)}
					value={blocksData[index]?.description}
					placeholder="Описание..."
					// allowedFormats={['core/text-color']}
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
					<RichText
						tagName="h2"
						onChange={ title => setAttributes({ title })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<RichText
						tagName="p"
						onChange={ description => setAttributes({ description })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>
					
					<ul className={'list-block'}>
						{blockItems}
						<li className={'item-6'}>

							<span className={'icn icon1-svg'}>{iconFigure1}</span>
							<span className={'icn icon2-svg'}>{iconFigure2}</span>
							<span className={'icn icon3-svg'}>{iconFigure3}</span>
							<span className={'icn icon4-svg'}>{iconFigure4}</span>
							<span className={'icn icon5-svg'}>{iconFigure5}</span>
							
							{desktopBackground?.url && (
								<img
									src={desktopBackground?.url}
									alt={'ПК фон'}
									className={'bg-image bg-image-desktop'}
								/>
							)}
							{tabletBackground?.url && (
								<img
									src={tabletBackground?.url}
									alt="Планшет фон"
									className="bg-image bg-image-tablet"
								/>
							)}
							{mobileBackground?.url && (
								<img
									src={mobileBackground?.url}
									alt="Телефон фон"
									className="bg-image bg-image-mobile"
								/>
							)}
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
					<RichText.Content tagName="h2" value={title} />
					{description && <RichText.Content tagName="p" value={description} />}
					
					<ul className={'list-block'}>
						{blocksData.map((block, index) => (
							<li key={index} className={'item-' + (index + 1)}>
								<RichText.Content tagName="p" value={block.description} />
							</li>
						))}
						<li className={'item-6'}>

							<span className={'icn icon1-svg'}>{iconFigure1}</span>
							<span className={'icn icon2-svg'}>{iconFigure2}</span>
							<span className={'icn icon3-svg'}>{iconFigure3}</span>
							<span className={'icn icon4-svg'}>{iconFigure4}</span>
							<span className={'icn icon5-svg'}>{iconFigure5}</span>

							{desktopBackground?.url && (
								<img
									src={desktopBackground?.url}
									alt={'ПК фон'}
									className={'bg-image bg-image-desktop'}
								/>
							)}
							{tabletBackground?.url && (
								<img
									src={tabletBackground?.url}
									alt="Планшет фон"
									className="bg-image bg-image-tablet"
								/>
							)}
							{mobileBackground?.url && (
								<img
									src={mobileBackground?.url}
									alt="Телефон фон"
									className="bg-image bg-image-mobile"
								/>
							)}
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
