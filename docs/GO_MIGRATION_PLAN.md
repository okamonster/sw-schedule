# Go バックエンド移行計画

## 概要

本ドキュメントは、現在のNode.js（Hono）バックエンドをGoに段階的に移行するための計画をまとめたものです。

### 新バックエンドの技術スタック

| 項目 | 技術 |
|------|------|
| 言語 | Go 1.23+ |
| API | gRPC + gRPC-Gateway（REST互換） |
| ORM | SQLBoiler（スキーマファースト） |
| DB | PostgreSQL (Supabase) |
| 認証 | JWT |
| Proto管理 | Buf |

---

## 現在のバックエンド構成

| 項目 | 技術 |
|------|------|
| フレームワーク | Hono (Node.js) |
| ORM | Prisma |
| DB | PostgreSQL (Supabase) |
| 認証 | JWT |
| メール | Resend |
| 画像処理 | Sharp |
| ポート | 8080 |

### 現在のAPIエンドポイント

#### `/auth` - 認証
| メソッド | パス | 説明 | 認証 |
|---------|------|------|------|
| POST | `/login` | ログイン | 不要 |
| POST | `/signup` | 新規登録 | 不要 |
| POST | `/google` | Googleログイン | 不要 |
| DELETE | `/withdraw` | 退会 | 必要 |
| POST | `/varificate-token` | 認証トークン発行 | 不要 |
| POST | `/varification-token/verify` | トークン検証 | 不要 |

#### `/user` - ユーザー
| メソッド | パス | 説明 | 認証 |
|---------|------|------|------|
| GET | `/me` | 自分の情報取得 | 必要 |
| POST | `/profile` | プロフィール作成 | 必要 |
| PUT | `/profile` | プロフィール更新 | 必要 |

#### `/artist` - アーティスト
| メソッド | パス | 説明 | 認証 |
|---------|------|------|------|
| POST | `/` | アーティスト作成 | 必要 |
| GET | `/list` | アーティスト一覧取得 | 不要 |
| POST | `/list` | 指定IDのアーティスト取得 | 不要 |
| GET | `/search` | アーティスト検索 | 不要 |
| GET | `/following-artists` | フォロー中アーティスト取得 | 必要 |
| GET | `/:id` | アーティスト詳細取得 | 不要 |
| PUT | `/:id` | アーティスト更新 | 必要 |
| GET | `/:id/follow` | フォロー状態取得 | 必要 |
| POST | `/:id/follow` | フォロー | 必要 |
| DELETE | `/:id/follow` | フォロー解除 | 必要 |
| POST | `/:id/events` | アーティストイベント登録 | 必要 |

#### `/event` - イベント
| メソッド | パス | 説明 | 認証 |
|---------|------|------|------|
| POST | `/` | イベント作成 | 不要 |
| GET | `/today` | 今日のイベント取得 | 不要 |
| GET | `/upcoming` | 今月のイベント取得 | 不要 |
| GET | `/search` | イベント検索 | 不要 |
| GET | `/following-artists-events` | フォロー中アーティストのイベント | 必要 |
| GET | `/:id` | イベント詳細取得 | 不要 |
| PUT | `/:id` | イベント更新 | 必要 |

---

## Goプロジェクト構造

```
apps/backend-go/
├── cmd/
│   └── server/
│       └── main.go                     # エントリーポイント
├── api/
│   └── proto/                          # Protocol Buffers定義
│       ├── auth/
│       │   └── v1/
│       │       └── auth.proto
│       ├── artist/
│       │   └── v1/
│       │       └── artist.proto
│       ├── event/
│       │   └── v1/
│       │       └── event.proto
│       └── user/
│           └── v1/
│               └── user.proto
├── gen/                                # 自動生成コード
│   └── proto/
│       ├── auth/
│       │   └── v1/
│       │       ├── auth.pb.go
│       │       ├── auth_grpc.pb.go
│       │       └── auth.pb.gw.go       # gRPC-Gateway
│       ├── artist/
│       │   └── v1/
│       │       └── ...
│       ├── event/
│       │   └── v1/
│       │       └── ...
│       └── user/
│           └── v1/
│               └── ...
├── internal/
│   ├── config/
│   │   └── config.go                   # 環境変数・設定管理
│   ├── database/
│   │   └── postgres.go                 # DB接続
│   ├── models/                         # SQLBoiler自動生成コード
│   │   ├── artists.go
│   │   ├── events.go
│   │   ├── users.go
│   │   ├── user_profiles.go
│   │   ├── artist_events.go
│   │   ├── user_artist_follows.go
│   │   ├── verification_tokens.go
│   │   ├── user_plan_histories.go
│   │   ├── user_payments.go
│   │   ├── deleted_users.go
│   │   └── boil_*.go
│   ├── server/                         # gRPCサーバー実装
│   │   ├── auth_server.go
│   │   ├── artist_server.go
│   │   ├── event_server.go
│   │   └── user_server.go
│   ├── repository/                     # リポジトリ層
│   │   ├── artist.go
│   │   ├── artist_event.go
│   │   ├── event.go
│   │   ├── user.go
│   │   ├── user_artist_follow.go
│   │   └── verification_token.go
│   └── service/                        # 外部サービス連携
│       ├── email.go                    # Resend
│       ├── ogp.go                      # OGP画像生成
│       └── storage.go                  # Supabase Storage
├── pkg/
│   ├── auth/
│   │   ├── jwt.go                      # JWT生成・検証
│   │   └── password.go                 # パスワードハッシュ（bcrypt）
│   └── interceptor/                    # gRPCインターセプター
│       ├── auth.go                     # 認証インターセプター
│       ├── logging.go                  # ロギング
│       ├── recovery.go                 # パニックリカバリー
│       └── ratelimit.go                # レート制限
├── docker/
│   └── Dockerfile
├── .env.example
├── buf.yaml                            # Buf設定
├── buf.gen.yaml                        # Buf生成設定
├── sqlboiler.toml                      # SQLBoiler設定
├── go.mod
├── go.sum
├── Makefile
└── README.md
```

---

## 推奨ライブラリ

| 用途 | ライブラリ | 理由 |
|------|-----------|------|
| gRPC | [grpc-go](https://github.com/grpc/grpc-go) | 公式gRPCライブラリ |
| gRPC-Gateway | [grpc-gateway](https://github.com/grpc-ecosystem/grpc-gateway) | REST API互換レイヤー |
| Protocol Buffers | [protoc-gen-go](https://pkg.go.dev/google.golang.org/protobuf) | .protoからGoコード生成 |
| Proto管理 | [Buf](https://buf.build/) | モダンなproto管理・リント・生成 |
| ORM | [SQLBoiler](https://github.com/volatiletech/sqlboiler) | DBスキーマから型安全なコード生成 |
| バリデーション | [protovalidate-go](https://github.com/bufbuild/protovalidate-go) | protoベースのバリデーション |
| JWT | [golang-jwt/jwt](https://github.com/golang-jwt/jwt) | 標準的なJWT実装 |
| 環境変数 | [godotenv](https://github.com/joho/godotenv) | .envファイル読み込み |
| UUID | [google/uuid](https://github.com/google/uuid) | UUID生成 |
| 画像処理 | [disintegration/imaging](https://github.com/disintegration/imaging) | Sharpの代替 |
| HTTP Client | 標準ライブラリ `net/http` | 十分な機能 |

---

## gRPC + SQLBoiler の利点

### SQLBoiler
- **スキーマファースト**: 既存のDBスキーマからGoコードを自動生成
- **型安全**: コンパイル時にクエリエラーを検出
- **高性能**: リフレクション不使用、生成コードは最適化済み
- **Prismaとの親和性**: 既存のDBスキーマをそのまま活用可能
- **Eager Loading**: N+1問題を回避するリレーション読み込み

### gRPC
- **高速**: HTTP/2 + Protocol Buffers によるバイナリ通信
- **型安全**: `.proto` ファイルからクライアント/サーバーコードを自動生成
- **ストリーミング対応**: 双方向ストリーミングが可能
- **マイクロサービス向き**: 将来的なサービス分割が容易
- **エコシステム**: 豊富なインターセプター、ミドルウェア

---

## フロントエンド連携アーキテクチャ

gRPCはブラウザから直接呼び出せないため、gRPC-Gatewayを使用してREST APIを提供します。

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           システムアーキテクチャ                               │
└─────────────────────────────────────────────────────────────────────────────┘

                         ┌─────────────────────────────────────┐
                         │          Go Backend                 │
                         │                                     │
┌─────────────┐          │  ┌─────────────┐   ┌─────────────┐ │
│  Frontend   │  HTTP    │  │   gRPC      │   │   gRPC      │ │
│  (Next.js)  │ ◄──────► │  │  Gateway    │ ◄─►│   Server    │ │
│             │  JSON    │  │  :8081      │   │             │ │
└─────────────┘          │  │  (REST)     │   │             │ │
                         │  └─────────────┘   └──────┬──────┘ │
                         │                           │        │
                         │                    ┌──────▼──────┐ │
                         │                    │  SQLBoiler  │ │
                         │                    │  (Models)   │ │
                         │                    └──────┬──────┘ │
                         └───────────────────────────┼────────┘
                                                     │
                                              ┌──────▼──────┐
                                              │ PostgreSQL  │
                                              │ (Supabase)  │
                                              └─────────────┘
```

### gRPC-Gateway の利点
- 既存のREST APIクライアントとの互換性
- `.proto` ファイルから自動でREST APIを生成
- OpenAPI (Swagger) ドキュメントの自動生成
- 追加のコード実装不要

---

## Proto ファイル例

### `api/proto/event/v1/event.proto`

```protobuf
syntax = "proto3";

package event.v1;

option go_package = "github.com/your-org/sw-live-schedule/gen/proto/event/v1;eventv1";

import "google/api/annotations.proto";
import "google/protobuf/timestamp.proto";

// イベントサービス
service EventService {
  // イベント取得
  rpc GetEvent(GetEventRequest) returns (GetEventResponse) {
    option (google.api.http) = {
      get: "/v1/event/{id}"
    };
  }

  // 今日のイベント一覧
  rpc ListTodayEvents(ListTodayEventsRequest) returns (ListEventsResponse) {
    option (google.api.http) = {
      get: "/v1/event/today"
    };
  }

  // 今月のイベント一覧
  rpc ListUpcomingEvents(ListUpcomingEventsRequest) returns (ListEventsResponse) {
    option (google.api.http) = {
      get: "/v1/event/upcoming"
    };
  }

  // イベント検索
  rpc SearchEvents(SearchEventsRequest) returns (ListEventsResponse) {
    option (google.api.http) = {
      get: "/v1/event/search"
    };
  }

  // イベント作成
  rpc CreateEvent(CreateEventRequest) returns (CreateEventResponse) {
    option (google.api.http) = {
      post: "/v1/event"
      body: "*"
    };
  }

  // イベント更新
  rpc UpdateEvent(UpdateEventRequest) returns (UpdateEventResponse) {
    option (google.api.http) = {
      put: "/v1/event/{id}"
      body: "*"
    };
  }

  // フォロー中アーティストのイベント
  rpc ListFollowingArtistsEvents(ListFollowingArtistsEventsRequest) returns (ListEventsResponse) {
    option (google.api.http) = {
      get: "/v1/event/following-artists-events"
    };
  }
}

// イベントメッセージ
message Event {
  string id = 1;
  string event_name = 2;
  string event_description = 3;
  string event_image_url = 4;
  string ogp_image_url = 5;
  google.protobuf.Timestamp event_date = 6;
  google.protobuf.Timestamp open_date_time = 7;
  google.protobuf.Timestamp start_date_time = 8;
  string locate_prefecture = 9;
  string event_location_name = 10;
  string event_location_address = 11;
  optional google.protobuf.Timestamp ticket_release_date_time = 12;
  int32 ticket_price = 13;
  int32 same_day_ticket_price = 14;
  string ticket_url = 15;
  bool is_need_drink = 16;
  string drink_option = 17;
  repeated Artist artists = 18;
  google.protobuf.Timestamp created_at = 19;
  google.protobuf.Timestamp updated_at = 20;
}

// アーティスト（イベント内で使用）
message Artist {
  string id = 1;
  string artist_name = 2;
  string artist_image_url = 3;
  string genre = 4;
  string region = 5;
}

// リクエスト/レスポンス
message GetEventRequest {
  string id = 1;
}

message GetEventResponse {
  Event event = 1;
}

message ListTodayEventsRequest {}

message ListUpcomingEventsRequest {}

message SearchEventsRequest {
  optional string keyword = 1;
  optional string prefecture = 2;
  optional string date_from = 3;
  optional string date_to = 4;
}

message ListEventsResponse {
  repeated Event events = 1;
}

message CreateEventRequest {
  string event_name = 1;
  string event_description = 2;
  string event_image_url = 3;
  google.protobuf.Timestamp event_date = 4;
  google.protobuf.Timestamp open_date_time = 5;
  google.protobuf.Timestamp start_date_time = 6;
  string locate_prefecture = 7;
  string event_location_name = 8;
  string event_location_address = 9;
  optional google.protobuf.Timestamp ticket_release_date_time = 10;
  int32 ticket_price = 11;
  int32 same_day_ticket_price = 12;
  string ticket_url = 13;
  bool is_need_drink = 14;
  string drink_option = 15;
}

message CreateEventResponse {
  Event event = 1;
}

message UpdateEventRequest {
  string id = 1;
  string event_name = 2;
  string event_description = 3;
  string event_image_url = 4;
  google.protobuf.Timestamp event_date = 5;
  google.protobuf.Timestamp open_date_time = 6;
  google.protobuf.Timestamp start_date_time = 7;
  string locate_prefecture = 8;
  string event_location_name = 9;
  string event_location_address = 10;
  optional google.protobuf.Timestamp ticket_release_date_time = 11;
  int32 ticket_price = 12;
  int32 same_day_ticket_price = 13;
  string ticket_url = 14;
  bool is_need_drink = 15;
  string drink_option = 16;
}

message UpdateEventResponse {
  Event event = 1;
}

message ListFollowingArtistsEventsRequest {}
```

### `api/proto/auth/v1/auth.proto`

```protobuf
syntax = "proto3";

package auth.v1;

option go_package = "github.com/your-org/sw-live-schedule/gen/proto/auth/v1;authv1";

import "google/api/annotations.proto";

// 認証サービス
service AuthService {
  // ログイン
  rpc Login(LoginRequest) returns (LoginResponse) {
    option (google.api.http) = {
      post: "/v1/auth/login"
      body: "*"
    };
  }

  // 新規登録
  rpc Signup(SignupRequest) returns (SignupResponse) {
    option (google.api.http) = {
      post: "/v1/auth/signup"
      body: "*"
    };
  }

  // Googleログイン
  rpc GoogleLogin(GoogleLoginRequest) returns (LoginResponse) {
    option (google.api.http) = {
      post: "/v1/auth/google"
      body: "*"
    };
  }

  // 退会
  rpc Withdraw(WithdrawRequest) returns (WithdrawResponse) {
    option (google.api.http) = {
      delete: "/v1/auth/withdraw"
    };
  }

  // 認証トークン発行
  rpc CreateVerificationToken(CreateVerificationTokenRequest) returns (CreateVerificationTokenResponse) {
    option (google.api.http) = {
      post: "/v1/auth/varificate-token"
      body: "*"
    };
  }

  // トークン検証
  rpc VerifyToken(VerifyTokenRequest) returns (VerifyTokenResponse) {
    option (google.api.http) = {
      post: "/v1/auth/varification-token/verify"
      body: "*"
    };
  }
}

message LoginRequest {
  string email = 1;
  string password = 2;
}

message LoginResponse {
  string user_id = 1;
  string token = 2;
}

message SignupRequest {
  string email = 1;
  string password = 2;
}

message SignupResponse {
  string message = 1;
}

message GoogleLoginRequest {
  string email = 1;
  string google_token = 2;
}

message WithdrawRequest {}

message WithdrawResponse {
  string message = 1;
}

message CreateVerificationTokenRequest {
  string email = 1;
}

message CreateVerificationTokenResponse {
  string token = 1;
}

message VerifyTokenRequest {
  string email = 1;
  string token = 2;
}

message VerifyTokenResponse {
  string message = 1;
}
```

---

## 設定ファイル

### `buf.yaml`

```yaml
version: v2
modules:
  - path: api/proto
deps:
  - buf.build/googleapis/googleapis
  - buf.build/grpc-ecosystem/grpc-gateway
lint:
  use:
    - DEFAULT
breaking:
  use:
    - FILE
```

### `buf.gen.yaml`

```yaml
version: v2
managed:
  enabled: true
  override:
    - file_option: go_package_prefix
      value: github.com/your-org/sw-live-schedule/gen/proto
plugins:
  # Go protobuf
  - remote: buf.build/protocolbuffers/go
    out: gen/proto
    opt:
      - paths=source_relative
  # Go gRPC
  - remote: buf.build/grpc/go
    out: gen/proto
    opt:
      - paths=source_relative
  # gRPC-Gateway
  - remote: buf.build/grpc-ecosystem/gateway
    out: gen/proto
    opt:
      - paths=source_relative
  # OpenAPI (Swagger)
  - remote: buf.build/grpc-ecosystem/openapiv2
    out: gen/openapi
```

### `sqlboiler.toml`

```toml
[psql]
  dbname = "your_db_name"
  host   = "localhost"
  port   = 5432
  user   = "your_user"
  pass   = "your_password"
  sslmode = "disable"

[psql.whitelist]
  tables = [
    "users",
    "user_profiles",
    "artists",
    "artist_users",
    "events",
    "artist_events",
    "user_artist_follows",
    "verification_tokens",
    "user_plan_histories",
    "user_payments",
    "deleted_users"
  ]

output   = "internal/models"
pkgname  = "models"
wipe     = true
no-tests = false
add-global-variants = true
add-panic-variants = false
```

---

## 段階的移行計画

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           段階的移行フロー                                    │
└─────────────────────────────────────────────────────────────────────────────┘

 Phase 1                    Phase 2                    Phase 3
 基盤構築 (1-2週)            並行稼働 (2-4週)            完全移行 (1週)
┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
│ backend-go/     │        │   Frontend      │        │ backend-go/     │
│ ・プロジェクト作成│        │       │         │        │ (全API)         │
│ ・gRPC基盤      │   →    │  ┌────┴────┐    │   →    │                 │
│ ・SQLBoiler設定 │        │  │         │    │        │ backend/        │
│ ・Read系API     │        │ :8080   :8081   │        │ (削除)          │
│                 │        │ Node.js   Go    │        │                 │
└─────────────────┘        └─────────────────┘        └─────────────────┘
```

### Phase 1: 基盤構築（1-2週間）

#### 目標
- Goプロジェクトの初期セットアップ
- gRPC + gRPC-Gateway基盤の構築
- SQLBoilerによるモデル生成
- 簡単なRead系エンドポイントの移行

#### タスク
- [ ] Goプロジェクト初期化（`go mod init`）
- [ ] ディレクトリ構造の作成
- [ ] Buf設定（`buf.yaml`, `buf.gen.yaml`）
- [ ] SQLBoiler設定（`sqlboiler.toml`）
- [ ] 設定管理の実装（config）
- [ ] PostgreSQL接続の実装
- [ ] SQLBoilerでモデル生成
- [ ] 基本インターセプター（Logging, Recovery）
- [ ] gRPC-Gateway設定
- [ ] EventService protoファイル作成
- [ ] ArtistService protoファイル作成
- [ ] 以下のRPC実装:
  - [ ] `EventService.GetEvent`
  - [ ] `EventService.ListTodayEvents`
  - [ ] `EventService.ListUpcomingEvents`
  - [ ] `EventService.SearchEvents`
  - [ ] `ArtistService.GetArtist`
  - [ ] `ArtistService.ListArtists`
  - [ ] `ArtistService.SearchArtists`

#### 成果物
- 動作するGoバックエンド（gRPC-Gateway ポート8081）
- Read系APIの動作確認
- OpenAPIドキュメント自動生成

---

### Phase 2: 並行稼働（2-4週間）

#### 目標
- 認証系・Write系エンドポイントの移行
- フロントエンドでの切り替えテスト
- 本番環境での並行稼働

#### タスク

##### Week 1-2: 認証・ユーザー系
- [ ] 認証インターセプター実装
- [ ] パスワードハッシュ（bcrypt）実装
- [ ] JWT生成・検証の実装
- [ ] レート制限インターセプター
- [ ] AuthService protoファイル作成
- [ ] UserService protoファイル作成
- [ ] 以下のRPC実装:
  - [ ] `AuthService.Login`
  - [ ] `AuthService.Signup`
  - [ ] `AuthService.GoogleLogin`
  - [ ] `AuthService.Withdraw`
  - [ ] `AuthService.CreateVerificationToken`
  - [ ] `AuthService.VerifyToken`
  - [ ] `UserService.GetMe`
  - [ ] `UserService.CreateProfile`
  - [ ] `UserService.UpdateProfile`

##### Week 3-4: アーティスト・イベント系
- [ ] OGP画像生成サービス
- [ ] Supabaseストレージ連携
- [ ] Resendメール送信
- [ ] 以下のRPC実装:
  - [ ] `ArtistService.CreateArtist`
  - [ ] `ArtistService.UpdateArtist`
  - [ ] `ArtistService.ListFollowingArtists`
  - [ ] `ArtistService.GetFollowStatus`
  - [ ] `ArtistService.FollowArtist`
  - [ ] `ArtistService.UnfollowArtist`
  - [ ] `ArtistService.AddArtistEvents`
  - [ ] `EventService.CreateEvent`
  - [ ] `EventService.UpdateEvent`
  - [ ] `EventService.ListFollowingArtistsEvents`

#### 成果物
- 全RPCの実装完了
- フロントエンドでの動作確認
- 本番環境での並行稼働開始

---

### Phase 3: 完全移行（1週間）

#### 目標
- Node.jsバックエンドの廃止
- Goバックエンドへの完全切り替え

#### タスク
- [ ] 全RPCの最終テスト
- [ ] パフォーマンステスト
- [ ] フロントエンドのAPI URLをGoバックエンドに切り替え
- [ ] Node.jsバックエンドの停止
- [ ] `apps/backend/`の削除またはアーカイブ
- [ ] CI/CDパイプラインの更新
- [ ] Terraformの更新（Cloud Run設定）
- [ ] ドキュメントの更新

#### 成果物
- Goバックエンドのみでの稼働
- 移行完了

---

## データベーススキーマ

Prismaスキーマ → SQLBoiler生成モデル対応表:

| Prismaモデル | SQLBoilerモデル | テーブル名 |
|-------------|-----------------|-----------|
| User | `models.User` | `users` |
| DeletedUser | `models.DeletedUser` | `deleted_users` |
| UserProfile | `models.UserProfile` | `user_profiles` |
| Artist | `models.Artist` | `artists` |
| ArtistUser | `models.ArtistUser` | `artist_users` |
| Event | `models.Event` | `events` |
| UserArtistFollow | `models.UserArtistFollow` | `user_artist_follows` |
| ArtistEvent | `models.ArtistEvent` | `artist_events` |
| VerificationToken | `models.VerificationToken` | `verification_tokens` |
| UserPlanHistory | `models.UserPlanHistory` | `user_plan_histories` |
| UserPayment | `models.UserPayment` | `user_payments` |

---

## 環境変数

```env
# サーバー設定
GRPC_PORT=50051
HTTP_PORT=8081

# データベース
DATABASE_URL=postgres://user:password@host:5432/dbname?sslmode=require

# JWT
JWT_SECRET=your-jwt-secret

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your-supabase-key

# Resend
RESEND_API_KEY=your-resend-api-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
```

---

## Docker設定

### Dockerfile

```dockerfile
# Build stage
FROM golang:1.23-alpine AS builder

WORKDIR /app

# 依存関係のコピーとダウンロード
COPY go.mod go.sum ./
RUN go mod download

# ソースコードのコピーとビルド
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /server ./cmd/server

# Run stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates tzdata

WORKDIR /app

COPY --from=builder /server .

# gRPC-Gateway (HTTP)
EXPOSE 8081
# gRPC
EXPOSE 50051

CMD ["./server"]
```

---

## Makefile

```makefile
.PHONY: dev build test lint proto sqlboiler docker-build docker-run

# 開発サーバー起動
dev:
	go run cmd/server/main.go

# ビルド
build:
	go build -o bin/server cmd/server/main.go

# テスト
test:
	go test -v ./...

# リント
lint:
	golangci-lint run

# Proto生成（Buf使用）
proto:
	buf generate

# Protoリント
proto-lint:
	buf lint

# SQLBoilerでモデル生成
sqlboiler:
	sqlboiler psql

# Proto + SQLBoiler両方生成
generate: proto sqlboiler

# Docker
docker-build:
	docker build -t backend-go -f docker/Dockerfile .

docker-run:
	docker run -p 8081:8081 -p 50051:50051 --env-file .env backend-go

# クリーンアップ
clean:
	rm -rf bin/ gen/
```

---

## gRPCサーバー実装例

### `cmd/server/main.go`

```go
package main

import (
	"context"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"github.com/joho/godotenv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"github.com/your-org/sw-live-schedule/gen/proto/auth/v1"
	"github.com/your-org/sw-live-schedule/gen/proto/event/v1"
	"github.com/your-org/sw-live-schedule/internal/config"
	"github.com/your-org/sw-live-schedule/internal/database"
	"github.com/your-org/sw-live-schedule/internal/server"
	"github.com/your-org/sw-live-schedule/pkg/interceptor"
)

func main() {
	// 環境変数読み込み
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	cfg := config.Load()

	// DB接続
	db, err := database.Connect(cfg.DatabaseURL)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// gRPCサーバー
	grpcServer := grpc.NewServer(
		grpc.ChainUnaryInterceptor(
			interceptor.Recovery(),
			interceptor.Logging(),
			interceptor.RateLimit(),
		),
	)

	// サービス登録
	eventv1.RegisterEventServiceServer(grpcServer, server.NewEventServer(db))
	authv1.RegisterAuthServiceServer(grpcServer, server.NewAuthServer(db, cfg))
	// ... 他のサービス

	// gRPCサーバー起動
	go func() {
		lis, err := net.Listen("tcp", ":"+cfg.GRPCPort)
		if err != nil {
			log.Fatal("Failed to listen:", err)
		}
		log.Printf("gRPC server listening on :%s", cfg.GRPCPort)
		if err := grpcServer.Serve(lis); err != nil {
			log.Fatal("Failed to serve:", err)
		}
	}()

	// gRPC-Gateway (HTTP)
	ctx := context.Background()
	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}

	if err := eventv1.RegisterEventServiceHandlerFromEndpoint(ctx, mux, "localhost:"+cfg.GRPCPort, opts); err != nil {
		log.Fatal("Failed to register gateway:", err)
	}
	if err := authv1.RegisterAuthServiceHandlerFromEndpoint(ctx, mux, "localhost:"+cfg.GRPCPort, opts); err != nil {
		log.Fatal("Failed to register gateway:", err)
	}

	httpServer := &http.Server{
		Addr:    ":" + cfg.HTTPPort,
		Handler: corsMiddleware(mux),
	}

	go func() {
		log.Printf("HTTP server listening on :%s", cfg.HTTPPort)
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Failed to serve HTTP:", err)
		}
	}()

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutting down...")
	grpcServer.GracefulStop()
	httpServer.Shutdown(ctx)
}

func corsMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		h.ServeHTTP(w, r)
	})
}
```

---

## フロントエンド対応

移行期間中はAPIのベースURLを環境変数で切り替えられるようにします：

```typescript
// apps/web/src/constants/index.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// 移行後
// NEXT_PUBLIC_API_URL=http://localhost:8081/v1
```

### 注意点
- gRPC-Gatewayは `/v1` プレフィックスでREST APIを提供
- リクエスト/レスポンス形式は既存のREST APIと互換性あり
- 認証ヘッダーは `Authorization: Bearer <token>` で変更なし

---

## リスクと対策

| リスク | 対策 |
|--------|------|
| データ不整合 | 両バックエンドで同じDBを参照、トランザクション管理を徹底 |
| パフォーマンス低下 | 移行前後でベンチマーク比較 |
| 認証の互換性 | 同じJWT秘密鍵を使用、トークン形式を統一 |
| 機能漏れ | RPC一覧でチェック、E2Eテスト整備 |
| ロールバック | Node.jsバックエンドを即座に戻せる状態を維持 |
| Proto互換性 | Bufのbreaking change検出を活用 |

---

## 参考リンク

- [gRPC-Go](https://github.com/grpc/grpc-go)
- [gRPC-Gateway](https://github.com/grpc-ecosystem/grpc-gateway)
- [Buf](https://buf.build/)
- [SQLBoiler](https://github.com/volatiletech/sqlboiler)
- [golang-jwt](https://github.com/golang-jwt/jwt)
- [Go Project Layout](https://github.com/golang-standards/project-layout)
