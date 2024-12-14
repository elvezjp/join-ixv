import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#1a365d] to-[#2563eb] text-white">
      <div className="container mx-auto px-6 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold">IXV</div>
          <Link
            href="#signup"
            className="bg-white text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition"
            scroll={true}
          >
            クローズドβ申し込み
          </Link>
        </nav>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              開発をもっと<br />シンプルに
            </h1>
            <p className="text-xl mb-8">
              IXV（イクシブ）は、AIを活用した次世代の開発ツール。<br />
              チーム開発をよりスマートに、より効率的に。
            </p>
            <div className="space-x-4">
              <Link
                href="#signup"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
                scroll={true}
              >
                無料で申し込む
              </Link>
              <Link
                href="#features"
                className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                scroll={true}
              >
                詳細を見る
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative w-full h-[400px]">
              <Image
                src="/api/placeholder/600/400"
                alt="ダッシュボードイメージ"
                className="rounded-lg shadow-xl"
                fill
                objectFit="cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}