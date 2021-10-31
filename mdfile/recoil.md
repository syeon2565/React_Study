### recoil

## 주요개념
- atoms에서 selectors(순수 함수)를 거쳐 React컴포넌트로 내려가는 data-flow graph를 만들 수 있다.
Atoms는 컴포넌트가 구독할 수 있는 상태의 단위
Selectos는 atoms상태값을 동기 또는 비동기 방식을 통해 변환한다.

**Atoms**
- 상태의 단이이며, 업데이트와 구독이 가능
atom이 업데이트되면 각각의 구독된 컴포넌트는 새로운 값을 반영하여 다시 렌더링 된다.
atoms는 런타임에서 생성될 수도 있다.
atoms는 react의 로컬 컴포넌트의 상태 대신 사용할 수 있다.
동일한 atom이 여러 컴포넌트에서 사용되는 경우 모든 컴포넌트는 상태를 공유

```javascript
const fonstSizeState = atom({
    key:'fontSizeState',
    default:14,
});
```
Atmos는 디버깅, 지속성 및 모든 atmos는 map을 볼 수 있는 특정 고급 api에 사용되는 고유한 키가 필요

컴포넌트에서 atom을 읽고 쓰려면 **useRecoilState** 훅 사용
React의 useStae와의 차이? - 컴포넌트 간에 공유가 될 수 있다

```javascript
function FontButton(){
    const [fontSize, setFontSize] = useRecoilState(fontSizeState);
    return (
        <button onClick={()=>setFontSize((size)=>size+1)} style={{fontSize}}>
        Click to Enlarge
        </button>
    );
}
```
**Selectors**
- Selector는 atoms나 다른 selectors를 입력으로 받아들이는 순수 함수다.
- 상위의 atoms 또는 selectors가 업데이트되면 하위의 selector 함수도 다시 실행된다. 
- 컴포넌트들은 selectors를 atoms처럼 구독할 수 있으며 selectors가 변경되면 컴포넌트이 다시 렌더링

- Selectors는 상태를 기반으로 하는 파생 데이터를 계산하는 데 사용
- 최소한의 상태 집합만 atoms에 저장하고 다른 모든 파생되는 데이터는 selectors에 명시한 함수를 통해 효율적으로 계산함으로써 쓸모없는 상태의 보존을 방지
Selectors는 어떤 컴포넌트가 자신을 필요로하는지,
또 자신은 어떤 상태에 의존하는지를 추적하기 때문에 이러한 함수적인 접근방식을 매우 효율적으로 만든다.

- 컴포넌트의 관점에서 보면 selectors와 atoms는 동일한 인터페이스를 가지므로 서로 대체할 수 있다.

```Javascript
const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({get}) => {
    const fontSize = get(fontSizeState);
    const unit = 'px';

    return `${fontSize}${unit}`;
  },
});
```
get 속성은 계산될 함수
- get 인자를 통해 atoms와 다른 selectors에 접근할 수 있다. 
다른 atoms나 selectors에 접근하면 자동으로 종속 관계가 생성되므로,
참조했던 다른 atoms나 selectors가 업데이트되면 이 함수도 다시 실행된다.

이 fontSizeLabelState 예시에서 selector는 fontSizeState라는 하나의 atom에 의존성을 갖는다.
개념적으로 fontSizeLabelState selector는 fontSizeState를 입력으로 사용하고
형식화된 글꼴 크기 레이블을 출력으로 반환하는 순수 함수처럼 동작한다.

Selectors는 useRecoilValue()를 사용해 읽을 수 있다.
useRecoilValue()는 하나의 atom이나 selector를 인자로 받아 대응하는 값을 반환한다. 
fontSizeLabelState selector는 writable하지 않기 때문에 useRecoilState()를 이용하지 않는다. 
(writable한 selectors에 대한 더 많은 정보는 selector API reference에 자세히 기술되어 있다.)
```Javascript
function FontButton() {
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const fontSizeLabel = useRecoilValue(fontSizeLabelState);

  return (
    <>
      <div>Current font size: ${fontSizeLabel}</div>

      <button onClick={setFontSize(fontSize + 1)} style={{fontSize}}>
        Click to Enlarge
      </button>
    </>
  );
}
```
버튼를 클릭하면 버튼의 글꼴 크기가 증가하는 동시에
현재 글꼴 크기를 반영하도록 글꼴 크기 레이블을 업데이트하는 두 가지 작업이 수행된다.

## 설치
`npm install recoil` 또는 `yarn add recoil`로 recoil설치

버전 0.0.11 이후, Recoil은 script 태그에 직접 사용될 수 있는 UMD 빌드를 제공하며 Recoil 심볼을 글로벌 네임스페이스에 노출시킨다. 
최신 버전으로부터 예기치 않은 손상을 방지하기 위해 안정된 특정 버전 번호 및 빌드에 연결시키는 것이 좋다.
```Javascript
<script src="https://cdn.jsdelivr.net/npm/recoil@0.0.11/umd/recoil.production.js"></script>
```
**Eslint**
```
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

````
// 수정된 .eslint 설정
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        "additionalHooks": "useRecoilCallback"
      }
    ]
  }
}
````

**Nightly Builds**
- 우리는 매일 한 번씩 현재의 main 브랜치에 기반하여 패키지를 빌드하고 GitHub에 nightly 브랜치로 배포한다. 
아래의 npm 명령어를 통해 nightly 브랜치를 이용할 수 있다:
`npm install https://github.com/facebookexperimental/Recoil.git#nightly`
OR
`yarn add https://github.com/facebookexperimental/Recoil.git#nightly`
OR
**package.json**에 아래 종속성 추가한 뒤,
`  "recoil": "facebookexperimental/Recoil.git#nightly",`
npm install 또는 yarn

**RecoilRoot**
- recoil을 사용하는 컴포넌트는 부모 트리 어딘가에 나타나는 RecoilRoot가 필요하다
- 루트컴포넌트가 넣기에 가장 좋은 장소!
```Javascript
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```
## 도입부
- 앞으로의 섹션의 컴포넌트들은 부모트리에 <RecoilRoot />가 있다고 가정한다

## Atoms
- 애플리케이션 상태의 source of truth를 가진다.
ex) todo리스트에서는 todo아이템을 나타내는 객체로 이루어진 배열이 source of truth

```Javascript
const todoListState = atom({
  key: 'todoListState',
  default: [],
});
```
atom에 고유한 key를 주고 비어있는 배열 값을 default로 설정
atom의 항목을 읽기 위해, 우리는 **useRecoilValue()** 훅을 TodoList컴포넌트에서 사용

```Javascript
function TodoList() {
  const todoList = useRecoilValue(todoListState);

  return (
    <>
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  );
}
```

새로운 todo아이템을 생성하기 위해 todoListState내용을 업데이트하는 setter함수에 접근

TodoItemCreator 컴포넌트의 setter함수를 얻기 위해 useSteRecoilState()훅 사용

```Javascript
function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
}

// 고유한 Id 생성을 위함
let id = 0;
function getId() {
  return id++;
}
```

기존 todo 리스트를 기반으로 새 todo 리스트를 만들 수 있도록 setter함수의 **updater**형식을 사용해야 한다.

TodoItem컴포넌트는 todo리스트의 값을 표시하는 동시에 텍스트를 변경하고 항목을 삭제할 수 있다.
todoListState를 읽고 항목 텍스트를 업데이트하고 완료된 것으로 표시하고, 삭제하는 데 사용하는 setter함수를 얻기 위해 userRecoilState()를 사용

```Javascript
function TodoItem({item}) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
```

## selectors
- 파생된 상태의 일부를 나타냄
- 파생된 상태를 어떤 방법으로든 주어진 상태를 수정하는 순수 함수에 전달된 상태의 결과물로 생각할 수 있음

* 파생된 상태는 다른 데이터에 의존하는 동적인 데이터를 만들 수 있기 때문에 ㄱ아력한 개념
* 우리의 todo 리스트 애플리케이션 맥락에서는 다음과 같은 것들이 파상된 상태로 간주

**필터링 된 todo리스트** : 전체 todo 리스트에서 일부 기준에 따라 특정 항목이 필터링 된 새 리스트(예: 이미 완료된 항목 필터링)를 생성되어 파생

**Todo 리스트 통계** : 전체 todo 리스트에서 목록의 총 항목 수, 완료된 항목의 백분율 같은 리스트의 유용한 속성들을 계산하여 파생

필터링 된 todo 리스트를 구현하기 위해서 우리는 atom에 저장될 수 있는 필터 기준을 선택해야함.
우리가 사용하게 될 필터 옵션
"Show All", "Show Completed", "Show Uncompleted"이며, 기본 값은 "Show All"이다.

```Javascript
const todoListFilterState = atom({
  key: 'todoListFilterState',
  default: 'Show All',
});
```
todoListFilterState와 todoListState를 사용해서 필터링 된 리스트를 파생하는 filterTodoListState selector를 구성할 수 있음

```Javascript
const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete);
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});
```
- TodoListStats 컴포넌트를 구현하기 위해 동일한 개념을 사용



todo 항목들의 총개수
완료된 todo 항목들의 총개수
완료되지 않은 todo 항목들의 총개수
완료된 항목의 백분율

각 통계에 대해 selector를 만들 수 있지만, 필요한 데이터를 포함하는 객체를 반환하는 selector 하나를 만드는 것이 더 쉬운 방법일 것이다. 우리는 이 selector를 'toDoListStatsState'라고 부를 것이다.

필요한 데이터를 포함하는 객체를 반환하는 selector 하나를 만드는 것이 더 쉬운 방법임
```Javascript
const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({get}) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});
```
todoListStatsState값을 읽기 위해, 우리는 useRecoilValue()를 한 번 더 사용할 것이다.

```Javascript
function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}</li>
    </ul>
  );
}
```