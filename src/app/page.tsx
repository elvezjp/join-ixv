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

// import { useNavigationPanel } from '@/contexts/NavigationPanelContext';
// import { useAssistantPanel } from '@/contexts/AssistantPanelContext';
import { NavigationPanel } from '@/components/NavigationPanel';
import { AssistantPanel } from '@/components/AssistantPanel';
import { useAssistantPanel } from '@/contexts/AssistantPanelContext';


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

  // const { setDefaultContent: setNavigationDefaultContent } = useNavigationPanel();

  // useEffect(() => {
  //   setNavigationDefaultContent(<NavigationPanelContent />);
  // }, [setNavigationDefaultContent]);

  const { isOpen: isAssistantPanelOpen, closePanel: closeAssistantPanel } = useAssistantPanel();

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
      <Hero />
      <Features />
      <SignupForm />
    </div>
  );
}