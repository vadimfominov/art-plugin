(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const { InspectorControls, MediaUpload } = wp.blockEditor;
	const { PanelBody, PanelRow, ToggleControl, Button } = wp.components;
	const { useState, useEffect } = wp.element
	const catIcon = 'cat'

	registerBlockType('fv/psychologist-tabs', {
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
			inActiveTab: {
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
				inActiveTab
			},
			className,
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
		
		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					<PanelRow>
						<p>Включить вкладки</p>
						<ToggleControl
							checked={inActiveTab}
							onChange={() => setAttributes({ inActiveTab: !inActiveTab })}
							__nextHasNoMarginBottom={ true }
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
						placeholder="Заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<RichText
						tagName="p"
						onChange={ description => setAttributes({ description })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>

					{inActiveTab && <div className={'select-block'}>
						<ul className={'select-ul'}>
							<li data-slug={'first'} className={'active'} onClick={handleTabClick}>{name1}</li>
							<li data-slug={'second'} onClick={handleTabClick}>{name2}</li>
							<li data-slug={'third'} onClick={handleTabClick}>{name3}</li>
						</ul>
					</div>}

					<div className={'content-tab'}>

						<div className={'container item-tab first active'}>

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

						</div>

						{inActiveTab && <div className={'container item-tab second'}>

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

						{inActiveTab && <div className={'container item-tab third'}>

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
				inActiveTab
			},
			className
		} = props;

		const parts1 = description1.split('<br>');
		const parts2 = description2.split('<br>');
		const parts3 = description3.split('<br>');

		return ( <div className={className}>
						<div className={'wrapper'}>
							<RichText.Content tagName="h2" value={title} />
							{description && <RichText.Content tagName="p" value={description} />}
							

							{inActiveTab && <div className={'select-block'}>
								<ul className={'select-ul'}>
									{name1 && <li data-slug={'first'} className={'active'}>{name1}</li>}
									{name2 && <li data-slug={'second'}>{name2}</li>}
									{name3 && <li data-slug={'third'}>{name3}</li>}
								</ul>
							</div>}

							<div className={'content-tab'}>

								<div className={'container item-tab first active'}>

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

								</div>

								{name2 && <div className={'container item-tab second'}>

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

								{name3 && <div className={'container item-tab third'}>

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
