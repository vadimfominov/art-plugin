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

	const catIcon = 'cat';
	const icon1 = (<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M17.6571 3.98341C17.6571 6.94474 20.0612 9.34537 23.0269 9.34537C23.3534 9.34376 23.6791 9.31241 24 9.25171V19.882C24 24.3541 21.362 27 16.8832 27H7.12848C2.63801 27 0 24.3541 0 19.882V10.1415C0 5.66927 2.63801 3 7.12848 3H17.7509C17.6878 3.32401 17.6564 3.65335 17.6571 3.98341ZM15.0435 17.8683L18.8036 12.7017V12.6771C19.1255 12.2165 19.0434 11.5671 18.6185 11.2132C18.4128 11.0442 18.1515 10.971 17.8942 11.0104C17.637 11.0498 17.4057 11.1985 17.2533 11.4224L14.0833 15.7647L10.4736 12.7386C10.2675 12.5676 10.0054 12.4922 9.74631 12.5292C9.48725 12.5662 9.25315 12.7127 9.09685 12.9354L5.20953 18.2742C5.07289 18.4556 4.99933 18.6815 5.00128 18.9139C4.97872 19.3835 5.25722 19.8101 5.67891 19.9518C6.10059 20.0936 6.55911 19.9147 6.79454 19.5166L10.0455 15.039L13.6552 18.0528C13.8605 18.229 14.1244 18.3089 14.3862 18.2741C14.6481 18.2393 14.8853 18.0928 15.0435 17.8683Z" fill="#30A933"/>
			<circle opacity="0.4" cx="23.5" cy="3.5" r="3.5" fill="#30A933"/>
			</svg>);
	const icon2 = (<svg width="31" height="23" viewBox="0 0 31 23" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M15 15C10.1187 15 6 15.826 6 19.0139C6 22.203 10.1453 23 15 23C19.8813 23 24 22.174 24 18.9861C24 15.797 19.8547 15 15 15Z" fill="#30A933"/>
			<path opacity="0.4" d="M15 12C18.3299 12 21 9.32993 21 6C21 2.66879 18.3299 0 15 0C11.6701 0 9 2.66879 9 6C9 9.32993 11.6701 12 15 12Z" fill="#30A933"/>
			<path opacity="0.4" d="M27.835 7.3235C28.6696 3.99202 26.2225 1 23.1065 1C22.7677 1 22.4437 1.03786 22.1272 1.10222C22.0851 1.11231 22.0381 1.13376 22.0134 1.17162C21.985 1.21957 22.006 1.28393 22.0369 1.32558C22.973 2.66574 23.5108 4.29741 23.5108 6.04896C23.5108 7.72731 23.0175 9.2921 22.1519 10.5906C22.0629 10.7244 22.142 10.9048 22.2991 10.9326C22.5167 10.9717 22.7393 10.9919 22.9668 10.9982C25.2358 11.0588 27.2723 9.56846 27.835 7.3235Z" fill="#30A933"/>
			<path d="M30.7274 15.3864C30.2975 14.4185 29.2597 13.7549 27.6819 13.4291C26.9371 13.2372 24.9216 12.9668 23.047 13.0033C23.0188 13.0074 23.0034 13.0277 23.0009 13.0412C22.9971 13.0601 23.0047 13.0926 23.0418 13.1128C23.9082 13.5656 27.257 15.535 26.836 19.6887C26.8181 19.8685 26.955 20.024 27.1252 19.9969C27.9493 19.8726 30.0697 19.3914 30.7274 17.8924C31.0909 17.1003 31.0909 16.1798 30.7274 15.3864Z" fill="#30A933"/>
			<path opacity="0.4" d="M8.87222 1.10222C8.5569 1.0366 8.23168 1 7.89286 1C4.77672 1 2.32956 3.99202 3.16548 7.3235C3.72688 9.56846 5.7635 11.0588 8.03259 10.9982C8.26012 10.9919 8.48394 10.9705 8.70034 10.9326C8.85738 10.9048 8.93652 10.7244 8.84749 10.5906C7.9819 9.29084 7.48851 7.72731 7.48851 6.04896C7.48851 4.29614 8.02765 2.66448 8.96373 1.32558C8.9934 1.28393 9.01566 1.21957 8.98599 1.17162C8.96125 1.1325 8.9155 1.11231 8.87222 1.10222Z" fill="#30A933"/>
			<path d="M3.31795 13.4281C1.74008 13.7539 0.703517 14.4177 0.273537 15.3856C-0.0911789 16.1792 -0.0911789 17.0998 0.273537 17.8934C0.931304 19.3913 3.05177 19.8739 3.8759 19.9969C4.0461 20.0239 4.18175 19.8698 4.16383 19.6887C3.74281 15.5357 7.0918 13.566 7.95943 13.1131C7.99527 13.0915 8.00294 13.0604 7.99911 13.0401C7.99655 13.0266 7.98247 13.0063 7.95432 13.0036C6.07827 12.9657 4.06402 13.2361 3.31795 13.4281Z" fill="#30A933"/>
			</svg>);

	registerBlockType('fv/place-for-org', {
		title: 'Организация мероприятий',
		icon: catIcon,
		category: 'common',
		keywords: ['Организация мероприятий', 'place for org', 'yfi jgsn', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			title1: {
				type: 'string',
				default: ''
			},
			title2: {
				type: 'string',
				default: ''
			},
			title3: {
				type: 'string',
				default: ''
			},
			description2: {
				type: 'string',
				default: ''
			},
			description3: {
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
			}
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				title,
				title1,
				title2,
				title3,
				description2,
				description3,
				image4
			},
			className,
			isSelected,
			setAttributes
		} = props;
		
		return [
			<></>,
			<div className={className}>
				<div className="wrapper">
					{(isSelected || !!title) && <RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>}

					<div className={'item-block first-item-block'}>
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
									allowedTypes={['image']}
									render={({ open }) => (
										<Button onClick={open} isPrimary isLarge>
											{image4 && image4.url 
												? <img src={image4.url} alt={image4.alt} width="100%" height="auto" /> 
												: 'Выбрать картинку'}
										</Button>
									)}
								/>
								: 
								<>
									<img src={image4.url} alt={image4.alt} width="100%" height="auto" />
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
											Удалить картинку
										</Button>
									)}
								</>
						}
						<RichText
							tagName="span"
							onChange={ value => setAttributes({ title1: value })}
							value={title1}
							placeholder="Укажите заголовок..."
							// allowedFormats={[]}
						/>
					</div>

					<div className={'right-block'}>

						<div className={'item-block'}>
							<span className={'icon'}>{icon1}</span>
							<RichText
								tagName="span"
								onChange={ value => setAttributes({ title2: value })}
								value={title2}
								placeholder="Укажите заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ value => setAttributes({ description2: value })}
								value={description2}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
						</div>

						<div className={'item-block'}>
							<span className={'icon'}>{icon2}</span>
							
							<RichText
								tagName="span"
								onChange={ value => setAttributes({ title3: value })}
								value={title3}
								placeholder="Укажите заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ value => setAttributes({ description3: value })}
								value={description3}
								placeholder="Описание..."
								// allowedFormats={[]}
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
				title1,
				title2,
				title3,
				description2,
				description3,
				image4
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'wrapper'}>
					{title && <RichText.Content tagName="h2" value={title} />}
					<div className={'item-block first-item-block'}>
						{ image4 && image4.url && 
							<img 
								src={image4.url} 
								alt={image4.alt || ''} 
								width="100%" 
								height="auto" 
							/>
						}
						
						<RichText.Content tagName="span" value={title1} />
					</div>
					<div className={'right-block'}>

						<div className={'item-block'}>
							<span className={'icon'}>{icon1}</span>
							<RichText.Content tagName="span" value={title2} />
							<RichText.Content tagName="p" value={description2} />
						</div>

						<div className={'item-block'}>
							<span className={'icon'}>{icon2}</span>
							<RichText.Content tagName="span" value={title3} />
							<RichText.Content tagName="p" value={description3} />
						</div>

					</div>
				</div>
			</div>
		)
  	};

})(window.wp);