(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const { useEffect } = wp.element

	const catIcon = 'cat'

	registerBlockType('fv/for-contacts-page', {
		title: 'Для контактов',
		icon: catIcon,
		category: 'common',
		keywords: ['Для контактов', 'course description', 'yfi jgsn', 'фке', 'art'],
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
			blocksData: {
				type: 'array',
				default: [{ title: '', description: '' }],
		  	},
			columns: {
            type: 'number',
            default: 3,
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
				description2,
				blocksData,
				columns
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
					newBlocksData.push({ title: '', description: '' });
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
			<li key={index}>
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
					// allowedFormats={['core/link']}
				/>
			</li>
		));
		
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
					<div className={'container'}>
						<ul>{blockItems}</ul>
					</div>
					{(isSelected || !!description2) &&  <div className={'descr'}>
						<RichText
							tagName="p"
							onChange={(value) => setAttributes({ description2: value })}
							value={description2}
							placeholder="Описание..."
							// allowedFormats={[]}
						/>
					</div>}
				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: { title, description, description2, blocksData },
			className
		} = props;

		return (
			<div className={className}>
				<div className="wrapper">
					<RichText.Content tagName="h2" value={title} />
					<RichText.Content tagName="p" value={description} />
					<div className={'container'}>
						<ul>
							{blocksData.map((block, index) => (
								<li key={index}>
									<RichText.Content tagName="span" value={block.title} />
									<RichText.Content tagName="p" value={block.description} />
								</li>
							))}
						</ul>
					</div>
					{description2 && <div className={'descr'}>
						<RichText.Content tagName="p" value={description2} />
					</div>}
				</div>
			</div>
		)
  	};

})(window.wp);