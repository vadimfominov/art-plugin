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

	registerBlockType('fv/course-description', {
		title: 'Описание курса',
		icon: catIcon,
		category: 'common',
		keywords: ['Описание курса', 'course description', 'yfi jgsn', 'фке', 'art'],
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
            default: 3,
        	},
			desktopBackground: {
				type: 'object',
				default: {},
			},
			tableBackground: {
				type: 'object',
				default: {},
			},
			mobileBackground: {
				type: 'object',
				default: {},
			},
		},
		supports: { anchor: true },
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
				desktopBackground,
				tableBackground,
				mobileBackground
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
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
					>
					<PanelRow>
						<BackgroundImageUploader
							desktopBackground={desktopBackground}
							tableBackground={tableBackground}
							mobileBackground={mobileBackground}
							setAttributes={setAttributes}
							isSelected={isSelected}
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
						<div className={'image-bg'}>
							<picture>
								{/* Для мобильных устройств (до 770px) */}
								<source 
										srcset={mobileBackground?.url} 
										media="(max-width: 766px)" 
								/>
								{/* Для планшетов (от 770px до 1024px) */}
								<source 
										srcset={tableBackground?.url} 
										media="(min-width: 767px) and (max-width: 1024px)" 
								/>
								{/* Для десктопов (от 1025px и выше) */}
								<source 
										srcset={desktopBackground?.url} 
										media="(min-width: 1025px)" 
								/>
								{/* Фолбек для браузеров, которые не поддерживают <picture> */}
								<img 
										src={desktopBackground?.url} 
										alt="Фон" 
										className="bg-image-important" 
								/>
							</picture>
						</div>
					</div>
				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: { title, description, blocksData, columns, desktopBackground, tableBackground, mobileBackground },
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
									<div className="svg-icon-wrapper" dangerouslySetInnerHTML={{ __html: block.iconSVG }}></div>
									<RichText.Content tagName="span" value={block.title} />
									<RichText.Content tagName="p" value={block.description} />
								</li>
							))}
						</ul>
						<div className={'image-bg'}>
							<picture>
								{/* Для мобильных устройств (до 770px) */}
								<source 
										srcset={mobileBackground?.url} 
										media="(max-width: 766px)" 
								/>
								{/* Для планшетов (от 770px до 1024px) */}
								<source 
										srcset={tableBackground?.url} 
										media="(min-width: 767px) and (max-width: 1024px)" 
								/>
								{/* Для десктопов (от 1025px и выше) */}
								<source 
										srcset={desktopBackground?.url} 
										media="(min-width: 1025px)" 
								/>
								{/* Фолбек для браузеров, которые не поддерживают <picture> */}
								<img 
										src={desktopBackground?.url} 
										alt="Фон" 
										className="bg-image-important" 
								/>
							</picture>
						</div>
					</div>
					
				</div>
			</div>
		)
  	};

	  function BackgroundImageUploader(props) {
		const { desktopBackground, tableBackground, mobileBackground, setAttributes, isSelected } = props

		const onSelectImage = (device, img) => {
			if (device === 'desktop') {
				setAttributes({ desktopBackground: { id: img.id, url: img.url, alt: img.alt } });
			} else if (device === 'table') {
				setAttributes({ tableBackground: { id: img.id, url: img.url, alt: img.alt } });
			} else if (device === 'mobile') {
				setAttributes({ mobileBackground: { id: img.id, url: img.url, alt: img.alt } });
			}
		};
  
		const removeImage = (device) => {
			if (device === 'desktop') {
				setAttributes({ desktopBackground: null });
			} else if (device === 'table') {
				setAttributes({ tableBackground: null });
			} else if (device === 'mobile') {
				setAttributes({ mobileBackground: null });
			}
		};
  
		const renderImageUpload = (device, imgURL) =>
			!imgURL ? (
				<MediaUpload
					onSelect={(img) => onSelectImage(device, img)}
					allowedTypes={['image']}
					render={({ open }) => (
						<Button
							className="components-button is-secondary"
							onClick={open}
						>
							{`Добавить фон для ${device}`}
						</Button>
					)}
				/>
			) : (
				<>
					<img src={imgURL} alt={`Фон для ${device}`} style={{ width: '100%', height: 'auto' }} />
					{isSelected && (
						<Button className="remove-image" onClick={() => removeImage(device)}>
							{`Удалить фон для ${device}`}
						</Button>
					)}
				</>
			);
  
		return (
			<div>
				<p>Изображение для ПК</p>
				{renderImageUpload('desktop', desktopBackground?.url)}

				<p>Изображение для планшета</p>
				{renderImageUpload('table', tableBackground?.url)}

				<p>Изображение для телефона</p>
				{renderImageUpload('mobile', mobileBackground?.url)}
			</div>
		);
  	};

})(window.wp);