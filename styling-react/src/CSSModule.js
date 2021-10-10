import React from 'react';
import style from './CSSModule.module.scss';

const CSSModule = () =>{
  return(
    <div className={`${style.wrapper} ${style.inverted}`}>
      안녕하세요 저는 <span className="something">CSS Module!</span>
    </div>
  )
}
export default CSSModule;