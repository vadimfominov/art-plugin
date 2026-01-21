(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const { InspectorControls, MediaUpload } = wp.blockEditor;

	const { PanelBody, Button } = wp.components;

	const catIcon = 'cat'

	registerBlockType('fv/important-for-the-child-block', {
		title: 'Важное для ребёнка',
		icon: catIcon,
		category: 'common',
		keywords: ['Важное для ребёнка', 'important for the child', 'фке', 'art'],
		attributes: {
			desktopBackground: {
				type: 'object',
				default: {},
			},
			mobileBackground: {
				type: 'object',
				default: {},
			},
			title: {
				type: 'string',
				default: 'Каждый ребенок уникален и может выбрать любую профессию'
			},
			description: {
				type: 'string',
				default: 'Верить в их способности, помогать им развиваться и дать возможность «примерить» профессию — вот что действительно важно'
			},
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				desktopBackground,
				mobileBackground,
				title,
				description
			},
			className,
			isSelected,
			setAttributes
		} = props;
		
		return [
			<InspectorControls>
				<PanelBody 
					title="Настройки фона"
					initialOpen={true}
					>
						<BackgroundImageUploader
							desktopBackground={desktopBackground}
							mobileBackground={mobileBackground}
							setAttributes={setAttributes}
							isSelected={isSelected}
						/>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className="wrapper">
					<div className={'image-bg'}>
						<picture>
							{/* Для мобильных устройств (до 770px) */}
							<source 
									srcset={mobileBackground?.url} 
									media="(max-width: 766px)" 
							/>
							{/* Для десктопов (от 1025px и выше) */}
							<source 
									srcset={desktopBackground?.url} 
									media="(min-width: 767px)" 
							/>
							{/* Фолбек для браузеров, которые не поддерживают <picture> */}
							<img 
									src={desktopBackground?.url} 
									alt="Фон" 
									className="bg-image-important" 
							/>
						</picture>
					</div>
					<div className={'content'}>
						<RichText
							tagName="h2"
							onChange={(value) => setAttributes({ title: value })}
							value={title}
							placeholder="Укажите заголовок..."
							// allowedFormats={[]}
						/>
						<RichText
							tagName="p"
							onChange={(value) => setAttributes({ description: value })}
							value={description}
							placeholder="Укажите описание..."
							// allowedFormats={['core/bold', 'core/italic', 'core/strikethrough']}
						/>
					</div>
				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: { 
				desktopBackground,
				mobileBackground,
				title,
				description
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className="wrapper">
					<div className={'image-bg'}>
						<picture>
							{/* Для мобильных устройств (до 770px) */}
							<source 
									srcset={mobileBackground?.url} 
									media="(max-width: 766px)" 
							/>
							{/* Для десктопов (от 1025px и выше) */}
							<source 
									srcset={desktopBackground?.url} 
									media="(min-width: 767px)" 
							/>
							{/* Фолбек для браузеров, которые не поддерживают <picture> */}
							<img 
									src={desktopBackground?.url} 
									alt="Фон" 
									className="bg-image-important" 
							/>
						</picture>
					</div>
					<div className={'content'}>
						<h2>{RichText.Content({ value: title })}</h2>
						<p>{RichText.Content({ value: description })}</p>
					</div>
				</div>
			</div>
		)
  	};

	function BackgroundImageUploader(props) {
		const { desktopBackground, mobileBackground, setAttributes, isSelected } = props

		const onSelectImage = (device, img) => {
			if (device === 'desktop') {
				setAttributes({ desktopBackground: { id: img.id, url: img.url, alt: img.alt } });
			} else if (device === 'mobile') {
				setAttributes({ mobileBackground: { id: img.id, url: img.url, alt: img.alt } });
			}
		};
  
		const removeImage = (device) => {
			if (device === 'desktop') {
				setAttributes({ desktopBackground: null });
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
				<p>Изображение для ПК и планшета</p>
				{renderImageUpload('desktop', desktopBackground?.url)}

				<p>Изображение для телефона</p>
				{renderImageUpload('mobile', mobileBackground?.url)}
			</div>
		);
  	};

})(window.wp);