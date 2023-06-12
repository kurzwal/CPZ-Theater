# 침팬지 극장 (미완성)
침팬지 극장은 WebSocket 기능을 이용한 실시간 유튜브 같이보기 서비스로,

도트 캐릭터를 움직이며 채팅할 수 있는 간단한 메타버스를 구축했습니다.

## 코드 미리보기 (클라이언트)
- JWT를 이용한 구글로그인 호출
![01 구글로그인](https://github.com/kurzwal/CPZ-Theater/assets/118142657/9f490a0f-0e91-4db3-8d22-93c5f5dc15e0)


- Phaser를 이용한 GameView 컴포넌트 구현
![02 페이저](https://github.com/kurzwal/CPZ-Theater/assets/118142657/17c304c5-cf81-4097-acee-b76d01c399a1)


- Phaser 안에서 캐릭터 움직임과 메뉴 등의 구현
![03 페이저로비](https://github.com/kurzwal/CPZ-Theater/assets/118142657/17a00c69-7761-4259-a973-0a930bf7dcc9)


- 웹소켓을 이용한 실시간 통신 메소드
![04 웹소켓](https://github.com/kurzwal/CPZ-Theater/assets/118142657/8d883d7b-c664-4dc0-8347-67a93d7ed41e)


## 코드 미리보기 (서버)
- Colyseus 안에서 구현한 Express 서버
![05 익스프레스](https://github.com/kurzwal/CPZ-Theater/assets/118142657/acc3ca59-39f8-4fd6-89fb-842500aed7cd)


- MongoDB Client를 사용하여 데이터 핸들링 API
![06 APIs](https://github.com/kurzwal/CPZ-Theater/assets/118142657/bc4953e8-810c-4897-a36f-45daedce439d)


- Colyseus에서 지원하는 Room클래스로 웹소켓 통신 서버 구현
![07 room클래스](https://github.com/kurzwal/CPZ-Theater/assets/118142657/5c5f69bc-16e2-415e-a401-4d3fc92b971f)

