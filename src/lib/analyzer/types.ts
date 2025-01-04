/**
 * @file src/lib/analyzer/types.ts
 * @lastModifiedBy 竹内康太
 * @modified 2025年01月04日
 * @version 0.1.0
 * @description 依存関係解析で使用する型定義ファイル。
 * ファイルノードの基本構造を定義する。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

export interface FileNode {
  path: string;
  content?: string;
}