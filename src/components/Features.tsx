/**
 * @file src/components/Features.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月14日
 * @version 0.0.1
 * @description 特徴のコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

export default function Features() {
	return (
		<>
			<section id="features" className="py-20 bg-white">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-8 text-[#3F62A7]">IXVの特徴</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">上流工程の効率化</h3>
							<p>AIを活用して要件定義書作成を支援し、品質のばらつきを低減します。</p>
						</div>
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">プロジェクト管理の最適化</h3>
							<p>AIによる進捗管理の自動化や最適なリソース配分提案を実現します。</p>
						</div>
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">開発プロセスの改善</h3>
							<p>コード統合の支援を行い、品質を向上させるとともに、チームの成果を最大化します。</p>
						</div>
					</div>
				</div>
			</section>

			<section id="challenges" className="py-20 bg-white">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-8 text-[#3F62A7]">日本のソフトウェア開発の課題と解決</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">主な課題</h3>
							<ul className="list-disc list-inside text-gray-700">
								<li>要件の曖昧さやステークホルダー間の認識齟齬</li>
								<li>タスク分割やリソースアサインの難しさ</li>
								<li>属人化した開発やナレッジ共有・継承の困難さ</li>
							</ul>
						</div>
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">IXVによる解決</h3>
							<ul className="list-disc list-inside text-gray-700">
								<li>AIを活用した要件定義書作成支援と品質チェックの自動化</li>
								<li>最適なリソース配分提案と進捗管理の自動化</li>
								<li>コード統合支援やナレッジ共有・蓄積の促進</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<section id="why-ixv" className="py-20 bg-white">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl font-bold text-center mb-8 text-[#3F62A7]">なぜIXVなのか？</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">シンプルな操作性</h3>
							<p>複雑なバージョン管理は不要。直感的なインターフェースで、すぐに使い始められます。</p>
						</div>
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">安全性の確保</h3>
							<p>AIによる変更分析と影響範囲の可視化。リスクを最小限に抑えた開発が可能です。</p>
						</div>
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">生産性の向上</h3>
							<p>自動化された作業フローとAIサポートにより、チームの生産性が大幅に向上します。</p>
						</div>
						<div className="feature-card bg-gray-100 p-6 rounded-lg shadow-lg">
							<h3 className="text-xl font-bold text-blue-600 mb-4">チーム連携の強化</h3>
							<p>リアルタイムな情報共有と進捗の可視化で、チームの連携がさらに強化されます。</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
	}