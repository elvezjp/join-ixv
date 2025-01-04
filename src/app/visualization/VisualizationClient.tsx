'use client'

import { Box } from '@mui/material';
import { useNavigationPanel } from '@/contexts/NavigationPanelContext';
import { useAssistantPanel } from '@/contexts/AssistantPanelContext';
import { NavigationPanel } from '@/components/NavigationPanel';
import { AssistantPanel } from '@/components/AssistantPanel';
import DependencyGraph from '@/components/visualization/DependencyGraph';

import { NavigationPanelContent, AssistantPanelContent } from './PanelContent';
import { DependencyNode } from '@/lib/analyzer/astAnalyzer';
import { FileNode } from '@/lib/analyzer/types';
import { useState, useEffect } from 'react';

interface VisualizationClientProps {
  initialData: DependencyNode[];
}

export default function VisualizationClient({ initialData }: VisualizationClientProps) {
  const { isPinned: isNavigationPinned, width: navigationPanelWidth } = useNavigationPanel();
  const { isOpen: isAssistantPanelOpen, closePanel: closeAssistantPanel, width: assistantPanelWidth } = useAssistantPanel();
  const [data] = useState<DependencyNode[]>(initialData);
  const [files, setFiles] = useState<FileNode[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fileNodes: FileNode[] = data.map(node => ({
        path: node.id,
        content: node.name
      }));
      setFiles(fileNodes);
    };

    fetchData();
  }, [data]);

  return (
    <div className="h-screen">
      <NavigationPanel>
        <NavigationPanelContent />
      </NavigationPanel>
      <AssistantPanel isOpen={isAssistantPanelOpen} onClose={closeAssistantPanel}>
        <AssistantPanelContent />
      </AssistantPanel>
      <div className="bg-gradient-to-r from-[#1a365d] to-[#2563eb] text-white h-full">
        <Box
          sx={{
            height: '100%',
            marginLeft: isNavigationPinned ? navigationPanelWidth : 0,
            marginRight: isAssistantPanelOpen ? assistantPanelWidth : 0,
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <DependencyGraph data={data} files={files} />
        </Box>
      </div>
    </div>
  );
}