# 4주차 React 스터디 정리

| 장   | 제목                                 |
| ---- | ------------------------------------ |
| 13장 | 리액트 라우터로 SPA 개발하기         |
| 14장 | 외부 API를 이용하여 뉴스 뷰어 만들기 |

## 13장

### 13.1 SPA란?

SPA(Single Page Application)는 말 그대로 한 개의 페이지로 이루어진 애플리케이션
웹에서 제공되는 정보가 정말 많기 때문에 새로운 화면을 보여줄 때마다 모든 뷰를 준비하게 되면?
성능상의 문제가 발생 => 성능 저하

리액트는 뷰 렌더링을 사용자의 브라우저가 담당하도록 하고,
애플리케이션을 브라우저에 불러와서 실행시킨 후에 사용자와의 인터랙션이 발생하면
필요한 부분만 자바스크립트를 사용하여 업데이트
새로운 데이터가 필요할 시? 서버 API를 호출하여 필요한 데이터만 새로 불러와 애플리케이션에 사용

라우팅?

- 다른 주소에 다른 화면을 보여주는 것!

리액트 라우터, 리치 라우터, Next.js등

#### 13.1.1 SPA의 단점

SPA의 단점은 앱의 규모가 커지면 자바스크립트 파일이 너무 커지는 것.
페이지 로딩시 실제로 방문하지 않을 페이지의 스크립트도 불러온다. => 코드 스플리팅

리액트 라우터처럼 브라우저에서 자바스크립트를 사용하여 라우팅을 관리하는 것은
자바스크립트를 실행하지 않는 일반 크롤러에서는 페이지의 정보를 제대로 수집하지 못한다.

크롤링하는 모든 페이지가 자바스크립트를 실행하지 않는다.
자바스크립트는 실행이 되기까지 비어있기 때문에, 흰 페이지가 나타날 수도 있다.
=>서버 사이드 렌더링

### 13.2 프로젝트 준비 및 기본적인 사용법

라우터 라이브러리 설치
`yarn add react-router-dom`
index.js 파일 내에 BrowserRouter컴포넌트를 사용하여 감싸서 사용

Router라는 컴포넌트를 사용하여 사용자의 현재 경로에 따라 다른 컴포넌트를 보여준다.
`<Route path="주소규칙" compoonent={보여줄컴포넌트}/>`
exact={true} 를 입력하면 exact란 props를 true로 설정한것

Link컴포넌트는 클릭하면 다른 주소로 이동시켜 주는 컴포넌트
웹 애플리케이션에서 a태그와 유사하지만 태그를 직접 사용할 수 없다!
-> 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 애플리케이션이 들고 있던 상태를 모두 날려버림.
렌더링된 컴포넌트들도 모두 사라지고 다시 처음부터 렌더링한다.

반면에, Link컴포넌트는 페이지를 새로 불러오지 않고 애플리케이션은 그대로 유지한 상태에서 페이지의 주소만 변경.
Link컴포넌트 자체는 a태그로 이루어져 있지만, 페이지 전환을 방지하는 기능이 내장되어있음!

### 13.4 URL 파라미터와 쿼리

페이지 주소를 정의할 때 가끔 유동적인 값을 전달해야할 때
파라미터와 쿼리로 나눌 수 있음
파라미터 /profile/velopert
쿼리 /about?details=true

url파라미터를 사용할 떄는 라우트로 사용되는 컴포넌트에서 받아오는 match라는 객체안의 params값 참조
match 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정ㅇ보가 필요함.

쿼리는 location객체에 들어있는 search값에서 조회
location객체는 라우트로 사용된 컴포넌트에게 props로 전달

URL쿼리를 읽을 때는 위 객체가 지닌 값중에서 search값을 확인해야함
문자열형태로 여러가지 값을 설정할 수 있음

search값에서 특정 값을 읽어오기 위해서는 이 문자열을 객체 형태로 변환해주어야함.

쿼리 문자열 => 객체로 변환할 때는 'qs' 라이브러리

### 13.5 서브라우트

서브 라우트는 라우트 내부에 또 라우트를 정의하는 것

### 13.6 서브라우트

## history

history 객체는 라우트로 사용된 컴포넌트에 match, location과 함께 전달되는 props중 하나
이 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출할 수 있다.

history란!
특정 버튼 눌렀을 때 뒤로가기, 로그인 후 화면 전환, 다른 페이지로 이탈하는거 방지

## withRouter

withRouter 함수는 Hoc(Higher-order-Component)
라우트로 사용된 컴포넌트가 아니어도 match, location, history 객체를 접근할 수 있게 해줌.

## Switch

Switch 컴포넌트는 여러 Router를 감싸서 그중 일치하는 단 하나의 라우트만을 렌더링
SWitch를 사용하면 모든 규칙과 일치하지 않을 때 보여줄 Not Found페이지 구현 가능

## NavLink

현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 css클래스를 적용할 수 있는 컴포넌트

링크가 활성화되었을 때의 스타일을 적용할 때는 activeStyle값을,
css클래스를 적용할때는 activeClassName값을 props로 넣어주기

### 14.1 비동기 작업의 이해

서버쪽 데이터가 필요할 때 Ajax기법 사용하여 서버의 API호출하여 데이터 수신
시간이 걸린다! => 작업즉시 처리되는 것이 아닌, 응답을 받을 때까지 기다렸다가 전달받은 응답 데이터를 처리
이 과정은 비동기적으로 처리한다.

비동기적으로 처리한다면, 웹 애플리케이션이 멈추지 않기 때문에 동시에 여러 가지 요청을 처리할 수 있고, 기다리는 과정에서 다른 함수 호출 가능!

js에서 비동기작업을 가장 흔히 사용하는 방법 - > 콜백함수

## 콜백 함수

파라미터 값이 주어지면 1초 뒤에 10을 더해서 반환하는 함수

```
function increase(number, callback) {
  setTimeout(()=>{
    const result = number + 10;
  if (callback){
    callback(result);
  }
  }, 1000)
}

increase(0, result =>{
  console.log(result);
});
```

1초에 걸쳐서 10,20,30,40과 같은 형태로 여러번 순차적으로 처리하고 싶다면?
콜백함수 여러번 중첩하여 구현!

```
function increase(number, callback) {
  setTimeout(()=>{
    const result = number + 10;
  if (callback){
    callback(result);
  }
  }, 1000)
}
console.log("작업 시작");
increase(0, result =>{
  console.log(result);
  increase(0, result =>{
    console.log(result);
    increase(0, result =>{
      console.log(result);
      increase(0, result =>{
        console.log(result);
        increase(0, result =>{
          console.log(result);
        });
      });
    });
  });
});
```

콜백 안에 또 콜백을 넣어서 구현 하는데, 코드가 복잡해짐
=> 콜백지옥!

## Promise

Promise는 콜백 지옥 같은 코드가 형성되지 않게 하는 방안

```
function increase(number){
  const promise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
      const result = number + 10;
      if(result>50){
        const e = new Error('NumberTooBig');
        return reject(e);
      }
      resolve(result);
    },1000);
  });
  return promise;
}
increase(0)
  .then(number=>{
    console.log(number);
    return increase(number);
  })
  .then(number=>{
    console.log(number);
    return increase(number);
  })
  .then(number=>{
    console.log(number);
    return increase(number);
  })
  .then(number=>{
    console.log(number);
    return increase(number);
  })
  .then(number=>{
    console.log(number);
    return increase(number);
  })
  .then(number=>{
    console.log(number);
    return increase(number);
  })
  .catch(e=>{
    //도중에 에러가 발생할때 catch를 통해 알것
    console.log(e);
  })
```
작업을 연달아 처리한다고 해서 함수를 여러번 감싸는 것이 아닌,
.then을 사용하여 그다음 작업을 설정!
=> 콜백지옥 형성x

## async / await

Promise를 더욱 쉽게 사용할 수 있도록 해주는 ES8 문법
함수 앞부분에 async 키워드 추가하고,
해당 함수 내부에서 Promise의 앞부분에 await키워드를 사용한다.
Promise가 끝날 때까지 기다리고, 결과 값은 특정 변수에 담을 수 있음.

### 14.2 axios로 API 호출해서 데이터 받아 오기

axios는 현재 가장 많이 사용되고 있는 자바스크립트 HTTP 클라이언트
HTTP 요청을 Promise 기반으로 처리한다는 점이 특징



---
