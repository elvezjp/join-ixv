'use client'

import { Box } from '@mui/material';
import { useNavigationPanel } from '@/contexts/NavigationPanelContext';
import { useAssistantPanel } from '@/contexts/AssistantPanelContext';
import { NavigationPanel } from '@/components/NavigationPanel';
import { AssistantPanel } from '@/components/AssistantPanel';
import DependencyGraph from '@/components/visualization/DependencyGraph2';

import { NavigationPanelContent, AssistantPanelContent } from './PanelContent';
import { DependencyNode } from '@/lib/analyzer/astAnalyzer';

interface VisualizationClientProps {
  initialData: DependencyNode[];
}

export default function VisualizationClient({ initialData }: VisualizationClientProps) {
  const { isPinned: isNavigationPinned, width: navigationPanelWidth } = useNavigationPanel();
  const { isOpen: isAssistantPanelOpen, closePanel: closeAssistantPanel, width: assistantPanelWidth } = useAssistantPanel();

  return (
    <div>
      <NavigationPanel>
        <NavigationPanelContent />
      </NavigationPanel>
      <AssistantPanel isOpen={isAssistantPanelOpen} onClose={closeAssistantPanel}>
        <AssistantPanelContent />
      </AssistantPanel>
      <div className="bg-gradient-to-r from-[#1a365d] to-[#2563eb] text-white">
        <Box
          className="flex-1 transition-all duration-300 ease-in-out"
          sx={{
            marginLeft: isNavigationPinned ? navigationPanelWidth : 0,
            marginRight: isAssistantPanelOpen ? assistantPanelWidth : 0
          }}
        >
          <DependencyGraph data={initialData} />
        </Box>
      </div>
    </div>
  );
}