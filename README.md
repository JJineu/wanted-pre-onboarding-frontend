# Todo Web

회원 가입 및 로그인, Todo memo app을 만드는 페이지입니다. 

🗓️ 진행 기간: 약 2일(2023.08.07 ~ 2023.08.08)

💡 개발 인원 : 1인 [@김현진](https://github.com/JJineu)

<br>

※ 개발 과정은 Notion으로 정리했습니다.
- [Notion](https://www.notion.so/ongoingjin/week-01-review-forward-9c89db9837484a73a929cb61a61d75ff)

※ 개인 과제를 바탕으로 팀 과제를 진행했습니다. (2023.08.22 ~ 2023.08.25)
- [팀 Domain](https://wanted-preonboarding-2team-todo-app.netlify.app/signin)
- [팀 과제 Git](https://github.com/wanted-internship-team/pre-onboarding-12th-1-2)
- [팀 Notion](https://www.notion.so/somtha/1-6b681c68de114f47b9b79e0a0ad0162e)


<br>


## 프로젝트 실행방법

1. git clone

   ```
   https://github.com/JJineu/wanted-pre-onboarding-frontend.git
   ```

2. npm install & npm start

<br>

## 데모 영상
<br>
<img width="600" src="https://github.com/JJineu/wanted-pre-onboarding-frontend/assets/96639305/bf2a7fbb-808c-4c2b-bf6e-8ca44673fd57">

<br>

<img  width="600" src="https://github.com/JJineu/wanted-pre-onboarding-frontend/assets/96639305/d6dd7b65-48ef-4173-912b-7e5026bcf3b4">

<br>

## Point 1. 로그인 관리 - useAuth hook 사용
로그인 관련 로직을 페이지 라우팅 이전에 확인하고 처리하기 위해, Context API를 사용하여 관리했습니다.
토큰 여부에 따른 리다이렉트, 로그인 함수 등을 하위 컴포넌트에서 사용하기 쉽도록 만들었습니다.
```jsx
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [userId, setUserId] = useState(localStorage.getItem("USER.ID"));

  const signup = ({ email, password }: User, callback?: () => void) => {
    return AuthAPI.signUp({ email, password }).then(() => {
      if (callback) callback();
    });
  };

  const signin = ({ email, password }: User, callback?: () => void) => {
    return AuthAPI.signIn({ email, password }).then((data) => {
      setToken(data.access_token);
      const id = email.split("@")[0];
      setUserId(id);
      localStorage.setItem("ACCESS_TOKEN", data.access_token);
      localStorage.setItem("USER.ID", id);
      if (callback) callback();
    });
  };

  const signout = (callback?: () => void) => {
    setToken("");
    setUserId("");
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER.ID");
    if (callback) callback();
  };

  let value: AuthProviderProps = { token, userId, signin, signup, signout };
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
```

## Point 2. API 인스턴스 분리
API 인스턴스를 생성하여, 로그인 로직과 todo 로직에 재사용하였습니다.
또한 토큰에 관련된 부분(인증)을 분리하여, 추후 변경이 쉽도록(local starage 외의 다른 방식을 사용할 경우) 관리했습니다.
```jsx
const API = axios.create({
  baseURL: BASE_URL
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response.status === 401) return Promise.reject(error);
    if (response) alert(response.data.message);
    return Promise.reject(error);
  }
);

```


## 과제 상세 사항

### :: 1. 로그인 / 회원가입

- `/signup` 경로에 회원가입 기능을 개발해주세요
- `/signin` 경로에 로그인 기능을 개발해주세요
- 페이지 안에 이메일 input, 비밀번호 input, 제출 button이 포함된 형태로 구성해주세요

#### Assignment 1

- 회원가입과 로그인 페이지에 이메일과 비밀번호의 유효성 검사기능을 구현해주세요

  - 이메일 조건: `@` 포함
  - 비밀번호 조건: 8자 이상
  - 이메일과 비밀번호의 유효성 검사 조건은 별도의 추가 조건 부여 없이 위의 조건대로만 진행해주세요 (e.g. 비밀번호 유효성 검사에 특수문자 포함 등의 새로운 조건을 추가하는 행위, 비밀번호 확인 조건을 추가하는 행위 등은 지양해주세요)

- 입력된 이메일과 비밀번호가 유효성 검사를 통과하지 못한다면 button에 `disabled` 속성을 부여해주세요

#### Assignment 2

- 회원가입 페이지에서 버튼을 클릭 시 회원가입을 진행하고 회원가입이 정상적으로 완료되었을 시 `/signin` 경로로 이동해주세요

#### Assignment 3

- 로그인 페이지에서 버튼을 클릭 시, 로그인을 진행하고 로그인이 정상적으로 완료되었을 시 `/todo` 경로로 이동해주세요

  - 로그인 API는 로그인이 성공했을 시 Response Body에 JWT를 포함해서 응답합니다.
  - 응답받은 JWT는 로컬 스토리지에 저장해주세요

#### Assignment 4

- 로그인 여부에 따른 리다이렉트 처리를 구현해주세요

  - 로컬 스토리지에 토큰이 있는 상태로 `/signin` 또는 `/signup` 페이지에 접속한다면 `/todo` 경로로 리다이렉트 시켜주세요
  - 로컬 스토리지에 토큰이 없는 상태로 `/todo`페이지에 접속한다면 `/signin` 경로로 리다이렉트 시켜주세요

---

### :: 2. TODO LIST

#### Assignment 5

- `/todo`경로에 접속하면 투두 리스트의 목록을 볼 수 있도록 해주세요
- 목록에서는 TODO의 내용과 완료 여부가 표시되어야 합니다.
- TODO의 완료 여부는 `<input type="checkbox" />`를 통해 표현해주세요
- TODO는 `<li>` tag를 이용해 감싸주세요

#### Assignment 6

- 리스트 페이지에 새로운 TODO를 입력할 수 있는 input과 추가 button을 만들어주세요
- 추가 button을 클릭하면 입력 input의 내용이 새로운 TODO로 추가되도록 해주세요
- TODO를 추가 한 뒤 새로고침을 해도 추가한 TODO가 목록에 보여야 합니다.

#### Assignment 7

- TODO의 체크박스를 통해 완료 여부를 수정할 수 있도록 해주세요.

#### Assignment 8

- TODO 우측에 수정버튼과 삭제 버튼을 만들어주세요

#### Assignment 9

- 투두 리스트의 삭제 기능을 구현해주세요

  - 투두 리스트의 TODO 우측의 삭제버튼을 누르면 해당 아이템이 삭제되도록 해주세요

#### Assignment 10

- 투두 리스트의 수정 기능을 구현해주세요

  - TODO 우측의 수정 버튼을 누르면 수정모드가 활성화 되도록 해주세요
  - 수정모드에서는 TODO의 내용을 변경할 수 있어야 합니다.
  - 수정모드에서는 TODO의 내용이 input창 안에 입력된 형태로 변경해주세요
  - 수정모드에서는 TODO의 우측에 제출버튼과 취소버튼이 표시되게 해주세요
  - 제출버튼을 누르면 수정한 내용을 제출해서 내용이 업데이트 될 수 있도록 해주세요
  - 취소버튼을 누르면 수정한 내용을 초기화 하고, 수정모드를 비활성화 해주세요
