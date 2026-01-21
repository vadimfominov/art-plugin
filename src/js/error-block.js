(function (wp) {

	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;

	const catIcon = 'cat'

	registerBlockType('fv/error-block', {
		title: 'Error 404',
		icon: catIcon,
		category: 'common',
		keywords: ['Error 404', 'Ошибка 404', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			label: {
				type: 'string',
				default: ''
			},
			description: {
				type: 'string',
				default: ''
			},
			link: {
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
				description,
				label,
				link
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
						tagName="span"
						onChange={(value) => setAttributes({ label: value })}
						value={label}
						placeholder="label..."
						// allowedFormats={[]}
					/>
					<RichText
						tagName="h1"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/text-color']}
					/>
					<RichText
						tagName="p"
						onChange={(value) => setAttributes({ description: value })}
						value={description}
						placeholder="description..."
						// allowedFormats={[]}
					/>
					<RichText
						tagName="div"
						className={'link-to-back'}
						onChange={(value) => setAttributes({ link: value })}
						value={link}
						placeholder="Укажите заголовок..."
						// allowedFormats={['core/link']}
					/>
				</div>
			</div>
		];
	}

	function Save(props) {
		const {
			attributes: {
				title,
				description,
				label,
				link
			},
			className
		} = props;

		return (
			<div className={className}>
				<div className={'wrapper'}>
					<RichText.Content tagName="span" value={label} />
					<RichText.Content tagName="h1" value={title} />
					<RichText.Content tagName="p" value={description} />
					<RichText.Content tagName="div" className={'link-to-back'} value={link} />
				</div>
			</div>
		)
  	};

})(
	window.wp
);
