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

	registerBlockType('fv/two-block-text', {
		title: '2 блока с текстом',
		icon: catIcon,
		category: 'common',
		keywords: ['2 блока с текстом', 'course description', 'yfi jgsn', 'фке', 'art'],
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
            default: 2,
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

		useEffect(() => {
			if (columns > blocksData.length) {
				// Если больше, добавляем новые объекты
				const newBlocksData = [...blocksData];
				while (newBlocksData.length < columns) {
					newBlocksData.push({ title: '', description: '', iconSVG: '' });
				}
				setAttributes({ blocksData: newBlocksData });
			} else if (columns < blocksData.length) {
				// Если меньше, удаляем лишние объекты
				setAttributes({ blocksData: blocksData.slice(0, columns) });
			}
	  	}, [columns]);

		const fetchSVG = (url, index) => {
			fetch(url)
				.then(response => response.text())
				.then(svg => {
					const newBlocksData = [...blocksData];
					newBlocksData[index].iconSVG = svg;
					setAttributes({ blocksData: newBlocksData });
				});
		};

		const updateBlockData = (index, key, value) => {
			const newBlocksData = [...blocksData];
			newBlocksData[index][key] = value;
			setAttributes({ blocksData: newBlocksData });
		};

		const blockItems = Array.from({ length: columns }, (x, index) => (
			<li key={index}>
				{isSelected ? 
					<MediaUpload
						allowedTypes={['image/svg+xml']}
						onSelect={media => fetchSVG(media.url, index)}
						render={({ open }) => (
							<Button onClick={open} isPrimary isLarge>
								{ blocksData[index]?.iconSVG 
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
					<div className={'container'}>
						<ul>
							{blocksData.map((block, index) => {
								const parts = block.description.split('<br>');

								return (
									<li key={index}>
										<div className="svg-icon-wrapper" dangerouslySetInnerHTML={{ __html: block.iconSVG }}></div>
										<RichText.Content tagName="span" value={block.title} />
										{ parts.map((part, index) => (
											part && (<p key={index} dangerouslySetInnerHTML={{ __html: part }} />)
										)) }
									</li>
								)
							})}
						</ul>
					</div>
					
				</div>
			</div>
		)
  	};

})(window.wp);