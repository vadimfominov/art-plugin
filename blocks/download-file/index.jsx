(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { PanelBody, Button } = wp.components;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconMap = (<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M0.500081 8.79655V8.7945C0.500081 4.17834 3.90878 0.5 8 0.5C12.091 0.5 15.4999 4.17813 15.4999 8.8L15.4999 8.80205C15.5137 12.1653 13.6066 15.3505 11.6261 17.7372C10.6428 18.9221 9.65741 19.8911 8.91768 20.5638C8.54814 20.8998 8.24076 21.1611 8.02675 21.3377C8.0171 21.3456 8.00763 21.3534 7.99836 21.3611C7.34632 20.8333 5.79044 19.5049 4.26105 17.6488C2.32159 15.295 0.486293 12.1665 0.500081 8.79655ZM3.50004 8.8C3.50004 11.4612 5.4701 13.7 8 13.7C10.5299 13.7 12.5 11.4612 12.5 8.8C12.5 6.13877 10.5299 3.9 8 3.9C5.4701 3.9 3.50004 6.13877 3.50004 8.8Z" fill="#30A933" stroke="#30A933"/>
	</svg>);
	const iconDownload = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
		<path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#0550AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
		<path d="M7 10L12 15L17 10" stroke="#0550AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
		<path d="M12 15V3" stroke="#0550AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
	</svg>);
	registerBlockType("fv/download-file", {
		title: 'Шаги родителя',
		icon: catIcon,
		category: 'common',
		keywords: ['Скачать документ', 'download file', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			title1: {
				type: 'string',
				default: ''
			},
			image1: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
			title2: {
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
			title3: {
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
			title4: {
				type: 'string',
				default: ''
			},
			image4: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
		},
		supports: { anchor: true },
		edit: Edit,
		save: Save
	});
	function Edit(props) {
		const {
			attributes: {
				title,
				title1,
				image1,
				title2,
				image2,
				title3,
				image3,
				title4,
				image4
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
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={ title => setAttributes({ title })}
						value={ title }
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<div className={'container'}>
						<div className={'item'}>
							<RichText
								tagName="p"
								onChange={ title1 => setAttributes({ title1 })}
								value={ title1 }
								placeholder="Текст..."
								// allowedFormats={[]}
							/>
							{
								!image1 || !image1.url ? 
									<MediaUpload
										onSelect={(media) => {
											setAttributes({
												image1: {
													url: media.url,
													id: media.id,
													alt: media.alt || ''
												}
											});
										}}
										allowedTypes={['pdf']}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{image1 && image1.url 
													? <a href={image1.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
													: 'Загрузить файл'}
											</Button>
										)}
									/>
									: 
									<>
										<a href={image1.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
										{isSelected && (
											<Button 
												onClick={() => setAttributes({ 
													image1: {
														url: '',
														id: null,
														alt: ''
													}
												})} 
												className={'remove-img'}
											>
												Удалить файл
											</Button>
										)}
									</>
							}
						</div>
						<div className={'item'}>
							<RichText
								tagName="p"
								onChange={ title2 => setAttributes({ title2 })}
								value={ title2 }
								placeholder="Текст..."
								// allowedFormats={[]}
							/>
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
										allowedTypes={['pdf']}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{image2 && image2.url 
													? <a href={image2.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
													: 'Загрузить файл'}
											</Button>
										)}
									/>
									: 
									<>
										<a href={image2.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
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
												Удалить файл
											</Button>
										)}
									</>
							}
						</div>
						<div className={'item'}>
							<RichText
								tagName="p"
								onChange={ title3 => setAttributes({ title3 })}
								value={ title3 }
								placeholder="Текст..."
								// allowedFormats={[]}
							/>
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
										allowedTypes={['pdf']}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{image3 && image3.url 
													? <a href={image3.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
													: 'Загрузить файл'}
											</Button>
										)}
									/>
									: 
									<>
										<a href={image3.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
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
												Удалить файл
											</Button>
										)}
									</>
							}
						</div>
						<div className={'item'}>
							<RichText
								tagName="p"
								onChange={ title4 => setAttributes({ title4 })}
								value={ title4 }
								placeholder="Текст..."
								// allowedFormats={[]}
							/>
							{
								!image4 || !image4.url ? 
									<MediaUpload
										onSelect={(media) => {
											setAttributes({
												image4: {
													url: media.url,
													id: media.id,
													alt: media.alt || ''
												}
											});
										}}
										allowedTypes={['pdf']}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{image4 && image4.url 
													? <a href={image4.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
													: 'Загрузить файл'}
											</Button>
										)}
									/>
									: 
									<>
										<a href={image4.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
										{isSelected && (
											<Button 
												onClick={() => setAttributes({ 
													image4: {
														url: '',
														id: null,
														alt: ''
													}
												})} 
												className={'remove-img'}
											>
												Удалить файл
											</Button>
										)}
									</>
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
				title1,
				image1,
				title2,
				image2,
				title3,
				image3,
				title4,
				image4
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<div className={'container'}>
						{title1 && <div className={'item'}>
							<RichText.Content tagName="p" value={title1} />
							{ image1 && image1.url && 
								<a href={image1.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
							}
						</div>}
						{title2 && <div className={'item'}>
							<RichText.Content tagName="p" value={title2} />
							{ image2 && image2.url && 
								<a href={image2.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
							}
						</div>}
						{title3 && <div className={'item'}>
							<RichText.Content tagName="p" value={title3} />
							{ image3 && image3.url && 
								<a href={image3.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
							}
						</div>}
						{title4 && <div className={'item'}>
							<RichText.Content tagName="p" value={title4} />
							{ image4 && image4.url && 
								<a href={image4.url} target={"_blank"} aria-label={'download file'} >{iconDownload} Скачать файл</a>
							}
						</div>}
					</div>
				</div>
			</div>
		)
  	};
})(
	window.wp
);