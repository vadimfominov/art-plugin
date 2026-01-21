(function (wp) {

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
		ToggleControl,
		RangeControl
	} = wp.components;

	const {
		useState,
		useEffect
	} = wp.element

	const catIcon = 'cat'

	const iconForSlide1 = (<svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M15.2344 0.78125H0.390625C0.174889 0.78125 0 0.956139 0 1.17187V16.0156C0 16.2314 0.174889 16.4062 0.390625 16.4062H15.2344C15.4501 16.4062 15.625 16.2314 15.625 16.0156V1.17187C15.625 0.956139 15.4501 0.78125 15.2344 0.78125Z" fill="#BEBEBE" fill-opacity="0.3"/>
		<path d="M33.9844 0.78125H19.1406C18.9249 0.78125 18.75 0.956139 18.75 1.17187V16.0156C18.75 16.2314 18.9249 16.4062 19.1406 16.4062H33.9844C34.2001 16.4062 34.375 16.2314 34.375 16.0156V1.17187C34.375 0.956139 34.2001 0.78125 33.9844 0.78125Z" fill="#BEBEBE" fill-opacity="0.3"/>
		</svg>);

	const iconForSlide2 = (<svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.16859 23.1016C6.16859 23.1016 2.95765 17.3828 1.60609 14.9063C-0.190788 11.6094 -0.487672 10.2188 0.754524 9.53125C1.52796 9.10156 2.59827 9.28125 3.25452 10.4219L4.78577 12.8594V3.30469C4.78577 3.30469 4.69202 0.78125 6.4889 0.78125C8.40297 0.78125 8.23891 3.30469 8.23891 3.30469V7.94531C8.23891 7.94531 9.24672 7.21875 10.4264 7.54688C11.028 7.71094 11.7311 8 12.1061 8.95313C12.1061 8.95313 14.5045 7.78906 15.6998 10.2656C15.6998 10.2656 18.4655 9.71875 18.4655 12.5859C18.4655 15.4531 15.0123 23.1016 15.0123 23.1016H6.16859Z" fill="#BEBEBE"/>
		</svg>);

	const leftArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8 1L1.56568 7.43431C1.25327 7.74673 1.25327 8.25327 1.56569 8.56568L8 15" stroke="#535353" stroke-linecap="round"/>
			</svg>);

	const rightArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 15L7.43432 8.56569C7.74674 8.25327 7.74673 7.74674 7.43432 7.43432L1 1" stroke="#535353" stroke-linecap="round"/>
			</svg>);

	registerBlockType('fv/slider-city', {
		title: 'Слайдер для города',
		icon: catIcon,
		category: 'common',
		keywords: ['Слайдер для города', 'Где живут дети', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			title1: {
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
			columns: {
            type: 'number',
            default: 4,
        	},
			blocksData: {
				type: 'array',
				default: [{ image: '', title: '' }],
		  	},
			image1: {
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
				description,
				title1,
				description1,
				label1,
				columns,
				blocksData,
				image1,
			},
			className,
			isSelected,
			setAttributes
		} = props;

		useEffect(() => {
			if (columns > blocksData.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData];
				while (newBlocksData.length < columns) {
					newBlocksData.push({ image: '', label1: '', label2: '' });
				}
				setAttributes({ blocksData: newBlocksData });
			} else if (columns < blocksData.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData: blocksData.slice(0, columns) });
			}
	  	}, [columns]);
		
		const updateBlockData = (index, key, value) => {
			const newBlocksData = [...blocksData];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData: newBlocksData });
		};
		
		const blockItems1 = Array.from({ length: columns }, (x, index) => {
			const imageURL = blocksData[index]?.image?.url;
			return (
				<li key={index} className={'slide item-' + (index + 1)}>
					{!imageURL ? 
						<MediaUpload
							allowedTypes={['image']}
							onSelect={ value => updateBlockData(index, 'image', value) }
							render={({ open }) => (
								<Button onClick={open} isPrimary isLarge>
									{ blocksData[index]?.image 
										? <img src={imageURL} alt={`test`} width={"100%"} height={"auto"} /> 
										: 'Выбрать картинку' }
								</Button>
							)}
						/>
						: 
						<>
							{ imageURL && <img src={imageURL} alt={`test`} width={"100%"} height={"auto"} />  }
							{ isSelected && (
								<Button onClick={() => updateBlockData(index, 'image', null)} className={'remove-img'}>
									{`Удалить картинку`}
								</Button>
							) }
						</>
					}
					<RichText
						tagName="span"
						onChange={ value => updateBlockData(index, 'label1', value)}
						value={blocksData[index]?.label1}
						placeholder="Label..."
						// allowedFormats={[]}
					/>
					<RichText
						tagName="span"
						onChange={ value => updateBlockData(index, 'label2', value)}
						value={blocksData[index]?.label2}
						placeholder="Label..."
						// allowedFormats={[]}
					/>
				</li>)
		});
		
		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					<PanelRow>
						<p>Количество элементов</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={columns}
							onChange={ columns => setAttributes({ columns })}
							min={1}
							max={16}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className={'wrapper'}>

					<RichText
						tagName="h2"
						onChange={ title => setAttributes({ title })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>

					<div className={'container'}>

						<div className="left-container">
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
										allowedTypes={['image']}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{image1 && image1.url 
													? <img src={image1.url} alt={image1.alt} width="100%" height="auto" /> 
													: 'Выбрать картинку'}
											</Button>
										)}
									/>
									: 
									<>
										<img src={image1.url} alt={image1.alt} width="100%" height="auto" />
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
												Удалить картинку
											</Button>
										)}
									</>
							}
							<RichText
								tagName="span"
								onChange={ title1 => setAttributes({ title1 })}
								value={title1}
								className={'left-title'}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ description1 => setAttributes({ description1 })}
								value={description1}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
							
						</div>

						<div className={'right-container'}>

							<RichText
								tagName="span"
								onChange={ label1 => setAttributes({ label1 })}
								value={label1}
								className={'left-label'}
								placeholder="label..."
								// allowedFormats={[]}
							/>

							<div className={'icons-for-slider'}>
								<span className={'icon-1'}>{iconForSlide1}</span>
								<span className={'icon-2'}>{iconForSlide2}</span>
							</div>

							<div className={'slider-box'}>
								<ul className={'slider-tab1 slider-block'}>
									{blockItems1}
								</ul>
							</div>

							<div className={'slider-tab1-pagination-btns slider-pagination'}>
								<span className={'left-btn'}>{leftArr}</span>
								<span className={'right-btn'}>{rightArr}</span>
							</div>
						</div>

					</div>

					<RichText
						tagName="p"
						onChange={ description => setAttributes({ description })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>

				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				title,
				description,
				title1,
				description1,
				label1,
				blocksData,
				image1,
			},
			className
		} = props;

		const parts = description1.split('<br>');

		return (
			<div className={className}>
				<div className={'wrapper'}>

					<RichText.Content tagName="h2" value={title} />

					<div className={'container'}>

						<div className="left-container">
							{ image1 && image1.url && 
								<img 
									src={image1.url} 
									alt={image1.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
							<RichText.Content tagName="span" className={'left-title'} value={title1} />
							{ parts.map((part, index) => (
								part && (<p key={index} dangerouslySetInnerHTML={{ __html: part }} />)
							)) }
							
						</div>

						<div className={'right-container'}>

							<RichText.Content tagName="span" className={'left-label'} value={label1} />

							<div className={'icons-for-slider'}>
								<span className={'icon-1'}>{iconForSlide1}</span>
								<span className={'icon-2'}>{iconForSlide2}</span>
							</div>

							<div className={'slider-box'}>
								<ul className={'slider-tab1 slider-block'}>
									{blocksData.map((block, index) => (
										<li key={index} className={'slide item-' + (index + 1)}>
											{block.image?.url && (
												<img
													src={block.image?.url}
													alt={'ПК фон'}
													className={'image-for-this-block'}
												/>
											)}
											<RichText.Content tagName="span" value={block.label1} />
											<RichText.Content tagName="span" value={block.label2} />
										</li>
									))}
								</ul>
							</div>

							<div className={'slider-tab1-pagination-btns slider-pagination'}>
								<span className={'left-btn'}>{leftArr}</span>
								<span className={'right-btn'}>{rightArr}</span>
							</div>
						</div>

					</div>

					{description && <RichText.Content tagName="p" value={description} />}

				</div>
			</div>
		)
  	};

})(
	window.wp
);
