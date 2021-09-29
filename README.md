# URLshortening
Backend of url shortening.
Frontend at [url-shorten-web](https://github.com/godhand4826/url-shorten-web)

## Environment
- node 16.3.0
- npm 7.15.1

## How to run
```bash
npm ci # install dependency 
docker-compose up -d # start mysql and redis
npm run migration:run # migrate schema
npm start # build and run
```

## API
> all parameter and responses are json

|method|path|auth| feature |
|--|--|--|--|
|POST| /register | false | create user with given name and password|
|POST| /login | false| login with given name and password
|POST| /logout | false | logout current user
|GET| /me | true| get current user info|
|GET| /link |true| get current user's links|
|POST| /link | true| create a shorten link|
|GET| /r/:shorten | false| redirect to origin url|

## 必要需求
- [x] 專案需要使用 Git 管理專案，並公開至 GitHub
- [x] Git commit 訊息需符合 Conventional Commits，並使用英文撰寫
- [x] 專案須包含 README.md，其中描述專案的安裝、建置、使用，包含的功能與操作方式
- [x] 前端使用 React.js 16 以上實作整個頁面與元件
- [x] 後端使用 Node.js 14 以上
- [x] 使用者可以填入一段網址，會產生一段短網址
- [x] 使用者可以瀏覽短網址，服務會將短網址重新導向到原始網址

## 專案需符合以下至少兩項需求
- [x] 使用 TypeScript 4.3 以上實作
- [x] 後端使用任一套 ORM 搭配任一套 RDBMS
- [x] 整個 React App 使用 Functional Component
- [x] 使用套件檢查程式碼風格 (例如：JavaScript Standard、ESLint)
- [ ] 專案需要能被公開瀏覽使用 (例如使用 Heroku)
- [x] 單元測試
- [ ] E2E 測試
- [x] 開發時全程使用 TDD
- [ ] 整合 CI/CD 流程
## 需挑選以下至少兩項功能實作
- [x] 需要驗證網址有效
- [x] 使用者可以使用密碼註冊、登入、登出
- [x] 使用者可以新增、建立、<del>更新、刪除</del>多個短網址
- [ ] 短網址重新導向的過程使用快取 (可暫時避免向資料庫查詢)
- [ ] 使用者可以知道短網址瀏覽次數
- [ ] 服務會避免短網址重複重導向到相同網址
- [ ] 從短網址拿到原始網址的 Open Graph Metadata （標題、描述、圖片）
- [ ] 使用者可以自訂 Open Graph Metadata（標題、描述、圖片）