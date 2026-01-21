(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const {
		InspectorControls,
		MediaUpload,
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

	const catIcon = 'cat'

	registerBlockType('fv/important-people-block', {
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
									? <img src={blocksData[index]?.img.url} alt={`test`} width={"160"} height={"195"} /> 
									: 'Выбрать картинку'
								}
							</Button>
						)}
					/>
					: <img src={blocksData[index]?.img.url} alt={`test`} width={"160"} height={"195"} />
				}
			</li>
		));
		
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
			<div className={className}>
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

		return (
			<div className={className}>
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
