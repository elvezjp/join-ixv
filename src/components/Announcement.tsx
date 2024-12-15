/**
 * @file src/components/Announcement.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月15日
 * @version 0.0.1
 * @description お知らせのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

export default function Announcement() {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">【重要なお知らせ】</h2>
          <p className="text-gray-700 mb-4">
            事前登録を完了いただいている皆様には、クローズドβ版の優先的なご案内を差し上げますが、
            正式にクローズドβ版をご利用いただくには、専用の申込フォームにてお申し込みいただく必要がございます。
          </p>
        </div>
      </div>
    </section>
  );
}