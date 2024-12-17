/**
 * @file scripts/generateTranslations.ts
 * @lastModifiedBy 冨永善視
 * @modified 2024年12月17日
 * @version 0.0.2
 * @description 翻訳スクリプト。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
import * as fs from 'node:fs';
import { translate } from '@vitalets/google-translate-api';
import ja from '../src/locales/ja.ts';

async function translateObject(obj: any, targetLang: string): Promise<any> {
  const result: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      try {
        const { text } = await translate(value, { to: targetLang });
        result[key] = text;
        console.log(`✓ 翻訳完了: ${value} -> ${text}`);
      } catch (error) {
        console.error(`✗ 翻訳エラー: ${value}`, error);
        result[key] = value; // エラー時は元の値を使用
      }
      // APIレート制限を考慮して少し待機
      await new Promise(resolve => setTimeout(resolve, 1000));
    } else if (typeof value === 'object') {
      result[key] = await translateObject(value, targetLang);
    }
  }

  return result;
}

async function main() {
  console.log('翻訳を開始します...');
  const en = await translateObject(ja, 'en');

  const outputPath = './src/locales/en.ts';
  const content = `/**
 * @file src/locales/en.ts
 * @lastModifiedBy 冨永善視
 * @modified ${new Date().toLocaleDateString('ja-JP')}
 * @version 0.0.2
 * @description 英語の辞書ファイル。
 * @copyright © 2024 株式会社エルブズ. All rights reserved.
 */
export default ${JSON.stringify(en, null, 2)} as const;`;

  fs.writeFileSync(outputPath, content);
  console.log(`✓ 翻訳ファイルを生成しました: ${outputPath}`);
}

main().catch(console.error);