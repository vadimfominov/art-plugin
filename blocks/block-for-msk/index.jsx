(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { PanelBody } = wp.components;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	registerBlockType("fv/block-for-msk", {
		title: 'Блок для Москвы',
		icon: catIcon,
		category: 'common',
		keywords: ['Блок для Москвы', 'block for msk', 'фке', 'art'],
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
			title3: {
				type: 'string',
				default: ''
			},
			description3: {
				type: 'string',
				default: ''
			},
			btnTitle: {
				type: 'string',
				default: ''
			},
			btnTitle2: {
				type: 'string',
				default: ''
			},
			btnTitle3: {
				type: 'string',
				default: ''
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
				title3,
				description3,
				btnTitle,
				btnTitle2,
				btnTitle3
			},
			className,
			isSelected,
			setAttributes
		} = props;
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
				<PanelBody
					title="Ссылки на соцсети"
					initialOpen={true}
				>
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
					/>
					<div className={'container'}>
						<RichText
							tagName="p"
							onChange={description => setAttributes({ description })}
							value={description}
							placeholder="Описание..."
						/>
						<div className={'items'}>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText
									tagName="span"
									onChange={title1 => setAttributes({ title1 })}
									value={title1}
									placeholder="Заголовок..."
								/>
								<RichText
									tagName="p"
									onChange={description1 => setAttributes({ description1 })}
									value={description1}
									placeholder="Описание..."
								/>
							</div>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText
									tagName="span"
									onChange={title2 => setAttributes({ title2 })}
									value={title2}
									placeholder="Заголовок..."
								/>
								<RichText
									tagName="p"
									onChange={description2 => setAttributes({ description2 })}
									value={description2}
									placeholder="Описание..."
								/>
							</div>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText
									tagName="span"
									onChange={title3 => setAttributes({ title3 })}
									value={title3}
									placeholder="Заголовок..."
								/>
								<RichText
									tagName="p"
									onChange={description3 => setAttributes({ description3 })}
									value={description3}
									placeholder="Описание..."
								/>
							</div>
						</div>
					</div>
					<div className={'bottom-container'}>
						<RichText
							tagName="div"
							onChange={btnTitle => setAttributes({ btnTitle })}
							value={btnTitle}
							placeholder="Заголовок..."
						/>
						<RichText
							tagName="div"
							onChange={btnTitle2 => setAttributes({ btnTitle2 })}
							value={btnTitle2}
							placeholder="Заголовок..."
						/>
						<RichText
							tagName="div"
							onChange={btnTitle3 => setAttributes({ btnTitle3 })}
							value={btnTitle3}
							placeholder="Заголовок..."
						/>
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
				title1,
				description1,
				title2,
				description2,
				title3,
				description3,
				btnTitle,
				btnTitle2,
				btnTitle3
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<div className={'container'}>
						<RichText.Content tagName="p" value={description} />
						<div className={'items'}>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText.Content tagName="span" value={title1} />
								<RichText.Content tagName="p" value={description1} />
							</div>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText.Content tagName="span" value={title2} />
								<RichText.Content tagName="p" value={description2} />
							</div>
							<div className={'item-block'}>
								<span className={'icon'}></span>
								<RichText.Content tagName="span" value={title3} />
								<RichText.Content tagName="p" value={description3} />
							</div>
						</div>
					</div>
					<div className={'bottom-container'}>
						{btnTitle && <RichText.Content tagName="div" value={btnTitle} />}
						{btnTitle2 && <RichText.Content tagName="div" value={btnTitle2} />}
						{btnTitle3 && <RichText.Content tagName="div" value={btnTitle3} />}
					</div>
				</div>
			</div>
		)
	};
})(
	window.wp
);