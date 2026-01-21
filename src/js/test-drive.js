(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const { InspectorControls, InnerBlocks } = wp.blockEditor;
	const { SelectControl, PanelBody, PanelRow, ToggleControl } = wp.components;
	const { useState, useEffect } = wp.element
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconArr = (<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#30A933" />
	</svg>);

	registerBlockType('fv/test-drive', {
		title: 'Тест-драйв',
		icon: catIcon,
		category: 'common',
		version: 3,
		keywords: ['Тест-драйв', 'фке', 'art'],
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
			inBlock: {
				type: 'boolean',
				default: false
			},
			privacyPolicyLink: {
				type: 'string',
				default: ''
			},
			titleModal: {
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
				title1,
				description1,
				title2,
				description2,
				description3,
				label,
				labelMap,
				inBlock,
				privacyPolicyLink,
				titleModal
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
					title="Ссылки на соцсети"
					initialOpen={true}
				>
					<PanelRow>
						<p>Добавить блок на сайт</p>
						<ToggleControl
							checked={inBlock}
							onChange={() => setAttributes({ inBlock: !inBlock })}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
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
						__nextHasNoMarginBottom={true}
						__next40pxDefaultSize={true}
					/>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={title => setAttributes({ title })}
						value={title}
						placeholder="Заголовок..."
					// allowedFormats={['core/text-color']}
					/>
					<RichText
						tagName="p"
						onChange={description => setAttributes({ description })}
						value={description}
						placeholder="Описание..."
					// allowedFormats={[]}
					/>
					<div className={'container'}>
						<div className={'top-item-block'}>
							<div className={'item-block first-item-block'}>
								<RichText
									tagName="span"
									onChange={title1 => setAttributes({ title1 })}
									value={title1}
									placeholder="Заголовок..."
								// allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									onChange={description1 => setAttributes({ description1 })}
									value={description1}
									placeholder="Описание..."
								// allowedFormats={[]}
								/>
							</div>
							<div className={'item-block second-item-block'}>
								<RichText
									tagName="span"
									onChange={title2 => setAttributes({ title2 })}
									value={title2}
									placeholder="Заголовок..."
								// allowedFormats={[]}
								/>
								<RichText
									tagName="p"
									onChange={description2 => setAttributes({ description2 })}
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
									onChange={labelMap => setAttributes({ labelMap })}
									value={labelMap}
									placeholder="label..."
								// allowedFormats={[]}
								/>
								<div id={'testDriveMap'}></div>
							</div>
							<div className={'text-block'}>
								<RichText
									tagName="p"
									onChange={description3 => setAttributes({ description3 })}
									value={description3}
									placeholder="Описание..."
								// allowedFormats={[]}
								/>
								<button className={'test-drive-open'}>Записаться <span>{iconArr}</span></button>
								<RichText
									tagName="span"
									onChange={label => setAttributes({ label })}
									value={label}
									placeholder="label..."
								// allowedFormats={[]}
								/>
							</div>
						</div>
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
				inBlock,
				privacyPolicyLink,
				titleModal
			},
			className
		} = props;

		if (!inBlock) {
			return null;
		}

		const parts1 = description1.split('<br>');
		const parts2 = description2.split('<br>');

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<div className={'container'}>
						<div className={'top-item-block'}>
							<div className={'item-block first-item-block'}>
								<RichText.Content tagName="span" value={title1} />
								{parts1.map((part, index) => (
									<p key={index} dangerouslySetInnerHTML={{ __html: part }} />
								))}
							</div>
							<div className={'item-block second-item-block'}>
								<RichText.Content tagName="span" value={title2} />
								{parts2.map((part, index) => (
									<p key={index} dangerouslySetInnerHTML={{ __html: part }} />
								))}
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
				</div>
				<InnerBlocks.Content />
			</div>
		)
	};

})(
	window.wp
);
