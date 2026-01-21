(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload } = wp.blockEditor;
	const { PanelBody, Button } = wp.components;

	const catIcon = 'cat';

	const iconMap = (<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M0.500081 8.79655V8.7945C0.500081 4.17834 3.90878 0.5 8 0.5C12.091 0.5 15.4999 4.17813 15.4999 8.8L15.4999 8.80205C15.5137 12.1653 13.6066 15.3505 11.6261 17.7372C10.6428 18.9221 9.65741 19.8911 8.91768 20.5638C8.54814 20.8998 8.24076 21.1611 8.02675 21.3377C8.0171 21.3456 8.00763 21.3534 7.99836 21.3611C7.34632 20.8333 5.79044 19.5049 4.26105 17.6488C2.32159 15.295 0.486293 12.1665 0.500081 8.79655ZM3.50004 8.8C3.50004 11.4612 5.4701 13.7 8 13.7C10.5299 13.7 12.5 11.4612 12.5 8.8C12.5 6.13877 10.5299 3.9 8 3.9C5.4701 3.9 3.50004 6.13877 3.50004 8.8Z" fill="#30A933" stroke="#30A933"/>
	</svg>);

	const iconDownload = (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
		<path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#0550AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
		<path d="M7 10L12 15L17 10" stroke="#0550AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
		<path d="M12 15V3" stroke="#0550AB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
	</svg>);

	registerBlockType('fv/download-file', {
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
			<div className={className} id={"docs"}>
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

		return (
			<div className={className} id={"docs"}>
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
