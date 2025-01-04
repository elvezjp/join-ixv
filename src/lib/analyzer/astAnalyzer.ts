import { parse } from '@typescript-eslint/parser';
import { readFileSync, readdirSync } from 'fs';
import { resolve, relative, dirname } from 'path';
import { TSESTree } from '@typescript-eslint/types';
import { existsSync } from 'fs';

export type NodeType = 'component' | 'context' | 'class' | 'function' | 'other';

export interface DependencyNode {
  id: string;
  name: string;
  type: NodeType;
  dependencies: string[];
  filePath: string;
}

export interface FileAnalysis {
  node: DependencyNode;
  exports: {
    name: string;
    type: NodeType;
  }[];
}

export async function analyze(dirPath: string): Promise<DependencyNode[]> {
  const nodes: Map<string, DependencyNode> = new Map();
  const projectRoot = process.cwd();

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
  // JSXElementを検索する補助関数
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

  // 相対パスを解決
  function resolveImportPath(importPath: string, currentFilePath: string): string | null {
    if (!importPath.startsWith('.')) return null;

    const absolutePath = resolve(dirname(currentFilePath), importPath);
    const extensions = ['.tsx', '.ts', '/index.tsx', '/index.ts'];


    for (const ext of extensions) {
      const fullPath = absolutePath + ext;
      if (existsSync(fullPath)) {
        return fullPath;
      }
    }
    return null;
  }

  // ファイル探索
  function getAllFiles(dir: string): string[] {
    const files = readdirSync(dir, { withFileTypes: true });
    let paths: string[] = [];

    for (const file of files) {
      const fullPath = resolve(dir, file.name);
      if (file.isDirectory()) {
        paths = paths.concat(getAllFiles(fullPath));
      } else if (file.name.endsWith('.tsx') || file.name.endsWith('.ts')) {
        paths.push(fullPath);
      }
    }

    return paths;
  }

  // 第1パス: ノードの作成
  const files = getAllFiles(dirPath);
  for (const filePath of files) {
    try {
      const code = readFileSync(filePath, 'utf-8');
      const ast = parse(code, {
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      });

      const name = filePath.split('/').pop()?.replace(/\.[jt]sx?$/, '') || '';
      const types = determineNodeType(ast, filePath);
      const relativePath = relative(projectRoot, filePath);

      const node: DependencyNode = {
        id: relativePath,
        name,
        type: types[0],
        dependencies: [],
        filePath: relativePath
      };

      nodes.set(filePath, node);
      console.log(`Analyzed ${name} as ${types.join(', ')}`);
    } catch (error) {
      console.error(`Error parsing ${filePath}:`, error);
    }
  }

  // 第2パス: 依存関係の解析
  for (const [filePath, node] of nodes) {
    try {
      const code = readFileSync(filePath, 'utf-8');
      const ast = parse(code, {
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      });

      const importPaths = ast.body
        .filter((n): n is TSESTree.ImportDeclaration => n.type === 'ImportDeclaration')
        .map(n => n.source.value)
        .filter(path => path.startsWith('.'));

      for (const importPath of importPaths) {
        const resolvedPath = resolveImportPath(importPath, filePath);
        if (resolvedPath && nodes.has(resolvedPath)) {
          node.dependencies.push(relative(projectRoot, resolvedPath));
        }
      }
    } catch (error) {
      console.error(`Error analyzing dependencies in ${filePath}:`, error);
    }
  }

  return Array.from(nodes.values());
}