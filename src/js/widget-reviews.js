(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const catIcon = 'cat'

	registerBlockType('fv/widget-reviews', {
		title: 'Виджет отзывов',
		icon: catIcon,
		category: 'common',
		keywords: ['widget reviews', 'фке', 'art'],
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
			<></>,
			<div className={className}>
				<div className={'wrapper'}>
					<RichText
						tagName="h2"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<div className={'widget-block'}>
						<iframe id="myReviews__block-widget" title="Reviews"></iframe>
					</div>
					

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
					<RichText.Content tagName="h2" value={title} />
					<div className={'widget-block'}>
						<iframe id="myReviews__block-widget" title="Reviews"></iframe>
					</div>
				</div>
			</div>
		)
  	};

})(
	window.wp
);
