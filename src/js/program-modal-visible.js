(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const { InspectorControls, MediaUpload, InnerBlocks } = wp.blockEditor;
	const { TextControl, PanelBody, PanelRow, Button, SelectControl } = wp.components;
	const { useState, useEffect } = wp.element

	const catIcon = 'cat'
	const iconArr = (<svg width="14" height="6" viewBox="0 0 14 6" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M10.58 5.5C10.78 5.07333 10.9733 4.7 11.16 4.38C11.36 4.06 11.5533 3.79333 11.74 3.58H0.0800003V2.74H11.74C11.5533 2.51333 11.36 2.24 11.16 1.92C10.9733 1.6 10.78 1.23333 10.58 0.82H11.28C12.12 1.79333 13 2.51333 13.92 2.98V3.34C13 3.79333 12.12 4.51333 11.28 5.5H10.58Z" fill="#30A933"/>
	</svg>);

	registerBlockType('fv/program-modal-visible', {
		title: 'Заявка с фото',
		icon: catIcon,
		category: 'common',
		keywords: ['Заявка на программу', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			image: {
				type: 'object',
				default: {
					url: '',
					id: null,
					alt: ''
				}
			},
		},
		edit: Edit,
		save: Save
	});

	// В компоненте Edit
	function Edit(props) {

		const {
			attributes: { title, image },
			className,
			isSelected,
			setAttributes
		} = props;


		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>

					<div className={'container'}>
						<InnerBlocks allowedBlocks={['fv/program-modal']} />
						<div className={'img-visible'}>
							{
								!image || !image.url ? 
									<MediaUpload
										onSelect={(media) => {
											setAttributes({
												image: {
													url: media.url,
													id: media.id,
													alt: media.alt || ''
												}
											});
										}}
										allowedTypes={['image']}
										render={({ open }) => (
											<Button onClick={open} isPrimary isLarge>
												{image && image.url 
													? <img src={image.url} alt={image.alt} width="100%" height="auto" /> 
													: 'Выбрать картинку'}
											</Button>
										)}
									/>
									: 
									<>
										<img src={image.url} alt={image.alt} width="100%" height="auto" />
										{isSelected && (
											<Button 
												onClick={() => setAttributes({ 
													image: {
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
		);
	}

	// В компоненте Save
	function Save(props) {

		const { attributes: { title, image }, className } = props;

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					
					<div className={'container'}>
						<InnerBlocks.Content />
						<div className={'img-visible'}>
							{ image && image.url && 
								<img 
									src={image.url} 
									alt={image.alt || ''} 
									width="100%" 
									height="auto" 
								/>
							}
						</div>
					</div>
				</div>
				
			</div>
		);
	}

})(
	window.wp
);
