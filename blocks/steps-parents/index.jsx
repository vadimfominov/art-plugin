(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, useBlockProps } = wp.blockEditor;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconMap = (<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.500081 8.79655V8.7945C0.500081 4.17834 3.90878 0.5 8 0.5C12.091 0.5 15.4999 4.17813 15.4999 8.8L15.4999 8.80205C15.5137 12.1653 13.6066 15.3505 11.6261 17.7372C10.6428 18.9221 9.65741 19.8911 8.91768 20.5638C8.54814 20.8998 8.24076 21.1611 8.02675 21.3377C8.0171 21.3456 8.00763 21.3534 7.99836 21.3611C7.34632 20.8333 5.79044 19.5049 4.26105 17.6488C2.32159 15.295 0.486293 12.1665 0.500081 8.79655ZM3.50004 8.8C3.50004 11.4612 5.4701 13.7 8 13.7C10.5299 13.7 12.5 11.4612 12.5 8.8C12.5 6.13877 10.5299 3.9 8 3.9C5.4701 3.9 3.50004 6.13877 3.50004 8.8Z" fill="#30A933" stroke="#30A933"/>
			</svg>);
	registerBlockType("fv/steps-parents", {
		title: 'Шаги родителя',
		icon: catIcon,
		category: 'common',
		keywords: ['Steps parents', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			item1: {
				type: 'string',
				default: ''
			},
			item2: {
				type: 'string',
				default: ''
			},
			item3: {
				type: 'string',
				default: ''
			},
			item4: {
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
				item1,
				item2,
				item3,
				item4
			},
			isSelected,
			setAttributes
		} = props;
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
			</InspectorControls>,
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
					/>
					<div className={'block'}>
						{iconMap}
						<div className={'container'}>
							<div className={'item'}>
								<RichText
									tagName="p"
									onChange={ item1 => setAttributes({ item1 })}
									value={item1}
									placeholder="Текст..."
								/>
							</div>
							<div className={'item'}>
								<RichText
									tagName="p"
									onChange={ item2 => setAttributes({ item2 })}
									value={item2}
									placeholder="Текст..."
								/>
							</div>
							<div className={'item'}>
								<RichText
									tagName="p"
									onChange={ item3 => setAttributes({ item3 })}
									value={item3}
									placeholder="Текст..."
								/>
							</div>
							<div className={'item'}>
								<RichText
									tagName="p"
									onChange={ item4 => setAttributes({ item4 })}
									value={item4}
									placeholder="Текст..."
								/>
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
				item1,
				item2,
				item3,
				item4
			}
		} = props;
		const blockProps = useBlockProps.save();
		
		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<div className={'block'}>
						{iconMap}
						<div className={'container'}>
							{item1 && <div className={'item'}>
								<RichText.Content tagName="p" value={item1} />
							</div>}
							{item2 && <div className={'item'}>
								<RichText.Content tagName="p" value={item2} />
							</div>}
							{item3 && <div className={'item'}>
								<RichText.Content tagName="p" value={item3} />
							</div>}
							{item4 && <div className={'item'}>
								<RichText.Content tagName="p" value={item4} />
							</div>}
						</div>
					</div>
				</div>
			</div>
		)
  	};
})(
	window.wp
);