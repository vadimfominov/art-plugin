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

	registerBlockType('fv/text', {
		title: 'Text',
		icon: catIcon,
		category: 'common',
		keywords: ['text', 'текст', 'фке', 'art'],
		attributes: {
			title: {
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
			},
			className,
			isSelected,
			setAttributes
		} = props;
		
		return [
			<InspectorControls>
			</InspectorControls>,
			<div className={className}>
				<div className={'wrapper'}>
					<RichText
						tagName="p"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Текст..."
						// allowedFormats={['core/text-color']}
					/>
				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				title,
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText.Content tagName="p" value={title} />
				</div>
			</div>
		)
  	};

})(
	window.wp
);
