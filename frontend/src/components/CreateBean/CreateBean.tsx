import React from 'react'
import './CreateBean.scss'
import x from '../../assets/img/x.svg'
import 새로고침 from '../../assets/img/새로고침.svg'

type createBeanProps = {
  CloseCreateBean: () => void;
}

function CreateBean({CloseCreateBean}: createBeanProps) {
  return (
    <div className='create-bean'>
      <div className='header'>
        <h2>글 작성</h2>
      </div>
      <img className='x' src={x} alt="" onClick={CloseCreateBean}/>
      <div className='content'>
        <div className='name-style'>
          <div className='name-refresh'>
            <p>괜찮은 치와와님,</p>
            <img className='refresh' src={새로고침} alt="" />
          </div>
          <div className='style-button'>
            <p>스타일 변경</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBean