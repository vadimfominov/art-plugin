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

	const catIcon = 'cat'

	registerBlockType('fv/mission-and-goals', {
		title: 'Миссия и цели',
		icon: catIcon,
		category: 'common',
		keywords: ['Миссия и цели', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			leftTitle: {
				type: 'string',
				default: ''
			},
			rightTitle: {
				type: 'string',
				default: ''
			},
			leftDescription: {
				type: 'string',
				default: ''
			},
			rightDescription: {
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
				leftTitle,
				rightTitle,
				leftDescription,
				rightDescription
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
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<div className={'content-block'}>
						<div className={'left-block'}>
							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ leftTitle: value })}
								value={leftTitle}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={(value) => setAttributes({ leftDescription: value })}
								value={leftDescription}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
						</div>
						<div className={'right-block'}>
							<RichText
								tagName="span"
								onChange={(value) => setAttributes({ rightTitle: value })}
								value={rightTitle}
								placeholder="Заголовок..."
								// allowedFormats={[]}
							/>
							<RichText
								tagName="p"
								onChange={(value) => setAttributes({ rightDescription: value })}
								value={rightDescription}
								placeholder="Описание..."
								// allowedFormats={[]}
							/>
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
				leftTitle,
				rightTitle,
				leftDescription,
				rightDescription
			},
			className
		} = props;

		const partsFirst = leftDescription.split('<br>');
		const firstWrappedInP = partsFirst.map((part, index) => <p className={'p-block-' + index} key={index}>{part}</p>);

		const partsSecond = rightDescription.split('<br>');
		const secondWrappedInP = partsSecond.map((part, index) => <p className={'p-block-' + index} key={index}>{part}</p>);

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h2" value={title} />
					<div className={'content-block'}>
						<div className={'left-block'}>
							<RichText.Content tagName="span" value={leftTitle} />
							{firstWrappedInP}
						</div>
						<div className={'right-block'}>
							<RichText.Content tagName="span" value={rightTitle} />
							{secondWrappedInP}
						</div>
					</div>
				</div>
			</div>
		)
  	};

})(
	window.wp
);
