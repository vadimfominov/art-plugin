(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const {
		InspectorControls,
		MediaUpload, useBlockProps
	} = wp.blockEditor;
	const {
		PanelBody,
		PanelRow,
		Button,
		ToggleControl,
	} = wp.components;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconRightArr = (
		<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#E94E4E" />
		</svg>
	);
	registerBlockType("fv/first-block-for-moscow", {
		title: 'Главный экран msk',
		icon: catIcon,
		category: 'common',
		keywords: ['Главный экран', 'фке', 'art', 'msk', 'msc'],
		attributes: {
			bannerDescription: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			bannerTitle: {
				type: 'string',
				default: ''
			},
			btnTitle: {
				type: 'string',
				default: ''
			},
			linkCategory: {
				type: 'string',
				selector: '.footer-links'
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
			inActiveLabel: {
				type: 'boolean',
				default: null
			},
		},
		edit: Edit,
		save: Save
	});
	function Edit(props) {
		const {
			attributes: {
				bannerDescription,
				description,
				bannerTitle,
				linkCategory,
				desktopBackground,
				tabletBackground,
				mobileBackground,
				inService,
				btnTitle,
				inActiveLabel
			},
			isSelected,
			setAttributes
		} = props;
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					<PanelRow>
						<p>Включить плашку с Москвой</p>
						<ToggleControl
							checked={inActiveLabel}
							onChange={() => setAttributes({ inActiveLabel: !inActiveLabel })}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title="Настройки фона"
					initialOpen={false}
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
				<div className="wrapper">
					<div className="content">
						<div className="top-title">
							<RichText
								tagName="h1"
								onChange={(newValue) => setAttributes({ bannerTitle: newValue })}
								value={bannerTitle}
								placeholder="Укажите заголовок..."
							/>
							{inActiveLabel && <div class="label-first-block-msk">в Московской области</div>}
							{(isSelected || bannerDescription) && <RichText
								tagName="p"
								onChange={(newValue) => setAttributes({ bannerDescription: newValue })}
								value={bannerDescription}
								placeholder="Укажите описание..."
							/>}
						</div>
						{(isSelected || description) && <RichText
							tagName="p"
							onChange={(newValue) => setAttributes({ description: newValue })}
							value={description}
							placeholder="Укажите описание..."
						/>}
						{(isSelected || btnTitle) && <div className={'view-services'}>
							<RichText
								tagName="p"
								style={{display: "flex", alignItems: "center", padding: "0 25px"}}
								onChange={value => setAttributes({ btnTitle: value })}
								value={btnTitle}
								placeholder="Посмотреть услуги"
							/>
							<span className="span">{iconRightArr}</span>
						</div>}
					</div>
				</div>
			</div>
		];
	}
	function Save(props) {
		const {
			attributes: {
				bannerDescription,
				description,
				bannerTitle,
				linkCategory,
				desktopBackground,
				tabletBackground,
				mobileBackground,
				btnTitle,
				inActiveLabel
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
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
				<div className="wrapper">
					<div className="content">
						<div className="top-title">
							<h1>{RichText.Content({ value: bannerTitle })}</h1>
							{inActiveLabel && <div class="label-first-block-msk">в Московской области</div>}
							{bannerDescription && <p>{RichText.Content({ value: bannerDescription })}</p>}
						</div>
						{description && <p>{RichText.Content({ value: description })}</p>}
						{btnTitle && <div className={'view-services'}>{RichText.Content({ value: btnTitle })} <span className="span">{iconRightArr}</span></div>}
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