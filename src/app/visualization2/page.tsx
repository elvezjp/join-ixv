// app/visualization/page.tsx
import { analyze } from '@/lib/analyzer/astAnalyzer';
import { resolve } from 'path';
import VisualizationClient from './VisualizationClient';

export async function generateStaticParams() {
  // ビルド時に実行される
  const componentsPath = resolve(process.cwd(), 'src');
  const dependencies = await analyze(componentsPath);

  return {
    props: {
      dependencies
    }
  };
}

export default async function VisualizationPage() {
  const componentsPath = resolve(process.cwd(), 'src');
  const dependencies = await analyze(componentsPath);

  return <VisualizationClient initialData={dependencies} />;
}