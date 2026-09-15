(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { PanelBody, Button } = wp.components;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	registerBlockType("fv/vek-block", {
		title: '21 век',
		icon: catIcon,
		category: 'common',
		keywords: ['21 vek', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
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
			description4: {
				type: 'string',
				default: ''
			},
			description5: {
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
				description2,
				description3,
				description4,
				description5,
				image3
			},
			className,
			isSelected,
			setAttributes
		} = props;
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps}>
				<div className={'wrapper'}>
					{(isSelected || !!title) && <RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Заголовок..."
					/>}
					<div className={'container-vek-block'}>
						{(isSelected || !!description) && <RichText
							tagName="b"
							onChange={(value) => setAttributes({ description: value })}
							value={description}
							placeholder="Описание..."
						/>}
						{(isSelected || !!description2) && <RichText
							tagName="p"
							onChange={(value) => setAttributes({ description2: value })}
							value={description2}
							placeholder="Описание..."
						/>}
						{(isSelected || !!description3) && <RichText
							tagName="p"
							onChange={(value) => setAttributes({ description3: value })}
							value={description3}
							placeholder="Описание..."
						/>}
						{(isSelected || !!description4) && <RichText
							tagName="p"
							onChange={(value) => setAttributes({ description4: value })}
							value={description4}
							placeholder="Описание..."
						/>}
						<div className={'item'}>
							{(isSelected || !!description5) && <RichText
								tagName="p"
								onChange={(value) => setAttributes({ description5: value })}
								value={description5}
								placeholder="Описание..."
							/>}
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
				description2,
				description3,
				description4,
				description5,
				image3
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					{title && <RichText.Content tagName="h2" value={title} />}
					<div className={'container-vek-block'}>
						{description && <RichText.Content tagName="p" value={description} />}
						{description2 && <RichText.Content tagName="p" value={description2} />}
						{description3 && <RichText.Content tagName="p" value={description3} />}
						{description4 && <RichText.Content tagName="p" value={description4} />}
						<div className={'item'}>
							{description5 && <RichText.Content tagName="p" value={description5} />}
							{ image3 && image3.url && 
								<img 
									src={image3.url} 
									alt={image3.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
						</div>
					</div>
				</div>
			</div>
		)
  	};
})(
	window.wp
);