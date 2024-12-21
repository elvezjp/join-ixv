/**
 * @file src/components/NavigationPanel.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description ナビゲーションパネルコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import React from 'react';
import { Box, IconButton } from '@mui/material';
import { KeyboardTab } from '@mui/icons-material';
import { PanelLeftOpen } from 'lucide-react';
import { useNavigationPanel } from '../contexts/NavigationPanelContext';

/**
 * ナビゲーションパネルのプロパティ
 * @interface NavigationPanelProps
 * @property {React.ReactNode} children - パネルの子要素
 * @property {string} [width] - パネルの幅
 */
interface NavigationPanelProps {
  children: React.ReactNode;
  width?: string;
}

/**
 * ナビゲーションパネルコンポーネント
 * @param {NavigationPanelProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} ナビゲーションパネルのJSX要素
 */
export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  children,
  width = '360px'
}) => {
  const {
    isOpen: isNavigationOpen,
    closePanel,
    openPanel,
    isPinned,
    setPinned
  } = useNavigationPanel();
  const [isHovered, setIsHovered] = React.useState(false);

  const isPanelOpen = isNavigationOpen || isHovered || isPinned;

  /**
   * ピン留めボタンのクリックハンドラー
   * パネルの状態に応じてピン留め/解除を切り替える
   */
  const handleClick = () => {
    if (isPanelOpen) {
      if (isPinned) {
        // ピン留めされている場合は、ピン留め解除して閉じる
        setPinned(false);
        closePanel();
      } else {
        // ピン留めされていない場合は、ピン留めする
        setPinned(true);
      }
    } else {
      // パネルが閉じている場合は、開いてピン留めする
      setPinned(true);
      openPanel();
    }
  };

  return (
    <Box
      className={`fixed top-16 left-0 h-full transition-all duration-300 ease-in-out flex ${
        isPanelOpen ? 'shadow-md rounded-lg bg-neutral-50 opacity-95 border border-[#1a365d] bg-gradient-to-r from-[#1a365d] to-[#2563eb]' : ''
      }
      `}
      sx={{
        transform: isPanelOpen ? 'translateX(0)' : `translateX(calc(-100% + 3em))`,
        width: width,
        zIndex: 1500,
      }}
      onMouseEnter={() => {
        if (!isPinned) {
          openPanel();
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isPinned) {
          closePanel();
        }
      }}
    >
      <Box className="flex-grow overflow-hidden flex flex-col">
        <Box className="flex justify-end p-2">
          {isPanelOpen && (
            <IconButton onClick={handleClick} size="small" className={isPinned ? 'bg-blue-100' : ''}>
              <KeyboardTab sx={{
                transform: isPinned ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.3s'
              }} />
            </IconButton>
          )}
        </Box>
        <Box className="p-4 overflow-hidden">
          {isPanelOpen && children}
        </Box>
        <Box className="absolute bottom-0 right-0 p-2 mb-16">
          {!isPanelOpen && (
            <PanelLeftOpen />
          )}
        </Box>
      </Box>
    </Box>
  );
};