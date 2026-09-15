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
	const iconFigure1 = (<svg width="53" height="25" viewBox="0 0 53 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M52 24L37.6664 6.49646C34.8174 3.01739 30.5579 1 26.0611 1H0" stroke="#E82E2E"/>
				</svg>);
	const iconFigure2 = (<svg width="141" height="45" viewBox="0 0 141 45" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.00001 44L47.511 4.55952C50.2211 2.26141 53.659 1 57.2123 1H141" stroke="#E82E2E"/>
				</svg>);
	const iconFigure3 = (<svg width="65" height="45" viewBox="0 0 65 45" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 1L19.7609 36.0748C22.3707 40.9539 27.4545 44 32.9877 44H64.5" stroke="#E82E2E"/>
				</svg>);
	const iconFigure4 = (<svg width="141" height="45" viewBox="0 0 141 45" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M140 1L93.489 40.4405C90.7789 42.7386 87.341 44 83.7877 44H0" stroke="#E82E2E"/>
				</svg>);
	registerBlockType("fv/photo-and-steps", {
		title: 'Фото и шаги',
		icon: catIcon,
		category: 'common',
		keywords: ['photo and steps', 'return', 'фке', 'art'],
		attributes: {
			title: {
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
				<span className={'icon'}></span>
				<RichText
					tagName="p"
					onChange={value => updateBlockData(index, 'description', value)}
					value={blocksData[index]?.description}
					placeholder="Описание..."
					// allowedFormats={[]}
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
						<li className={'item-5'}>
							<span className={'icon icon1'}></span>
							<span className={'icon icon2'}></span>
							<span className={'icon icon3'}></span>
							<span className={'icon icon4'}></span>
							<span className={'icn icon1-svg'}>{iconFigure1}</span>
							<span className={'icn icon2-svg'}>{iconFigure2}</span>
							<span className={'icn icon3-svg'}>{iconFigure3}</span>
							<span className={'icn icon4-svg'}>{iconFigure4}</span>
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
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<ul className={'list-block'}>
						{blocksData.map((block, index) => (
							<li key={index} className={'item-' + (index + 1)}>
								<span className={'icon'}></span>
								<RichText.Content tagName="p" value={block.description} />
							</li>
						))}
						<li className={'item-5'}>
							<span className={'icon icon1'}></span>
							<span className={'icon icon2'}></span>
							<span className={'icon icon3'}></span>
							<span className={'icon icon4'}></span>
							<span className={'icn icon1-svg'}>{iconFigure1}</span>
							<span className={'icn icon2-svg'}>{iconFigure2}</span>
							<span className={'icn icon3-svg'}>{iconFigure3}</span>
							<span className={'icn icon4-svg'}>{iconFigure4}</span>
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