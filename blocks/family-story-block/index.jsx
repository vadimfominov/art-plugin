(function (wp) {
	// cd art.loc/wp-content/plugins/art-plugin
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const {
		InspectorControls,
		MediaUpload, useBlockProps
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
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	registerBlockType("fv/family-story-block", {
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

		const blockProps = useBlockProps();

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
			<div {...blockProps}>
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
															: 'Добавить лого' } 
												</Button>
											)}
										/>
									) : ( 
									<>
										{ logo?.url && <img src={logo?.url} alt={logo?.alt} className={'logo-image-for-block'} width={'100'} height={'47'} /> }
										{ isSelected && (
											<Button onClick={() => setAttributes({ logo: null })} className={'logo-remove-img'}>
												{'Удалить лого'}
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
													{stamp?.url ? <img src={stamp?.url} alt={stamp?.alt} className={'stamp-image-for-block'} width={'204'} height={'99'} /> : 'Добавить печать'} 
												</Button>
											)}
										/>
									) : ( 
									<>
										<img src={stamp?.url} alt={stamp?.alt} className={'stamp-image-for-block'} width={'204'} height={'99'} />
										{isSelected && (
											<Button onClick={() => setAttributes({ stamp: null })} className={'stamp-remove-img'}>Удалить</Button>
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
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
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
								{imgURL ? <img src={imgURL} alt={'photo'} className={imgSlug + '-image-for-block'} width={'160'} height={'192'} /> : 'Добавить картинку'} 
							</Button>
					)}
				/>
			) : (
				<>
					{imgURL && <img src={imgURL} alt={'photo'} className={imgSlug + '-image-for-block'} width={'160'} height={'192'} />}
					{isSelected && (
							<Button onClick={() => removeImage(imgSlug)} className={imgSlug + '-remove-img'}>
								{'Удалить картинку'}
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