(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const { InspectorControls, MediaUpload } = wp.blockEditor;

	const {
		PanelBody,
		PanelRow,
		Button,
		RangeControl
	} = wp.components;

	const { useEffect } = wp.element

	const catIcon = 'cat'

	registerBlockType('fv/child-at-home', {
		title: 'Новый взгляд',
		icon: catIcon,
		category: 'common',
		keywords: ['Новый взгляд', 'child at home', 'фке', 'art'],
		attributes: {
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
			description: {
				type: 'string',
				default: 'Ваш ребёнок вернётся домой с новым взглядом на мир, пониманием собственных интересов и вдохновением развиваться в любимом направлении'
			},
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				desktopBackground,
				tableBackground,
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
							tableBackground={tableBackground}
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
					<div className={'content'}>
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
				tableBackground,
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
					<div className={'content'}>
						<p>{RichText.Content({ value: description })}</p>
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
				{renderImageUpload('table', tableBackground?.url)}

				<p>Изображение для телефона</p>
				{renderImageUpload('mobile', mobileBackground?.url)}
			</div>
		);
  	};

})(window.wp);