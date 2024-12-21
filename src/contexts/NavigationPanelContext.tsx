/**
 * @file src/app/contexts/NavigationPanelContext.tsx
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月06日
 * @version 0.1.1
 * @description ナビゲーションパネルの状態を管理するContextコンポーネント。
 * パネルの表示/非表示、コンテンツ、ピン留め状態、幅などを制御する。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * ナビゲーションパネルのContextで管理する状態の型定義
 * @interface NavigationPanelContextType
 */
type NavigationPanelContextType = {
  isOpen: boolean;                                        // パネルの表示状態
  content: ReactNode | null;                             // 現在表示中のコンテンツ
  defaultContent?: ReactNode;                            // デフォルトのコンテンツ
  isPinned: boolean;                                     // ピン留め状態
  width: string;                                         // パネルの幅
  setWidth: (width: string) => void;                     // パネル幅を設定
  openPanel: (content?: ReactNode, setAsDefault?: boolean) => void;  // パネルを開く
  closePanel: () => void;                                // パネルを閉じる
  setDefaultContent: (content: ReactNode) => void;       // デフォルトコンテンツを設定
  setPinned: (pinned: boolean) => void;                  // ピン留め状態を設定
};

/**
 * ナビゲーションパネルのContext
 */
const NavigationPanelContext = createContext<NavigationPanelContextType | undefined>(undefined);

/**
 * ナビゲーションパネルのProviderコンポーネント
 * パネルの状態管理とコンテンツの制御を行う
 *
 * @param props.children - 子コンポーネント
 * @example
 * ```tsx
 * <NavigationPanelProvider>
 *   <App />
 * </NavigationPanelProvider>
 * ```
 */
export function NavigationPanelProvider({ children }: { children: ReactNode }) {
  // 状態の初期化
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  const [defaultContent, setDefaultContent] = useState<ReactNode | undefined>();
  const [isPinned, setIsPinned] = useState(false);
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
   * ピン留め状態の場合は閉じない
   */
  const closePanel = () => {
    if (!isPinned) {
      setIsOpen(false);
    }
  };

  /**
   * ピン留め状態を設定
   * @param pinned - ピン留めするかどうか
   */
  const setPinned = (pinned: boolean) => {
    setIsPinned(pinned);
    if (!pinned) {
      setIsOpen(false);
    }
  };

  return (
    <NavigationPanelContext.Provider value={{
      isOpen,
      content,
      defaultContent,
      isPinned,
      width,
      setWidth,
      openPanel,
      closePanel,
      setDefaultContent,
      setPinned
    }}>
      {children}
    </NavigationPanelContext.Provider>
  );
}

/**
 * ナビゲーションパネルのContextを使用するためのカスタムフック
 * @returns {NavigationPanelContextType} ナビゲーションパネルの状態と操作関数
 * @throws {Error} Providerの外で使用された場合
 * @example
 * ```tsx
 * const { isOpen, openPanel, closePanel } = useNavigationPanel();
 * ```
 */
export const useNavigationPanel = () => {
  const context = useContext(NavigationPanelContext);
  if (context === undefined) {
    throw new Error('useNavigationPanel must be used within a NavigationPanelProvider');
  }
  return context;
};