# ssafy 🙋❤️

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```



## About Git

### Git init

```
-- 초기 설정
git remote add origin [repository name]

-- 풀 받아오기 (pull 받기 전에 )
(내꺼) git commit -m "메세지"
git checkout dev
(dev) git pull origin dev

-- 내 브랜치 설정하기
git checkout -b [branch name]
```

### Git Push Rule

```
-- 기존 내 브랜치 수정시
1. (내꺼) git push origin [내꺼]

-- 최종 dev 푸시
1. git checkout dev
2. (dev) git merge [내꺼]
3. (dev) git branch -D [내꺼] -- 내 브랜치 삭제
4. (dev) git push origin dev
-- !!dev push 한 후에는 dev pull 받으라고 알려주기!!
5. (dev) git checkout -b [새로운 내꺼] -- 새 기능 브랜치 시작

-- 기능 하나당 branch 삭제/생성하기
```

### Git Commit Rule

```
git commit -m "[첫번째 줄 메세지]
[두번째 줄 메세지]
[마지막 줄 메세지]"

-- 첫번째 줄은 다음과 같이 작성
Refactor, Update, Remove, Merge, Fix, Release, Change, Move
```



