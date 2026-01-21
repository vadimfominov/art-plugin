(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const { InspectorControls, InnerBlocks } = wp.blockEditor;
	const { SelectControl, PanelBody, PanelRow, ToggleControl } = wp.components;
	const { useState, useEffect } = wp.element
	const catIcon = 'cat'
	const iconArr = (<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#30A933"/>
			</svg>);

	registerBlockType('fv/test-drive-tabs', {
		title: 'Тест-драйв вкладки',
		icon: catIcon,
		category: 'common',
		version: 2,
		keywords: ['Тест-драйв вкладки', 'фке', 'art'],
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
			title2: {
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
			label: {
				type: 'string',
				default: ''
			},
			labelMap: {
				type: 'string',
				default: ''
			},
			title1_2: {
				type: 'string',
				default: ''
			},
			description1_2: {
				type: 'string',
				default: ''
			},
			title2_2: {
				type: 'string',
				default: ''
			},
			description2_2: {
				type: 'string',
				default: ''
			},
			description3_2: {
				type: 'string',
				default: ''
			},
			label_2: {
				type: 'string',
				default: ''
			},
			labelMap_2: {
				type: 'string',
				default: ''
			},
			inBlock: {
				type: 'boolean',
				default: null
			},
			privacyPolicyLink: {
            type: 'string',
            default: ''
        	},
			titleModal: {
            type: 'string',
            default: ''
        	},
			inActiveTab: {
				type: 'boolean',
				default: false
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
				title2,
				description2,
				description3,
				label,
				labelMap,
				title1_2,
				description1_2,
				title2_2,
				description2_2,
				description3_2,
				label_2,
				labelMap_2,
				inBlock,
				privacyPolicyLink,
				inActiveTab
			},
			className,
			isSelected,
			setAttributes
		} = props;

		// Добавляем состояние для страниц
		const [pages, setPages] = useState([]);

		// Получаем список страниц при загрузке компонента
		useEffect(() => {
			apiFetch({ path: '/wp/v2/pages?per_page=100' }).then((pages) => {
				if (Array.isArray(pages)) {
					const pageOptions = pages.map((page) => ({
						label: page.title.rendered,
						value: page.link
					}));
					setPages(pageOptions);
				} else {
					console.error('Received invalid data from apiFetch');
					setPages([]);
				}
			}).catch(error => {
				console.error('Error fetching pages:', error);
				setPages([]);
			});
	  	}, []);
		
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
					<PanelRow>
						<p>Добавить блок на сайт</p>
						<ToggleControl
							checked={inBlock}
							onChange={() => setAttributes({ inBlock: !inBlock })}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
					<SelectControl
						label="Страница политики конфиденциальности"
						value={privacyPolicyLink}
						options={[
							{ label: 'Выберите страницу', value: '' },
							...(Array.isArray(pages) ? pages : [])
						]}
						onChange={(value) => setAttributes({ privacyPolicyLink: value })}
						__nextHasNoMarginBottom={ true }
						__next40pxDefaultSize={ true }
					/>
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
							<li data-slug={'first'} className={'active'}>Золотая долина</li>
							<li data-slug={'second'}>Ленинградец</li>
						</ul>
					</div>}

					<div className={'content-tab'}>

						<div className={'container item-tab first active'}>

							<div className={'top-item-block'}>
								<div className={'item-block first-item-block'}>
									<RichText
										tagName="span"
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
								<div className={'item-block second-item-block'}>
									<RichText
										tagName="span"
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
							</div>
							<div className={'item-block last-item-block'}>
								<div className={'map-block'}>
									<RichText
										tagName="span"
										onChange={ labelMap => setAttributes({ labelMap })}
										value={labelMap}
										placeholder="label..."
										// allowedFormats={[]}
									/>
									<div id={'testDriveMap'}></div>
								</div>
								<div className={'text-block'}>
									<RichText
										tagName="p"
										onChange={ description3 => setAttributes({ description3 })}
										value={description3}
										placeholder="Описание..."
										// allowedFormats={[]}
									/>
									<button className={'test-drive-open'}>Записаться <span>{iconArr}</span></button>
									<RichText
										tagName="span"
										onChange={ label => setAttributes({ label })}
										value={label}
										placeholder="label..."
										// allowedFormats={[]}
									/>
								</div>
							</div>

						</div>

						{inActiveTab && <div className={'container item-tab second'}>

							<div className={'top-item-block'}>
								<div className={'item-block first-item-block'}>
									<RichText
										tagName="span"
										onChange={ title1_2 => setAttributes({ title1_2 })}
										value={title1_2}
										placeholder="Заголовок..."
										// allowedFormats={[]}
									/>
									<RichText
										tagName="p"
										onChange={ description1_2 => setAttributes({ description1_2 })}
										value={description1_2}
										placeholder="Описание..."
										// allowedFormats={[]}
									/>
								</div>
								<div className={'item-block second-item-block'}>
									<RichText
										tagName="span"
										onChange={ title2_2 => setAttributes({ title2_2 })}
										value={title2_2}
										placeholder="Заголовок..."
										// allowedFormats={[]}
									/>
									<RichText
										tagName="p"
										onChange={ description2_2 => setAttributes({ description2_2 })}
										value={description2_2}
										placeholder="Описание..."
										// allowedFormats={[]}
									/>
								</div>
							</div>
							<div className={'item-block last-item-block'}>
								<div className={'map-block'}>
									<RichText
										tagName="span"
										onChange={ labelMap_2 => setAttributes({ labelMap_2 })}
										value={labelMap_2}
										placeholder="label..."
										// allowedFormats={[]}
									/>
									<div id={'testDriveMap-2'}></div>
								</div>
								<div className={'text-block'}>
									<RichText
										tagName="p"
										onChange={ description3_2 => setAttributes({ description3_2 })}
										value={description3_2}
										placeholder="Описание..."
										// allowedFormats={[]}
									/>
									<button className={'test-drive-open'}>Записаться <span>{iconArr}</span></button>
									<RichText
										tagName="span"
										onChange={ label_2 => setAttributes({ label_2 })}
										value={label_2}
										placeholder="label..."
										// allowedFormats={[]}
									/>
								</div>
							</div>

						</div>}

					</div>

				</div>

				<InnerBlocks allowedBlocks={['fv/program-modal']} />
				
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
				title2,
				description2,
				description3,
				label,
				labelMap,
				title1_2,
				description1_2,
				title2_2,
				description2_2,
				description3_2,
				label_2,
				labelMap_2,
				inBlock,
				inActiveTab
			},
			className
		} = props;

		if (!inBlock) {
			return null;
	  	}

		const parts1 = description1.split('<br>');
		const parts2 = description2.split('<br>');

		const parts1_2 = description1_2.split('<br>');
		const parts2_2 = description2_2.split('<br>');

		return ( <div className={className}>

						<div className={'wrapper'}>
							<RichText.Content tagName="h2" value={title} />
							<RichText.Content tagName="p" value={description} />

							{inActiveTab && <div className={'select-block'}>
								<ul className={'select-ul'}>
									<li data-slug={'first'} className={'active'}>Золотая долина</li>
									<li data-slug={'second'}>Ленинградец</li>
								</ul>
							</div>}

							<div className={'content-tab'}>

								<div className={'container item-tab first active'}>

									<div className={'top-item-block'}>
										<div className={'item-block first-item-block'}>
											<RichText.Content tagName="span" value={title1} />
											{ parts1.map((part, index) => (
												<p key={index} dangerouslySetInnerHTML={{ __html: part }} />
											)) }
										</div>
										<div className={'item-block second-item-block'}>
											<RichText.Content tagName="span" value={title2} />
											{ parts2.map((part, index) => (
												<p key={index} dangerouslySetInnerHTML={{ __html: part }} />
											)) }
										</div>
									</div>
									
									<div className={'item-block last-item-block'}>
										<div className={'map-block'}>
											<RichText.Content tagName="span" value={labelMap} />
											<div id={'testDriveMap'}></div>
										</div>
										<div className={'text-block'}>
											<RichText.Content tagName="p" value={description3} />
											<button className={'test-drive-open'}>Записаться <span>{iconArr}</span></button>
											<RichText.Content tagName="span" value={label} />
										</div>
									</div>

								</div>

								<div className={'container item-tab second'}>

									<div className={'top-item-block'}>
										<div className={'item-block first-item-block'}>
											<RichText.Content tagName="span" value={title1_2} />
											{ parts1_2.map((part, index) => (
												<p key={index} dangerouslySetInnerHTML={{ __html: part }} />
											)) }
										</div>
										<div className={'item-block second-item-block'}>
											<RichText.Content tagName="span" value={title2_2} />
											{ parts2_2.map((part, index) => (
												<p key={index} dangerouslySetInnerHTML={{ __html: part }} />
											)) }
										</div>
									</div>
									
									<div className={'item-block last-item-block'}>
										<div className={'map-block'}>
											<RichText.Content tagName="span" value={labelMap_2} />
											<div id={'testDriveMap-2'}></div>
										</div>
										<div className={'text-block'}>
											<RichText.Content tagName="p" value={description3_2} />
											<button className={'test-drive-open'}>Записаться <span>{iconArr}</span></button>
											<RichText.Content tagName="span" value={label_2} />
										</div>
									</div>

								</div>

							</div>

						</div>

						<InnerBlocks.Content />
				</div>
		)
  	};

})(
	window.wp
);
