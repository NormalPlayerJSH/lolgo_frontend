# LOLGO_Frontend

![롤고 배경](https://user-images.githubusercontent.com/37856995/128962448-39fc7809-0127-4d36-a232-be0b46e72185.png)

리그 오브 레전드를 위한 챔피언 추천 프로그램, **LOLGO**

LOLGO의 프론트엔드 부분 레포지토리입니다.

---

## 구조
- main - Electron 작동 소스
- renderer - Electron 내에 띄워지는 React 웹 소스
  - Amazon S3로 배포


---

## 주요 실행 사진

### 전적 확인

![전적 확인](https://user-images.githubusercontent.com/37856995/139628032-30a20ba0-145c-4d42-bd98-f8fac5180491.png)

### 밴픽창 챔피언 추천

![밴픽창 챔피언 추천](https://user-images.githubusercontent.com/37856995/139628039-b10acd78-1fc4-4471-8f53-b13e5cc1fe3a.png)

### 게임 분석

![게임 분석](https://user-images.githubusercontent.com/37856995/139628037-8c1939e3-2591-442c-8cb5-3f7ec1b6e238.png)


---

## 사용 프레임워크 / 라이브러리

- [Electron](https://github.com/electron/electron)
  - [lcu-connector](https://github.com/Pupix/lcu-connector)
- [React](https://github.com/facebook/react)
  - [swr](https://github.com/vercel/swr)
  - [axios](https://github.com/axios/axios)
  - [react-loader-spiner](https://github.com/mhnpd/react-loader-spinner)
---

## 실행 방법

```
git clone https://git.swmgit.org/swm-12/12_swm16/lolgo_frontend
cd ./lolgo_frontend
npm install
npm start
```
