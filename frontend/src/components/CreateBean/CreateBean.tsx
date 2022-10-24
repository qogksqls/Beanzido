import React from 'react'
import './CreateBean.scss'
import x from '../../assets/img/x.svg'
import Camera from '../../assets/img/Camera.svg'
import Img_box from '../../assets/img/Img_box.svg'
import 새로고침 from '../../assets/img/새로고침.svg'

type createBeanProps = {
  CloseCreateBean: () => void;
}

function CreateBean({CloseCreateBean}: createBeanProps) {
  return (
    <div className='create-bean-back' onClick={CloseCreateBean}>
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
          <div className='message'>
            <textarea placeholder='전하고 싶은 메시지를 입력해주세요.' />
          </div>
          <div className='camera-picture'>
            <div className='camera'>
              <img className='camera-img' src={Camera} alt="" />
              <div>
                <h4>카메라(선택)</h4>
                <p>사진 첨부 시 사진 촬영</p>
              </div>
            </div>
            <div className='picture'>
              <img className='picture-img' src={Img_box} alt="" />
              <div>
                <h4>사진(선택)</h4>
                <p>사진 첨부 시 이미지 첨부</p>
              </div>
            </div>
          </div>
          <div className='finish-button'>
            <h3>글 작성 완료</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBean