# Github Pagesは以下を参照してください。
https://elvezjp.github.io/join-ixv/
# Next.js フロントエンド コーディングルール

## ディレクトリ構成

### 基本構造

```text
~/frontend/           # フロントエンドのルートディレクトリ
├── .next/            # Next.jsビルド出力
├── node_modules/     # 依存パッケージ
├── public/           # 静的ファイル
├── src/              # ソースコード
│   ├── app/          # App Router
│   ├── components/   # 共通コンポーネント
│   │   ├── ui/       # 汎用UIコンポーネント
│   │   └── feature/  # 機能コンポーネント
│   ├── hooks/        # カスタムフック
│   ├── types/        # 型定義
│   ├── utils/        # ユーティリティ関数
│   └── styles/       # スタイル定義
├── .env              # 環境変数
├── .gitignore        # Git除外設定
├── package.json      # 依存関係定義
└── tsconfig.json     # TypeScript設定
```

## 命名規則

### ファイル名・ディレクトリ名

- コンポーネントファイル: PascalCase、`.tsx`拡張子
- その他のTypeScriptファイル: camelCase、`.ts`拡張子
- テストファイル: 対象ファイル名に`.test`または`.spec`を付加
- ページコンポーネント: kebab-case（Next.jsのApp Routerに従う）

```typescript
// Good
├── components/
│   ├── UserProfile.tsx
│   └── feature/
│       └── AuthForm.tsx
├── hooks/
│   └── useAuthentication.ts
├── my-page/
│   └── page.tsx

// Bad
├── components/
│   ├── userProfile.tsx
│   └── Feature/
│       └── auth-form.tsx
```

### コンポーネント名

- PascalCaseを使用
- 説明的で具体的な名前を使用
- 役割や機能を名前に反映

```typescript
// Good
export const UserProfileCard = () => { ... }
export const AuthenticationForm = () => { ... }

// Bad
export const Profile = () => { ... }      // 具体性に欠ける
export const userForm = () => { ... }     // キャメルケース
```

### フック名

- useプレフィックスを使用
- camelCaseを使用
- 機能を明確に表現

```typescript
// Good
const useUserAuthentication = () => { ... }
const useLocalStorage = () => { ... }

// Bad
const UserAuth = () => { ... }           // useプレフィックスなし
const use_local_storage = () => { ... }  // スネークケース
```

### 変数名・関数名

- camelCaseを使用
- わかりやすく説明的な名前を使用
- ブール値は疑問形または状態を表す

```typescript
// Good
const isAuthenticated = true
const hasPermission = false
const handleSubmit = () => { ... }

// Bad
const authenticated = true      // 動詞/形容詞が不明確
const Handle_Submit = () => { ... }  // パスカルケース
```

### 型・インターフェース名

- PascalCaseを使用
- 名詞または名詞句を使用
- インターフェースには'I'プレフィックスを付けない

```typescript
// Good
type UserData = {
  id: string
  name: string
}

interface AuthenticationResponse {
  token: string
  user: UserData
}

// Bad
type userData = { ... }  // キャメルケース
interface IUserData { ... }  // 不要な'I'プレフィックス
```

### 定数名

- SCREAMING_SNAKE_CASEを使用
- 関連する定数はオブジェクトにグループ化

```typescript
// Good
const API_ENDPOINTS = {
  AUTH: '/api/auth',
  USERS: '/api/users'
} as const

const MAX_RETRY_COUNT = 3

// Bad
const apiEndpoints = { ... }  // キャメルケース
const MaxRetryCount = 3      // パスカルケース
```

## バージョン管理規則

### バージョン番号

- プロジェクト全体で一意のバージョン番号を使用
- セマンティックバージョニングを使用（ `{major}.{minor}.{patch}` 形式）
  - major: 破壊的な変更
  - minor: 後方互換性のある機能追加
  - patch: バグ修正・軽微な変更

### CHANGELOG

- 変更履歴を CHANGELOG.md に記録する
- バージョン番号 + 日付
- 変更カテゴリ
  - **追加**: 新機能
  - **変更**: 既存機能の変更
  - **非推奨**: 将来削除される機能
  - **削除**: 削除された機能
  - **修正**: バグ修正
  - **セキュリティ**: 脆弱性対応
- 変更内容の詳細

```markdown
# Changelog

## [1.0.0] - 2024-11-25
### 追加
- ダークモードサポート
- 多言語対応

### 修正
- フォームバリデーションのバグ修正
```

## ドキュメント規則


### ファイルヘッダー

- すべてのTypeScript/TSXファイルの先頭に、下記フォーマットのJSDocコメントを含める
    - **@file**: ルートディレクトリからのファイルパス（拡張子含む）
    - **@lastModifiedBy**: コードを最後に修正した開発者の氏名
    - **@modified**: 最終更新の日付（YYYY年MM月DD日形式）
    - **@version**: フロントエンドのバージョン番号
    - **@description**: ファイルの目的、主要な機能、コンポーネントの説明など
    - **@copyright**: 著作権表示（年は現在の年を使用）

#### 例

```typescript
/**
 * @file src/components/feature/AuthForm.tsx
 * @lastModifiedBy 山田太郎
 * @modified 2024年12月02日
 * @version 1.0.0
 * @description ユーザー認証フォームコンポーネント。
 * ログインと新規登録の両方に対応し、バリデーションとエラーハンドリングを含む。
 * 著作権: © 2024 株式会社エルブズ. All rights reserved.
 */
```

### コンポーネントのドキュメント

- JSDocスタイルのコメントを使用
- props、戻り値、使用例を記述
- コンポーネント名・型定義から自明な情報は含めない

```typescript
/**
 * ユーザープロフィールを表示するカード型コンポーネント
 *
 * @param props.user - 表示するユーザー情報
 * @param props.isEditable - 編集可能かどうか
 * @example
 * ```tsx
 * <UserProfileCard user={userData} isEditable={true} />
 * ```
 */
export const UserProfileCard = ({
  user,
  isEditable
}: UserProfileCardProps) => {
  // ...
}
```

### インラインコメント

- 複雑なロジックの説明に使用
- 要修正箇所には「TODO: 」プレフィックスをつける

```typescript
// Good
// ユーザーの権限レベルに応じて表示を切り替え
const accessLevel = computeAccessLevel(user, resource)

// TODO: 認証ロジックをカスタムフックに移動する
const handleAuth = async () => {
  // ...
}

// Bad
// ユーザー名を設定
const name = user.name  // 自明な処理にコメント
```

## コードフォーマット規則

### インデント

- 4スペースを使用
- タブ文字は使用しない
- コンポーネント内で一貫したインデントを維持

```typescript
// Good
const UserCard = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <h2>User Profile</h2>
      {isOpen && (
        <div>
          Content
        </div>
      )}
    </div>
  )
}

// Bad
const UserCard = () => {
    const [isOpen, setIsOpen] = useState(false)  // 4スペース

  return (
      <div>  // 一貫性のないインデント
    <h2>User Profile</h2>
      </div>
  )
}
```

### 行の長さ

- 最大100文字
- JSX要素は適切に改行
- プロパティは複数行に分割

```typescript
// Good
<Button
  variant="primary"
  onClick={handleClick}
  disabled={isLoading}
>
  Submit
</Button>

// Bad
<Button variant="primary" onClick={handleClick} disabled={isLoading}>Submit</Button>
```

### インポート順序

1. 外部ライブラリ
2. 相対パスによる内部モジュール
3. 型定義
4. スタイル

```typescript
// Good
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { UserProfile } from '@/components/UserProfile'
import { useAuth } from '@/hooks/useAuth'

import type { User } from '@/types'

import styles from './styles.module.css'

// Bad
import styles from './styles.module.css'
import { User } from '@/types'
import { useState, useEffect } from 'react'
```


## 注意事項

- すべての新規ファイルには必ずヘッダーを含めてください
- 既存ファイルを更新する際は、最終更新者と最終更新日を更新してください
- バージョン番号は重要な変更時に更新してください
