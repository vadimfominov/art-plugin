(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const { InspectorControls, MediaUpload } = wp.blockEditor;
	const { TextControl, PanelBody, PanelRow, Button, SelectControl } = wp.components;
	const { useState, useEffect } = wp.element

	const catIcon = 'cat'
	const iconArr = (<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M2.29289 12.9023C1.90237 13.2928 1.90237 13.926 2.29289 14.3165C2.68342 14.707 3.31658 14.707 3.70711 14.3165L2.29289 12.9023ZM14.6066 3.00277C14.6066 2.45049 14.1589 2.00277 13.6066 2.00277L4.6066 2.00277C4.05432 2.00277 3.6066 2.45049 3.6066 3.00277C3.6066 3.55506 4.05432 4.00277 4.6066 4.00277L12.6066 4.00277L12.6066 12.0028C12.6066 12.5551 13.0543 13.0028 13.6066 13.0028C14.1589 13.0028 14.6066 12.5551 14.6066 12.0028L14.6066 3.00277ZM3.70711 14.3165L14.3137 3.70988L12.8995 2.29567L2.29289 12.9023L3.70711 14.3165Z" fill="#535353"/>
			</svg>);
	const iconCheckboxOk = (<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.5" y="0.5" width="10" height="10" rx="1.61538" stroke="white"/>
			<g clip-path="url(#clip0_477_3029)">
			<path d="M7.75647 3.80762L4.65391 6.91018L3.24365 5.49992" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
			</g>
			<defs>
			<clipPath id="clip0_477_3029">
			<rect width="6.76923" height="6.76923" fill="white" transform="translate(2.11523 2.11523)"/>
			</clipPath>
			</defs>
			</svg>);
	const iconCheckbox = (<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.5" y="0.5" width="10" height="10" rx="1.61538" stroke="white"/>
			</svg>);

	
	registerBlockType('fv/link-camp', {
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
			apiFetch({ path: '/wp/v2/pages?per_page=100' }).then((pages) => {
				const links = {};
				SHIFT_OPTIONS.forEach(option => {
					const matchingPage = pages.find(page => page.title.rendered === option?.link);
					if (matchingPage) {
						links[option?.link] = matchingPage.link;
					}
				});
				setAttributes({ shiftLinks: links });
			});
	  	}, []);

		return [
			<InspectorControls>
				<PanelBody
					title="Направления"
					initialOpen={true}
				>
					<PanelRow>
						<p>Выберите направление</p>
						<SelectControl
							value={ selectedShift?.value || '' }
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
			<div className={className}>
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

					{ renderShiftItems( selectedShift, shiftLinks ) }
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

		return (
			<div className={className}>
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
					{ renderShiftItems( selectedShift, shiftLinks ) }
				</div>
			</div>
		)
  	};

	const SHIFT_OPTIONS = [
		{ label: 'Список направлений', value: '', link: ''  },
		{ label: 'Программа «Лагерь профессий»', value: '«Лагерь профессий»', link: '«Лагерь профессий»' },
		{ label: 'Программа «Академия навыков»', value: '«Академия навыков»', link: '«Академия навыков»' },
		{ label: 'ART Community', value: 'ART Community', link: 'ART Community' },
		{ label: 'Узнай город', value: 'Путешествия «Узнай город»', link: 'Узнай город' },
	];
	
	function renderShiftItems(selectedShift, shiftLinks) {
		if (!selectedShift || !selectedShift.value) return null;
		let optionsWithoutSelected = '';
		if(selectedShift.label === 'Узнай город') {
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
