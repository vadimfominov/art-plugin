(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const { InspectorControls, MediaUpload, useBlockProps } = wp.blockEditor;
	const { TextControl, PanelBody, PanelRow, Button, SelectControl, ToggleControl, RangeControl } = wp.components;
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
	registerBlockType("fv/link-camp-tabs", {
		title: 'Ссылки на лагерь, вкладки',
		icon: catIcon,
		category: 'common',
		keywords: ['Ссылки на лагерь, вкладки', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			activeTab: {
				type: 'number',
				default: 0
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
			selectedShift: {
				type: 'object',
				default: { label: '', value: '' }
			},
			shiftLinks: {
				type: 'object',
				default: {}
			},
			inService1: {
				type: 'boolean',
				default: false
			},
			inService2: {
				type: 'boolean',
				default: false
			},
			inService3: {
				type: 'boolean',
				default: false
			},
			inService4: {
				type: 'boolean',
				default: false
			},
			blocksData1_1: {
				type: 'array',
				default: [{ question: '', answer: '' }],
			},
			columns1_1: {
				type: 'number',
				default: 4,
			},
			blocksData1_2: {
				type: 'array',
				default: [{ question: '', answer: '' }],
			},
			columns1_2: {
				type: 'number',
				default: 4,
			},
			blocksData2_1: {
				type: 'array',
				default: [{ question: '', answer: '' }],
			},
			columns2_1: {
				type: 'number',
				default: 4,
			},
			blocksData2_2: {
				type: 'array',
				default: [{ question: '', answer: '' }],
			},
			columns2_2: {
				type: 'number',
				default: 4,
			},
			blocksData3_1: {
				type: 'array',
				default: [{ question: '', answer: '' }],
			},
			columns3_1: {
				type: 'number',
				default: 4,
			},
			blocksData3_2: {
				type: 'array',
				default: [{ question: '', answer: '' }],
			},
			columns3_2: {
				type: 'number',
				default: 4,
			},
			blocksData4_1: {
				type: 'array',
				default: [{ question: '', answer: '' }],
			},
			columns4_1: {
				type: 'number',
				default: 4,
			},
			blocksData4_2: {
				type: 'array',
				default: [{ question: '', answer: '' }],
			},
			columns4_2: {
				type: 'number',
				default: 4,
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
				selectedShift,
				shiftLinks,
				item1,
				item2,
				item3,
				item4,
				inService1,
				inService2,
				inService3,
				inService4,
				blocksData1_1,
				columns1_1,
				blocksData1_2,
				columns1_2,
				blocksData2_1,
				columns2_1,
				blocksData2_2,
				columns2_2,
				blocksData3_1,
				columns3_1,
				blocksData3_2,
				columns3_2,
				blocksData4_1,
				columns4_1,
				blocksData4_2,
				columns4_2,
				activeTab
			},
			className,
			isSelected,
			setAttributes
		} = props;
		// Функция для переключения вкладок
		const setActiveTab = (tabNumber) => {
			setAttributes({ activeTab: tabNumber });
		};
		// Для первой смены
		useEffect(() => {
			if (columns1_1 > blocksData1_1.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData1_1];
				while (newBlocksData.length < columns1_1) {
					newBlocksData.push({ question: '', answer: '' });
				}
				setAttributes({ blocksData1_1: newBlocksData });
			} else if (columns1_1 < blocksData1_1.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData1_1: blocksData1_1.slice(0, columns1_1) });
			}
		}, [columns1_1]);
		const updateBlockData1_1 = (index, key, value) => {
			const newBlocksData = [...blocksData1_1];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData1_1: newBlocksData });
		};
		const blockItems1_1 = Array.from({ length: columns1_1 }, (x, index) => (
			<div key={index} className={'item-camp-tab'}>
				<div className={'question-item'}>
					<RichText
						tagName="span"
						onChange={value => updateBlockData1_1(index, 'question', value)}
						value={blocksData1_1[index]?.question}
						placeholder="Вопрос..."
					/>
					<span className={'faq-icon'}></span>
				</div>
				<div className={'answer-item'}>
					<RichText
						tagName="p"
						onChange={value => updateBlockData1_1(index, 'answer', value)}
						value={blocksData1_1[index]?.answer}
						placeholder="Ответ..."
					/>
				</div>
			</div>
		));
		useEffect(() => {
			if (columns1_2 > blocksData1_2.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData1_2];
				while (newBlocksData.length < columns1_2) {
					newBlocksData.push({ question: '', answer: '' });
				}
				setAttributes({ blocksData1_2: newBlocksData });
			} else if (columns1_2 < blocksData1_2.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData1_2: blocksData1_2.slice(0, columns1_2) });
			}
		}, [columns1_2]);
		const updateBlockData1_2 = (index, key, value) => {
			const newBlocksData = [...blocksData1_2];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData1_2: newBlocksData });
		};
		const blockItems1_2 = Array.from({ length: columns1_2 }, (x, index) => (
			<div key={index} className={'item-camp-tab'}>
				<div className={'question-item'}>
					<RichText
						tagName="span"
						onChange={value => updateBlockData1_2(index, 'question', value)}
						value={blocksData1_2[index]?.question}
						placeholder="Вопрос..."
					/>
					<span className={'faq-icon'}></span>
				</div>
				<div className={'answer-item'}>
					<RichText
						tagName="p"
						onChange={value => updateBlockData1_2(index, 'answer', value)}
						value={blocksData1_2[index]?.answer}
						placeholder="Ответ..."
					/>
				</div>
			</div>
		));
		// Для второй смены
		useEffect(() => {
			if (columns2_1 > blocksData2_1.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData2_1];
				while (newBlocksData.length < columns2_1) {
					newBlocksData.push({ question: '', answer: '' });
				}
				setAttributes({ blocksData2_1: newBlocksData });
			} else if (columns2_1 < blocksData2_1.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData2_1: blocksData2_1.slice(0, columns2_1) });
			}
		}, [columns2_1]);
		const updateBlockData2_1 = (index, key, value) => {
			const newBlocksData = [...blocksData2_1];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData2_1: newBlocksData });
		};
		const blockItems2_1 = Array.from({ length: columns2_1 }, (x, index) => (
			<div key={index} className={'item-camp-tab'}>
				<div className={'question-item'}>
					<RichText
						tagName="span"
						onChange={value => updateBlockData2_1(index, 'question', value)}
						value={blocksData2_1[index]?.question}
						placeholder="Вопрос..."
					/>
					<span className={'faq-icon'}></span>
				</div>
				<div className={'answer-item'}>
					<RichText
						tagName="p"
						onChange={value => updateBlockData2_1(index, 'answer', value)}
						value={blocksData2_1[index]?.answer}
						placeholder="Ответ..."
					/>
				</div>
			</div>
		));
		useEffect(() => {
			if (columns2_2 > blocksData2_2.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData2_2];
				while (newBlocksData.length < columns2_2) {
					newBlocksData.push({ question: '', answer: '' });
				}
				setAttributes({ blocksData2_2: newBlocksData });
			} else if (columns2_2 < blocksData2_2.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData2_2: blocksData2_2.slice(0, columns2_2) });
			}
		}, [columns2_2]);
		const updateBlockData2_2 = (index, key, value) => {
			const newBlocksData = [...blocksData2_2];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData2_2: newBlocksData });
		};
		const blockItems2_2 = Array.from({ length: columns2_2 }, (x, index) => (
			<div key={index} className={'item-camp-tab'}>
				<div className={'question-item'}>
					<RichText
						tagName="span"
						onChange={value => updateBlockData2_2(index, 'question', value)}
						value={blocksData2_2[index]?.question}
						placeholder="Вопрос..."
					/>
					<span className={'faq-icon'}></span>
				</div>
				<div className={'answer-item'}>
					<RichText
						tagName="p"
						onChange={value => updateBlockData2_2(index, 'answer', value)}
						value={blocksData2_2[index]?.answer}
						placeholder="Ответ..."
					/>
				</div>
			</div>
		));
		// Для третьей смены
		useEffect(() => {
			if (columns3_1 > blocksData3_1.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData3_1];
				while (newBlocksData.length < columns3_1) {
					newBlocksData.push({ question: '', answer: '' });
				}
				setAttributes({ blocksData3_1: newBlocksData });
			} else if (columns3_1 < blocksData3_1.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData3_1: blocksData3_1.slice(0, columns3_1) });
			}
		}, [columns3_1]);
		const updateBlockData3_1 = (index, key, value) => {
			const newBlocksData = [...blocksData3_1];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData3_1: newBlocksData });
		};
		const blockItems3_1 = Array.from({ length: columns3_1 }, (x, index) => (
			<div key={index} className={'item-camp-tab'}>
				<div className={'question-item'}>
					<RichText
						tagName="span"
						onChange={value => updateBlockData3_1(index, 'question', value)}
						value={blocksData3_1[index]?.question}
						placeholder="Вопрос..."
					/>
					<span className={'faq-icon'}></span>
				</div>
				<div className={'answer-item'}>
					<RichText
						tagName="p"
						onChange={value => updateBlockData3_1(index, 'answer', value)}
						value={blocksData3_1[index]?.answer}
						placeholder="Ответ..."
					/>
				</div>
			</div>
		));
		useEffect(() => {
			if (columns3_2 > blocksData3_2.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData3_2];
				while (newBlocksData.length < columns3_2) {
					newBlocksData.push({ question: '', answer: '' });
				}
				setAttributes({ blocksData3_2: newBlocksData });
			} else if (columns3_2 < blocksData3_2.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData3_2: blocksData3_2.slice(0, columns3_2) });
			}
		}, [columns3_2]);
		const updateBlockData3_2 = (index, key, value) => {
			const newBlocksData = [...blocksData3_2];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData3_2: newBlocksData });
		};
		const blockItems3_2 = Array.from({ length: columns3_2 }, (x, index) => (
			<div key={index} className={'item-camp-tab'}>
				<div className={'question-item'}>
					<RichText
						tagName="span"
						onChange={value => updateBlockData3_2(index, 'question', value)}
						value={blocksData3_2[index]?.question}
						placeholder="Вопрос..."
					/>
					<span className={'faq-icon'}></span>
				</div>
				<div className={'answer-item'}>
					<RichText
						tagName="p"
						onChange={value => updateBlockData3_2(index, 'answer', value)}
						value={blocksData3_2[index]?.answer}
						placeholder="Ответ..."
					/>
				</div>
			</div>
		));
		// Для четвёртой смены
		useEffect(() => {
			if (columns4_1 > blocksData4_1.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData4_1];
				while (newBlocksData.length < columns4_1) {
					newBlocksData.push({ question: '', answer: '' });
				}
				setAttributes({ blocksData4_1: newBlocksData });
			} else if (columns4_1 < blocksData4_1.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData4_1: blocksData4_1.slice(0, columns4_1) });
			}
		}, [columns4_1]);
		const updateBlockData4_1 = (index, key, value) => {
			const newBlocksData = [...blocksData4_1];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData4_1: newBlocksData });
		};
		const blockItems4_1 = Array.from({ length: columns4_1 }, (x, index) => (
			<div key={index} className={'item-camp-tab'}>
				<div className={'question-item'}>
					<RichText
						tagName="span"
						onChange={value => updateBlockData4_1(index, 'question', value)}
						value={blocksData4_1[index]?.question}
						placeholder="Вопрос..."
					/>
					<span className={'faq-icon'}></span>
				</div>
				<div className={'answer-item'}>
					<RichText
						tagName="p"
						onChange={value => updateBlockData4_1(index, 'answer', value)}
						value={blocksData4_1[index]?.answer}
						placeholder="Ответ..."
					/>
				</div>
			</div>
		));
		useEffect(() => {
			if (columns4_2 > blocksData4_2.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData4_2];
				while (newBlocksData.length < columns4_2) {
					newBlocksData.push({ question: '', answer: '' });
				}
				setAttributes({ blocksData4_2: newBlocksData });
			} else if (columns4_2 < blocksData4_2.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData4_2: blocksData4_2.slice(0, columns4_2) });
			}
		}, [columns4_2]);
		const updateBlockData4_2 = (index, key, value) => {
			const newBlocksData = [...blocksData4_2];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData4_2: newBlocksData });
		};
		const blockItems4_2 = Array.from({ length: columns4_2 }, (x, index) => (
			<div key={index} className={'item-camp-tab'}>
				<div className={'question-item'}>
					<RichText
						tagName="span"
						onChange={value => updateBlockData4_2(index, 'question', value)}
						value={blocksData4_2[index]?.question}
						placeholder="Вопрос..."
					/>
					<span className={'faq-icon'}></span>
				</div>
				<div className={'answer-item'}>
					<RichText
						tagName="p"
						onChange={value => updateBlockData4_2(index, 'answer', value)}
						value={blocksData4_2[index]?.answer}
						placeholder="Ответ..."
					/>
				</div>
			</div>
		));
		const blockProps = useBlockProps();

		return [
			<InspectorControls>
				<PanelBody
					title="Настройки 1 блока"
					initialOpen={true}
				>
					<PanelRow>
						<p>Включить блок</p>
						<ToggleControl
							checked={inService1}
							onChange={() => setAttributes({ inService1: !inService1 })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
					{inService1 && <>
						<PanelRow>
							<p>Количество элементов (левая колонка)</p>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								value={columns1_1}
								onChange={columns1_1 => setAttributes({ columns1_1 })}
								min={1}
								max={16}
							/>
						</PanelRow>
						<PanelRow>
							<p>Количество элементов (правая колонка)</p>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								value={columns1_2}
								onChange={columns1_2 => setAttributes({ columns1_2 })}
								min={1}
								max={16}
							/>
						</PanelRow></>}
				</PanelBody>
				<PanelBody
					title="Настройки 2 блока"
					initialOpen={false}
				>
					<PanelRow>
						<p>Включить блок</p>
						<ToggleControl
							checked={inService2}
							onChange={() => setAttributes({ inService2: !inService2 })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
					{inService2 && <>
						<PanelRow>
							<p>Количество элементов</p>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								value={columns2_1}
								onChange={columns2_1 => setAttributes({ columns2_1 })}
								min={1}
								max={16}
							/>
						</PanelRow>
						<PanelRow>
							<p>Количество элементов</p>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								value={columns2_2}
								onChange={columns2_2 => setAttributes({ columns2_2 })}
								min={1}
								max={16}
							/>
						</PanelRow></>}
				</PanelBody>
				<PanelBody
					title="Настройки 3 блока"
					initialOpen={false}
				>
					<PanelRow>
						<p>Включить блок</p>
						<ToggleControl
							checked={inService3}
							onChange={() => setAttributes({ inService3: !inService3 })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
					{inService3 && <>
						<PanelRow>
							<p>Количество элементов</p>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								value={columns3_1}
								onChange={columns3_1 => setAttributes({ columns3_1 })}
								min={1}
								max={16}
							/>
						</PanelRow>
						<PanelRow>
							<p>Количество элементов</p>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								value={columns3_2}
								onChange={columns3_2 => setAttributes({ columns3_2 })}
								min={1}
								max={16}
							/>
						</PanelRow></>}
				</PanelBody>
				<PanelBody
					title="Настройки 4 блока"
					initialOpen={false}
				>
					<PanelRow>
						<p>Включить блок</p>
						<ToggleControl
							checked={inService4}
							onChange={() => setAttributes({ inService4: !inService4 })}
							__nextHasNoMarginBottom={true}
						/>
					</PanelRow>
					{inService4 && <>
						<PanelRow>
							<p>Количество элементов</p>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								value={columns4_1}
								onChange={columns4_1 => setAttributes({ columns4_1 })}
								min={1}
								max={16}
							/>
						</PanelRow>
						<PanelRow>
							<p>Количество элементов</p>
							<RangeControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								value={columns4_2}
								onChange={columns4_2 => setAttributes({ columns4_2 })}
								min={1}
								max={16}
							/>
						</PanelRow></>}
				</PanelBody>
			</InspectorControls>,
			<div {...blockProps}>
				<div className={'wrapper'}>
					<div className={'item first-item'}>
						<RichText
							tagName="span"
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
					</div>
					{inService1 && <button type="button" onClick={() => setActiveTab(1)} className={`item link-camp-item1 ${activeTab === 1 ? 'active' : ''}`}>
						{iconArr}
						<RichText
							tagName="span"
							onChange={(value) => setAttributes({ item1: value })}
							value={item1}
							placeholder="Описание..."
						/>
					</button>}
					{inService2 && <button type="button" onClick={() => setActiveTab(2)} className={`item link-camp-item2 ${activeTab === 2 ? 'active' : ''}`}>
						{iconArr}
						<RichText
							tagName="span"
							onChange={(value) => setAttributes({ item2: value })}
							value={item2}
							placeholder="Описание..."
						/>
					</button>}
					{inService3 && <button type="button" onClick={() => setActiveTab(3)} className={`item link-camp-item3 ${activeTab === 3 ? 'active' : ''}`}>
						{iconArr}
						<RichText
							tagName="span"
							onChange={(value) => setAttributes({ item3: value })}
							value={item3}
							placeholder="Описание..."
						/>
					</button>}
					{inService4 && <button type="button" onClick={() => setActiveTab(4)} className={`item link-camp-item4 ${activeTab === 4 ? 'active' : ''}`}>
						{iconArr}
						<RichText
							tagName="span"
							onChange={(value) => setAttributes({ item4: value })}
							value={item4}
							placeholder="Описание..."
						/>
					</button>}
				</div>
				<div className="wrapper">
					{inService1 && <div className={`faq-container faq-container1 ${activeTab === 1 ? 'active' : ''}`}>
						<div className={'left-faq'}>
							{blockItems1_1}
						</div>
						<div className={'right-faq'}>
							{blockItems1_2}
						</div>
					</div>}
					{inService2 && <div className={`faq-container faq-container2 ${activeTab === 2 ? 'active' : ''}`}>
						<div className={'left-faq'}>
							{blockItems2_1}
						</div>
						<div className={'right-faq'}>
							{blockItems2_2}
						</div>
					</div>}
					{inService3 && <div className={`faq-container faq-container3 ${activeTab === 3 ? 'active' : ''}`}>
						<div className={'left-faq'}>
							{blockItems3_1}
						</div>
						<div className={'right-faq'}>
							{blockItems3_2}
						</div>
					</div>}
					{inService4 && <div className={`faq-container faq-container4 ${activeTab === 4 ? 'active' : ''}`}>
						<div className={'left-faq'}>
							{blockItems4_1}
						</div>
						<div className={'right-faq'}>
							{blockItems4_2}
						</div>
					</div>}
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
				shiftLinks,
				item1,
				item2,
				item3,
				item4,
				blocksData1_1,
				blocksData1_2,
				blocksData2_1,
				blocksData2_2,
				blocksData3_1,
				blocksData3_2,
				blocksData4_1,
				blocksData4_2,
				inService1,
				inService2,
				inService3,
				inService4
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<div className={'item first-item'}>
						<RichText.Content tagName="span" value={title} />
						<RichText.Content tagName="p" value={description} />
					</div>
					{inService1 && item1 && <button type="button" className="item link-camp-item1">
						{iconArr}
						<RichText.Content tagName="span" value={item1} />
					</button>}
					{inService2 && item2 && <button type="button" className="item link-camp-item2">
						{iconArr}
						<RichText.Content tagName="span" value={item2} />
					</button>}
					{inService3 && item3 && <button type="button" className="item link-camp-item3">
						{iconArr}
						<RichText.Content tagName="span" value={item3} />
					</button>}
					{inService4 && item4 && <button type="button" className="item link-camp-item4">
						{iconArr}
						<RichText.Content tagName="span" value={item4} />
					</button>}
				</div>
				<div className="wrapper">
					{inService1 && <div className={'faq-container faq-container1'}>
						<div className={'left-faq'}>
							{blocksData1_1.map((block, index) => (
								<div key={index} className={'item-camp-tab'}>
									<div className={'question-item'}>
										<RichText.Content tagName="span" value={block.question} />
										<span className={'faq-icon'}></span>
									</div>
									<div className={'answer-item'}>
										<RichText.Content tagName="p" value={block.answer} />
									</div>
								</div>
							))}
						</div>
						<div className={'right-faq'}>
							{blocksData1_2.map((block, index) => (
								<div key={index} className={'item-camp-tab'}>
									<div className={'question-item'}>
										<RichText.Content tagName="span" value={block.question} />
										<span className={'faq-icon'}></span>
									</div>
									<div className={'answer-item'}>
										<RichText.Content tagName="p" value={block.answer} />
									</div>
								</div>
							))}
						</div>
					</div>}
					{inService2 && <div className={'faq-container faq-container2'}>
						<div className={'left-faq'}>
							{blocksData2_1.map((block, index) => (
								<div key={index} className={'item-camp-tab'}>
									<div className={'question-item'}>
										<RichText.Content tagName="span" value={block.question} />
										<span className={'faq-icon'}></span>
									</div>
									<div className={'answer-item'}>
										<RichText.Content tagName="p" value={block.answer} />
									</div>
								</div>
							))}
						</div>
						<div className={'right-faq'}>
							{blocksData2_2.map((block, index) => (
								<div key={index} className={'item-camp-tab'}>
									<div className={'question-item'}>
										<RichText.Content tagName="span" value={block.question} />
										<span className={'faq-icon'}></span>
									</div>
									<div className={'answer-item'}>
										<RichText.Content tagName="p" value={block.answer} />
									</div>
								</div>
							))}
						</div>
					</div>}
					{inService3 && <div className={'faq-container faq-container3'}>
						<div className={'left-faq'}>
							{blocksData3_1.map((block, index) => (
								<div key={index} className={'item-camp-tab'}>
									<div className={'question-item'}>
										<RichText.Content tagName="span" value={block.question} />
										<span className={'faq-icon'}></span>
									</div>
									<div className={'answer-item'}>
										<RichText.Content tagName="p" value={block.answer} />
									</div>
								</div>
							))}
						</div>
						<div className={'right-faq'}>
							{blocksData3_2.map((block, index) => (
								<div key={index} className={'item-camp-tab'}>
									<div className={'question-item'}>
										<RichText.Content tagName="span" value={block.question} />
										<span className={'faq-icon'}></span>
									</div>
									<div className={'answer-item'}>
										<RichText.Content tagName="p" value={block.answer} />
									</div>
								</div>
							))}
						</div>
					</div>}
					{inService4 && <div className={'faq-container faq-container4'}>
						<div className={'left-faq'}>
							{blocksData4_1.map((block, index) => (
								<div key={index} className={'item-camp-tab'}>
									<div className={'question-item'}>
										<RichText.Content tagName="span" value={block.question} />
										<span className={'faq-icon'}></span>
									</div>
									<div className={'answer-item'}>
										<RichText.Content tagName="p" value={block.answer} />
									</div>
								</div>
							))}
						</div>
						<div className={'right-faq'}>
							{blocksData4_2.map((block, index) => (
								<div key={index} className={'item-camp-tab'}>
									<div className={'question-item'}>
										<RichText.Content tagName="span" value={block.question} />
										<span className={'faq-icon'}></span>
									</div>
									<div className={'answer-item'}>
										<RichText.Content tagName="p" value={block.answer} />
									</div>
								</div>
							))}
						</div>
					</div>}
				</div>
			</div>
		)
	};
})(
	window.wp
);