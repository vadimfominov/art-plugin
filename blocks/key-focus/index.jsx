(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { PanelBody, PanelRow, RangeControl, Button } = wp.components;
	const { useEffect } = wp.element;
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	registerBlockType("fv/key-focus", {
		title: 'Актуальные направления',
		icon: catIcon,
		category: 'common',
		keywords: ['Актуальные направления', 'key-focus', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			blocksData: {
				type: 'array',
				default: [{ listItems: [''], title: '', description: '' }],
			},
			columns: {
				type: 'number',
				default: 6,
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
				blocksData,
				columns,
			},
			className,
			isSelected,
			setAttributes,
		} = props;
		useEffect(() => {
			if (columns > blocksData.length) {
				const newBlocksData = [...blocksData];
				while (newBlocksData.length < columns) {
					newBlocksData.push({ listItems: [''], title: '', description: '' });
				}
				setAttributes({ blocksData: newBlocksData });
			} else if (columns < blocksData.length) {
				setAttributes({ blocksData: blocksData.slice(0, columns) });
			}
		}, [columns]);
		const updateBlockData = (index, key, value) => {
			const newBlocksData = [...blocksData];
			newBlocksData[index] = { ...newBlocksData[index], [key]: value };
			setAttributes({ blocksData: newBlocksData });
		};
		// Функции для работы со списком как с массивом
		const updateListItem = (blockIndex, itemIndex, value) => {
			const newBlocksData = [...blocksData];
			const listItems = [...(newBlocksData[blockIndex]?.listItems || [''])];
			listItems[itemIndex] = value;
			newBlocksData[blockIndex] = { ...newBlocksData[blockIndex], listItems };
			setAttributes({ blocksData: newBlocksData });
		};
		const addListItem = (blockIndex, itemIndex) => {
			const newBlocksData = [...blocksData];
			const listItems = [...(newBlocksData[blockIndex]?.listItems || [''])];
			listItems.splice(itemIndex + 1, 0, '');
			newBlocksData[blockIndex] = { ...newBlocksData[blockIndex], listItems };
			setAttributes({ blocksData: newBlocksData });
		};
		const removeListItem = (blockIndex, itemIndex) => {
			const newBlocksData = [...blocksData];
			const listItems = [...(newBlocksData[blockIndex]?.listItems || [''])];
			if (listItems.length <= 1) return;
			listItems.splice(itemIndex, 1);
			newBlocksData[blockIndex] = { ...newBlocksData[blockIndex], listItems };
			setAttributes({ blocksData: newBlocksData });
		};
		const blockItems = Array.from({ length: columns }, (x, blockIndex) => {
			const listItems = blocksData[blockIndex]?.listItems || [''];
			const blockTitle = blocksData[blockIndex]?.title || '';
			const blockDescription = blocksData[blockIndex]?.description || '';
			const imageURL = blocksData[blockIndex]?.image?.url;
			return (
				<div key={blockIndex} className={'item item-' + (blockIndex + 1)}>
					{/* 1. СПИСОК - каждый пункт отдельный RichText */}
					<div className="text-box">
						<div className="list-wrapper">
							<ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'disc' }}>
								{listItems.map((item, itemIndex) => (
									<li key={`${blockIndex}-${itemIndex}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
										<RichText
											tagName="span"
											value={item}
											onChange={(value) => updateListItem(blockIndex, itemIndex, value)}
											placeholder={`Пункт ${itemIndex + 1}...`}
											onKeyDown={(e) => {
												if (e.key === 'Enter' && !e.shiftKey) {
													e.preventDefault();
													addListItem(blockIndex, itemIndex);
													// Фокус на новый пункт
													setTimeout(() => {
														const newItem = document.querySelector();
														if (newItem) newItem.focus();
													}, 10);
												}
												if (e.key === 'Backspace' && !item && listItems.length > 1) {
													e.preventDefault();
													removeListItem(blockIndex, itemIndex);
												}
											}}
											style={{ flex: 1, padding: '2px 4px', minWidth: '30px' }}
											data-block={blockIndex}
											data-item={itemIndex}
										/>
										{listItems.length > 1 && (
											<button
												type="button"
												onClick={() => removeListItem(blockIndex, itemIndex)}
												style={{ marginLeft: '8px', color: '#cc1818', cursor: 'pointer', background: 'none', border: 'none' }}
											>
												✕
											</button>
										)}
									</li>
								))}
							</ul>
							<button
								type="button"
								onClick={() => {
									const newBlocksData = [...blocksData];
									const listItems = [...(newBlocksData[blockIndex]?.listItems || [''])];
									listItems.push('');
									newBlocksData[blockIndex] = { ...newBlocksData[blockIndex], listItems };
									setAttributes({ blocksData: newBlocksData });
								}}
								style={{ color: '#007cba', cursor: 'pointer', background: 'none', border: '1px solid rgb(0, 124, 186)' }}
							>
								+ Добавить пункт
							</button>
						</div>
						{/* 2. ЗАГОЛОВОК */}
						<RichText
							tagName="span"
							onChange={(value) => updateBlockData(blockIndex, 'title', value)}
							value={blockTitle}
							placeholder="Заголовок..."
						/>
						{/* 3. ОПИСАНИЕ */}
						<RichText
							tagName="p"
							onChange={(value) => updateBlockData(blockIndex, 'description', value)}
							value={blockDescription}
							placeholder="Описание..."
						/>
					</div>
					{!imageURL ?
						<MediaUpload
							allowedTypes={['image']}
							onSelect={value => updateBlockData(blockIndex, 'image', value)}
							render={({ open }) => (
								<Button onClick={open} isPrimary isLarge>
									{blocksData[blockIndex]?.image
										? <img src={imageURL} alt={'photo'} width={"100%"} height={"auto"} />
										: 'Выбрать картинку'}
								</Button>
							)}
						/>
						:
						<>
							{imageURL && <img src={imageURL} alt={'photo'} width={"100%"} height={"auto"} />}
							{isSelected && (
								<Button onClick={() => updateBlockData(blockIndex, 'image', null)} className={'remove-img'}>
									{`Удалить`}
								</Button>
							)}
						</>
					}
				</div>
			);
		});
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
				<PanelBody title="Настройки блока" initialOpen={true}>
					<PanelRow>
						<p>Количество элементов</p>
						<RangeControl
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize={true}
							value={columns}
							onChange={value => setAttributes({ columns: value })}
							min={1}
							max={20}
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
						placeholder="Заголовок..."
					/>
					<RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="Описание..."
					/>
					<div className={'block-container'}>
						<div className={'block-list'}>
							{blockItems}
						</div>
						<button type="button" className="load-more-list">Свернуть</button>
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
				blocksData,
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<div className={'block-container'}>
						<div className={'block-list'}>
							{blocksData.map((block, index) => (
								<div key={index} className={'item item-' + (index + 1)}>
									<div className="text-box">
										<div className="list-wrapper">
											{block.listItems && block.listItems.length > 0 && (
												<ul>
													{block.listItems.map((item, i) => (
														<li key={i} dangerouslySetInnerHTML={{ __html: item }} />
													))}
												</ul>
											)}
										</div>
										{block.title && <span dangerouslySetInnerHTML={{ __html: block.title }} />}
										{block.description && <p dangerouslySetInnerHTML={{ __html: block.description }} />}
									</div>
									{block.image?.url && (
										<img
											src={block.image?.url}
											alt={block.title || 'Image'}
											className={'image-for-this-block'}
										/>
									)}
								</div>
							))}
						</div>
						<button type="button" className="load-more-list">Показать еще</button>
					</div>
				</div>
			</div>
		);
	}
})(
	window.wp
);