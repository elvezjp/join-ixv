/**
 * @file src/app/page.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2024年12月21日
 * @version 0.1.0
 * @description メインのコンポーネント。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
'use client';

import Header from '@/components/Header';
import Features from '@/components/Features';
import SignupForm from '@/components/SignupForm';
import Footer from '@/components/Footer';

// import { useNavigationPanel } from '@/contexts/NavigationPanelContext';
import { NavigationPanel } from '@/components/NavigationPanel';

function NavigationPanelContent() {
  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-semibold">Old Navigation Panel Content</h2>
      <p>This is a dummy content for the navigation panel.</p>
    </div>
  );
}

export default function Home() {

  // const { setDefaultContent: setNavigationDefaultContent } = useNavigationPanel();

  // useEffect(() => {
  //   setNavigationDefaultContent(<NavigationPanelContent />);
  // }, [setNavigationDefaultContent]);

  return (
    <div className="flex">
    <NavigationPanel>
      <NavigationPanelContent />
    </NavigationPanel>
    <main className="flex-1 min-h-screen">
      <Header />
      <Features />
      <SignupForm />
      <Footer />
    </main>
  </div>
  );
}