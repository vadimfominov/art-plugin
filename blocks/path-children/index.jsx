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
	const iconPlay = (<svg width="23" height="38" viewBox="0 0 23 38" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M23 19L0.5 37.1865L0.500002 0.813466L23 19Z" fill="#535353" />
	</svg>);
	registerBlockType("fv/path-children", {
		title: 'Путь детей',
		icon: catIcon,
		category: 'common',
		keywords: ['path-children', 'фке', 'art', 'msk', 'msc'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
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
			video: {
				type: 'object',
				default: {
					url: '',
					id: null,
				}
			},
			description1: {
				type: 'string',
				default: ''
			},
			label1: {
				type: 'string',
				default: ''
			},
			image2: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
			description2: {
				type: 'string',
				default: ''
			},
			label2: {
				type: 'string',
				default: ''
			},
			image3: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
			description3: {
				type: 'string',
				default: ''
			},
			label3: {
				type: 'string',
				default: ''
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
			description4: {
				type: 'string',
				default: ''
			},
			label4: {
				type: 'string',
				default: ''
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
				image,
				description1,
				label1,
				image2,
				description2,
				label2,
				image3,
				description3,
				label3,
				video,
				desktopBackground,
				tabletBackground,
				mobileBackground,
				description4,
				label4
			},
			className,
			isSelected,
			setAttributes
		} = props;
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки изображения"
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
				<div className={'wrapper'}>
					{(isSelected || !!title) && <RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Заголовок..."
					/>}
					{(isSelected || !!description) && <RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="description..."
					/>}
					<div className={'container-path-children'}>
						<div className={'path-children'}>
							<div className={'item'}>
								<div className="text-box">
									<span class="icon-curcle"></span>
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
								<div className="item-img">
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
							<div className={'item'}>
								<div className="text-box">
									<span class="icon-curcle"></span>
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
								<div className="item-img">
									{
										!image2 || !image2.url ?
											<MediaUpload
												onSelect={(media) => {
													setAttributes({
														image2: {
															url: media.url,
															id: media.id,
															alt: media.alt || ''
														}
													});
												}}
												allowedTypes={['image']}
												render={({ open }) => (
													<Button onClick={open} isPrimary isLarge>
														{image2 && image2.url
															? <img src={image2.url} alt={image2.alt} width="100%" height="auto" />
															: 'Выбрать картинку'}
													</Button>
												)}
											/>
											:
											<>
												<img src={image2.url} alt={image2.alt} width="100%" height="auto" />
												{isSelected && (
													<Button
														onClick={() => setAttributes({
															image2: {
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
							<div className={'item'}>
								<div className="text-box">
									<span class="icon-curcle"></span>
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
								<div className="item-img">
									{
										!image3 || !image3.url ?
											<MediaUpload
												onSelect={(media) => {
													setAttributes({
														image3: {
															url: media.url,
															id: media.id,
															alt: media.alt || ''
														}
													});
												}}
												allowedTypes={['image']}
												render={({ open }) => (
													<Button onClick={open} isPrimary isLarge>
														{image3 && image3.url
															? <img src={image3.url} alt={image3.alt} width="100%" height="auto" />
															: 'Выбрать картинку'}
													</Button>
												)}
											/>
											:
											<>
												<img src={image3.url} alt={image3.alt} width="100%" height="auto" />
												{isSelected && (
													<Button
														onClick={() => setAttributes({
															image3: {
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
						<div className="bottom-block">
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
									className="img-for-block"
								/>
							</picture>
							{
								!video || !video.url ?
									<MediaUpload
										onSelect={(media) => {
											setAttributes({
												video: {
													url: media.url,
													id: media.id,
												}
											});
										}}
										allowedTypes={['video']}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{video && video.url
													? videoFrame(video.url)
													: 'Выбрать video'}
											</Button>
										)}
									/>
									:
									<>
										{videoFrame(video.url)}
										{isSelected && (
											<Button
												onClick={() => setAttributes({
													video: {
														url: '',
														id: null
													}
												})}
												className={'remove-video'}
											>
												Удалить video
											</Button>
										)}
									</>
							}
							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ label4: value })}
								value={label4}
								placeholder="Описание..."
							/>
							<RichText
								tagName="p"
								onChange={(value) => setAttributes({ description4: value })}
								value={description4}
								placeholder="Описание..."
							/>
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
				image,
				description1,
				label1,
				image2,
				description2,
				label2,
				image3,
				description3,
				label3,
				video,
				desktopBackground,
				tabletBackground,
				mobileBackground,
				description4,
				label4
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					{title && <RichText.Content tagName="h2" value={title} />}
					{description && <RichText.Content tagName="p" value={description} />}
					<div className={'container-path-children'}>
						<div className={'path-children'}>
							<div className={'item'}>
								<div className="text-box">
									<span class="icon-curcle"></span>
									{label1 && <RichText.Content tagName="span" value={label1} />}
									{description1 && <RichText.Content tagName="p" value={description1} />}
								</div>
								<div className={'item-img'}>
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
							<div className={'item'}>
								<div className="text-box">
									<span class="icon-curcle"></span>
									{label2 && <RichText.Content tagName="span" value={label2} />}
									{description2 && <RichText.Content tagName="p" value={description2} />}
								</div>
								<div className={'item-img'}>
									{image2 && image2.url &&
										<img
											src={image2.url}
											alt={image2.alt || ''}
											width="100%"
											height="auto"
										/>
									}
								</div>
							</div>
							<div className={'item'}>
								<div className="text-box">
									<span class="icon-curcle"></span>
									{label3 && <RichText.Content tagName="span" value={label3} />}
									{description3 && <RichText.Content tagName="p" value={description3} />}
								</div>
								<div className={'item-img'}>
									{image3 && image3.url &&
										<img
											src={image3.url}
											alt={image3.alt || ''}
											width="100%"
											height="auto"
										/>
									}
								</div>
							</div>
						</div>
						<div className="bottom-block">
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
									className="img-for-block"
								/>
							</picture>
							{videoFrame(video.url)}
							{label4 && <RichText.Content tagName="span" value={label4} />}
							{description4 && <RichText.Content tagName="p" value={description4} />}
						</div>
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
	function videoFrame(videoURL) {
		return (
			<div className={'content-video'}>
				<video
					src={videoURL}
					preload="none"
					frameborder="0"
					allow="autoplay; encrypted-media"
				>
					<source src={videoURL} type="video/mp4"></source>
				</video>
				<span className={'play-video'}>{iconPlay}</span>
			</div>
		);
	}
})(
	window.wp
);