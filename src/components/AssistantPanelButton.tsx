/**
 * @file src/components/AssistantPanelButton.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description アシスタントパネルボタンコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import React from 'react';
import { IconButton } from "@mui/material";
import { PanelRightOpen } from 'lucide-react';
import { useAssistantPanel } from '@/contexts/AssistantPanelContext';
import { styled } from '@mui/material/styles';

const CustomIconButton = styled(IconButton)({
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: '#eeeeee',
  },
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
});

export const AssistantPanelButton = () => {
  const { openPanel: openAssistantPanel } = useAssistantPanel();

  return (
    <CustomIconButton onClick={() => openAssistantPanel()}>
      <PanelRightOpen className="w-5 h-5 text-blue-600" />
    </CustomIconButton>
  );
};

export default AssistantPanelButton;