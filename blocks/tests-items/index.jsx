(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, useBlockProps } = wp.blockEditor;
	const { PanelBody } = wp.components;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	const iconRound = (<svg width="118" height="118" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M99.4663 57.4921C100.847 57.4921 101.974 56.3717 101.893 54.9934C101.508 48.3943 99.5983 41.9641 96.3029 36.2194C92.5928 29.7517 87.2564 24.3809 80.8302 20.6468C74.404 16.9126 67.1144 14.9468 59.6941 14.9468C53.1028 14.9468 46.6146 16.4979 40.7432 19.4617C39.5154 20.0814 39.1107 21.6103 39.795 22.8032L58.9736 56.236C59.4192 57.0129 60.2465 57.4921 61.1421 57.4921L99.4663 57.4921Z" fill="#30A933"/>
				<path d="M39.777 93.9606C39.09 95.1583 39.4979 96.6987 40.7303 97.3203C46.5986 100.28 53.0823 101.829 59.6691 101.829C67.0895 101.829 74.3791 99.8633 80.8053 96.1291C87.2314 92.395 92.5678 87.0242 96.278 80.5565C99.5712 74.8155 101.48 68.3899 101.868 61.7953C101.949 60.4112 100.821 59.2838 99.4404 59.2838L61.1067 59.2838C60.2169 59.2838 59.3959 59.7602 58.9521 60.5338L39.777 93.9606Z" fill="#7B8BFF"/>
				<path d="M38.2759 23.8515C37.5888 22.6539 36.0594 22.2392 34.9083 23.0026C29.4274 26.6376 24.8526 31.5145 21.5592 37.2556C17.849 43.7233 15.8958 51.06 15.8958 58.5283C15.8958 65.9966 17.849 73.3332 21.5592 79.8009C24.8525 85.5419 29.427 90.4186 34.9077 94.0536C36.0581 94.8166 37.5923 94.3967 38.2824 93.1938L57.4492 59.7813C57.8941 59.0058 57.8948 58.052 57.451 57.2783L38.2759 23.8515Z" fill="#E94E4E"/>
				</svg>);
	const iconFirst = (<svg width="31" height="23" viewBox="0 0 31 23" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0.499999 22.499L9.2854 5.11603C10.5615 2.59104 13.1499 0.999023 15.9791 0.999023H30.5" stroke="#535353" stroke-width="0.5"/>
				</svg>);
	const iconSecond = (<svg width="26" height="10" viewBox="0 0 26 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 1L7.9279 7.12065C9.2986 8.33164 11.0646 9 12.8936 9H26" stroke="#535353" stroke-width="0.5"/>
				</svg>);
	const iconThird = (<svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1.00391 21.249L4.62149 6.24148C5.4335 2.87284 8.44752 0.499023 11.9126 0.499023H20.625" stroke="#535353" stroke-width="0.5"/>
				</svg>);
	registerBlockType("fv/tests-items", {
		title: 'Структура теста',
		icon: catIcon,
		category: 'common',
		keywords: ['tests items', 'фке', 'art'],
		attributes: {
			title: {
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
			title4: {
				type: 'string',
				default: ''
			},
			description4: {
				type: 'string',
				default: ''
			},
			title5: {
				type: 'string',
				default: ''
			},
			title5_1: {
				type: 'string',
				default: ''
			},
			description5_1: {
				type: 'string',
				default: ''
			},
			title5_2: {
				type: 'string',
				default: ''
			},
			description5_2: {
				type: 'string',
				default: ''
			},
			title5_3: {
				type: 'string',
				default: ''
			},
			description5_3: {
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
				title1,
				description1,
				title2,
				description2,
				title3,
				description3,
				title4,
				description4,
				title5,
				title5_1,
				title5_2,
				title5_3,
				description5_1,
				description5_2,
				description5_3,
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
					{/* <PanelRow>
						<TextControl
							label="Имя пользователя VK"
							onChange={(newValue) => setAttributes({ vk: newValue })}
							value={vk}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow> */}
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<div className={'container'}>
						<div className={'item-block'}>
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
						<div className={'item-block'}>
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
						<div className={'item-block third-item'}>
							<RichText
								tagName="span"
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
						<div className={'item-block'}>
							<RichText
								tagName="span"
								onChange={ title4 => setAttributes({ title4 })}
								value={title4}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={ description4 => setAttributes({ description4 })}
								value={description4}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'item-block last-item'}>
							<RichText
								tagName="span"
								onChange={ title5 => setAttributes({ title5 })}
								value={title5}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<div className={'container-items'}>
								{iconRound}
								<div className={'item'}>
									{iconFirst}
									<RichText
										tagName="span"
										onChange={ title5_1 => setAttributes({ title5_1 })}
										value={title5_1}
										placeholder="Заголовок..."
										// allowedFormats={[]}
									/>
									<RichText
										tagName="p"
										onChange={ description5_1 => setAttributes({ description5_1 })}
										value={description5_1}
										placeholder="Описание..."
										// allowedFormats={[]}
									/>
								</div>
								<div className={'item'}>
									{iconThird}
									<RichText
										tagName="span"
										onChange={ title5_2 => setAttributes({ title5_2 })}
										value={title5_2}
										placeholder="Заголовок..."
										// allowedFormats={[]}
									/>
									<RichText
										tagName="p"
										onChange={ description5_2 => setAttributes({ description5_2 })}
										value={description5_2}
										placeholder="Описание..."
										// allowedFormats={[]}
									/>
								</div>
								<div className={'item'}>
									{iconSecond}
									<RichText
										tagName="span"
										onChange={ title5_3 => setAttributes({ title5_3 })}
										value={title5_3}
										placeholder="Заголовок..."
										// allowedFormats={[]}
									/>
									<RichText
										tagName="p"
										onChange={ description5_3 => setAttributes({ description5_3 })}
										value={description5_3}
										placeholder="Описание..."
										// allowedFormats={[]}
									/>
								</div>
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
				title1,
				description1,
				title2,
				description2,
				title3,
				description3,
				title4,
				description4,
				title5,
				title5_1,
				title5_2,
				title5_3,
				description5_1,
				description5_2,
				description5_3,
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<div className={'container'}>
						<div className={'item-block'}>
							<RichText.Content tagName="span" value={title1} />
							<RichText.Content tagName="p" value={description1} />
						</div>
						<div className={'item-block'}>
							<RichText.Content tagName="span" value={title2} />
							<RichText.Content tagName="p" value={description2} />
						</div>
						<div className={'item-block third-item'}>
							<RichText.Content tagName="span" value={title3} />
							<RichText.Content tagName="p" value={description3} />
						</div>
						<div className={'item-block'}>
							<RichText.Content tagName="span" value={title4} />
							<RichText.Content tagName="p" value={description4} />
						</div>
						<div className={'item-block last-item'}>
							<RichText.Content tagName="span" value={title5} />
							<div className={'container-items'}>
								{iconRound}
								<div className={'item'}>
									{iconFirst}
									<RichText.Content tagName="span" value={title5_1} />
									<RichText.Content tagName="p" value={description5_1} />
								</div>
								<div className={'item'}>
									{iconThird}
									<RichText.Content tagName="span" value={title5_2} />
									<RichText.Content tagName="p" value={description5_2} />
								</div>
								<div className={'item'}>
									{iconSecond}
									<RichText.Content tagName="span" value={title5_3} />
									<RichText.Content tagName="p" value={description5_3} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
  	};
})(
	window.wp
);