(function (wp) {
	const { registerBlockType } = wp.blocks;
	const { RichText } = wp.blockEditor || wp.editor;
	const { apiFetch } = wp;
	const { addQueryArgs } = wp.url;
	const {
		InspectorControls,
		MediaUpload,
		useBlockProps
	} = wp.blockEditor;
	const {
		TextControl,
		PanelBody,
		PanelRow,
		Button,
		SelectControl,
		Spinner,
		Notice
	} = wp.components;
	const {
		useState,
		useEffect
	} = wp.element
	const catIcon = (<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
		<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
			<path d="M2330 5110 c-481 -43 -952 -231 -1350 -538 -109 -84 -348 -323 -432 -432 -213 -276 -366 -580 -453 -897 -217 -790 -54 -1606 453 -2263 84 -109 323 -348 432 -432 343 -264 731 -437 1140 -508 718 -125 1432 55 2020 508 109 84 348 323 432 432 213 276 366 580 453 897 217 791 54 1606 -453 2263 -84 109 -323 348 -432 432 -526 406 -1165 595 -1810 538z m468 -271 c680 -73 1290 -444 1672 -1016 386 -577 484 -1320 263 -1987 -108 -326 -287 -617 -533 -870 -196 -201 -382 -337 -629 -460 -638 -316 -1384 -316 -2022 0 -247 123 -433 259 -629 460 -185 190 -296 347 -414 585 -316 636 -315 1382 1 2021 227 458 584 815 1042 1042 232 114 507 196 756 224 114 13 379 14 493 1z" />
			<path d="M1895 3674 l-25 -27 0 -1059 c0 -740 3 -1065 11 -1080 20 -38 68 -48 234 -48 166 0 214 10 234 48 7 14 11 142 11 382 0 402 2 418 60 439 23 7 158 11 422 11 260 0 396 4 410 11 37 20 48 69 48 214 0 145 -11 194 -48 214 -14 7 -150 11 -410 11 -264 0 -399 4 -422 11 -50 18 -60 55 -60 217 0 77 5 153 11 171 21 61 23 61 504 61 l437 0 29 29 29 29 0 170 c0 166 0 170 -25 196 l-24 26 -701 0 -701 0 -24 -26z" />
		</g>
	</svg>);
	registerBlockType("fv/blog", {
		title: 'Blog Block',
		icon: catIcon,
		category: 'common',
		keywords: ['Blog Block', 'фке', 'art'],
		attributes: {
			title: {
				type: 'string',
				default: ''
			},
			selectedCategory: {
				type: 'string',
				default: ''
			},
			sortOrder: {
				type: 'string',
				default: 'default'
			}
		},
		edit: Edit,
		save: Save
	});
	function Edit(props) {
		const {
			attributes: {
				title,
				selectedCategory,
				sortOrder
			},
			className,
			isSelected,
			setAttributes
		} = props;
		const [categories, setCategories] = useState([]);
		const [posts, setPosts] = useState([]);
		const [loading, setLoading] = useState(false);
		const [loadingPosts, setLoadingPosts] = useState(false);
		const [error, setError] = useState(null);
		// Загрузка рубрик (только визуально, для отображения списка)
		useEffect(() => {
			loadCategories();
			// Загружаем 6 последних постов по умолчанию
			loadDefaultPosts();
		}, []);
		const loadCategories = async () => {
			setLoading(true);
			setError(null);
			try {
				const cats = await apiFetch({ path: '/wp/v2/categories?per_page=15&hide_empty=true' });
				setCategories(cats);
			} catch (err) {
				setError('Ошибка загрузки рубрик');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		// Загрузка 6 последних постов по умолчанию
		const loadDefaultPosts = async () => {
			setLoadingPosts(true);
			setError(null);
			try {
				const args = {
					per_page: 6,
					order: 'desc',
					orderby: 'date',
					_embed: true
				};
				const postsData = await apiFetch({ path: addQueryArgs('/wp/v2/posts', args) });
				setPosts(postsData);
			} catch (err) {
				setError('Ошибка загрузки постов');
				console.error(err);
			} finally {
				setLoadingPosts(false);
			}
		};
		const sortOptions = [
			{ label: 'Сначала новые', value: 'default' },
			{ label: 'Сначала старые', value: 'oldest' }
		];

		const blockProps = useBlockProps();

		return [
			<InspectorControls key="inspector">
			</InspectorControls>,
			<div className={className} key="editor">
				<div className={'wrapper'}>
					<RichText
						tagName="h1"
						onChange={(value) => setAttributes({ title: value })}
						value={title}
						placeholder="Укажите заголовок..."
					/>
					<div className="blog-frontend-container">
						{/* Фильтр рубрик (только визуально) */}
						<div className="blog-categories-filter">
							<div className="categories-list">
								<button
									className={`category-btn ${!selectedCategory ? 'active' : ''}`}
									style={{ cursor: 'default', opacity: 0.7 }}
									onClick={(e) => e.preventDefault()} // Отключаем функционал
								>
									Все записи
								</button>
								{loading && <Spinner />}
								{!loading && categories.map(cat => (
									<button
										key={cat.id}
										className={'category-btn'}
										style={{ cursor: 'default', opacity: 0.7 }}
										onClick={(e) => e.preventDefault()} // Отключаем функционал
									>
										{cat.name}
									</button>
								))}
							</div>
						</div>
						{/* Сортировка (только визуально) */}
						<div className="blog-sort">
							<button type="button" className="open-sort-block"><svg width="19" height="9" viewBox="0 0 19 9" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.91927e-05 3.97999V2.69999L3.90002 -1.01328e-05L7.84002 2.69999V3.97999L3.90002 1.39999L1.91927e-05 3.97999ZM3.32002 8.47999V1.11999H4.50002V8.47999H3.32002ZM18.2722 4.57999V5.87999L14.3722 8.57999L10.4322 5.87999V4.57999L14.3722 7.17999L18.2722 4.57999ZM14.9522 0.0999898V7.45999H13.7722V0.0999898H14.9522Z" fill="#535353" />
							</svg></button>
							<ul className="sort-list">
								<li>
									<button className="close-sort-block">
										<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<line y1="-0.5" x2="19.7979" y2="-0.5" transform="matrix(0.707069 0.707144 -0.707069 0.707144 0.705566 0.707031)" stroke="#535353" />
											<line y1="-0.5" x2="19.7979" y2="-0.5" transform="matrix(-0.707069 0.707144 0.707069 0.707144 14.7056 0.707031)" stroke="#535353" />
										</svg>
									</button>
								</li>
								{sortOptions.map(opt => (
									<li key={opt.value} className="sort-item">
										<button
											type="button"
											className={`sort-button ${sortOrder === opt.value ? 'active' : ''}`}
											disabled={true}
											style={{ cursor: 'default', opacity: 0.7 }}
										>
											{opt.label}
										</button>
									</li>
								))}
							</ul>
						</div>
						{/* Список постов (всегда 6 последних) */}
						<div className="container-blog">
							{error && <Notice status="error" isDismissible={false}>{error}</Notice>}
							{loadingPosts && (
								<Spinner />
							)}
							{!loadingPosts && posts.length === 0 && !error && (
								<div className="no-posts">
									<p>Нет записей</p>
								</div>
							)}
							{!loadingPosts && posts.map(post => (
								<article key={post.id} className="blog-post">
									{post._embedded && post._embedded['wp:featuredmedia'] && (
										<div className="post-thumbnail">
											<img
												src={post._embedded['wp:featuredmedia'][0].source_url}
												alt={post.title.rendered}
											/>
										</div>
									)}
									<div className="post-content">
										<h2>
											<a href={post.link}>
												{post.title.rendered}
											</a>
										</h2>
										<div
											className="post-excerpt"
											dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
										/>
										<div className="post-meta">
											<span className="post-date">
												{new Date(post.date).toLocaleDateString('ru-RU', {
													day: 'numeric',
													month: 'long',
													year: 'numeric'
												})}
											</span>
										</div>
										<a href={post.link} className="read-more">
											Читать подробнее
										</a>
									</div>
								</article>
							))}
						</div>
						{/* Визуальная кнопка "Загрузить ещё" (не рабочая) */}
						{!loadingPosts && posts.length > 0 && (
							<button
								className="load-next-btn"
								style={{
									cursor: 'default',
									opacity: 0.5,
									pointerEvents: 'none'
								}}
								disabled={true}
							>
								Загрузить ещё
							</button>
						)}
						{/* Подсказка для редактора */}
						<div style={{
							marginTop: '20px',
							padding: '12px',
							backgroundColor: '#f0f6fc',
							borderLeft: '4px solid #007cba',
							fontSize: '13px',
							color: '#1e2a3a'
						}}>
							⚠️ <strong>В редакторе отображается демо-версия:</strong> 6 последних записей.
							Фильтрация по рубрикам, сортировка и пагинация будут работать на сайте.
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
				sortOrder
			},
			className
		} = props;
		const blockProps = useBlockProps.save();

		return (
			<div {...blockProps}>
				<div className={'wrapper'}>
					<RichText.Content tagName="h1" value={title} />
					<div
						className="blog-frontend-container"
						data-rest-url={window.location.origin + '/wp-json'}
					>
						<div className="blog-categories-filter">
							<div className="categories-list">
								<button className="category-btn active" data-cat="">Все записи</button>
							</div>
						</div>
						<div className="blog-sort">
							<button type="button" className="open-sort-block"><svg width="19" height="9" viewBox="0 0 19 9" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.91927e-05 3.97999V2.69999L3.90002 -1.01328e-05L7.84002 2.69999V3.97999L3.90002 1.39999L1.91927e-05 3.97999ZM3.32002 8.47999V1.11999H4.50002V8.47999H3.32002ZM18.2722 4.57999V5.87999L14.3722 8.57999L10.4322 5.87999V4.57999L14.3722 7.17999L18.2722 4.57999ZM14.9522 0.0999898V7.45999H13.7722V0.0999898H14.9522Z" fill="#535353" />
							</svg></button>
							<ul className="sort-list" role="list">
								<li>
									<button className="close-sort-block">
										<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
											<line y1="-0.5" x2="19.7979" y2="-0.5" transform="matrix(0.707069 0.707144 -0.707069 0.707144 0.705566 0.707031)" stroke="#535353" />
											<line y1="-0.5" x2="19.7979" y2="-0.5" transform="matrix(-0.707069 0.707144 0.707069 0.707144 14.7056 0.707031)" stroke="#535353" />
										</svg>
									</button>
								</li>
								<li className="sort-item"><button class="open-sort-button">Сначала новые</button></li>
								<li className="sort-item">
									<button
										type="button"
										className="sort-button active"
										data-sort="default"
									>
										Сначала новые
									</button>
								</li>
								<li className="sort-item">
									<button
										type="button"
										className="sort-button"
										data-sort="oldest"
									>
										Сначала старые
									</button>
								</li>
							</ul>
						</div>
						<div className="pagination-controls">
							{/* <button className="load-prev-btn" style={{ display: 'none' }}>Загрузить предыдущие</button> */}
							<span className="page-info"></span>
						</div>
						<div className="container-blog">
						</div>
						<button className="load-next-btn">Загрузить ещё</button>
					</div>
				</div>
			</div>
		)
	};
})(
	window.wp
);