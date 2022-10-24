import React from 'react'
import './CreateBean.scss'
import x from '../../assets/img/x.svg'
import 새로고침 from '../../assets/img/새로고침.svg'
import { useState } from 'react'

type createBeanProps = {
  CloseCreateBean: () => void;
}


function CreateBean({CloseCreateBean}: createBeanProps) {
  let first = ["괜찮은", "평범한", "납작한", "멍청한", "똑똑한", "앙상한", "지적인", "관대한", "악독한", "방탕한"];
  let second = ["치와와", "빈지노", "판다곰", "김우창", "강낭콩", "외국인", "도마뱀", "잠자리", " 하운드", "순례자"];
  let nickname = first[Math.floor(Math.random()*first.length)] + ' ' +
  second[Math.floor(Math.random()*second.length)]
  let newNickName = first[Math.floor(Math.random()*first.length)] + ' ' +
  second[Math.floor(Math.random()*second.length)]
  const [refreshNickname, setRefreshNickname] = useState(nickname);
  const RefreshNickname = () => {
    setRefreshNickname(newNickName)
  }
  return (
    <div className='create-bean'>
      <div className='header'>
        <h2>글 작성</h2>
      </div>
      <img className='x' src={x} alt="" onClick={CloseCreateBean}/>
      <div className='content'>
        <div className='name-style'>
          <div className='name-refresh'>
            <p>{refreshNickname}님,</p>
            <img className='refresh' src={새로고침} alt="" onClick={RefreshNickname} />
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