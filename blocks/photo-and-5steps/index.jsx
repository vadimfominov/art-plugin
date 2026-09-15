(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { PanelBody, PanelRow, Button, RangeControl } = wp.components;
	const { useEffect } = wp.element
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
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
	registerBlockType("fv/photo-and-5steps", {
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
				/>
			</li>
		));
		const blockProps = useBlockProps();

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
			<div {...blockProps}>
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
							<picture>
								{/* Для мобильных устройств (до 770px) */}
								<source
									srcset={mobileBackground?.url}
									media="(max-width: 769px)"
								/>
								{/* Для планшетов (от 770px до 1024px) */}
								<source
									srcset={tabletBackground?.url}
									media="(min-width: 770px) and (max-width: 1024px)"
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
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
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
							<picture>
								{/* Для мобильных устройств (до 770px) */}
								<source
									srcset={mobileBackground?.url}
									media="(max-width: 769px)"
								/>
								{/* Для планшетов (от 770px до 1024px) */}
								<source
									srcset={tabletBackground?.url}
									media="(min-width: 770px) and (max-width: 1024px)"
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
					<img src={imgURL} alt={'photo'} style={{ width: '100%', height: 'auto' }} />
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