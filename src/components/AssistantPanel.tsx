/**
 * @file src/components/AssistantPanel.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description アシスタントパネルコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import React, { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { X as CloseIcon } from 'lucide-react';
import { useAssistantPanel } from '../contexts/AssistantPanelContext';

/**
 * サイドパネルのプロパティ
 * @interface AssistantPanelProps
 * @property {boolean} isOpen - パネルの表示/非表示状態
 * @property {() => void} onClose - パネルを閉じる際のコールバック関数
 * @property {React.ReactNode} children - パネルの子要素
 * @property {string} [width] - パネルの幅
 */
interface AssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}

/**
 * サイドパネルコンポーネント
 * @param {AssistantPanelProps} props - コンポーネントのプロパティ
 * @returns {JSX.Element} サイドパネルのJSX要素
 */
export const AssistantPanel: React.FC<AssistantPanelProps> = ({
  isOpen,
  onClose,
  children,
  width = '360px'
}) => {
  const { setWidth } = useAssistantPanel();

  useEffect(() => {
    if (width) {
      setWidth(width);
    }
  }, [width, setWidth]);

  return (
    <Box
      className="fixed top-16 right-0 h-full shadow-md transition-transform duration-300 ease-in-out rounded-lg border border-[#1a365d] bg-gradient-to-r from-[#1a365d] to-[#2563eb]"
      sx={{
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        width: width,
        zIndex: 1500,  // ヘッダーより手前に表示
      }}
    >
      <Box className="flex justify-start p-2">
        <IconButton onClick={onClose} size="small">
          <CloseIcon color="white"/>
        </IconButton>
      </Box>
      <Box className="p-4">
        {children}
      </Box>
    </Box>
  );
};