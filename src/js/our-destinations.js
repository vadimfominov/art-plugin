(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls } = wp.blockEditor;
	const { PanelBody, PanelRow, RangeControl } = wp.components;
	const { useEffect } = wp.element

	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
		<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z"/>
		<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z"/>
		</g>
	</svg>);

	const iconUser = <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14 15V13.6667C14 12.9594 13.6839 12.2811 13.1213 11.781C12.5587 11.281 11.7956 11 11 11H5C4.20435 11 3.44129 11.281 2.87868 11.781C2.31607 12.2811 2 12.9594 2 13.6667V15" stroke="#535353" stroke-width="1.61905" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M8 8C9.65685 8 11 6.65685 11 5C11 3.34315 9.65685 2 8 2C6.34315 2 5 3.34315 5 5C5 6.65685 6.34315 8 8 8Z" stroke="#535353" stroke-width="1.61905" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>

	const iconRightArr = (<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#E94E4E"/>
					</svg>
					);

	const circle = (<svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="2" cy="2" r="2" fill="#30A933"/>
					</svg>);

	const renderIcons = (count) => {
		return Array.from({ length: count }).map((_, index) => (
		<React.Fragment key={index}>{circle}</React.Fragment>
		));
	};

	const MyComponent = ({ iconCount }) => (
		<>
		  {renderIcons(iconCount)}
		</>
	);

	registerBlockType('fv/our-destinations', {
		title: 'Наши направления',
		icon: catIcon,
		category: 'common',
		keywords: ['наши направления', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: 'Создали 4 направления, чтобы каждый ребенок нашел профессию по душе'
			},
			campData: {
				type: 'array',
				default: [{ title: '', description: '', link: 'Подробнее', old: '' }],
		  	},
			proftestData: {
				type: 'array',
				default: [{ title: '', description: {
					type: 'array',
					default: [],
				} }],
		  	},
			courceData: {
				type: 'array',
				default: [{ title: '', description: '', old: '' }],
		  	},
			consultData: {
				type: 'array',
				default: [{ title: '', description: '' }],
		  	},
			proftestDescr: {
				type: 'array',
				default: [],
			},
			courceDescr: {
				type: 'array',
				default: [],
			},
			consultDescr: {
				type: 'array',
				default: [],
			},
			proftestLink: {
				type: 'string',
				default: 'Подробнее'
			},
			courceLink: {
				type: 'string',
				default: 'Подробнее'
			},
			consultLink: {
				type: 'string',
				default: 'Подробнее'
			},
			campColumns: {
            type: 'number',
            default: 4,
        	},
			proftestColumns: {
            type: 'number',
            default: 2,
        	},
			courceColumns: {
            type: 'number',
            default: 6,
        	},
			consultColumns: {
            type: 'number',
            default: 2,
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
				campData,
				proftestData,
				courceData,
				consultData,
				proftestDescr,
				courceDescr,
				consultDescr,
				proftestLink,
				courceLink,
				consultLink,
				campColumns,
				proftestColumns,
				courceColumns,
				consultColumns,
			},
			className,
			setAttributes
		} = props;

		const adjustDataArray = (dataArray, columns, template) => {
			if (columns > dataArray.length) {
				// Если больше, добавляем новые объекты
				const newDataArray = [...dataArray];
				while (newDataArray.length < columns) {
					newDataArray.push(template);
				}
				return newDataArray;
			}
			if (columns < dataArray.length) {
				// Если меньше, удаляем лишние объекты
				return dataArray.slice(0, columns);
			}
			return dataArray;
	  	};

		useEffect(() => {
			const updatedCampData = adjustDataArray(campData, campColumns, { title: '', description: '', link: '', old: '' });
			setAttributes({ campData: updatedCampData });
		}, [campColumns]);
		
		useEffect(() => {
			const updatedProftestData = adjustDataArray(proftestData, proftestColumns, { title: '', description: '' });
			setAttributes({ proftestData: updatedProftestData });
		}, [proftestColumns]);

		useEffect(() => {
			const updatedCourceData = adjustDataArray(courceData, courceColumns, { title: '', description: '', old: '' });
			setAttributes({ courceData: updatedCourceData });
		}, [courceColumns]);

		useEffect(() => {
			const updatedConsultData = adjustDataArray(consultData, consultColumns, { title: '', description: '' });
			setAttributes({ consultData: updatedConsultData });
		}, [consultColumns]);

		const updatedCampData = (index, key, value) => {
			const newCampData = [...campData];
			newCampData[index][key] = value;
			setAttributes({ campData: newCampData });
		};

		const updatedProftestData = (index, key, value) => {
			const newProftestData = [...proftestData];
			newProftestData[index][key] = value;
			setAttributes({ proftestData: newProftestData });
		};

		const updatedCourceData = (index, key, value) => {
			const newCourceData = [...courceData];
			newCourceData[index][key] = value;
			setAttributes({ courceData: newCourceData });
		};

		const updatedConsultData = (index, key, value) => {
			const newConsultData = [...consultData];
			newConsultData[index][key] = value;
			setAttributes({ consultData: newConsultData });
		};

		const campItems = Array.from({ length: campColumns }, (x, index) => (
			<div key={index} className={'item'}>
				<div className={'old-item'}>
					{iconUser}
					<RichText
						tagName="p"
						onChange={value => updatedCampData(index, 'old', value)}
						value={campData[index]?.old}
						placeholder="Текст..."
					/>
				</div>
				<RichText
					tagName="h3"
					onChange={value => updatedCampData(index, 'title', value)}
					value={campData[index]?.title}
					placeholder="Заголовок..."
				/>
				<RichText
					tagName="p"
					onChange={value => updatedCampData(index, 'description', value)}
					value={campData[index]?.description}
					placeholder="Описание..."
				/>
				<RichText
					tagName="span"
					onChange={value => updatedCampData(index, 'link', value)}
					value={campData[index]?.link}
					placeholder="Подробнее..."
				/>
			</div>
		));

		const proftestItems = Array.from({ length: proftestColumns }, (x, index) => (
			<div key={index} className={'item'}>
				<RichText
					tagName="h3"
					onChange={value => updatedProftestData(index, 'title', value)}
					value={proftestData[index]?.title}
					placeholder="Заголовок..."
				/>
				<RichText
					tagName="p"
					onChange={value => updatedProftestData(index, 'description', value)}
					value={proftestData[index]?.description}
					placeholder="Описание..."
				/>
			</div>
		));

		const courceItems = Array.from({ length: courceColumns }, (x, index) => (
			<div key={index} className={'item'}>
				<div className={'old-item'}>
					{iconUser}
					<RichText
						tagName="p"
						onChange={value => updatedCourceData(index, 'old', value)}
						value={courceData[index]?.old}
						placeholder="Текст..."
					/>
				</div>
				<RichText
					tagName="h3"
					onChange={value => updatedCourceData(index, 'title', value)}
					value={courceData[index]?.title}
					placeholder="Заголовок..."
				/>
				<RichText
					tagName="p"
					onChange={value => updatedCourceData(index, 'description', value)}
					value={courceData[index]?.description}
					placeholder="Описание..."
				/>
			</div>
		));

		const consultItems = Array.from({ length: consultColumns }, (x, index) => (
			<div key={index} className={'item'}>
				<RichText
					tagName="h3"
					onChange={value => updatedConsultData(index, 'title', value)}
					value={consultData[index]?.title}
					placeholder="Заголовок..."
				/>
				<RichText
					tagName="p"
					onChange={value => updatedConsultData(index, 'description', value)}
					value={consultData[index]?.description}
					placeholder="Описание..."
				/>
			</div>
		));

		const handleTabClick = (event) => {
			const listItem = event.target.closest('li');
			if (!listItem) return;
	  
			// Остановить всплытие события, если клик был на тексте
			event.stopPropagation();
	  
			const currentSelectUl = listItem.parentElement;
			if (currentSelectUl) {
				currentSelectUl.querySelectorAll('li').forEach((li) => {
					li.classList.remove('active');
				});
				listItem.classList.add('active');
				currentSelectUl.classList.remove('active');
			}
	  
			const selectBlock = listItem.closest('.select-block');
			if (selectBlock) {
				const selectTitle = selectBlock.querySelector('.select-title');
				if (selectTitle) {
					selectTitle.classList.remove('active');
					const name = listItem.textContent;
					selectTitle.textContent = name;
				}
	
				const slug = listItem.getAttribute('data-slug');
	
				const contentTab = selectBlock.nextElementSibling;
				if (contentTab && contentTab.classList.contains('content-tab')) {
					const itemTabs = contentTab.querySelectorAll('.item-tab');
					itemTabs.forEach((itemTab) => {
						if (itemTab.classList.contains(slug)) {
							contentTab.querySelectorAll('.item-tab').forEach((otherTab) => {
								otherTab.classList.remove('active');
							});
							itemTab.classList.add('active');
						}
					});
				}
			}
	  	};
		
		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
					>
					<PanelRow>
						<p>Программа «Лагерь»</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={campColumns}
							onChange={value => setAttributes({ campColumns: value })}
							min={1}
							max={8}
						/>
					</PanelRow>
					<PanelRow>
						<p>Профтестирование</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={proftestColumns}
							onChange={value => setAttributes({ proftestColumns: value })}
							min={1}
							max={8}
						/>
					</PanelRow>
					<PanelRow>
						<p>Курсы навыков</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={courceColumns}
							onChange={value => setAttributes({ courceColumns: value })}
							min={1}
							max={8}
						/>
					</PanelRow>
					<PanelRow>
						<p>Консультации</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={consultColumns}
							onChange={value => setAttributes({ consultColumns: value })}
							min={1}
							max={8}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div id="uslugi" className={className}>
				<div className="wrapper">
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
					/>
					<div className={'select-block'}>
						<span className={'select-title'}>Программа «Лагерь»</span>
						<ul className={'select-ul'}>
							<li data-slug={'camp'} className={'active'} onClick={handleTabClick}>Программа «Лагерь»</li>
							<li data-slug={'proftest'} onClick={handleTabClick}>Профтестирование</li>
							<li data-slug={'cource'} onClick={handleTabClick}>Курсы навыков</li>
							<li data-slug={'consult'} onClick={handleTabClick}>Консультации</li>
						</ul>
					</div>
					
					<div className={'content-tab'}>
						<div className={'item-tab camp active'}>{campItems}</div>
						
						<div className={'item-tab proftest'}>
							{proftestItems}
							<div className={'list-p'}>
								<RichText
									tagName="div"
									multiline="p"
									onChange={(value) => {
										if (Array.isArray(value)) {
											setAttributes({ proftestDescr: value });
										} else {
											setAttributes({ proftestDescr: value ? [value] : [] });
										}
									}}
									value={proftestDescr}
									placeholder="Укажите описание..."
								/>
								<div className={'btn-link'}>
									<RichText
										tagName="span"
										onChange={value => setAttributes({ proftestLink: value })}
										value={proftestLink}
										placeholder="Подробнее..."
									/>
									<span className={'icon'}>{iconRightArr}</span>
								</div>
							</div>
						</div>
						<div className={'item-tab cource'}>
							{courceItems}
							<div className={'list-p'}>
								<RichText
									tagName="div"
									multiline="p"
									onChange={(value) => {
										if (Array.isArray(value)) {
											setAttributes({ courceDescr: value });
										} else {
											setAttributes({ courceDescr: value ? [value] : [] });
										}
									}}
									value={courceDescr}
									placeholder="Укажите описание..."
								/>
								<div className={'btn-link'}>
									<RichText
										tagName="span"
										onChange={value => setAttributes({ courceLink: value })}
										value={courceLink}
										placeholder="Подробнее..."
									/>
									<span className={'icon'}>{iconRightArr}</span>
								</div>
							</div>
							
						</div>
						<div className={'item-tab consult'}>
							{consultItems}
							<div className={'list-p'}>
								<RichText
									tagName="div"
									multiline="p"
									onChange={(value) => {
										if (Array.isArray(value)) {
											setAttributes({ consultDescr: value });
										} else {
											setAttributes({ consultDescr: value ? [value] : [] });
										}
									}}
									value={consultDescr}
									placeholder="Укажите описание..."
								/>
								<div className={'btn-link'}>
									<RichText
										tagName="span"
										onChange={value => setAttributes({ consultLink: value })}
										value={consultLink}
										placeholder="Подробнее..."
									/>
									<span className={'icon'}>{iconRightArr}</span>
								</div>
							</div>
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
				campData,
				proftestData,
				courceData,
				consultData,
				proftestDescr,
				courceDescr,
				consultDescr,
				proftestLink,
				courceLink,
				consultLink
			},
			className
		} = props;

		return (
			<div id="uslugi" className={className}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<div className={'select-block'}>
						<span className={'select-title'}>Программа «Лагерь»</span>
						<ul className={'select-ul'}>
							<li data-slug={'camp'} className={'active'}>Программа «Лагерь»</li>
							<li data-slug={'proftest'}>Профтестирование</li>
							<li data-slug={'cource'}>Курсы навыков</li>
							<li data-slug={'consult'}>Консультации</li>
						</ul>
					</div>
					<div className={'content-tab'}>
						<div className={'item-tab camp active'}>
							{campData.map((block, index) => (
								<div key={index} className={'item'}>
									<div className={'old-item'}>
										{iconUser}
										<RichText.Content tagName="p" value={block.old} />
									</div>
									<RichText.Content tagName="h3" value={block.title} />
									<RichText.Content tagName="p" value={block.description} />
									<RichText.Content tagName="span" value={block.link} />
								</div>
							))}
						</div>
						<div className={'item-tab proftest'}>
							{proftestData.map((block, index) => {
								const inputString = block.description
								const parts = inputString.split('<br>');
								const wrappedInP = parts.map((part, index) => <p key={index}>{part}</p>);
								return (
									<div key={index} className={'item'}>
										<RichText.Content tagName="h3" value={block.title} />
										{wrappedInP}
									</div>
								)
							})}
							<div className={'list-p'}>
								{Array.isArray(proftestDescr) && proftestDescr.map((block, index) => {
									const text = block.props.children[0];
									let i = index + 1;
									return (
										<p key={index} className={'index-' + (index + 1)}>
											<span className={'icons icons-' + i}><MyComponent iconCount={i} /></span>
											<span className={'text'}>{text}</span>
										</p>
									)
								})}
								<div className={'btn-link'}>
									<RichText.Content tagName="span" value={proftestLink} />
									<span className={'icon'}>{iconRightArr}</span>
								</div>
							</div>
						</div>
						<div className={'item-tab cource'}>
							{courceData.map((block, index) => {
								const inputString = block.description
								const parts = inputString.split('<br>');
								const wrappedInP = parts.map((part, index) => <p key={index}>{part}</p>);
								return (
									<div key={index} className={'item'}>
										<div className={'old-item'}>
											{iconUser}
											<RichText.Content tagName="p" value={block.old} />
										</div>
										<RichText.Content tagName="h3" value={block.title} />
										{wrappedInP}
									</div>
								)
							})}
							<div className={'list-p'}>
								{Array.isArray(courceDescr) && courceDescr.map((block, index) => {
									const text = block.props.children[0];
									let i = index + 1;
									return (
										<p key={index} className={'index-' + (index + 1)}>
											<span className={'icons icons-' + i}><MyComponent iconCount={i} /></span>
											<span className={'text'}>{text}</span>
										</p>
									)
								})}
								<div className={'btn-link'}>
									<RichText.Content tagName="span" value={courceLink} />
									<span className={'icon'}>{iconRightArr}</span>
								</div>
							</div>
							
						</div>
						<div className={'item-tab consult'}>
							{consultData.map((block, index) => {
								const inputString = block.description
								const parts = inputString.split('<br>');
								const wrappedInP = parts.map((part, index) => <p key={index}>{part}</p>);
								return (
									<div key={index} className={'item'}>
										<RichText.Content tagName="h3" value={block.title} />
										{wrappedInP}
									</div>
								)
							})}
							<div className={'list-p'}>
								{Array.isArray(consultDescr) && consultDescr.map((block, index) => {
									const text = block.props.children[0];
									let i = index + 1;
									return (
										<p key={index} className={'index-' + (index + 1)}>
											<span className={'icons icons-' + i}><MyComponent iconCount={i} /></span>
											<span className={'text'}>{text}</span>
										</p>
									)
								})}
								<div className={'btn-link'}>
									<RichText.Content tagName="span" value={consultLink} />
									<span className={'icon'}>{iconRightArr}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
  	};

})(
	window.wp
);
