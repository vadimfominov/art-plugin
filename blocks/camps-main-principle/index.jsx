(function (wp) {
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
	const iconRightArr = (
		<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#E94E4E" />
		</svg>
	);
	registerBlockType("fv/camps-main-principle", {
		title: 'Главный принцип лагеря',
		icon: catIcon,
		category: 'common',
		keywords: ['camps-main-principle', 'фке', 'art', 'msk', 'msc'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			svgKey1: {
				type: 'string',
				default: ''
			},
			description1: {
				type: 'string',
				default: ''
			},
			label1: {
				type: 'string',
				default: ''
			},
			svgKey2: {
				type: 'string',
				default: ''
			},
			description2: {
				type: 'string',
				default: ''
			},
			label2: {
				type: 'string',
				default: ''
			},
			svgKey3: {
				type: 'string',
				default: ''
			},
			description3: {
				type: 'string',
				default: ''
			},
			label3: {
				type: 'string',
				default: ''
			},
			image: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
		},
		edit: Edit,
		save: Save
	});
	function Edit(props) {
		const {
			attributes: {
				title,
				svgKey1,
				description1,
				label1,
				svgKey2,
				description2,
				label2,
				svgKey3,
				description3,
				label3,
				image
			},
			className,
			isSelected,
			setAttributes
		} = props;
		const fetchSVGContent = async (url, svgContent) => {
			try {
				const response = await fetch(url);
				if (response.ok) {
					const text = await response.text();
					setAttributes({ [svgContent]: text });
				} else {
					console.error('Error fetching the SVG file.');
				}
			} catch (error) {
				console.error('Error:', error);
			}
		};
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
			</InspectorControls>,
			<div {...blockProps}>
				<div className={'wrapper'}>
					<div className={'container-camps-main-principle'}>
						<div className="camps-main-left">
							{(isSelected || !!title) && <RichText
								tagName="h2"
								onChange={(value) => setAttributes({ title: value })}
								value={title}
								placeholder="Заголовок..."
							/>}
							<div className="pc-btn">{btnFilter(iconRightArr)}</div>
						</div>
						<div className={'camps-main-principle'}>
							<div className={'item'}>
								{isSelected ? (
									<MediaUpload
										allowedTypes={['image/svg+xml']}
										onSelect={(media) => fetchSVGContent(media.url, 'svgKey1')}
										render={({ open }) => (
											<Button onClick={open} className={'svg-icon-wrapper'}>
												{svgKey1 ? svgBlock(svgKey1) : 'Выбрать SVG'}
											</Button>
										)}
									/>
								) : (svgBlock(svgKey1))}
								<div className="box-item">
									<RichText
										tagName="span"
										onChange={(value) => setAttributes({ label1: value })}
										value={label1}
										placeholder="Описание..."
									/>
									<RichText
										tagName="p"
										onChange={(value) => setAttributes({ description1: value })}
										value={description1}
										placeholder="Описание..."
									/>
								</div>
							</div>
							<div className={'item'}>
								{isSelected ? (
									<MediaUpload
										allowedTypes={['image/svg+xml']}
										onSelect={(media) => fetchSVGContent(media.url, 'svgKey2')}
										render={({ open }) => (
											<Button onClick={open} className={'svg-icon-wrapper'}>
												{svgKey2 ? svgBlock(svgKey2) : 'Выбрать SVG'}
											</Button>
										)}
									/>
								) : (svgBlock(svgKey2))}
								<div className="box-item">
									<RichText
										tagName="span"
										onChange={(value) => setAttributes({ label2: value })}
										value={label2}
										placeholder="Описание..."
									/>
									<RichText
										tagName="p"
										onChange={(value) => setAttributes({ description2: value })}
										value={description2}
										placeholder="Описание..."
									/>
								</div>
							</div>
							<div className={'item'}>
								{isSelected ? (
									<MediaUpload
										allowedTypes={['image/svg+xml']}
										onSelect={(media) => fetchSVGContent(media.url, 'svgKey3')}
										render={({ open }) => (
											<Button onClick={open} className={'svg-icon-wrapper'}>
												{svgKey3 ? svgBlock(svgKey3) : 'Выбрать SVG'}
											</Button>
										)}
									/>
								) : (svgBlock(svgKey3))}
								<div className="box-item">
									<RichText
										tagName="span"
										onChange={(value) => setAttributes({ label3: value })}
										value={label3}
										placeholder="Описание..."
									/>
									<RichText
										tagName="p"
										onChange={(value) => setAttributes({ description3: value })}
										value={description3}
										placeholder="Описание..."
									/>
								</div>
							</div>
						</div>
						<div className="mobile-btn">{btnFilter(iconRightArr)}</div>
						{
							!image || !image.url ?
								<MediaUpload
									onSelect={(media) => {
										setAttributes({
											image: {
												url: media.url,
												id: media.id,
												alt: media.alt || ''
											}
										});
									}}
									allowedTypes={['image']}
									render={({ open }) => (
										<Button onClick={open} isPrimary isLarge>
											{image && image.url
												? <img src={image.url} alt={image.alt} width="100%" height="auto" />
												: 'Выбрать картинку'}
										</Button>
									)}
								/>
								:
								<>
									<img src={image.url} alt={image.alt} width="100%" height="auto" />
									{isSelected && (
										<Button
											onClick={() => setAttributes({
												image: {
													url: '',
													id: null,
													alt: ''
												}
											})}
											className={'remove-img'}
										>
											Удалить картинку
										</Button>
									)}
								</>
						}
					</div>
				</div>
			</div>
		];
	}
	function Save(props) {
		const {
			attributes: {
				title,
				svgKey1,
				description1,
				label1,
				svgKey2,
				description2,
				label2,
				svgKey3,
				description3,
				label3,
				image
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<div className={'container-camps-main-principle'}>
						<div className="camps-main-left">
							{title && <RichText.Content tagName="h2" value={title} />}
							<div className="pc-btn">{btnFilter(iconRightArr)}</div>
						</div>
						<div className={'camps-main-principle'}>
							<div className={'item'}>
								{svgKey1 && svgBlock(svgKey1)}
								<div className="box-item">
									{label1 && <RichText.Content tagName="span" value={label1} />}
									{description1 && <RichText.Content tagName="p" value={description1} />}
								</div>
							</div>
							<div className={'item'}>
								{svgKey2 && svgBlock(svgKey2)}
								<div className="box-item">
									{label2 && <RichText.Content tagName="span" value={label2} />}
									{description2 && <RichText.Content tagName="p" value={description2} />}
								</div>
							</div>
							<div className={'item'}>
								{svgKey3 && svgBlock(svgKey3)}
								<div className="box-item">
									{label3 && <RichText.Content tagName="span" value={label3} />}
									{description3 && <RichText.Content tagName="p" value={description3} />}
								</div>
							</div>
						</div>
						<div className="mobile-btn">{btnFilter(iconRightArr)}</div>
						{image && image.url &&
							<img
								src={image.url}
								alt={image.alt || ''}
								width="100%"
								height="auto"
							/>
						}
					</div>
				</div>
			</div>
		)
	};
	function svgBlock(svg) {
		return (<div className="svg-icon-wrapper">
			{svg && (
				<div dangerouslySetInnerHTML={{ __html: svg }} />
			)}
		</div>);
	}
	function btnFilter(icon) {
		return (<div className={'view-services'}>
			<a href="#filter">Выбрать профессию</a>
			<span>{icon}</span>
		</div>);
	}
})(
	window.wp
);