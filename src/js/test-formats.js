(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls } = wp.blockEditor;
	const { PanelBody, PanelRow, ToggleControl } = wp.components;

	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);

	const iconMap = (<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path opacity="0.3" d="M27.1102 27.9983C29.0717 26.9288 30.25 25.5576 30.25 24.0625C30.25 22.4778 28.9261 21.0322 26.7488 19.9375C24.2311 18.6716 20.5723 17.875 16.5 17.875C12.4277 17.875 8.7689 18.6716 6.25118 19.9375C4.07391 21.0322 2.75 22.4778 2.75 24.0625C2.75 25.6472 4.07391 27.0928 6.25118 28.1875C8.7689 29.4534 12.4277 30.25 16.5 30.25C20.7716 30.25 24.5882 29.3735 27.1102 27.9983Z" fill="#30A933" />
		<path fill-rule="evenodd" clip-rule="evenodd" d="M6.875 11.7076C6.875 6.76047 11.1843 2.75 16.5 2.75C21.8157 2.75 26.125 6.76047 26.125 11.7076C26.125 16.616 23.053 22.3437 18.2601 24.3919C17.1428 24.8694 15.8572 24.8694 14.7399 24.3919C9.94697 22.3437 6.875 16.616 6.875 11.7076ZM16.5 15.125C18.0188 15.125 19.25 13.8938 19.25 12.375C19.25 10.8562 18.0188 9.625 16.5 9.625C14.9812 9.625 13.75 10.8562 13.75 12.375C13.75 13.8938 14.9812 15.125 16.5 15.125Z" fill="#30A933" />
	</svg>);

	const iconArray = (<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M2.86713 7.056L0.563125 3.6L2.86713 0.144H4.62713L2.48313 3.6L4.62713 7.056H2.86713ZM2.09913 4.336V2.88H7.85913V4.336H2.09913Z" fill="#8F8F8F" />
	</svg>);

	registerBlockType('fv/test-formats', {
		title: 'Форматы тестирования',
		icon: catIcon,
		category: 'common',
		keywords: ['форматы тестирования', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			titleBlock: {
				type: 'string',
				default: ''
			},
			descriptionBlock: {
				type: 'string',
				default: ''
			},
			placeCard: {
				type: 'string',
				default: ''
			},
			titleСard: {
				type: 'string',
				default: ''
			},
			priceСard: {
				type: 'string',
				default: ''
			},
			subtitleCard: {
				type: 'string',
				default: ''
			},
			placeCard2: {
				type: 'string',
				default: ''
			},
			titleСard2: {
				type: 'string',
				default: ''
			},
			priceСard2: {
				type: 'string',
				default: ''
			},
			subtitleCard2: {
				type: 'string',
				default: ''
			},
			placeCard3: {
				type: 'string',
				default: ''
			},
			titleСard3: {
				type: 'string',
				default: ''
			},
			priceСard3: {
				type: 'string',
				default: ''
			},
			subtitleCard3: {
				type: 'string',
				default: ''
			},
			description_sale: {
				type: 'string',
				default: ''
			},
			inActiveCard1: {
				type: 'boolean',
				default: false
			},
			inActiveCard2: {
				type: 'boolean',
				default: false
			},
			inActiveCard3: {
				type: 'boolean',
				default: false
			},
		},
		supports: {
			anchor: true
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				title,
				description,
				titleBlock,
				descriptionBlock,
				placeCard,
				titleСard,
				priceСard,
				subtitleCard,
				placeCard2,
				titleСard2,
				priceСard2,
				subtitleCard2,
				placeCard3,
				titleСard3,
				priceСard3,
				subtitleCard3,
				anchor,
				description_sale,
				inActiveCard1,
				inActiveCard2,
				inActiveCard3
			},
			className,
			isSelected,
			setAttributes
		} = props;

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					<PanelRow>
						<p>Показывать первую карточку</p>
						<ToggleControl
							checked={inActiveCard1}
							onChange={() => setAttributes({ inActiveCard1: !inActiveCard1 })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
					<PanelRow>
						<p>Показывать вторую карточку</p>
						<ToggleControl
							checked={inActiveCard2}
							onChange={() => setAttributes({ inActiveCard2: !inActiveCard2 })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
					<PanelRow>
						<p>Показывать третью карточку</p>
						<ToggleControl
							checked={inActiveCard3}
							onChange={() => setAttributes({ inActiveCard3: !inActiveCard3 })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={className} id={anchor}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Заголовок..."
					/>
					{(description || isSelected) && (
						<RichText
							tagName="p"
							onChange={(value) => setAttributes({ description: value })}
							value={description}
							placeholder="Описание..."
						/>
					)}
					<div className={'container'}>
						<div className={'item'}>
							{iconMap}
							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ titleBlock: value })}
								value={titleBlock}
								placeholder="Заголовок..."
							/>
							<RichText
								tagName="p"
								onChange={(value) => setAttributes({ descriptionBlock: value })}
								value={descriptionBlock}
								placeholder="Описание..."
							/>
						</div>

						{inActiveCard1 && <div class="item-card card-2168 proficiency-testing">
							<div class="top-item-section item-section">
								<RichText
									tagName="span"
									className={'place-card'}
									onChange={(value) => setAttributes({ placeCard: value })}
									value={placeCard}
									placeholder="Текст..."
								/>
								<RichText
									tagName="div"
									className={'title-card'}
									onChange={(value) => setAttributes({ titleСard: value })}
									value={titleСard}
									placeholder="Заголовок..."
								/>
								<RichText
									tagName="p"
									className={'subtitle-card'}
									onChange={(value) => setAttributes({ subtitleCard: value })}
									value={subtitleCard}
									placeholder="Описание..."
								/>
							</div>
							<div class="bottom-item-section item-section">
								<RichText
									tagName="div"
									className={'price-card'}
									onChange={(value) => setAttributes({ priceСard: value })}
									value={priceСard}
									placeholder="Описание..."
								/>
								<button
									class="modal-form green"
									data-titleform=""
									data-titleproduct=""
									data-referer=""
									data-datestart=""
								>Записаться</button>
								<button
									class="more green"
									data-titleform=""
									data-titleproduct=""
									data-referer=""
									data-datestart=""
								>Подробнее {iconArray}</button>
							</div>
						</div>}
						{inActiveCard2 && <div class="item-card card-2162 proficiency-testing">
							<div class="top-item-section item-section">
								<RichText
									tagName="span"
									className={'place-card'}
									onChange={(value) => setAttributes({ placeCard2: value })}
									value={placeCard2}
									placeholder="Текст..."
								/>
								<RichText
									tagName="div"
									className={'title-card'}
									onChange={(value) => setAttributes({ titleСard2: value })}
									value={titleСard2}
									placeholder="Заголовок..."
								/>
								<RichText
									tagName="p"
									className={'subtitle-card'}
									onChange={(value) => setAttributes({ subtitleCard2: value })}
									value={subtitleCard2}
									placeholder="Описание..."
								/>
							</div>
							<div class="bottom-item-section item-section">
								<RichText
									tagName="div"
									className={'price-card'}
									onChange={(value) => setAttributes({ priceСard2: value })}
									value={priceСard2}
									placeholder="Описание..."
								/>
								<button
									class="modal-form green"
									data-titleform=""
									data-titleproduct=""
									data-referer=""
									data-datestart=""
								>Записаться</button>
								<button
									class="more green"
									data-titleform=""
									data-titleproduct=""
									data-referer=""
									data-datestart=""
								>Подробнее {iconArray}</button>
							</div>
						</div>}
						{inActiveCard3 && <div class="item-card card-30022 proficiency-testing">
							<div class="top-item-section item-section">
								<RichText
									tagName="span"
									className={'place-card'}
									onChange={(value) => setAttributes({ placeCard3: value })}
									value={placeCard3}
									placeholder="Текст..."
								/>
								<RichText
									tagName="div"
									className={'title-card'}
									onChange={(value) => setAttributes({ titleСard3: value })}
									value={titleСard3}
									placeholder="Заголовок..."
								/>
								<RichText
									tagName="p"
									className={'subtitle-card'}
									onChange={(value) => setAttributes({ subtitleCard3: value })}
									value={subtitleCard3}
									placeholder="Описание..."
								/>
							</div>
							<div class="bottom-item-section item-section">
								<RichText
									tagName="div"
									className={'price-card'}
									onChange={(value) => setAttributes({ priceСard3: value })}
									value={priceСard3}
									placeholder="Цена..."
								/>
								<button
									class="modal-form green"
									data-titleform=""
									data-titleproduct=""
									data-referer=""
									data-datestart=""
								>Записаться</button>
								<button
									class="more green"
									data-titleform=""
									data-titleproduct=""
									data-referer=""
									data-datestart=""
								>Подробнее {iconArray}</button>
							</div>
						</div>}

					</div>

					<RichText
						tagName="p"
						onChange={description_sale => setAttributes({ description_sale })}
						value={description_sale}
						className={'description-sale'}
						placeholder="Описание..."
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
				titleBlock,
				descriptionBlock,
				placeCard,
				titleСard,
				priceСard,
				subtitleCard,
				placeCard2,
				titleСard2,
				priceСard2,
				subtitleCard2,
				placeCard3,
				titleСard3,
				priceСard3,
				subtitleCard3,
				anchor,
				description_sale,
				inActiveCard1,
				inActiveCard2,
				inActiveCard3
			},
			className
		} = props;

		const parts = descriptionBlock.split('<br>');

		return (
			<div className={className} id={anchor}>
				<div className={'wrapper'}>
					{title && <RichText.Content tagName="h2" value={title} />}
					{description && <RichText.Content tagName="p" value={description} />}
					<div className={'container'}>
						<div className={'item'}>
							{iconMap}
							{titleBlock && <RichText.Content tagName="span" value={titleBlock} />}
							{parts.map((part, index) => (
								part && (<p key={index} dangerouslySetInnerHTML={{ __html: part }} />)
							))}
						</div>

						{inActiveCard1 && <div class="item-card card-2168 proficiency-testing">
							<div class="top-item-section item-section">
								{placeCard && <RichText.Content tagName="span" className={'place-card'} value={placeCard} />}
								{titleСard && <RichText.Content tagName="div" className={'title-card'} value={titleСard} />}
								{subtitleCard && <RichText.Content tagName="p" className={'subtitle-card'} value={subtitleCard} />}
							</div>
							<div class="bottom-item-section item-section">
								{priceСard && <RichText.Content tagName="div" className={'price-card'} value={priceСard} />}
								<button
									class="modal-form green"
									data-titleform={'Профтестирование: ' + titleСard}
									data-titleproduct={titleСard}
									data-referer="https://art-lichnost.ru/proftestirovanie/"
									data-datestart=""
								>Записаться</button>
								<button
									class="more green"
									data-titleform={'Профтестирование: ' + titleСard}
									data-titleproduct={titleСard}
									data-referer="https://art-lichnost.ru/proftestirovanie/"
									data-datestart=""
								>Подробнее {iconArray}</button>
							</div>
						</div>}
						{inActiveCard2 && <div class="item-card card-2162 proficiency-testing">
							<div class="top-item-section item-section">
								{placeCard2 && <RichText.Content tagName="span" className={'place-card'} value={placeCard2} />}
								{titleСard2 && <RichText.Content tagName="div" className={'title-card'} value={titleСard2} />}
								{subtitleCard2 && <RichText.Content tagName="p" className={'subtitle-card'} value={subtitleCard2} />}
							</div>
							<div class="bottom-item-section item-section">
								{priceСard2 && <RichText.Content tagName="div" className={'price-card'} value={priceСard2} />}
								<button
									class="modal-form green"
									data-titleform={'Профтестирование: ' + titleСard2}
									data-titleproduct={titleСard2}
									data-referer="https://art-lichnost.ru/proftestirovanie/"
									data-datestart=""
								>Записаться</button>
								<button
									class="more green"
									data-titleform={'Профтестирование: ' + titleСard2}
									data-titleproduct={titleСard2}
									data-referer="https://art-lichnost.ru/proftestirovanie/"
									data-datestart=""
								>Подробнее {iconArray}</button>
							</div>
						</div>}
						{inActiveCard3 && <div class="item-card card-30022 proficiency-testing">
							<div class="top-item-section item-section">
								{placeCard3 && <RichText.Content tagName="span" className={'place-card'} value={placeCard3} />}
								{titleСard3 && <RichText.Content tagName="div" className={'title-card'} value={titleСard3} />}
								{subtitleCard3 && <RichText.Content tagName="p" className={'subtitle-card'} value={subtitleCard3} />}
							</div>
							<div class="bottom-item-section item-section">
								{priceСard3 && <RichText.Content tagName="div" className={'price-card'} value={priceСard3} />}
								<button
									class="modal-form green"
									data-titleform={'Профтестирование: ' + titleСard3}
									data-titleproduct={titleСard3}
									data-referer="https://art-lichnost.ru/proftestirovanie/"
									data-datestart=""
								>Записаться</button>
								<button
									class="more green"
									data-titleform={'Профтестирование: ' + titleСard3}
									data-titleproduct={titleСard3}
									data-referer="https://art-lichnost.ru/proftestirovanie/"
									data-datestart=""
								>Подробнее {iconArray}</button>
							</div>
						</div>}
					</div>
					{description_sale && <RichText.Content tagName="p" className={'description-sale'} value={description_sale} />}
				</div>
			</div>
		)
	};

})(
	window.wp
);
