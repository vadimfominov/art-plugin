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

	registerBlockType('fv/welcome-child', {
		title: 'Добро пожаловать',
		icon: catIcon,
		category: 'common',
		keywords: ['child busy', 'return', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			columns: {
            type: 'number',
            default: 6,
        	},
			description: {
				type: 'string',
				default: ''
			},
			blocksData: {
				type: 'array',
				default: [{ title: '', description: '', img: {} }],
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
				description,
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
					newBlocksData.push({ title: '', description: '', img: {} });
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
			<li key={index} className={'item-' + (index + 1)}>
				{isSelected ? 
					<MediaUpload
						allowedTypes={['image']}
						onSelect={value => updateBlockData(index, 'img', value)}
						render={({ open }) => (
							<Button onClick={open}>
								{ blocksData[index]?.img?.url 
									? <img src={blocksData[index]?.img.url} alt={`test`} style={{ width: '100%', height: 'auto' }} /> 
									: 'Выбрать картинку'
								}
							</Button>
						)}
					/>
					: <img src={blocksData[index]?.img.url} alt={`test`} style={{ width: '100%', height: 'auto' }} />
				}
				<RichText
					tagName="span"
					onChange={value => updateBlockData(index, 'title', value)}
					value={blocksData[index]?.title}
					placeholder="Заголовок..."
					// allowedFormats={[]}
				/>
				<RichText
					tagName="p"
					onChange={value => updateBlockData(index, 'description', value)}
					value={blocksData[index]?.description}
					placeholder="Описание..."
					// allowedFormats={[]}
				/>
			</li>
		));
		
		return [
			<InspectorControls>
				{/* <PanelBody
					title="Настройки блока"
					initialOpen={true}
					>
					<PanelRow>
						<p>Программа «Лагерь»</p>
						<RangeControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							value={columns}
							onChange={ columns => setAttributes({ columns })}
							min={1}
							max={6}
						/>
					</PanelRow>
				</PanelBody> */}
			</InspectorControls>,
			<div className={className}>
				<div className="wrapper">
					<RichText
						tagName="h2"
						onChange={ title => setAttributes({ title })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<RichText
						tagName="p"
						onChange={ description => setAttributes({ description })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
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
				description,
				blocksData
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<ul className={'list-block'}>
						{blocksData.map((block, index) => (
							<li key={index} className={'item-' + (index + 1)}>
								{block.img?.url && (
									<img
										src={block.img?.url}
										alt={'ПК фон'}
										className={'image-for-this-block'}
									/>
								)}
								<RichText.Content tagName="span" value={block.title} />
								<RichText.Content tagName="p" value={block.description} />
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
