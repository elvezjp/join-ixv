import { FormEvent } from 'react';

interface SignupFormProps {
  onOpenModal: () => void;
}

export default function SignupForm({ onOpenModal }: SignupFormProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // フォーム送信処理をここに実装
    console.log('Form submitted');
  };

  return (
    <section id="signup" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">クローズドβ申し込み</h2>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto">
          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-700 font-semibold mb-2">
              会社名
            </label>
            <input
              type="text"
              id="company"
              name="company"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block text-gray-700 font-semibold mb-2">
              部署名
            </label>
            <input
              type="text"
              id="department"
              name="department"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
              電話番号
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              氏名
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">オプション</label>
            <div>
              <input type="checkbox" id="priority" name="priority" className="mr-2" />
              <label htmlFor="priority" className="text-gray-700">
                優先申し込みをしました
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                className="mr-2"
                required
              />
              <label htmlFor="agreement" className="text-gray-700">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="text-blue-600 underline"
                >
                  利用規約
                </button>
                に同意します
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition w-full"
          >
            申し込む
          </button>
        </form>
      </div>
    </section>
  );
}