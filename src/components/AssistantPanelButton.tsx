import React from 'react';
import { IconButton } from "@mui/material";
import { PanelRightOpen } from 'lucide-react';
import { useAssistantPanel } from '@/contexts/AssistantPanelContext';

export const AssistantPanelButton = () => {
	const { openPanel: openAssistantPanel } = useAssistantPanel();

	return (
		<IconButton
			onClick={() => openAssistantPanel()}
			className="bg-white shadow-md hover:bg-blue-600"
		>
			<PanelRightOpen className="w-5 h-5" />
		</IconButton>
	);
};

export default AssistantPanelButton;