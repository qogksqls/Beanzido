import React, {useState} from 'react';
import './CreateBean.scss';
import x from '../../assets/img/x.svg';
import Camera from '../../assets/img/Camera.svg';
import Img_box from '../../assets/img/Img_box.svg';
import 새로고침 from '../../assets/img/새로고침.svg';
import colorPicker from '../../assets/img/colorPicker.svg';

type createBeanProps = {
  CloseCreateBean: () => void;
};

function CreateBean({ CloseCreateBean }: createBeanProps) {
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

  const [changeStyle, setChangeStyle] = useState(false)
  function OpenChangeStyle() {
    setChangeStyle(true)
  }
  function CloseChangeStyle() {
    setChangeStyle(false)
  }
  function BeanStyle() {
    return <>
    <div className='bean-style-back' onClick={CloseChangeStyle}></div>
    <div className='bean-style'>
      <div style={{display: 'flex', height: '100%', justifyContent: 'space-around'}}>
        <div style={{
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'space-between'}}>
          <div className='bean-color'>
            <div className='circle' style={{ backgroundColor: '#BDDB79'}}></div>
            <p>완두콩</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <hr style={{margin: '0', width: '70%'}}/>
          </div>
          <div className='bean-color'>
            <div className='circle' style={{ backgroundColor: '#F25F9B'}}></div>
            <p>강낭콩</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <hr style={{margin: '0', width: '70%'}}/>
          </div>
          <div className='bean-color'>
            <div className='circle' style={{ backgroundColor: '#A6A6A6'}}></div>
            <p>쥐눈이콩</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <hr style={{margin: '0', width: '70%'}}/>
          </div>
          <div className='bean-color'>
            <div className='circle' style={{ backgroundColor: '#F57329'}}></div>
            <p>랜탈콩</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <hr style={{margin: '0', width: '70%'}}/>
          </div>
          <div className='bean-color'>
            <div className='circle' style={{ backgroundColor: '#FFE9A0'}}></div>
            <p>병아리콩</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <hr style={{margin: '0', width: '70%'}}/>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'space-between'}}>
          <div className='bean-color'>
            <div className='circle' style={{ backgroundColor: '#377E19'}}></div>
            <p>녹두</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <hr style={{margin: '0', width: '70%'}}/>
          </div>
          <div className='bean-color'>
            <div className='circle' style={{ backgroundColor: '#E6BD46'}}></div>
            <p>땅콩</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <hr style={{margin: '0', width: '70%'}}/>
          </div>
          <div className='bean-color'>
            <div className='circle' style={{ backgroundColor: '#4E4E4E'}}></div>
            <p>검은콩</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <hr style={{margin: '0', width: '70%'}}/>
          </div>
          <div className='bean-color'>
            <div className='circle' style={{ backgroundColor: '#CC3737'}}></div>
            <p>팥</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <hr style={{margin: '0', width: '70%'}}/>
          </div>
          <div className='bean-color'>
            <div className='circle' style={{ backgroundColor: '#375E97'}}></div>
            <p>젤리빈</p>
          </div>
          <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
            <hr style={{margin: '0', width: '70%'}}/>
          </div>
        </div>
      </div>
    </div>
    </>
  }

  return (
    <>
      <div className="create-bean-back" onClick={CloseCreateBean}></div>
      <div className="create-bean">
        <div className="header">
          <h2>글 작성</h2>
        </div>
        <img className="x" src={x} alt="" onClick={CloseCreateBean} />
        <div className="content">
          <div className="name-style">
            <div className="name-refresh">
              <h4>{refreshNickname}</h4><p>님,</p>
              <img className="refresh" src={새로고침} alt="" onClick={RefreshNickname} />
            </div>
            <div className="style-button" onClick={OpenChangeStyle}>
              <p>스타일 변경</p>
            </div>
          </div>
          {changeStyle && <BeanStyle />}
          <div className="message">
            <textarea placeholder="전하고 싶은 메시지를 입력해주세요." />
          </div>
          <div className="camera-picture">
            <div className="camera">
              <img className="camera-img" src={Camera} alt="" />
              <div>
                <h4>카메라(선택)</h4>
                <p>사진 첨부 시 사진 촬영</p>
              </div>
            </div>
            <div className="picture">
              <img className="picture-img" src={Img_box} alt="" />
              <div>
                <h4>사진(선택)</h4>
                <p>사진 첨부 시 이미지 첨부</p>
              </div>
            </div>
          </div>
          <div className="finish-button">
            <h3>글 작성 완료</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBean;
