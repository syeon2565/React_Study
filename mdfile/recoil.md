### recoli

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