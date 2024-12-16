/**
 * @file src/components/TermsModal.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月14日
 * @version 0.0.1
 * @description 利用規約のモーダルのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import { useEffect, useCallback, useState } from 'react';

// 利用規約のモーダルのプロパティ型
interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 利用規約のモーダルのコンポーネント。
 * @param isOpen - モーダルが開いているかどうか。
 * @param onClose - モーダルを閉じる関数。
 * @returns 利用規約のモーダルのコンポーネント。
 */
export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>('exited');

  useEffect(() => {
    if (isOpen && animationState === 'exited') {
      setAnimationState('entering');
      setTimeout(() => {
        setAnimationState('entered');
      }, 10);
    } else if (!isOpen && (animationState === 'entering' || animationState === 'entered')) {
      setAnimationState('exiting');
      setTimeout(() => {
        setAnimationState('exited');
      }, 300);
    }
  }, [isOpen, animationState]);

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  if (animationState === 'exited' && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 modal-backdrop ${animationState}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className={`modal-content bg-white rounded-lg w-full max-w-2xl ${animationState}`}>
          <div className="modal-header p-6 border-b">
            <h2 className="text-2xl font-bold">クローズドβ版利用規約</h2>
          </div>

          <div className="modal-body p-6">
            <p className="mb-6">株式会社エルブズ（以下「当社」といいます）は、当社が提供するクローズドβ版（以下「本サービス」といいます）に関する利用規約を以下の通り定めます。本サービスの利用者（以下「利用者」といいます）は、本規約に同意した上でご利用ください。</p>

            <h3 className="font-bold mt-6">第1条（目的）</h3>
            <p>本規約は、本サービスを利用する利用者に適用されます。本サービスは、サービスの機能確認および改善を目的として提供されるものであり、利用者は以下の条件に従ってこれを利用するものとします。</p>

            <h3 className="font-bold mt-6">第2条（利用資格）</h3>
            <ol className="list-decimal pl-6">
              <li>利用者は、当社が提供する本サービスを正当かつ善良な方法で利用することができます。</li>
              <li>利用者は、クローズドβ版の目的に沿った利用を行い、以下に該当する行為を行わないことに同意します。
                <ul className="list-disc pl-6 mt-2">
                  <li>他者の知的財産権を侵害する行為</li>
                  <li>本サービスに関する情報を無断で第三者に公開または共有する行為</li>
                  <li>本サービスの仕様をリバースエンジニアリングする行為</li>
                </ul>
              </li>
            </ol>

            <h3 className="font-bold mt-6">第3条（秘密保持）</h3>
            <ol className="list-decimal pl-6">
              <li>利用者は、本サービスに関連する一切の情報（以下「秘密情報」といいます）を第三者に開示または漏洩してはなりません。</li>
              <li>秘密情報には、本サービスの仕様、バグ、改善提案、提供される資料、及びその他非公開情報が含まれます。</li>
            </ol>

            <h3 className="font-bold mt-6">第4条（調査協力）</h3>
            <ol className="list-decimal pl-6">
              <li>利用者は、本サービスに関する当社の調査活動に協力するものとします。調査活動には、インタビュー、アンケート、および利用状況の報告が含まれます。</li>
              <li>調査結果は、本サービスの改善目的にのみ利用され、個人を特定できる形で外部に公開されることはありません。</li>
            </ol>

            <h3 className="font-bold mt-6">第5条（免責事項）</h3>
            <ol className="list-decimal pl-6">
              <li>本サービスは、テスト目的で提供されるものであり、いかなる保証も行いません。</li>
              <li>当社は、本サービスの利用により生じた損害について、一切の責任を負わないものとします。</li>
            </ol>

            <h3 className="font-bold mt-6">第6条（利用停止および終了）</h3>
            <ol className="list-decimal pl-6">
              <li>当社は、利用者が本規約に違反した場合、事前の通知なしに本サービスの利用を停止または終了することができます。</li>
              <li>利用者は、本サービスの提供終了に伴い、当社に対していかなる請求も行わないことに同意します。</li>
            </ol>

            <h3 className="font-bold mt-6">第7条（知的財産権）</h3>
            <ol className="list-decimal pl-6">
              <li>本サービスに関する知的財産権は全て当社に帰属します。</li>
              <li>利用者は、本サービスに関連する素材、技術、または情報を無断で利用することを禁じます。</li>
            </ol>

            <h3 className="font-bold mt-6">第8条（規約の変更）</h3>
            <ol className="list-decimal pl-6">
              <li>当社は、必要に応じて本規約を変更することができます。</li>
              <li>規約変更後に本サービスを利用した場合、変更後の規約に同意したものとみなされます。</li>
            </ol>

            <h3 className="font-bold mt-6">第9条（準拠法および裁判管轄）</h3>
            <p>本規約の解釈および適用は、日本法に準拠するものとします。また、本規約に関連して生じる一切の紛争については、当社の所在地を管轄する裁判所を第一審の専属的管轄裁判所とします。</p>

            <div className="mt-8 text-right">
              <p className="text-gray-600">制定日: 2024年12月16日</p>
            </div>
          </div>

          <div className="modal-footer border-t p-4 flex justify-end bg-gray-50">
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}