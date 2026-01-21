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
	const iconMap = (<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M0.500081 8.79655V8.7945C0.500081 4.17834 3.90878 0.5 8 0.5C12.091 0.5 15.4999 4.17813 15.4999 8.8L15.4999 8.80205C15.5137 12.1653 13.6066 15.3505 11.6261 17.7372C10.6428 18.9221 9.65741 19.8911 8.91768 20.5638C8.54814 20.8998 8.24076 21.1611 8.02675 21.3377C8.0171 21.3456 8.00763 21.3534 7.99836 21.3611C7.34632 20.8333 5.79044 19.5049 4.26105 17.6488C2.32159 15.295 0.486293 12.1665 0.500081 8.79655ZM3.50004 8.8C3.50004 11.4612 5.4701 13.7 8 13.7C10.5299 13.7 12.5 11.4612 12.5 8.8C12.5 6.13877 10.5299 3.9 8 3.9C5.4701 3.9 3.50004 6.13877 3.50004 8.8Z" fill="#30A933" stroke="#30A933"/>
			</svg>);

	registerBlockType('fv/steps-parents', {
		title: 'Шаги родителя',
		icon: catIcon,
		category: 'common',
		keywords: ['Steps parents', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			item1: {
				type: 'string',
				default: ''
			},
			item2: {
				type: 'string',
				default: ''
			},
			item3: {
				type: 'string',
				default: ''
			},
			item4: {
				type: 'string',
				default: ''
			},
		},
		edit: Edit,
		save: Save
	});

	function Edit(props) {
		const {
			attributes: {
				title,
				item1,
				item2,
				item3,
				item4
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
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<div className={'block'}>
						{iconMap}
						<div className={'container'}>
							
							<div className={'item'}>
								<RichText
									tagName="p"
									onChange={ item1 => setAttributes({ item1 })}
									value={item1}
									placeholder="Текст..."
									// allowedFormats={[]}
								/>
							</div>
							<div className={'item'}>
								<RichText
									tagName="p"
									onChange={ item2 => setAttributes({ item2 })}
									value={item2}
									placeholder="Текст..."
									// allowedFormats={[]}
								/>
							</div>
							<div className={'item'}>
								<RichText
									tagName="p"
									onChange={ item3 => setAttributes({ item3 })}
									value={item3}
									placeholder="Текст..."
									// allowedFormats={[]}
								/>
							</div>
							<div className={'item'}>
								<RichText
									tagName="p"
									onChange={ item4 => setAttributes({ item4 })}
									value={item4}
									placeholder="Текст..."
									// allowedFormats={['core/link', 'core/bold', 'core/text-color']}
								/>
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
				item1,
				item2,
				item3,
				item4
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<div className={'block'}>
						{iconMap}
						<div className={'container'}>
							
							{item1 && <div className={'item'}>
								<RichText.Content tagName="p" value={item1} />
							</div>}
							{item2 && <div className={'item'}>
								<RichText.Content tagName="p" value={item2} />
							</div>}
							{item3 && <div className={'item'}>
								<RichText.Content tagName="p" value={item3} />
							</div>}
							{item4 && <div className={'item'}>
								<RichText.Content tagName="p" value={item4} />
							</div>}
							
						</div>
					</div>
					
				</div>
			</div>
		)
  	};

})(
	window.wp
);
