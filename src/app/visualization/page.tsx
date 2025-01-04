/**
 * @file src/app/visualization/page.tsx
 * @lastModifiedBy 竹内康太
 * @modified 2025年01月04日
 * @version 0.1.0
 * @description 依存関係の可視化ページのサーバーサイドコンポーネント。
 * プロジェクトの依存関係を解析し、クライアントコンポーネントにデータを提供する。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
import { analyze } from '@/lib/analyzer/astAnalyzer';
import { resolve } from 'path';
import VisualizationClient from './VisualizationClient';

/**
 * 静的パラメータを生成する関数
 * @returns {Promise<Array<{params: {id: string}}>>} 静的パラメータの配列
 */
export async function generateStaticParams() {
  // ビルド時に実行される
  const componentsPath = resolve(process.cwd(), 'src');
  const dependencies = await analyze(componentsPath);

  return dependencies.map(dependency => ({
    params: { id: dependency.id }
  }));
}

/**
 * 可視化ページのメインコンポーネント
 * @returns {Promise<JSX.Element>} 可視化ページのレンダリング結果
 */
export default async function VisualizationPage() {
  const componentsPath = resolve(process.cwd(), 'src');
  const dependencies = await analyze(componentsPath);

  return <VisualizationClient initialData={dependencies} />;
}