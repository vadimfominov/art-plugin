(function (wp) {

	// cd art.loc/wp-content/plugins/art-plugin

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const { apiFetch } = wp;

	const {
		InspectorControls,
		MediaUpload,
	} = wp.blockEditor;

	const {
		TextControl,
		PanelBody,
		PanelRow,
		Button,
		RangeControl
	} = wp.components;

	const {
		useState,
		useEffect
	} = wp.element

	const catIcon = 'cat'

	registerBlockType('fv/faq-section', {
		title: 'Ответы на вопросы',
		icon: catIcon,
		category: 'common',
		keywords: ['Ответы на вопросы', 'faq', 'фке', 'art'],
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
				default: [{ question: '', answer: '' }],
		  	},
			columns: {
            type: 'number',
            default: 9,
        	},
			blocksData2: {
				type: 'array',
				default: [{ question: '', answer: '' }],
		  	},
			columns2: {
            type: 'number',
            default: 9,
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
				blocksData2,
				columns2
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
					newBlocksData.push({ question: '', answer: '' });
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
			<div key={index} className={'item'}>
				<div className={'question-item'}>
					<RichText
						tagName="span"
						onChange={value => updateBlockData(index, 'question', value)}
						value={blocksData[index]?.question}
						placeholder="Вопрос..."
						// allowedFormats={['core/text-color']}
					/>
					<span className={'faq-icon'}></span>
				</div>
				<div className={'answer-item'}>
					<RichText
						tagName="p"
						onChange={value => updateBlockData(index, 'answer', value)}
						value={blocksData[index]?.answer}
						placeholder="Ответ..."
						// allowedFormats={[]}
					/>
				</div>
			</div>
		));

		useEffect(() => {
			if (columns2 > blocksData2.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData2];
				while (newBlocksData.length < columns2) {
					newBlocksData.push({ question: '', answer: '' });
				}
				setAttributes({ blocksData2: newBlocksData });
			} else if (columns2 < blocksData2.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData2: blocksData2.slice(0, columns2) });
			}
	  	}, [columns2]);

		const updateBlockData2 = (index, key, value) => {
			const newBlocksData = [...blocksData2];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData2: newBlocksData });
		};

		const blockItems2 = Array.from({ length: columns2 }, (x, index) => (
			<div key={index} className={'item'}>
				<div className={'question-item'}>
					<RichText
						tagName="span"
						onChange={value => updateBlockData2(index, 'question', value)}
						value={blocksData2[index]?.question}
						placeholder="Вопрос..."
						// allowedFormats={['core/text-color']}
					/>
					<span className={'faq-icon'}></span>
				</div>
				<div className={'answer-item'}>
					<RichText
						tagName="p"
						onChange={value => updateBlockData2(index, 'answer', value)}
						value={blocksData2[index]?.answer}
						placeholder="Ответ..."
						// allowedFormats={[]}
					/>
				</div>
			</div>
		));
		
		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
					>
					<PanelRow>
						<p>Количество элементов</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={columns}
							onChange={ columns => setAttributes({ columns })}
							min={1}
							max={16}
						/>
					</PanelRow>
					<PanelRow>
						<p>Количество элементов</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={columns2}
							onChange={ columns2 => setAttributes({ columns2 })}
							min={1}
							max={16}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={ title => setAttributes({ title })}
						value={title}
						placeholder="Заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<RichText
						tagName="p"
						onChange={ description => setAttributes({ description })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={['core/link']}
					/>
					<div className={'faq-container'}>
						<div className={'left-faq'}>
							{blockItems}
						</div>
						<div className={'right-faq'}>
							{blockItems2}
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
				blocksData,
				blocksData2
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<div className={'faq-container'}>
						<div className={'left-faq'}>
							{blocksData.map((block, index) => (
								<div key={index} className={'item'}>
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
							{blocksData2.map((block, index) => (
								<div key={index} className={'item'}>
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
						
					</div>
				</div>
			</div>
		)
  	};

})(
	window.wp
);
