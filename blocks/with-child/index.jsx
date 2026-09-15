(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { PanelBody, PanelRow, Button, ToggleControl } = wp.components;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	registerBlockType("fv/with-child", {
		apiVersion: 3,
		title: 'С ребёнком на смене',
		icon: catIcon,
		category: 'common',
		keywords: ['С ребёнком на смене', 'with-child', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			inLabel: {
				type: 'boolean',
				default: false
			},
			desktopBackground: {
				type: 'object',
				default: {},
			},
			tableBackground: {
				type: 'object',
				default: {},
			},
			mobileBackground: {
				type: 'object',
				default: {},
			},
			listItems: {
				type: 'array',
				default: [
					{ field1: '', field2: '' }
				]
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
				inLabel,
				desktopBackground,
				tableBackground,
				mobileBackground,
				listItems
			},
			isSelected,
			setAttributes
		} = props;
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки фона"
					initialOpen={true}
				>
					<PanelRow>
						<p>Включить лэйбл</p>
						<ToggleControl
							checked={inLabel}
							onChange={() => setAttributes({ inLabel: !inLabel })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
					<BackgroundImageUploader
						desktopBackground={desktopBackground}
						tableBackground={tableBackground}
						mobileBackground={mobileBackground}
						setAttributes={setAttributes}
						isSelected={isSelected}
					/>
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps}>
				<div className="wrapper">
					<div className="container-img">
						<div className={'image-bg'}>
							<picture>
								{/* Для мобильных устройств (до 770px) */}
								<source
									srcset={mobileBackground?.url}
									media="(max-width: 766px)"
								/>
								{/* Для планшетов (от 770px до 1024px) */}
								<source
									srcset={tableBackground?.url}
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
									className="bg-image-important"
								/>
							</picture>
						</div>
						<div className={'container-with-child'}>
							<div className="left-with-child">
								<RichText
									tagName="h2"
									onChange={(value) => setAttributes({ title: value })}
									value={title}
									placeholder="Заголовок..."
								/>
								{inLabel && <span className={'label'}>на смене</span>}
								<RichText
									tagName="p"
									onChange={(value) => setAttributes({ description: value })}
									value={description}
									placeholder="Укажите описание..."
								/>
							</div>
							<div className="right-with-child">
								<DubleListEditor
									items={listItems}
									onChange={(newItems) => setAttributes({ listItems: newItems })}
									field1Placeholder="Заголовок"
									field2Placeholder="Описание"
									blockIndex={0}
									showRemoveButton={true}
									showAddButton={true}
									field1TagName="span"  // можно изменить тег для первого поля
									field2TagName="p"    // можно изменить тег для второго поля
								/>
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
				inLabel,
				desktopBackground,
				tableBackground,
				mobileBackground,
				listItems
			}
		} = props;
		const blockProps = useBlockProps.save();
		
		return (
			<div {...blockProps}>
				<div className="wrapper">
					<div className="container-img">
						<div className={'image-bg'}>
							<picture>
								{/* Для мобильных устройств (до 770px) */}
								<source
									srcset={mobileBackground?.url}
									media="(max-width: 766px)"
								/>
								{/* Для планшетов (от 770px до 1024px) */}
								<source
									srcset={tableBackground?.url}
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
									className="bg-image-important"
								/>
							</picture>
						</div>
						<div className={'container-with-child'}>
							<div className="left-with-child">
								<RichText.Content tagName="h2" value={title} />
								{inLabel && <span className={'label'}>на смене</span>}
								<RichText.Content tagName="p" value={description} />
							</div>
							<div className="right-with-child">
								{listItems && listItems.length > 0 && (
									<div className="items">
										{listItems.map((item, i) => (
											<div className="item" key={i}>
												<span dangerouslySetInnerHTML={{ __html: item.field1 }} />
												<p dangerouslySetInnerHTML={{ __html: item.field2 }} />
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	};
	function BackgroundImageUploader(props) {
		const { desktopBackground, tableBackground, mobileBackground, setAttributes, isSelected } = props
		const onSelectImage = (device, img) => {
			if (device === 'desktop') {
				setAttributes({ desktopBackground: { id: img.id, url: img.url, alt: img.alt } });
			} else if (device === 'table') {
				setAttributes({ tableBackground: { id: img.id, url: img.url, alt: img.alt } });
			} else if (device === 'mobile') {
				setAttributes({ mobileBackground: { id: img.id, url: img.url, alt: img.alt } });
			}
		};
		const removeImage = (device) => {
			if (device === 'desktop') {
				setAttributes({ desktopBackground: null });
			} else if (device === 'table') {
				setAttributes({ tableBackground: null });
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
				<p>Изображение для ПК</p>
				{renderImageUpload('desktop', desktopBackground?.url)}
				<p>Изображение для планшета</p>
				{renderImageUpload('table', tableBackground?.url)}
				<p>Изображение для телефона</p>
				{renderImageUpload('mobile', mobileBackground?.url)}
			</div>
		);
	};
})(window.wp);