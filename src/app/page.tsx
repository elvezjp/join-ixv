/**
 * @file src/app/page.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description メインのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
'use client';

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import SignupForm from '@/components/SignupForm';

import { useNavigationPanel } from '@/contexts/NavigationPanelContext';
import { useAssistantPanel } from '@/contexts/AssistantPanelContext';
import { NavigationPanel } from '@/components/NavigationPanel';
import { AssistantPanel } from '@/components/AssistantPanel';

import { Box } from '@mui/material';

function NavigationPanelContent() {
  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-semibold">Navigation Panel Content</h2>
      <p>This is a dummy content for the navigation panel.</p>
    </div>
  );
}

function AssistantPanelDummyContent() {
  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-semibold">Assistant Panel Content</h2>
      <p>This is a dummy content for the assistant panel.</p>
    </div>
  );
}

export default function Home() {

  const {isPinned: isNavigationPinned, width: navigationPanelWidth } = useNavigationPanel();

  // useEffect(() => {
  //   setNavigationDefaultContent(<NavigationPanelContent />);
  // }, [setNavigationDefaultContent]);

  const { isOpen: isAssistantPanelOpen, closePanel: closeAssistantPanel, width: assistantPanelWidth } = useAssistantPanel();

  // useEffect(() => {
  //   setAssistantDefaultContent(<AssistantPanelContent />);
  // }, [setAssistantDefaultContent

  return (
    <div>
      <NavigationPanel>
        <NavigationPanelContent />
      </NavigationPanel>
      <AssistantPanel isOpen={isAssistantPanelOpen} onClose={closeAssistantPanel}>
        <AssistantPanelDummyContent />
      </AssistantPanel>
      <div className="bg-gradient-to-r from-[#1a365d] to-[#2563eb] text-white">
        <Box
          className="flex-1 transition-all duration-300 ease-in-out"
          sx={{
            marginLeft: isNavigationPinned ? navigationPanelWidth : 0,
            marginRight: isAssistantPanelOpen ? assistantPanelWidth : 0
          }}
        >
          <Hero />
        </Box>
      </div>
      <Box
        className="flex-1 transition-all duration-300 ease-in-out"
        sx={{
          marginLeft: isNavigationPinned ? navigationPanelWidth : 0,
          marginRight: isAssistantPanelOpen ? assistantPanelWidth : 0
        }}
      >
        <Features />
        <SignupForm />
      </Box>
    </div>
  );
}