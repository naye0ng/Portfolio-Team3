# ssafy

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

-- 풀 받아오기
git pull origin dev

-- 내 브랜치 설정하기
git checkout -b [branch name]
```

### Git Push Rule

```
1. (내꺼) git push origin [내꺼]
2. git checkout dev
3. (dev) git merge [내꺼]
4. (dev) git push dev
5. (dev) git branch -D [내꺼] -- 내 브랜치 삭제
6. (dev) git checkout -b [새로운 내꺼] -- 새 기능 브랜치 시작

-- 기능 하나당 branch 삭제/생성하기
```

### Git Commit Rule

```
git commit -m "[첫번째 줄 메세지]
[두번째 줄 메세지]
[마지막 줄 메세지]"

-- 첫번째 줄은 다음과 같이 작성
Refactor, Update, Remove, Release, Merge, Fix, Change, Move
```



