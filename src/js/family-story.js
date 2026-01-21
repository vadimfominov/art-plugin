(function (wp) {

	// cd art.loc/wp-content/plugins/art-plugin

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const { apiFetch } = wp;

	const {
		InspectorControls,
		MediaUpload,
	} = wp.blockEditor;

	const {
		TextControl,
		PanelBody,
		PanelRow,
		Button,
		SelectControl
	} = wp.components;

	const {
		useState,
		useEffect
	} = wp.element

	const catIcon = 'cat'

	registerBlockType('fv/family-story-block', {
		title: 'История одной семьи',
		icon: catIcon,
		category: 'common',
		keywords: ['История одной семьи', 'family story', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: 'Всё началось с истории одной семьи, где ребёнок не мог определиться с выбором профессии'
			},
			description: {
				type: 'string',
				default: 'Центр развития детей и выбора профессии «АРТ Личность» — это социальный бизнес, основанный семейной парой Фарраховым Айдаром и Заболотской Ольгой'
			},
			image1: {
				type: 'object',
				default: {},
			},
			image2: {
				type: 'object',
				default: {},
			},
			logo: {
				type: 'object',
				default: {},
			},
			date: {
				type: 'string',
				default: '01.06.2009г.'
			},
			stamp: {
				type: 'object',
				default: {},
			},
			docDescription: {
				type: 'array',
				default: [],
			}
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				title,
				description,
				image1,
				image2,
				logo,
				date,
				docDescription,
				stamp
			},
			className,
			isSelected,
			setAttributes
		} = props;

		return [
			<InspectorControls>
				<PanelBody
					title="Ссылки на соцсети"
					initialOpen={true}
				>
					{/* <PanelRow>
						<TextControl
							label="Имя пользователя VK"
							onChange={(newValue) => setAttributes({ vk: newValue })}
							value={vk}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow> */}
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className="wrapper">
					<RichText
						tagName="h2"
						onChange={ value => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<RichText
						tagName="p"
						onChange={ value => setAttributes({ description: value })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>
					<div className={'block-container'}>
						<div className={'left-block'}>
							<ImageUploader
								image1={image1}
								image2={image2}
								setAttributes={setAttributes}
								isSelected={isSelected}
							/>
						</div>
						<div className={'right-block'}>
							{
								!logo?.url ? (
										<MediaUpload
											onSelect={(img) => setAttributes({ logo: { id: img.id, url: img.url, alt: img.alt } })}
											allowedTypes={['image']}
											render={({ open }) => (
												<Button onClick={open} className={'logo-add-img'}>
													{ logo?.url 
															? <img src={logo?.url} alt={logo?.alt} className={'logo-image-for-block'} width={'100'} height={'47'} /> 
															: `Добавить лого` } 
												</Button>
											)}
										/>
									) : ( 
									<>
										{ logo?.url && <img src={logo?.url} alt={logo?.alt} className={'logo-image-for-block'} width={'100'} height={'47'} /> }
										{ isSelected && (
											<Button onClick={() => setAttributes({ logo: null })} className={'logo-remove-img'}>
												{`Удалить лого`}
											</Button>
										) }
									</>
								)
							}
							<RichText
								tagName="span"
								onChange={ value => setAttributes({ date: value })}
								value={date}
								placeholder="data..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="div"
								multiline="p"
								onChange={(value) => {
									if (Array.isArray(value)) {
										setAttributes({ docDescription: value });
									} else {
										setAttributes({ docDescription: value ? [value] : [] });
									}
								}}
								value={docDescription}
								placeholder="Описание..."
								// allowedFormats={['core/bold']}
							/>
							{
								!stamp?.url ? (
										<MediaUpload
											onSelect={(img) => setAttributes({ stamp: { id: img.id, url: img.url, alt: img.alt } })}
											allowedTypes={['image']}
											render={({ open }) => (
												<Button onClick={open} className={'stamp-add-img'}>
													{stamp?.url ? <img src={stamp?.url} alt={stamp?.alt} className={'stamp-image-for-block'} width={'204'} height={'99'} /> : `Добавить печать`} 
												</Button>
											)}
										/>
									) : ( 
									<>
										<img src={stamp?.url} alt={stamp?.alt} className={'stamp-image-for-block'} width={'204'} height={'99'} />
										{isSelected && (
											<Button onClick={() => setAttributes({ stamp: null })} className={'stamp-remove-img'}>
												{`Удалить печать`}
											</Button>
										)}
									</>
								)
							}
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
				image1,
				image2,
				logo,
				date,
				stamp,
				docDescription
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<div className={'block-container'}>
						<div className={'left-block'}>
							{image1?.url && (
								<img
									src={image1?.url}
									alt={image1?.alt}
									className={'image1-image-for-block'}
									width={'160'}
									height={'192'}
								/>
							)}
							{image2?.url && (
								<img
									src={image2?.url}
									alt={image2?.alt}
									className={'image2-image-for-block'}
									width={'160'}
									height={'192'}
								/>
							)}
						</div>
						<div className={'right-block'}>
							{logo?.url && (
								<img
									src={logo?.url}
									alt={logo?.alt}
									className={'logo-image-for-block'}
									width={'100'}
									height={'47'}
								/>
							)}
							<RichText.Content tagName="span" value={date} />
							{Array.isArray(docDescription) && docDescription.map((block, index) => {
								const text = block.props.children[0];
								return <p key={index}>{text}</p>
							})}
							{stamp?.url && (
								<img
									src={stamp?.url}
									alt={stamp?.alt}
									className={'stamp-image-for-block'}
									width={'204'}
									height={'99'}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		)
  	};

	function ImageUploader(props) {
		const { image1, image2, setAttributes, isSelected } = props

		const onSelectImage = (imgSlug, img) => {
			if (imgSlug === 'image1') {
				setAttributes({ image1: { id: img.id, url: img.url, alt: img.alt } });
			} else if (imgSlug === 'image2') {
				setAttributes({ image2: { id: img.id, url: img.url, alt: img.alt } });
			}
		};
  
		const removeImage = (imgSlug) => {
			if (imgSlug === 'image1') {
				setAttributes({ image1: null });
			} else if (imgSlug === 'image2') {
				setAttributes({ image2: null });
			}
		};
  
		const renderImageUpload = (imgSlug, imgURL) =>
			!imgURL ? (
				<MediaUpload
					onSelect={(img) => onSelectImage(imgSlug, img)}
					allowedTypes={['image']}
					render={({ open }) => (
							<Button onClick={open} className={!imgURL ? imgSlug + '-is-add ' + imgSlug + '-add-img' : imgSlug + '-add-img'}>
								{imgURL ? <img src={imgURL} alt={`Картинка`} className={imgSlug + '-image-for-block'} width={'160'} height={'192'} /> : `Добавить картинку`} 
							</Button>
					)}
				/>
			) : (
				<>
					{imgURL && <img src={imgURL} alt={`Картинка`} className={imgSlug + '-image-for-block'} width={'160'} height={'192'} />}
					{isSelected && (
							<Button onClick={() => removeImage(imgSlug)} className={imgSlug + '-remove-img'}>
								{`Удалить картинку`}
							</Button>
					)}
				</>
			);
  
		return (
			<>
				{renderImageUpload('image1', image1?.url)}

				{renderImageUpload('image2', image2?.url)}
			</>
		);
  	};

})(
	window.wp
);
