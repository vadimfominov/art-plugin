(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const {
		InspectorControls,
		MediaUpload, useBlockProps
	} = wp.blockEditor;
	const {
		PanelBody,
		PanelRow,
		Button,
		RangeControl
	} = wp.components;
	const {
		useEffect
	} = wp.element
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	registerBlockType("fv/important-people-block", {
		title: 'Важные люди',
		icon: catIcon,
		category: 'common',
		keywords: ['Важные люди', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: 'Дети — самые важные люди в АРТ Личности'
			},
			columns: {
            type: 'number',
            default: 8,
        	},
			blocksData: {
				type: 'array',
				default: [{ img: {} }],
			},
		},
		edit: Edit,
		save: Save
	});
	function Edit(props) {
		const {
			attributes: {
				title,
				columns,
				blocksData
			},
			className,
			isSelected,
			setAttributes
		} = props;
		useEffect(() => {
			if (columns > blocksData.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData];
				while (newBlocksData.length < columns) {
					newBlocksData.push({ img: {} });
				}
				setAttributes({ blocksData: newBlocksData });
			} else if (columns < blocksData.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData: blocksData.slice(0, columns) });
			}
	  	}, [columns]);
		const updateBlockData = (index, key, value) => {
			const newBlocksData = [...blocksData];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData: newBlocksData });
		};
		const blockItems = Array.from({ length: columns }, (x, index) => (
			<li key={index} className={'item-' + (index + 1)} style={{ width: '160px', height: '195px' }}>
				{isSelected ? 
					<MediaUpload
						allowedTypes={['image']}
						onSelect={value => updateBlockData(index, 'img', value)}
						render={({ open }) => (
							<Button onClick={open}>
								{ blocksData[index]?.img?.url 
									? <img src={blocksData[index]?.img.url} alt={'photo'} width={"160"} height={"195"} /> 
									: 'Выбрать картинку'
								}
							</Button>
						)}
					/>
					: <img src={blocksData[index]?.img.url} alt={'photo'} width={"160"} height={"195"} />
				}
			</li>
		));
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
					>
					<PanelRow>
						<p>Количество колонок</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={columns}
							onChange={value => setAttributes({ columns: value })}
							min={1}
							max={12}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps}>
				<div className="wrapper">
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<ul className={'list-block'}>{blockItems}</ul>
				</div>
			</div>
		];
	}
	function Save(props) {
		const {
			attributes: {
				title,
				blocksData
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<ul className={'list-block'}>
						{blocksData.map((block, index) => (
							<li key={index} className={'item-' + (index + 1)} style={{ width: '160px', height: '195px' }}>
								{block.img?.url && (
									<img
										src={block.img?.url}
										alt={'ПК фон'}
										className={'image-for-this-block'}
										width={"160"} 
										height={"195"}
									/>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		)
  	};
})(
	window.wp
);