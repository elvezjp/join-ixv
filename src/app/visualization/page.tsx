import { analyze } from '@/lib/analyzer/astAnalyzer';
import DependencyGraph from '@/components/visualization/DependencyGraph';
import { resolve } from 'path';

export default async function VisualizationPage() {
  const componentsPath = resolve(process.cwd(), 'src/components');
  const dependencies = await analyze(componentsPath);

  return (
    <main className="w-screen h-screen">
      <DependencyGraph data={dependencies} />
    </main>
  );
}