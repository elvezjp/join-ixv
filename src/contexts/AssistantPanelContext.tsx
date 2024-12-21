/**
 * @file src/app/contexts/AssistantPanelContext.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月06日
 * @version 0.1.1
 * @description アシスタントパネルの状態を管理するContextコンポーネント。
 * パネルの表示/非表示、コンテンツ、幅などを制御する。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * サイドパネルのContextで管理する状態の型定義
 * @interface AssistantPanelContextType
 */
type AssistantPanelContextType = {
  isOpen: boolean;                                        // パネルの表示状態
  content: ReactNode | null;                             // 現在表示中のコンテンツ
  defaultContent?: ReactNode;                            // デフォルトのコンテンツ
  width: string;                                         // パネルの幅
  setWidth: (width: string) => void;                     // パネル幅を設定
  openPanel: (content?: ReactNode, setAsDefault?: boolean) => void;  // パネルを開く
  closePanel: () => void;                                // パネルを閉じる
  setDefaultContent: (content: ReactNode) => void;       // デフォルトコンテンツを設定
};

/**
 * サイドパネルのContext
 */
const AssistantPanelContext = createContext<AssistantPanelContextType | undefined>(undefined);

/**
 * サイドパネルのProviderコンポーネント
 * パネルの状態管理とコンテンツの制御を行う
 *
 * @param props.children - 子コンポーネント
 * @example
 * ```tsx
 * <AssistantPanelProvider>
 *   <App />
 * </AssistantPanelProvider>
 * ```
 */
export function AssistantPanelProvider({ children }: { children: ReactNode }) {
  // 状態の初期化
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [defaultContent, setDefaultContent] = useState<ReactNode | undefined>();
  const [width, setWidth] = useState('360px');

  /**
   * パネルを開く
   * @param newContent - 表示するコンテンツ（省略時はデフォルトコンテンツを使用）
   * @param setAsDefault - デフォルトコンテンツとして設定するかどうか
   */
  const openPanel = (newContent?: ReactNode, setAsDefault?: boolean) => {
    if (newContent) {
      setContent(newContent);
      if (setAsDefault) {
        setDefaultContent(newContent);
      }
    } else {
      setContent(defaultContent);
    }
    setIsOpen(true);
  };

  /**
   * パネルを閉じる
   * 表示状態をfalseに設定し、コンテンツをクリアする
   */
  const closePanel = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <AssistantPanelContext.Provider value={{
      isOpen,
      content,
      defaultContent,
      width,
      setWidth,
      openPanel,
      closePanel,
      setDefaultContent
    }}>
      {children}
    </AssistantPanelContext.Provider>
  );
}

/**
 * サイドパネルのContextを使用するためのカスタムフック
 * @returns {AssistantPanelContextType} サイドパネルの状態と操作関数
 * @throws {Error} Providerの外で使用された場合
 * @example
 * ```tsx
 * const { isOpen, openPanel, closePanel } = useAssistantPanel();
 * ```
 */
export const useAssistantPanel = () => {
  const context = useContext(AssistantPanelContext);
  if (context === undefined) {
    throw new Error('useAssistantPanel must be used within a AssistantPanelProvider');
  }
  return context;
};