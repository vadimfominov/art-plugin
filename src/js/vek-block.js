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
		SelectControl
	} = wp.components;

	const {
		useState,
		useEffect
	} = wp.element

	const catIcon = 'cat';

	registerBlockType('fv/vek-block', {
		title: '21 век',
		icon: catIcon,
		category: 'common',
		keywords: ['21 vek', 'фке', 'art'],
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
			description3: {
				type: 'string',
				default: ''
			},
			description4: {
				type: 'string',
				default: ''
			},
			description5: {
				type: 'string',
				default: ''
			},
			image3: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
		},
		supports: {
			anchor: true
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
				description3,
				description4,
				description5,
				image3
			},
			className,
			isSelected,
			setAttributes
		} = props;
		
		return [
			<InspectorControls>
				<PanelBody
					title="Настройки блока"
					initialOpen={true}
				>
					{/* <PanelRow>
						<TextControl
							label="Имя пользователя VK"
							onChange={(newValue) => setAttributes({ vk: newValue })}
							value={vk}
							__nextHasNoMarginBottom={ true }
						/>
					</PanelRow> */}
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className={'wrapper'}>
					{(isSelected || !!title) && <RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Заголовок..."
						// allowedFormats={['core/text-color']}
					/>}
					<div className={'container-vek-block'}>
						{(isSelected || !!description) && <RichText
							tagName="b"
							onChange={(value) => setAttributes({ description: value })}
							value={description}
							placeholder="Описание..."
							// allowedFormats={[]}
						/>}
						{(isSelected || !!description2) && <RichText
							tagName="p"
							onChange={(value) => setAttributes({ description2: value })}
							value={description2}
							placeholder="Описание..."
							// allowedFormats={[]}
						/>}
						{(isSelected || !!description3) && <RichText
							tagName="p"
							onChange={(value) => setAttributes({ description3: value })}
							value={description3}
							placeholder="Описание..."
							// allowedFormats={[]}
						/>}
						{(isSelected || !!description4) && <RichText
							tagName="p"
							onChange={(value) => setAttributes({ description4: value })}
							value={description4}
							placeholder="Описание..."
							// allowedFormats={[]}
						/>}
						<div className={'item'}>
							{(isSelected || !!description5) && <RichText
								tagName="p"
								onChange={(value) => setAttributes({ description5: value })}
								value={description5}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>}
							{
								!image3 || !image3.url ? 
								<MediaUpload
									onSelect={(media) => {
											setAttributes({
												image3: {
													url: media.url,
													id: media.id,
													alt: media.alt || ''
												}
											});
									}}
									allowedTypes={['image']}
									render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{image3 && image3.url 
													? <img src={image3.url} alt={image3.alt} width="100%" height="auto" /> 
													: 'Выбрать картинку'}
											</Button>
									)}
								/>
								: 
								<>
									<img src={image3.url} alt={image3.alt} width="100%" height="auto" />
									{isSelected && (
											<Button 
												onClick={() => setAttributes({ 
													image3: {
															url: '',
															id: null,
															alt: ''
													}
												})} 
												className={'remove-img'}
											>
												Удалить картинку
											</Button>
									)}
								</>
							}
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
				description2,
				description3,
				description4,
				description5,
				image3
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'wrapper'}>
					{title && <RichText.Content tagName="h2" value={title} />}
					<div className={'container-vek-block'}>

						{description && <RichText.Content tagName="p" value={description} />}
						{description2 && <RichText.Content tagName="p" value={description2} />}
						{description3 && <RichText.Content tagName="p" value={description3} />}

						{description4 && <RichText.Content tagName="p" value={description4} />}

						<div className={'item'}>
							{description5 && <RichText.Content tagName="p" value={description5} />}
							{ image3 && image3.url && 
								<img 
									src={image3.url} 
									alt={image3.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
						</div>

					</div>
					
				</div>
			</div>
		)
  	};

})(
	window.wp
);
