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
	const iconForSlide1 = (<svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M15.2344 0.78125H0.390625C0.174889 0.78125 0 0.956139 0 1.17187V16.0156C0 16.2314 0.174889 16.4062 0.390625 16.4062H15.2344C15.4501 16.4062 15.625 16.2314 15.625 16.0156V1.17187C15.625 0.956139 15.4501 0.78125 15.2344 0.78125Z" fill="#BEBEBE" fill-opacity="0.3"/>
		<path d="M33.9844 0.78125H19.1406C18.9249 0.78125 18.75 0.956139 18.75 1.17187V16.0156C18.75 16.2314 18.9249 16.4062 19.1406 16.4062H33.9844C34.2001 16.4062 34.375 16.2314 34.375 16.0156V1.17187C34.375 0.956139 34.2001 0.78125 33.9844 0.78125Z" fill="#BEBEBE" fill-opacity="0.3"/>
		</svg>);

	const iconForSlide2 = (<svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M6.16859 23.1016C6.16859 23.1016 2.95765 17.3828 1.60609 14.9063C-0.190788 11.6094 -0.487672 10.2188 0.754524 9.53125C1.52796 9.10156 2.59827 9.28125 3.25452 10.4219L4.78577 12.8594V3.30469C4.78577 3.30469 4.69202 0.78125 6.4889 0.78125C8.40297 0.78125 8.23891 3.30469 8.23891 3.30469V7.94531C8.23891 7.94531 9.24672 7.21875 10.4264 7.54688C11.028 7.71094 11.7311 8 12.1061 8.95313C12.1061 8.95313 14.5045 7.78906 15.6998 10.2656C15.6998 10.2656 18.4655 9.71875 18.4655 12.5859C18.4655 15.4531 15.0123 23.1016 15.0123 23.1016H6.16859Z" fill="#BEBEBE"/>
		</svg>);

	registerBlockType('fv/time-one-day', {
		title: 'Один день',
		icon: catIcon,
		category: 'common',
		keywords: ['Один день', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			time1: {
				type: 'string',
				default: ''
			},
			time2: {
				type: 'string',
				default: ''
			},
			time3: {
				type: 'string',
				default: ''
			},
			time4: {
				type: 'string',
				default: ''
			},
			label1: {
				type: 'string',
				default: ''
			},
			image1: {
				type: 'object',  // Изменено с 'string' на 'object'
				default: {
					url: '',
					id: null,
					alt: ''
				}
		  	},
			time1_2: {
				type: 'string',
				default: ''
			},
			time2_2: {
				type: 'string',
				default: ''
			},
			time3_2: {
				type: 'string',
				default: ''
			},
			time4_2: {
				type: 'string',
				default: ''
			},
			time5_2: {
				type: 'string',
				default: ''
			},
			label1_2: {
				type: 'string',
				default: ''
			},
			image1_2: {
				type: 'object',  // Изменено с 'string' на 'object'
				default: {
					url: '',
					id: null,
					alt: ''
				}
		  	},
			time1_3: {
				type: 'string',
				default: ''
			},
			time2_3: {
				type: 'string',
				default: ''
			},
			time3_3: {
				type: 'string',
				default: ''
			},
			time4_3: {
				type: 'string',
				default: ''
			},
			label1_3: {
				type: 'string',
				default: ''
			},
			image1_3: {
				type: 'object',  // Изменено с 'string' на 'object'
				default: {
					url: '',
					id: null,
					alt: ''
				}
		  	},
			time1_4: {
				type: 'string',
				default: ''
			},
			time2_4: {
				type: 'string',
				default: ''
			},
			time3_4: {
				type: 'string',
				default: ''
			},
			time4_4: {
				type: 'string',
				default: ''
			},
			time5_4: {
				type: 'string',
				default: ''
			},
			time6_4: {
				type: 'string',
				default: ''
			},
			label1_4: {
				type: 'string',
				default: ''
			},
			image1_4: {
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

	function Edit(props) {
		const {
			attributes: {
				title,
				time1,
				time2,
				time3,
				time4,
				label1,
				image1,
				time1_2,
				time2_2,
				time3_2,
				time4_2,
				time5_2,
				label1_2,
				image1_2,
				time1_3,
				time2_3,
				time3_3,
				time4_3,
				label1_3,
				image1_3,
				time1_4,
				time2_4,
				time3_4,
				time4_4,
				label1_4,
				image1_4,
				time5_4,
				time6_4
			},
			className,
			isSelected,
			setAttributes
		} = props;
		
		return [
			<InspectorControls>
				<PanelBody
					title="Ссылки на соцсети"
					initialOpen={true}
				>
				
				</PanelBody>
			</InspectorControls>,
			<div className={className}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<div className={'icons-for-slider'}>
						<span className={'icon-1'}>{iconForSlide1}</span>
						<span className={'icon-2'}>{iconForSlide2}</span>
					</div>
					<div className={'mobile-container'} data-content={''}>

					</div>
					<div className={'container-one-day'}>
						<div className={'item-day'}>
							<div className={'first-block'}>
								<RichText
									tagName="span"
									onChange={ time1 => setAttributes({ time1 })}
									value={time1}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time2 => setAttributes({ time2 })}
									value={time2}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time3 => setAttributes({ time3 })}
									value={time3}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time4 => setAttributes({ time4 })}
									value={time4}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
							</div>
							<div className={'second-block'}>
								<RichText
									tagName="span"
									onChange={ label1 => setAttributes({ label1 })}
									value={label1}
									placeholder="Лэйбл..."
									// allowedFormats={['core/text-color']}
								/>
								{
									!image1 || !image1.url ? 
										<MediaUpload
											onSelect={(media) => {
												setAttributes({
													image1: {
														url: media.url,
														id: media.id,
														alt: media.alt || ''
													}
												});
											}}
											allowedTypes={['image']}
											render={({ open }) => (
												<Button onClick={open} isPrimary isLarge>
													{image1 && image1.url 
														? <img src={image1.url} alt={image1.alt} width="100%" height="auto" /> 
														: 'Выбрать картинку'}
												</Button>
											)}
										/>
										: 
										<>
											<img src={image1.url} alt={image1.alt} width="100%" height="auto" />
											{isSelected && (
												<Button 
													onClick={() => setAttributes({ 
														image1: {
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

						<div className={'item-day'}>
							<div className={'first-block'}>
								<RichText
									tagName="span"
									onChange={ time1_2 => setAttributes({ time1_2 })}
									value={time1_2}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time2_2 => setAttributes({ time2_2 })}
									value={time2_2}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time3_2 => setAttributes({ time3_2 })}
									value={time3_2}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time4_2 => setAttributes({ time4_2 })}
									value={time4_2}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time5_2 => setAttributes({ time5_2 })}
									value={time5_2}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
							</div>
							<div className={'second-block'}>
								<RichText
									tagName="span"
									onChange={ label1_2 => setAttributes({ label1_2 })}
									value={label1_2}
									placeholder="Лэйбл..."
									// allowedFormats={['core/text-color']}
								/>
								{
									!image1_2 || !image1_2.url ? 
										<MediaUpload
											onSelect={(media) => {
												setAttributes({
													image1_2: {
														url: media.url,
														id: media.id,
														alt: media.alt || ''
													}
												});
											}}
											allowedTypes={['image']}
											render={({ open }) => (
												<Button onClick={open} isPrimary isLarge>
													{image1_2 && image1_2.url 
														? <img src={image1_2.url} alt={image1_2.alt} width="100%" height="auto" /> 
														: 'Выбрать картинку'}
												</Button>
											)}
										/>
										: 
										<>
											<img src={image1_2.url} alt={image1_2.alt} width="100%" height="auto" />
											{isSelected && (
												<Button 
													onClick={() => setAttributes({ 
														image1_2: {
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

						<div className={'item-day'}>
							<div className={'first-block'}>
								<RichText
									tagName="span"
									onChange={ time1_3 => setAttributes({ time1_3 })}
									value={time1_3}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time2_3 => setAttributes({ time2_3 })}
									value={time2_3}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time3_3 => setAttributes({ time3_3 })}
									value={time3_3}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time4_3 => setAttributes({ time4_3 })}
									value={time4_3}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
							</div>
							<div className={'second-block'}>
								<RichText
									tagName="span"
									onChange={ label1_3 => setAttributes({ label1_3 })}
									value={label1_3}
									placeholder="Лэйбл..."
									// allowedFormats={['core/text-color']}
								/>
								{
									!image1_3 || !image1_3.url ? 
										<MediaUpload
											onSelect={(media) => {
												setAttributes({
													image1_3: {
														url: media.url,
														id: media.id,
														alt: media.alt || ''
													}
												});
											}}
											allowedTypes={['image']}
											render={({ open }) => (
												<Button onClick={open} isPrimary isLarge>
													{image1_3 && image1_3.url 
														? <img src={image1_3.url} alt={image1_3.alt} width="100%" height="auto" /> 
														: 'Выбрать картинку'}
												</Button>
											)}
										/>
										: 
										<>
											<img src={image1_3.url} alt={image1_3.alt} width="100%" height="auto" />
											{isSelected && (
												<Button 
													onClick={() => setAttributes({ 
														image1_3: {
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

						<div className={'item-day'}>
							<div className={'first-block'}>
								<RichText
									tagName="span"
									onChange={ time1_4 => setAttributes({ time1_4 })}
									value={time1_4}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time2_4 => setAttributes({ time2_4 })}
									value={time2_4}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time3_4 => setAttributes({ time3_4 })}
									value={time3_4}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time4_4 => setAttributes({ time4_4 })}
									value={time4_4}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time5_4 => setAttributes({ time5_4 })}
									value={time5_4}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
								<RichText
									tagName="span"
									onChange={ time6_4 => setAttributes({ time6_4 })}
									value={time6_4}
									placeholder="Время..."
									// allowedFormats={['core/text-color']}
								/>
							</div>
							<div className={'second-block'}>
								<RichText
									tagName="span"
									onChange={ label1_4 => setAttributes({ label1_4 })}
									value={label1_4}
									placeholder="Лэйбл..."
									// allowedFormats={['core/text-color']}
								/>
								{
									!image1_4 || !image1_4.url ? 
										<MediaUpload
											onSelect={(media) => {
												setAttributes({
													image1_4: {
														url: media.url,
														id: media.id,
														alt: media.alt || ''
													}
												});
											}}
											allowedTypes={['image']}
											render={({ open }) => (
												<Button onClick={open} isPrimary isLarge>
													{image1_4 && image1_4.url 
														? <img src={image1_4.url} alt={image1_4.alt} width="100%" height="auto" /> 
														: 'Выбрать картинку'}
												</Button>
											)}
										/>
										: 
										<>
											<img src={image1_4.url} alt={image1_4.alt} width="100%" height="auto" />
											{isSelected && (
												<Button 
													onClick={() => setAttributes({ 
														image1_4: {
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
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				title,
				time1,
				time2,
				time3,
				time4,
				label1,
				image1,
				time1_2,
				time2_2,
				time3_2,
				time4_2,
				time5_2,
				label1_2,
				image1_2,
				time1_3,
				time2_3,
				time3_3,
				time4_3,
				label1_3,
				image1_3,
				time1_4,
				time2_4,
				time3_4,
				time4_4,
				time5_4,
				time6_4,
				label1_4,
				image1_4,
				
			},
			className
		} = props;

		const forMobile = [
			time1,
			time2,
			time3,
			time4,
			time1_2,
			time2_2,
			time3_2,
			time4_2,
			time5_2,
			time1_3,
			time2_3,
			time3_3,
			time4_3,
			time1_4,
			time2_4,
			time3_4,
			time4_4,
			time5_4,
			time6_4
		];

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />

					<div className={'icons-for-slider'}>
						<span className={'icon-1'}>{iconForSlide1}</span>
						<span className={'icon-2'}>{iconForSlide2}</span>
					</div>

					<div className={'mobile-container'} data-content={JSON.stringify(forMobile)}>

					</div>
					<div className={'container-one-day'}>
						<div className={'item-day'}>
							<div className={'first-block'}>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time1) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time2) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time3) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time4) }}></div>
							</div>
							<div className={'second-block'}>
								<RichText.Content tagName="span" value={label1} />
								{ image1 && image1.url && 
									<img 
										src={image1.url} 
										alt={image1.alt || ''} 
										width="100%" 
										height="auto" 
									/>
								}
							</div>
						</div>
						<div className={'item-day'}>
							<div className={'first-block'}>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time1_2) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time2_2) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time3_2) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time4_2) }}></div>
								{time5_2 && <div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time5_2) }}></div>}
							</div>
							<div className={'second-block'}>
								<RichText.Content tagName="span" value={label1_2} />
								{ image1_2 && image1_2.url && 
									<img 
										src={image1_2.url} 
										alt={image1_2.alt || ''} 
										width="100%" 
										height="auto" 
									/>
								}
							</div>
						</div>
						<div className={'item-day'}>
							<div className={'first-block'}>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time1_3) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time2_3) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time3_3) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time4_3) }}></div>
							</div>
							<div className={'second-block'}>
								<RichText.Content tagName="span" value={label1_3} />
								{ image1_3 && image1_3.url && 
									<img 
										src={image1_3.url} 
										alt={image1_3.alt || ''} 
										width="100%" 
										height="auto" 
									/>
								}
							</div>
						</div>
						<div className={'item-day'}>
							<div className={'first-block'}>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time1_4) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time2_4) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time3_4) }}></div>
								<div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time4_4) }}></div>
								{time5_4 && <div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time5_4) }}></div>}
								{time6_4 && <div className={'item'} dangerouslySetInnerHTML={{ __html: timeDescription(time6_4) }}></div>}
								
							</div>
							<div className={'second-block'}>
								<RichText.Content tagName="span" value={label1_4} />
								{ image1_4 && image1_4.url && 
									<img 
										src={image1_4.url} 
										alt={image1_4.alt || ''} 
										width="100%" 
										height="auto" 
									/>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
  	};

	function timeDescription(str) {
		let element = '';
		if(str) {
			const [time, description] = str.split('—');
			element = `<span>${time.trim()}</span> — <span>${description.trim()}</span>`;
		}
		
		return element;
	}

})(
	window.wp
);
