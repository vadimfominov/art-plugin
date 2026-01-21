(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload } = wp.blockEditor;
	const { TextControl, PanelBody, PanelRow, Button, RangeControl } = wp.components;
	const { useEffect } = wp.element
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
		<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z"/>
		<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z"/>
		</g>
	</svg>);

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

	registerBlockType('fv/child-history', {
		title: 'Истории детей',
		icon: catIcon,
		category: 'common',
		keywords: ['Истории детей', 'child history', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			blocksData: {
				type: 'array',
				default: [{ image: '', title: '', description: '', label: '' }],
		  	},
			columns: {
            type: 'number',
            default: 4, // Начальное значение для количества столбцов
        	},
			classSlider: {
				type: 'string',
				default: ''
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
				description,
				blocksData,
				columns,
				classSlider
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
					newBlocksData.push({ image: '', title: '', description: '', label: '' });
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

		const blockItems = Array.from({ length: columns }, (x, index) => {
			const imageURL = blocksData[index]?.image?.url;
			const title = blocksData[index]?.title || '';
			const description = blocksData[index]?.description || '';
			const label = blocksData[index]?.label || '';
	  
			return (
				 <li key={index} className={'slide item-' + (index + 1)}>
					<div className={'slide-item'}>
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
								onChange={(value) => updateBlockData(index, 'title', value)}
								value={title}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={(value) => updateBlockData(index, 'description', value)}
								value={description}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="span"
								onChange={(value) => updateBlockData(index, 'label', value)}
								value={label}
								placeholder="label..."
								// allowedFormats={[]}
							/>
					</div>
				</li>
			);
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
							onChange={value => setAttributes({ columns: value })}
							min={1}
							max={12}
						/>
					</PanelRow>
					<PanelRow>
						<p>Добавить класс для слайдера</p>
						<TextControl
							onChange={ value => setAttributes({ classSlider: value }) }
							value={classSlider}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>

				<div className="wrapper">

					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Заголовок..."
						// allowedFormats={['core/text-color']}
					/>

					<RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>

					<div className={'icons-for-slider'}>
						<span className={'icon-1'}>{iconForSlide1}</span>
						<span className={'icon-2'}>{iconForSlide2}</span>
					</div>

					<div className={'slider-container'}>
						<div className={'slider-box'}>
							<ul className={classSlider + ' slider-block'}>
								{blockItems}
							</ul>
						</div>
						<div className={classSlider + '-pagination-btns slider-pagination'}>
							<span className={'left-btn'}>{leftArr}</span>
							<span className={'right-btn'}>{rightArr}</span>
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
				blocksData,
				classSlider
			},
			className
		} = props;

		return (
			<div className={className}>

				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					{description && <RichText.Content tagName="p" value={description} />}
					<div className={'icons-for-slider'}>
						<span className={'icon-1'}>{iconForSlide1}</span>
						<span className={'icon-2'}>{iconForSlide2}</span>
					</div>
					<div className={'slider-container'}>
						<div className={'slider-box'}>
							<ul className={classSlider + ' slider-block'}>
									{blocksData.map((block, index) => (
										<li key={index} className={'slide item-' + (index + 1)}>
											<div className={'slide-item'}>
												{block.image?.url && (
													<img
															src={block.image.url}
															alt={block.image.alt}
															className={'image-for-video'}
															width={"100%"}
															height={"auto"}
													/>
												)}
												{block.title && <span>{block.title}</span>}
												{block.description && <p>{block.description}</p>}
												{block.label && <span>{block.label}</span> }
											</div>
										</li>
									))}
							</ul>
						</div>
						<div className={classSlider + '-pagination-btns slider-pagination'}>
							<span className={'left-btn'}>{leftArr}</span>
							<span className={'right-btn'}>{rightArr}</span>
						</div>
					</div>
				</div>

			</div>
		)
  	};

})(
	window.wp
);
