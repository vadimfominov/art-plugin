(function (wp) {

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
		SelectControl,
		RangeControl,
		ToggleControl,
	} = wp.components;

	const {
		useState,
		useEffect
	} = wp.element

	const catIcon = 'cat';

	const iconForSlide1 = (<svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M15.2344 0.78125H0.390625C0.174889 0.78125 0 0.956139 0 1.17187V16.0156C0 16.2314 0.174889 16.4062 0.390625 16.4062H15.2344C15.4501 16.4062 15.625 16.2314 15.625 16.0156V1.17187C15.625 0.956139 15.4501 0.78125 15.2344 0.78125Z" fill="#BEBEBE" fill-opacity="0.3"/>
		<path d="M33.9844 0.78125H19.1406C18.9249 0.78125 18.75 0.956139 18.75 1.17187V16.0156C18.75 16.2314 18.9249 16.4062 19.1406 16.4062H33.9844C34.2001 16.4062 34.375 16.2314 34.375 16.0156V1.17187C34.375 0.956139 34.2001 0.78125 33.9844 0.78125Z" fill="#BEBEBE" fill-opacity="0.3"/>
		</svg>);

	const iconForSlide2 = (<svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.16859 23.1016C6.16859 23.1016 2.95765 17.3828 1.60609 14.9063C-0.190788 11.6094 -0.487672 10.2188 0.754524 9.53125C1.52796 9.10156 2.59827 9.28125 3.25452 10.4219L4.78577 12.8594V3.30469C4.78577 3.30469 4.69202 0.78125 6.4889 0.78125C8.40297 0.78125 8.23891 3.30469 8.23891 3.30469V7.94531C8.23891 7.94531 9.24672 7.21875 10.4264 7.54688C11.028 7.71094 11.7311 8 12.1061 8.95313C12.1061 8.95313 14.5045 7.78906 15.6998 10.2656C15.6998 10.2656 18.4655 9.71875 18.4655 12.5859C18.4655 15.4531 15.0123 23.1016 15.0123 23.1016H6.16859Z" fill="#BEBEBE"/>
		</svg>);

	const leftArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M8 1L1.56568 7.43431C1.25327 7.74673 1.25327 8.25327 1.56569 8.56568L8 15" stroke="#535353" stroke-linecap="round"/>
			</svg>);

	const rightArr = (<svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 15L7.43432 8.56569C7.74674 8.25327 7.74673 7.74674 7.43432 7.43432L1 1" stroke="#535353" stroke-linecap="round"/>
			</svg>);

	const iconPlay = (<svg width="23" height="38" viewBox="0 0 23 38" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M23 19L0.5 37.1865L0.500002 0.813466L23 19Z" fill="#535353"/>
			</svg>);

	registerBlockType('fv/video-image-block', {
		title: 'Видео с фоном',
		icon: catIcon,
		category: 'common',
		keywords: ['Видео с фоном', 'video image', 'фке', 'art'],
		attributes: {
			description: {
				type: 'string',
				default: ''
			},
			image: {
				type: 'object',
				default: {}
		  	},
			video: {
				type: 'object',
				default: {}
		  	},
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				description,
				image,
				video,
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
					
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className="wrapper slider-box slide">

					<div className={'container-block-for-video'}>
						<div class={'content-image image-for-video'}>
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
											> Удалить картинку
											</Button>
										)}
									</>
							}
						</div>
						
						{videoFrame('https://vkvideo.ru/video_ext.php?oid=-11930738&id=456239832&hd=2&autoplay=0')}

					</div>

					<RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="Описание..."
						// allowedFormats={[]}
					/>

				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				description,
				image,
				video,
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className="wrapper slider-box slide">

					<div className={'container-block-for-video'}>
						<div class={'content-image image-for-video'}>
							{ image && image.url && 
								<img 
									src={image.url} 
									alt={image.alt || ''} 
									width="100%" 
									height="auto"
								/>
							}
						</div>

						{videoFrame('https://vkvideo.ru/video_ext.php?oid=-11930738&id=456239832&hd=2&autoplay=0')}
					</div>
					
					<RichText.Content tagName="p" value={description} />

				</div>
			</div>
		)
  	};

	function videoFrame(videoURL) {

		return (
			<div class={'content-video'}>
				<iframe 
					src={videoURL} 
					width="100%" 
					height="100%" 
					allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" 
					frameborder="0" 
					allowfullscreen>
				</iframe>
				<span class={'play-video play-video-vk'}>{iconPlay}</span>
			</div>
			);
	}

})(
	window.wp
);
