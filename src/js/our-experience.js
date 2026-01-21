(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const { InspectorControls, MediaUpload } = wp.blockEditor;

	const {
		PanelBody,
		PanelRow,
		Button,
		RangeControl
	} = wp.components;

	const { useEffect } = wp.element

	const catIcon = 'cat'

	registerBlockType('fv/our-experience-block', {
		title: 'Наш опыт',
		icon: catIcon,
		category: 'common',
		keywords: ['Наш опыт', 'our experience', 'yfi jgsn', 'фке', 'art'],
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
				default: [{ title: '', description: '', iconSVG: '' }],
		  	},
			columns: {
            type: 'number',
            default: 4, // Начальное значение для количества столбцов
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
				columns
			},
			className,
			isSelected,
			setAttributes
		} = props;

		const fetchSVG = (url, index) => {
			fetch(url)
				.then(response => response.text())
				.then(svg => {
					const newBlocksData = [...blocksData];
					if (newBlocksData[index]) {
						newBlocksData[index].iconSVG = svg;
						setAttributes({ blocksData: newBlocksData });
					}
				})
				.catch(error => console.error('Ошибка при загрузке SVG:', error));
	  	};

		const updateBlockData = (index, key, value) => {
			const newBlocksData = [...blocksData];
			if (newBlocksData[index]) {
				 newBlocksData[index][key] = value;
				 setAttributes({ blocksData: newBlocksData });
			}
	  	};

		const blockItems = Array.from({ length: columns }, (x, index) => (
			<li key={index}>
				{isSelected ? 
					<MediaUpload
						allowedTypes={['image/svg+xml']}
						onSelect={media => fetchSVG(media.url, index)}
						render={({ open }) => (
							<Button onClick={open} isPrimary isLarge>
								{blocksData[index]?.iconSVG
										? <div className="svg-icon-wrapper" dangerouslySetInnerHTML={{ __html: blocksData[index]?.iconSVG }}></div>
										: 'Выбрать иконку'
								}
							</Button>
						)}
					/>
					: 
					<div className="svg-icon-wrapper" dangerouslySetInnerHTML={{ __html: blocksData[index]?.iconSVG }}></div>
				}
				<RichText
					tagName="span"
					onChange={value => updateBlockData(index, 'title', value)}
					value={blocksData[index]?.title}
					placeholder="Заголовок..."
					// allowedFormats={['core/text-color']}
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

		useEffect(() => {
			if (blocksData.length < columns) {
				const newBlocksData = [...blocksData];
				while (newBlocksData.length < columns) {
					newBlocksData.push({ title: '', description: '', iconSVG: '' });
				}
				setAttributes({ blocksData: newBlocksData });
			} else if (blocksData.length > columns) {
				const newBlocksData = blocksData.slice(0, columns);
				setAttributes({ blocksData: newBlocksData });
			}
	  	}, [columns]);
		
		return [
			<></>,
			<div className={className}>
				<div className="wrapper">
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>
					<ul>{blockItems}</ul>
				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: { title, description, blocksData },
			className
		} = props;

		return (
			<div className={className}>
				<div className="wrapper">
					{title && <RichText.Content tagName="h2" value={title} />}
					{description && <RichText.Content tagName="p" value={description} />}
					<ul>
						{blocksData.map((block, index) => (
							<li key={index}>
								<div className="svg-icon-wrapper" dangerouslySetInnerHTML={{ __html: block.iconSVG }}></div>
								<RichText.Content tagName="span" value={block.title} />
								<RichText.Content tagName="p" value={block.description} />
							</li>
						))}
					</ul>
				</div>
			</div>
		)
  	};

})(window.wp);