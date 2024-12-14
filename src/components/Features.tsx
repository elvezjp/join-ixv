export default function Features() {
	return (
		<>
			<section id="features" className="py-20 bg-white">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-8">IXVの特徴</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">上流工程の効率化</h3>
							<p>AIを活用した要件定義書作成支援と品質ばらつきを低減します。</p>
						</div>
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">プロジェクト管理の最適化</h3>
							<p>AIによる進捗管理の自動化やリソース配分提案で最大効率化。</p>
						</div>
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">開発プロセスの改善</h3>
							<p>品質メトリクス自動計測やナレッジ蓄積を促進します。</p>
						</div>
					</div>
				</div>
			</section>

			<section id="challenges" className="py-20 bg-white">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-8">日本のソフトウェア開発の課題と解決</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">主な課題</h3>
							<ul className="list-disc list-inside text-gray-700">
								<li>要件の曖昧さやステークホルダー間の認識齟齬</li>
								<li>タスク分割やアサインの難しさ</li>
								<li>属人化した開発やナレッジ継承の困難さ</li>
							</ul>
						</div>
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">IXVによる解決</h3>
							<ul className="list-disc list-inside text-gray-700">
								<li>AIを活用した要件定義書作成支援と品質チェックの自動化</li>
								<li>最適なリソース配分提案と進捗管理の自動化</li>
								<li>コード統合支援やナレッジ蓄積の促進</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	);
	}