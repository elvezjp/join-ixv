/**
 * @file src/lib/analyzer/astAnalyzer.ts
 * @lastModifiedBy 竹内康太
 * @modified 2025年01月04日
 * @version 0.1.0
 * @description TypeScriptのASTを解析して依存関係を抽出するユーティリティ。
 * コンポーネント、関数、コンテキストなどの種類を判別し、依存関係を特定する。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */

import { parse } from '@typescript-eslint/parser';
import { readFileSync, readdirSync } from 'fs';
import { resolve, relative, dirname } from 'path';
import { TSESTree } from '@typescript-eslint/types';
import { existsSync } from 'fs';
import { AST_NODE_TYPES } from '@typescript-eslint/types';

export type NodeType = 'component' | 'context' | 'class' | 'function' | 'other';

/**
 * 依存関係ノードの型定義
 * @interface DependencyNode
 */
export interface DependencyNode {
  id: string;
  name: string;
  type: NodeType;
  dependencies: string[];
  filePath: string;
  externalDependencies?: string[];
}

/**
 * ファイル解析結果の型定義
 * @interface FileAnalysis
 */
export interface FileAnalysis {
  node: DependencyNode;
  exports: {
    name: string;
    type: NodeType;
    isType?: boolean;
  }[];
}

/**
 * プロジェクトの依存関係を解析する
 * @param {string} dirPath - 解析対象のディレクトリパス
 * @returns {Promise<DependencyNode[]>} 依存関係ノードの配列
 */
export async function analyze(dirPath: string): Promise<DependencyNode[]> {
  console.log('Starting dependency analysis...');
  console.log(`Directory: ${dirPath}`);
  console.log(`Project root: ${process.cwd()}`);

  const nodes: Map<string, DependencyNode> = new Map();
  const projectRoot = process.cwd();

  /**
   * ASTからノードの種類を判定する
   * @param {TSESTree.Program} ast - 解析対象のAST
   * @param {string} filePath - ファイルパス
   * @returns {NodeType[]} 判定されたノードの種類の配列
   */
  function determineNodeType(ast: TSESTree.Program, filePath: string): NodeType[] {
    const types: NodeType[] = [];
    const relativePath = relative(projectRoot, filePath);

    // コンテキストの判定
    if (relativePath.includes('/contexts/')) {
      types.push('context');
      return types;
    }

    // ASTを走査して型を判定
    ast.body.forEach(node => {
      if (node.type === 'ExportDefaultDeclaration' || node.type === 'ExportNamedDeclaration') {
        const declaration = node.declaration;
        if (declaration) {
          // クラスの判定
          if (declaration.type === 'ClassDeclaration') {
            types.push('class');
          }
          // 関数の判定
          else if (declaration.type === 'FunctionDeclaration') {
            // JSXを返す関数はコンポーネント
            let isComponent = false;
            traverseFunction(declaration, () => {
              isComponent = true;
            });
            types.push(isComponent ? 'component' : 'function');
          }
          // アロー関数の判定
          else if (declaration.type === 'VariableDeclaration') {
            declaration.declarations.forEach(d => {
              if (d.init?.type === 'ArrowFunctionExpression') {
                let isComponent = false;
                traverseFunction(d.init, () => {
                  isComponent = true;
                });
                types.push(isComponent ? 'component' : 'function');
              }
            });
          }
        }
      }
    });

    return types.length > 0 ? types : ['other'];
  }

  /**
   * JSXElementを検索する補助関数
   * @param {TSESTree.Node} node - 検索対象のノード
   * @param {() => void} onJSXFound - JSX要素発見時のコールバック
   */
  function traverseFunction(node: TSESTree.Node, onJSXFound: () => void) {
    if (!node) return;

    if (node.type === 'JSXElement' || node.type === 'JSXFragment') {
      onJSXFound();
      return;
    }
    (Object.keys(node) as Array<keyof typeof node>).forEach(key => {
      const child = node[key];
      if (child && typeof child === 'object') {
        if (Array.isArray(child)) {
          child.forEach(item => {
            if (typeof item === 'object' && 'type' in item) {
              traverseFunction(item, onJSXFound);
            }
          });
        } else if ('type' in child) {
          traverseFunction(child, onJSXFound);
        }
      }
    });
  }

  /**
   * インポートパスを解決する
   * @param {string} importPath - インポートパス
   * @param {string} currentFilePath - 現在のファイルパス
   * @returns {string | null} 解決されたパス
   */
  function resolveImportPath(importPath: string, currentFilePath: string): string | null {
    if (importPath.startsWith('@/')) {
      // @/で始まるパスをsrcディレクトリからの相対パスに変換
      const pathFromSrc = importPath.replace('@/', '');
      const srcPath = resolve(projectRoot, 'src');
      const absolutePath = resolve(srcPath, pathFromSrc);

      // 拡張子の確認
      const extensions = ['.ts', '.tsx', '/index.ts', '/index.tsx'];

      // 拡張子なしで完全一致するかチェック
      if (existsSync(absolutePath)) {
        return absolutePath;
      }

      // 拡張子を付けてチェック
      for (const ext of extensions) {
        const fullPath = absolutePath + ext;
        if (existsSync(fullPath)) {
          return fullPath;
        }
      }

      console.warn(`Could not resolve @/ import path: ${importPath}`);
      return null;
    }

    if (!importPath.startsWith('.')) {
      return null; // 外部パッケージの場合
    }

    // 相対パスの解決（既存のロジック）
    const absolutePath = resolve(dirname(currentFilePath), importPath);
    const extensions = [
      '.ts', '.tsx', '/index.ts', '/index.tsx',
      '.css', '.scss', '.sass', '.less',
    ];

    if (existsSync(absolutePath)) {
      return absolutePath;
    }

    for (const ext of extensions) {
      const fullPath = absolutePath + ext;
      if (existsSync(fullPath)) {
        return fullPath;
      }
    }

    console.warn(`Could not resolve relative import path: ${importPath} from ${currentFilePath}`);
    return null;
  }

  /**
   * ディレクトリ内の全ファイルを取得する
   * @param {string} dir - ディレクトリパス
   * @returns {string[]} ファイルパスの配列
   */
  function getAllFiles(dir: string): string[] {
    const files = readdirSync(dir, { withFileTypes: true });
    let paths: string[] = [];

    for (const file of files) {
      if (file.name.startsWith('.') || file.name === 'node_modules') continue;

      const fullPath = resolve(dir, file.name);
      if (file.isDirectory()) {
        paths = paths.concat(getAllFiles(fullPath));
      } else if (
        file.name.endsWith('.ts') ||
        file.name.endsWith('.tsx') ||
        file.name.endsWith('.css') ||  // CSSファイルを追加
        file.name.endsWith('.scss') ||
        file.name.endsWith('.sass') ||
        file.name.endsWith('.less')
      ) {
        paths.push(fullPath);
      }
    }

    return paths;
  }

  // 第1パス: ノードの作成
  const files = getAllFiles(dirPath);
  for (const filePath of files) {
    try {
      const relativePath = relative(projectRoot, filePath);

      // スタイルファイルの場合は特別処理
      if (filePath.match(/\.(css|scss|sass|less)$/)) {
        const node: DependencyNode = {
          id: relativePath,
          name: filePath.split('/').pop() || '',
          type: 'other',
          dependencies: [],
          filePath: relativePath
        };
        nodes.set(relativePath, node);
        console.log(`Added style file: ${relativePath}`);
        continue;
      }

      // 通常のTypeScript/JavaScriptファイルの処理
      const code = readFileSync(filePath, 'utf-8');
      const ast = parse(code, {
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      });

      const name = filePath.split('/').pop()?.replace(/\.[jt]sx?$/, '') || '';
      const types = determineNodeType(ast, filePath);

      // モジュールの依存関係を解析
      const dependencies: string[] = [];
      const externalDependencies: string[] = [];

      // インポート文の解析
      ast.body.forEach(statement => {
        if (statement.type === AST_NODE_TYPES.ImportDeclaration) {
          const importPath = statement.source.value;
          if (typeof importPath === 'string') {
            if (importPath.startsWith('@/') || importPath.startsWith('.')) {
              const resolvedPath = resolveImportPath(importPath, filePath);
              if (resolvedPath) {
                const relativeResolved = relative(projectRoot, resolvedPath);
                if (!dependencies.includes(relativeResolved)) {
                  dependencies.push(relativeResolved);
                  console.log(`Found internal dependency: ${importPath} -> ${relativeResolved}`);
                }
              }
            } else {
              if (!externalDependencies.includes(importPath)) {
                externalDependencies.push(importPath);
                console.log(`Found external dependency: ${importPath}`);
              }
            }
          }
        }
      });

      const node: DependencyNode = {
        id: relativePath,
        name,
        type: types[0],
        dependencies,
        filePath: relativePath,
        externalDependencies
      };

      nodes.set(relativePath, node); // ファイルパスを相対パスに変更
      console.log(`Analyzing dependencies for ${relativePath}...`);
      if (dependencies.length > 0) {
        console.log(`Dependencies found for ${relativePath}:`, dependencies);
      } else {
        console.log(`No dependencies found for ${relativePath}`);
      }
    } catch (error) {
      console.error(`Error parsing ${filePath}:`, error);
    }
  }

  // 第2パス: 依存関係の解析
  for (const [relativePath, node] of nodes) {
    try {
      // スタイルファイルの場合はスキップ
      if (relativePath.match(/\.(css|scss|sass|less)$/)) {
        continue;
      }

      const fullPath = resolve(projectRoot, relativePath);
      const code = readFileSync(fullPath, 'utf-8');
      const ast = parse(code, {
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      });

      // エクスポートの解析を追加
      ast.body.forEach(statement => {
        if (statement.type === AST_NODE_TYPES.ExportNamedDeclaration ||
            statement.type === AST_NODE_TYPES.ExportAllDeclaration) {
          if (statement.source) {
            const exportPath = statement.source.value;
            if (exportPath.startsWith('.')) {
              const resolvedPath = resolveImportPath(exportPath, fullPath);
              if (resolvedPath) {
                const relativeResolved = relative(projectRoot, resolvedPath);
                if (!node.dependencies.includes(relativeResolved)) {
                  node.dependencies.push(relativeResolved);
                }
              }
            }
          }
        }
      });

      // 動的インポートの処理
      traverseAST(ast, (astNode: TSESTree.Node) => {
        if (astNode.type === AST_NODE_TYPES.ImportExpression) {
          const importSource = astNode.source;
          if (importSource.type === AST_NODE_TYPES.Literal &&
              typeof importSource.value === 'string' &&
              importSource.value.startsWith('.')) {
            const resolvedPath = resolveImportPath(importSource.value, fullPath);
            if (resolvedPath) {
              const relativeResolved = relative(projectRoot, resolvedPath);
              if (!node.dependencies.includes(relativeResolved)) {
                node.dependencies.push(relativeResolved);
              }
            }
          }
        }
      });

    } catch (error) {
      console.error(`Error analyzing dependencies in ${relativePath}:`, error);
    }
  }

  return Array.from(nodes.values());
}

/**
 * ASTを走査する
 * @param {TSESTree.Node} node - 走査対象のノード
 * @param {(node: TSESTree.Node) => void} callback - 各ノードに対するコールバック
 */
function traverseAST(node: TSESTree.Node, callback: (node: TSESTree.Node) => void) {
  callback(node);

  const children = Object.values(node).filter((child): child is TSESTree.Node | TSESTree.Node[] => {
    return child !== null && typeof child === 'object';
  });

  children.forEach(child => {
    if (Array.isArray(child)) {
      child.forEach(item => {
        if (item && typeof item === 'object' && 'type' in item) {
          traverseAST(item, callback);
        }
      });
    } else if ('type' in child) {
      traverseAST(child, callback);
    }
  });
}