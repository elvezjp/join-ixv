export default function Features() {
	const features = [
	  {
		title: "Morning Sync",
		subtitle: "デイリープランニング",
		description: "AIによるタスク分析と最適な担当者の提案。チーム全体の効率を最大化します。"
	  },
	  {
		title: "AI Analysis",
		subtitle: "インテリジェント分析",
		description: "変更の影響範囲を自動分析。リスクを事前に特定し、最適な統合方針を提案します。"
	  },
	  {
		title: "Evening Sync",
		subtitle: "ガイド付き統合",
		description: "AIのガイダンスに従って安全に統合。すべての作業を自動記録します。"
	  }
	];

	return (
	  <section id="features" className="py-20 bg-gray-50">
		<div className="container mx-auto px-6">
		  <h2 className="text-3xl font-bold text-center mb-16">
			AI-Enhanced Daily Synchronization Flow
		  </h2>
		  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			{features.map((feature, index) => (
			  <div key={index} className="feature-card bg-white p-6 rounded-xl shadow-lg">
				<div className="text-blue-600 text-xl font-semibold mb-4">
				  {feature.title}
				</div>
				<h3 className="text-xl font-bold mb-4">{feature.subtitle}</h3>
				<p className="text-gray-600">{feature.description}</p>
			  </div>
			))}
		  </div>
		</div>
	  </section>
	);
  }