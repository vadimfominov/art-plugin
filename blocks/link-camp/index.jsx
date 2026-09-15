(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { TextControl, PanelBody, PanelRow, Button, SelectControl } = wp.components;
	const { useState, useEffect } = wp.element
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconArr = (<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M2.29289 12.9023C1.90237 13.2928 1.90237 13.926 2.29289 14.3165C2.68342 14.707 3.31658 14.707 3.70711 14.3165L2.29289 12.9023ZM14.6066 3.00277C14.6066 2.45049 14.1589 2.00277 13.6066 2.00277L4.6066 2.00277C4.05432 2.00277 3.6066 2.45049 3.6066 3.00277C3.6066 3.55506 4.05432 4.00277 4.6066 4.00277L12.6066 4.00277L12.6066 12.0028C12.6066 12.5551 13.0543 13.0028 13.6066 13.0028C14.1589 13.0028 14.6066 12.5551 14.6066 12.0028L14.6066 3.00277ZM3.70711 14.3165L14.3137 3.70988L12.8995 2.29567L2.29289 12.9023L3.70711 14.3165Z" fill="#535353" />
	</svg>);
	const iconCheckboxOk = (<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="0.5" y="0.5" width="10" height="10" rx="1.61538" stroke="white" />
		<g clip-path="url(#clip0_477_3029)">
			<path d="M7.75647 3.80762L4.65391 6.91018L3.24365 5.49992" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
		</g>
		<defs>
			<clipPath id="clip0_477_3029">
				<rect width="6.76923" height="6.76923" fill="white" transform="translate(2.11523 2.11523)" />
			</clipPath>
		</defs>
	</svg>);
	const iconCheckbox = (<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="0.5" y="0.5" width="10" height="10" rx="1.61538" stroke="white" />
	</svg>);
	registerBlockType("fv/link-camp", {
		title: 'Ссылки на лагерь',
		icon: catIcon,
		category: 'common',
		keywords: ['Ссылки на лагерь', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			selectedShift: {
				type: 'object',
				default: { label: '', value: '' }
			},
			shiftLinks: {
				type: 'object',
				default: {}
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
				selectedShift,
				shiftLinks
			},
			className,
			isSelected,
			setAttributes
		} = props;
		useEffect(() => {
			setAttributes({
				shiftLinks: {
					"«Академия навыков»": "https://kids.art-lichnost.ru/akademiya-navykov/",
					"Узнай город": "https://art-lichnost.ru/uznaj-gorod/",
					"«Лагерь профессий»": "https://kids.art-lichnost.ru/",
					"Сообщество подростков": "https://art-lichnost.ru/art-community/"
				}
			});
		}, []);
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
				<PanelBody
					title="Направления"
					initialOpen={true}
				>
					<PanelRow>
						<p>Выберите направление</p>
						<SelectControl
							value={selectedShift?.value || ''}
							options={SHIFT_OPTIONS}
							onChange={(value) => {
								const selectedOption = SHIFT_OPTIONS.find(option => option?.value === value);
								setAttributes({
									selectedShift: {
										label: selectedOption ? selectedOption.label : '',
										value: value
									}
								});
							}}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps}>
				<div className={'wrapper'}>
					<div className={'item first-item'}>
						<ul>
							{SHIFT_OPTIONS.slice(1).map(option => (
								<li key={option?.value} className={option?.value.includes('Лагерь') || option?.value.includes('Академия') ? 'program' : ''}>
									{selectedShift?.value === option?.value ? iconCheckboxOk : iconCheckbox}
									<span>{option?.label}</span>
								</li>
							))}
						</ul>
						<RichText
							tagName="span"
							onChange={(value) => setAttributes({ title: value })}
							value={title}
							placeholder="Заголовок..."
						// allowedFormats={['']}
						/>
						<RichText
							tagName="p"
							onChange={(value) => setAttributes({ description: value })}
							value={description}
							placeholder="Описание..."
						// allowedFormats={['']}
						/>
					</div>
					{renderShiftItems(selectedShift, shiftLinks)}
				</div>
			</div>
		];
	}
	function Save(props) {
		const {
			attributes: {
				title,
				description,
				selectedShift,
				shiftLinks
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<div className={'item first-item'}>
						<ul>
							{SHIFT_OPTIONS.slice(1).map(option => (
								<li key={option?.value} className={option?.value.includes('Лагерь') || option?.value.includes('Академия') ? 'program' : ''}>
									{(selectedShift && selectedShift?.value === option?.value) ? iconCheckboxOk : iconCheckbox}
									<span>{option.label}</span>
								</li>
							))}
						</ul>
						<RichText.Content tagName="span" value={title} />
						<RichText.Content tagName="p" value={description} />
					</div>
					{renderShiftItems(selectedShift, shiftLinks)}
				</div>
			</div>
		)
	};
	const SHIFT_OPTIONS = [
		{ label: 'Список направлений', value: '', link: '' },
		{ label: 'Программа «Лагерь профессий»', value: '«Лагерь профессий»', link: '«Лагерь профессий»' },
		{ label: 'Программа «Академия навыков»', value: '«Академия навыков»', link: '«Академия навыков»' },
		{ label: 'Сообщество подростков', value: 'Сообщество подростков', link: 'Сообщество подростков' },
		{ label: 'Узнай город', value: 'Путешествия «Узнай город»', link: 'Узнай город' },
	];
	function renderShiftItems(selectedShift, shiftLinks) {
		if (!selectedShift || !selectedShift.value) return null;
		let optionsWithoutSelected = '';
		if (selectedShift.label === 'Узнай город') {
			optionsWithoutSelected = SHIFT_OPTIONS.slice(1).filter(option => option.link !== selectedShift.label);
		} else {
			optionsWithoutSelected = SHIFT_OPTIONS.slice(1).filter(option => option.link !== selectedShift.value);
		}
		return optionsWithoutSelected.map(option => (
			<a
				key={option.value}
				className={'item'}
				href={shiftLinks && shiftLinks[option.link] ? shiftLinks[option.link] : '#'}
				target="_blank"
				rel="noopener noreferrer"
			>
				{iconArr}
				<span>{option.value}</span>
			</a>
		));
	}
})(
	window.wp
);