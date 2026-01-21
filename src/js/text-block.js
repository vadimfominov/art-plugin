(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor || wp.editor;
	const { PanelBody, PanelRow, Button } = wp.components;
	const { useState } = wp.element;

	const catIcon = 'cat';

	registerBlockType('fv/text-block', {
		title: 'Text Block',
		icon: catIcon,
		category: 'common',
		keywords: ['Text Block', 'политика конфиденциальности', 'текст'],
		attributes: {
			title: {
				type: 'string',
				default: 'Политика конфиденциальности',
			},
		},
		edit: Edit,
		save: Save,
	});

	function Edit(props) {
		const {
			attributes: { title },
			className,
			setAttributes,
		} = props;

		return (
			<div className={className}>
				<div className="wrapper">
					<RichText
						tagName="h1"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<InnerBlocks
						allowedBlocks={['core/paragraph', 'core/heading']}
						template={[
							['core/paragraph', { content: 'Текст введения...' }],
							['core/heading', { level: 2, content: '1. Введение' }],
							['core/paragraph', { content: 'Текст введения...' }],
						]}
						templateLock={false}
					/>
				</div>
			</div>
		);
	}

	function Save(props) {
		const {
			attributes: { title },
			className,
		} = props;

		return (
			<div className={className}>
				<div className="wrapper">
					<RichText.Content tagName="h1" value={title} />
					<InnerBlocks.Content />
				</div>
			</div>
		);
	}
})(window.wp);