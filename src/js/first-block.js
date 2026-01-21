(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const {
		InspectorControls,
		MediaUpload,
	} = wp.blockEditor;

	const {
		PanelBody,
		PanelRow,
		Button,
		ToggleControl,
	} = wp.components;

	const catIcon = 'cat'

	const iconRightArr = (
						<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#E94E4E"/>
					</svg>
					);

	registerBlockType('fv/first-block', {
		title: 'Главный экран',
		icon: catIcon,
		category: 'common',
		keywords: ['Главный экран', 'фке', 'art'],
		attributes: {
			bannerDescription: {
				type: 'string',
				default: '15 лет помогаем детям от 7 до 17 лет сделать правильный выбор будущего'
			},
			bannerTitle: {
				type: 'string',
				default: 'Помогаем детям выбрать профессию'
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
			inService: {
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
				bannerDescription,
				bannerTitle,
				linkCategory,
				desktopBackground,
            tabletBackground,
            mobileBackground,
				inService,
				btnTitle
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
						<p>Включить ссылки на услуги</p>
						<ToggleControl
							checked={inService}
							onChange={() => setAttributes({ inService: !inService })}
							__nextHasNoMarginBottom={ true }
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
			<div className={className}>

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
					<div class="label-card-first-block">АРТ Личность расширяется: этим летом мы открываем <a href="https://art-lichnost.ru/professions/?city=Москва#filter" >лагерь в Москве.</a></div>
					<div className="content">
						<RichText
							tagName="h1"
							onChange={(newValue) => setAttributes({ bannerTitle: newValue })}
							value={bannerTitle}
							placeholder="Укажите заголовок..."
							// allowedFormats={[]}
						/>
						<RichText
							tagName="p"
							onChange={(newValue) => setAttributes({ bannerDescription: newValue })}
							value={bannerDescription}
							placeholder="Укажите описание..."
							// allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
						/>
						<div className={'view-services'}>
							<RichText
								tagName="p"
								onChange={ value => setAttributes({ btnTitle: value })}
								value={btnTitle}
								placeholder="Посмотреть услуги"
								// allowedFormats={['core/link']}
							/>
							<span>{iconRightArr}</span>
						</div>
					</div>

					{inService && <div className={'footer-links'}>
						<RichText
							tagName="div"
							onChange={(newValue) => setAttributes({ linkCategory: newValue })}
							value={linkCategory}
							placeholder="Название категории..."
							// allowedFormats={['core/link']}
						/>
					</div>}
					
				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				bannerDescription,
				bannerTitle,
				linkCategory,
				desktopBackground,
            tabletBackground,
            mobileBackground,
				inService,
				btnTitle
			},
			className
		} = props;

		return (
			<div className={className}>
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

					<div class="label-card-first-block">АРТ Личность расширяется: этим летом мы открываем <a href="https://art-lichnost.ru/professions/?city=Москва#filter" >лагерь в Москве.</a></div>

					<div className="content">
						<h1>{RichText.Content({ value: bannerTitle })}</h1>
						<p>{RichText.Content({ value: bannerDescription })}</p>
						<div className={'view-services'}>{RichText.Content({ value: btnTitle })} <span>{iconRightArr}</span></div>
					</div>
					{inService && <div className={'footer-links'}>{RichText.Content({ value: linkCategory })}</div>}
					
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
