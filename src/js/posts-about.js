(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls } = wp.blockEditor;
	const { PanelBody, PanelRow, ToggleControl } = wp.components;

	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
		<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z"/>
		<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z"/>
		</g>
	</svg>);

	registerBlockType('fv/posts-about', {
		title: 'posts about',
		icon: catIcon,
		category: 'common',
		keywords: ['posts about', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			title_1: {
				type: 'string',
				default: ''
			},
			link_1: {
				type: 'string',
				default: 'Подробнее'
			},
			title_2: {
				type: 'string',
				default: ''
			},
			link_2: {
				type: 'string',
				default: 'Подробнее'
			},
			title_3: {
				type: 'string',
				default: ''
			},
			link_3: {
				type: 'string',
				default: 'Подробнее'
			},
			title_4: {
				type: 'string',
				default: ''
			},
			link_4: {
				type: 'string',
				default: 'Подробнее'
			},
			title_5: {
				type: 'string',
				default: ''
			},
			link_5: {
				type: 'string',
				default: 'Подробнее'
			},
			title_6: {
				type: 'string',
				default: ''
			},
			link_6: {
				type: 'string',
				default: 'Подробнее'
			},
			inColumn: {
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
				title_1,
				link_1,
				title_2,
				link_2,
				title_3,
				link_3,
				title_4,
				link_4,
				title_5,
				link_5,
				title_6,
				link_6,
				inColumn
			},
			className,
			isSelected,
			setAttributes
		} = props;

		const activeClass = inColumn ? 'two-columns' : 'three-columns';
		
		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					<PanelRow>
						<p>3 колонки или 2 колонки</p>
						<ToggleControl
							checked={inColumn}
							onChange={() => setAttributes({ inColumn: !inColumn })}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<div className={`container ${activeClass}`}>
						<div className={'item'}>

							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ title_1: value })}
								value={title_1}
								placeholder="Заголовок..."
								// allowedFormats={['core/bold']}
							/>
							<RichText
								tagName="div"
								className={'link-more'}
								onChange={(value) => setAttributes({ link_1: value })}
								value={link_1}
								placeholder="Подробнее"
								// allowedFormats={['core/link']}
							/>

						</div>
						<div className={'item'}>

							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ title_2: value })}
								value={title_2}
								placeholder="Заголовок..."
								// allowedFormats={['core/bold']}
							/>
							<RichText
								tagName="div"
								className={'link-more'}
								onChange={(value) => setAttributes({ link_2: value })}
								value={link_2}
								placeholder="Подробнее"
								// allowedFormats={['core/link']}
							/>

						</div>
						<div className={'item'}>

							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ title_3: value })}
								value={title_3}
								placeholder="Заголовок..."
								// allowedFormats={['core/bold']}
							/>
							<RichText
								tagName="div"
								className={'link-more'}
								onChange={(value) => setAttributes({ link_3: value })}
								value={link_3}
								placeholder="Подробнее"
								// allowedFormats={['core/link']}
							/>

						</div>
						<div className={'item'}>

							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ title_4: value })}
								value={title_4}
								placeholder="Заголовок..."
								// allowedFormats={['core/bold']}
							/>
							<RichText
								tagName="div"
								className={'link-more'}
								onChange={(value) => setAttributes({ link_4: value })}
								value={link_4}
								placeholder="Подробнее"
								// allowedFormats={['core/link']}
							/>

						</div>
						<div className={'item'}>

							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ title_5: value })}
								value={title_5}
								placeholder="Заголовок..."
								// allowedFormats={['core/bold']}
							/>
							<RichText
								tagName="div"
								className={'link-more'}
								onChange={(value) => setAttributes({ link_5: value })}
								value={link_5}
								placeholder="Подробнее"
								// allowedFormats={['core/link']}
							/>

						</div>
						<div className={'item'}>

							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ title_6: value })}
								value={title_6}
								placeholder="Заголовок..."
								// allowedFormats={['core/bold']}
							/>
							<RichText
								tagName="div"
								className={'link-more'}
								onChange={(value) => setAttributes({ link_6: value })}
								value={link_6}
								placeholder="Подробнее"
								// allowedFormats={['core/link']}
							/>

						</div>
					</div>
				</div>
			</div>
		];
	}

	function Save(props) {
		const { attributes, className } = props;
		const { 	title, title_1, link_1, title_2, link_2, title_3, link_3, 
					title_4, link_4, title_5, link_5, title_6, link_6, inColumn } = attributes;

		const activeClass = inColumn ? 'two-columns' : 'three-columns';

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />

					<div className={`container ${activeClass}`}>
						{title_1 && <div className={'item'}>

							{title_1 && <RichText.Content tagName="span" value={title_1} />}
							{link_1 && <RichText.Content className={'link-more'} tagName="div" value={link_1} />}

						</div>}
						{title_2 && <div className={'item'}>

							{title_2 && <RichText.Content tagName="span" value={title_2} />}
							{link_2 && <RichText.Content className={'link-more'} tagName="div" value={link_2} />}

						</div>}
						{title_3 && <div className={'item'}>

							{title_3 && <RichText.Content tagName="span" value={title_3} />}
							{link_3 && <RichText.Content className={'link-more'} tagName="div" value={link_3} />}

						</div>}
						{title_4 && <div className={'item'}>

							{title_4 && <RichText.Content tagName="span" value={title_4} />}
							{link_4 && <RichText.Content className={'link-more'} tagName="div" value={link_4} />}

						</div>}
						{title_5 && <div className={'item'}>

							{title_5 && <RichText.Content tagName="span" value={title_5} />}
							{link_5 && <RichText.Content className={'link-more'} tagName="div" value={link_5} />}

						</div>}
						{title_6 && <div className={'item'}>

							{title_6 && <RichText.Content tagName="span" value={title_6} />}
							{link_6 && <RichText.Content className={'link-more'} tagName="div" value={link_6} />}

						</div>}
					</div>

				</div>
			</div>
		)
  	};

})(
	window.wp
);
