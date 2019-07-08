# Database

### user

> 페이지에 가입하고자 하는 user 정보

| <u>unum</u>    | name        | nickname    | email | password |
| -------------- | ----------- | ----------- | ----- | -------- |
| auto_increment | varchar(10) | varchar(30) | email | password |

### post

> post 글에 대한 정보 -- user 작성

| <u>pid</u>     | unum | title       | content    | date |
| -------------- | ---- | ----------- | ---------- | ---- |
| auto_increment | int  | varchar(30) | text_field | date |

### portfolio

> portfolio 글에 대한 정보

| <u>pid</u>     | dnum | title       | content    | date | cover |
| -------------- | ---- | ----------- | ---------- | ---- | ----- |
| auto_increment | int  | varchar(30) | text_field | date | url   |

### image

> storage 에 저장된 image 정보 저장 -- name 은 alt에 사용됨.

| <u>iid</u>     | url  | name        |
| -------------- | ---- | ----------- |
| auto_increment | url  | varchar(20) |

### developer

> 개발자 정보를 저장

| <u>dnum</u>    | name        | github_id   | repo_url | intro_text | img_url |
| -------------- | ----------- | ----------- | -------- | ---------- | ------- |
| auto_increment | varchar(10) | varchar(20) | url      | text_field | url     |



