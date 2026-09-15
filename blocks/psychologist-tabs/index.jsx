(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { PanelBody, PanelRow, ToggleControl, Button } = wp.components;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	registerBlockType("fv/psychologist-tabs", {
		title: 'Психолог вкладки',
		icon: catIcon,
		category: 'common',
		version: 2,
		keywords: ['Психолог вкладки', 'psychologist-tabs', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			label1: {
				type: 'string',
				default: ''
			},
			name1: {
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
			image1: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
			label2: {
				type: 'string',
				default: ''
			},
			name2: {
				type: 'string',
				default: ''
			},
			title2: {
				type: 'string',
				default: ''
			},
			description2: {
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
			label3: {
				type: 'string',
				default: ''
			},
			name3: {
				type: 'string',
				default: ''
			},
			title3: {
				type: 'string',
				default: ''
			},
			description3: {
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
			inActiveTab1: {
				type: 'boolean',
				default: null
			},
			inActiveTab2: {
				type: 'boolean',
				default: null
			},
			inActiveTab3: {
				type: 'boolean',
				default: null
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
				label1,
				name1,
				title1,
				description1,
				image1,
				label2,
				name2,
				title2,
				description2,
				image2,
				label3,
				name3,
				title3,
				description3,
				image3,
				inActiveTab1,
				inActiveTab2,
				inActiveTab3
			},
			isSelected,
			setAttributes
		} = props;
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
		const blockProps = useBlockProps();

		const current_active = inActiveTab1 ? 1 : inActiveTab2 ? 2 : inActiveTab3 ? 3 : 0;

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					<PanelRow>
						<p>Включить вкладку 1</p>
						<ToggleControl
							checked={inActiveTab1}
							onChange={() => setAttributes({ inActiveTab1: !inActiveTab1 })}
							__nextHasNoMarginBottom={ true }
						/>
						<p>Включить вкладку 2</p>
						<ToggleControl
							checked={inActiveTab2}
							onChange={() => setAttributes({ inActiveTab2: !inActiveTab2 })}
							__nextHasNoMarginBottom={ true }
						/>
						<p>Включить вкладку 3</p>
						<ToggleControl
							checked={inActiveTab3}
							onChange={() => setAttributes({ inActiveTab3: !inActiveTab3 })}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={ title => setAttributes({ title })}
						value={title}
						placeholder="Заголовок..."
					/>
					{(isSelected || description) && <RichText
						tagName="p"
						onChange={ description => setAttributes({ description })}
						value={description}
						placeholder="Описание..."
					/>}
					{(((inActiveTab1 ? 1 : 0) + (inActiveTab2 ? 1 : 0) + (inActiveTab3 ? 1 : 0)) >= 2) && <div className={'select-block'}>
						<ul className={'select-ul'}>
							{inActiveTab1 && <li data-slug={'first'} className={current_active === 1 ? 'active' : ''} onClick={handleTabClick}>{name1}</li>}
							{inActiveTab2 && <li data-slug={'second'} className={current_active === 2 ? 'active' : ''} onClick={handleTabClick}>{name2}</li>}
							{inActiveTab3 && <li data-slug={'third'} className={current_active === 3 ? 'active' : ''} onClick={handleTabClick}>{name3}</li>}
						</ul>
					</div>}
					<div className={'content-tab'}>
						{inActiveTab1 && <div className={`container item-tab first ${current_active === 1 ? 'active' : ''}`}>
							<div className={'item-block first-item-block'}>
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
							</div>
							<div className={'item-block second-item-block'}>
								<RichText
									tagName="span"
									className={'label'}
									onChange={ label1 => setAttributes({ label1 })}
									value={label1}
									placeholder="Label..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="span"
									className={'name'}
									onChange={ name1 => setAttributes({ name1 })}
									value={name1}
									placeholder="Имя..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="span"
									className={'title'}
									onChange={ title1 => setAttributes({ title1 })}
									value={title1}
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
						</div>}
						{inActiveTab2 && <div className={`container item-tab second ${current_active === 2 ? 'active' : ''}`}>
							<div className={'item-block first-item-block'}>
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
							<div className={'item-block second-item-block'}>
								<RichText
									tagName="span"
									className={'label'}
									onChange={ label2 => setAttributes({ label2 })}
									value={label2}
									placeholder="Label..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="span"
									className={'name'}
									onChange={ name2 => setAttributes({ name2 })}
									value={name2}
									placeholder="Имя..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="span"
									className={'title'}
									onChange={ title2 => setAttributes({ title2 })}
									value={title2}
									placeholder="Заголовок..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									onChange={ description2 => setAttributes({ description2 })}
									value={description2}
									placeholder="Описание..."
									// allowedFormats={[]}
								/>
							</div>
						</div>}
						{inActiveTab3 && <div className={`container item-tab third ${current_active === 3 ? 'active' : ''}`}>
							<div className={'item-block first-item-block'}>
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
							<div className={'item-block second-item-block'}>
								<RichText
									tagName="span"
									className={'label'}
									onChange={ label3 => setAttributes({ label3 })}
									value={label3}
									placeholder="Label..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="span"
									className={'name'}
									onChange={ name3 => setAttributes({ name3 })}
									value={name3}
									placeholder="Имя..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="span"
									className={'title'}
									onChange={ title3 => setAttributes({ title3 })}
									value={title3}
									placeholder="Заголовок..."
									// allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									onChange={ description3 => setAttributes({ description3 })}
									value={description3}
									placeholder="Описание..."
									// allowedFormats={[]}
								/>
							</div>
						</div>}
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
				label1,
				name1,
				title1,
				description1,
				image1,
				label2,
				name2,
				title2,
				description2,
				image2,
				label3,
				name3,
				title3,
				description3,
				image3,
				inActiveTab1,
				inActiveTab2,
				inActiveTab3
			},
			className
		} = props;
		const parts1 = description1.split('<br>');
		const parts2 = description2.split('<br>');
		const parts3 = description3.split('<br>');
		const blockProps = useBlockProps.save();

		const current_active = inActiveTab1 ? 1 : inActiveTab2 ? 2 : inActiveTab3 ? 3 : 0;

		return ( <div {...blockProps}>
						<div className={'wrapper'}>
							<RichText.Content tagName="h2" value={title} />
							{description && <RichText.Content tagName="p" value={description} />}
							{(((inActiveTab1 ? 1 : 0) + (inActiveTab2 ? 1 : 0) + (inActiveTab3 ? 1 : 0)) >= 2) && <div className={'select-block'}>
								<ul className={'select-ul'}>
									{inActiveTab1 && <li data-slug={'first'} className={current_active === 1 ? 'active' : ''}>{name1}</li>}
									{inActiveTab2 && <li data-slug={'second'} className={current_active === 2 ? 'active' : ''}>{name2}</li>}
									{inActiveTab3 && <li data-slug={'third'} className={current_active === 3 ? 'active' : ''}>{name3}</li>}
								</ul>
							</div>}
							<div className={'content-tab'}>
								{inActiveTab1 && <div className={`container item-tab first ${current_active === 1 ? 'active' : ''}`}>
									<div className={'item-block first-item-block'}>
										{ image1 && image1.url && 
											<img 
												src={image1.url} 
												alt={image1.alt || ''} 
												width="100%" 
												height="auto" 
											/>
										}
									</div>
									<div className={'item-block second-item-block'}>
										<RichText.Content tagName="span" className={'label'} value={label1} />
										<RichText.Content tagName="span" className={'name'} value={name1} />
										<RichText.Content tagName="span" className={'title'} value={title1} />
										{ parts1.map((part, index) => (
											part && (<p key={index} dangerouslySetInnerHTML={{ __html: part }} />)
										)) }
									</div>
								</div>}
								{inActiveTab2 && <div className={`container item-tab second ${current_active === 2 ? 'active' : ''}`}>
									<div className={'item-block first-item-block'}>
										{ image2 && image2.url && 
											<img 
												src={image2.url} 
												alt={image2.alt || ''} 
												width="100%" 
												height="auto" 
											/>
										}
									</div>
									<div className={'item-block second-item-block'}>
										<RichText.Content tagName="span" className={'label'} value={label2} />
										<RichText.Content tagName="span" className={'name'} value={name2} />
										<RichText.Content tagName="span" className={'title'} value={title2} />
										{ parts2.map((part, index) => (
											<p key={index} dangerouslySetInnerHTML={{ __html: part }} />
										)) }
									</div>
								</div>}
								{inActiveTab3 && <div className={`container item-tab third ${current_active === 3 ? 'active' : ''}`}>
									<div className={'item-block first-item-block'}>
										{ image3 && image3.url && 
											<img 
												src={image3.url} 
												alt={image3.alt || ''} 
												width="100%" 
												height="auto" 
											/>
										}
									</div>
									<div className={'item-block second-item-block'}>
										<RichText.Content tagName="span" className={'label'} value={label3} />
										<RichText.Content tagName="span" className={'name'} value={name3} />
										<RichText.Content tagName="span" className={'title'} value={title3} />
										{ parts3.map((part, index) => (
											<p key={index} dangerouslySetInnerHTML={{ __html: part }} />
										)) }
									</div>
								</div>}
							</div>
						</div>
					</div>
		)
  	};
})(
	window.wp
);