import React, { useState, useEffect, useRef } from 'react';
import {
  GoFrontButton,
  ProgressLayout,
  TicketContainer,
  TicketBodyHeader,
  TicketBody,
  TicketBottom,
  TicketWrapContainer,
  ProcessTitle,
  ProcessDescription,
  InputForm,
  TicketTop,
  GoBackButton
} from 'gosrock-storybook';
import history from '../../../history';
import { useSelector, useDispatch } from 'react-redux';
import { ticketStudentInfo } from '../../../state/actions-creators';
import './TicketingStudentInfoPage.css';
import { ReactComponent as Check } from '../../../assets/Check.svg';
import { ReactComponent as GoFront } from '../../../assets/GoFrontArrow.svg';
import ModalComponent from '../../ModalComponent.js/ModalComponent';
import ModalBox from '../../ListProcess/TicketListPage/ModalBox/ModalBox';

function TicketingStudentInfoPage({ ...props }) {
  const phoneNumber = useSelector(store => store.auth.phoneNumber);

  const [studentID, setstudentID] = useState('C2');
  const [smallGroup, setSmallGroup] = useState(false);
  const smallGroupRef = useRef();

  const dispatch = useDispatch();

  const gobackButtonHandler = () => {
    history.push('/');
  };

  const studentIdInputHandler = e => {
    setstudentID(e.target.value);
  };

  const yesButtonHandler = () => {
    smallGroupRef.current.classList.add('hidden');
    setSmallGroup(true);
  };

  const noButtonHandler = () => {
    smallGroupRef.current.classList.add('hidden');
    setSmallGroup(false);
  };

  const frontButtonHandler = () => {
    if (studentID < 7) alert('학번을 정확히 입력해주세요.');
    else dispatch(ticketStudentInfo({ studentID, smallGroup }));
  };

  return (
    <TicketWrapContainer {...props}>
      <TicketContainer
        TopElement={
          <TicketTop>
            <GoBackButton onClick={gobackButtonHandler}></GoBackButton>
          </TicketTop>
        }
      >
        <ProgressLayout>
          <TicketBodyHeader>
            <ProcessTitle
              topLabel="안녕하세요,"
              bottomLabel={
                phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`) +
                ' 님!'
              }
            />
            <ProcessDescription
              topLabel="학번과 함께 소모임 신청 여부를"
              bottomLabel="입력해주세요."
            />
          </TicketBodyHeader>
          <TicketBody>
            <InputForm
              value={studentID}
              onChange={studentIdInputHandler}
              page="studentId"
            />
            <div
              className="somoim-form"
              onClick={() => {
                smallGroupRef.current.classList.remove('hidden');
              }}
            >
              <div className="somoim-form-content">
                <Check fill={smallGroup ? '#BF94E4' : '#fff'} />
                <span
                  style={{
                    marginLeft: '10px',
                    color: `${smallGroup ? '#fff' : '#b6b7b8'}`
                  }}
                >
                  공연 후 소모임 신청
                </span>
              </div>
              <div className="somoim-form-content">
                <span
                  style={{
                    marginRight: '10px',
                    color: `${smallGroup ? '#b6b7b8' : '#fff'}`
                  }}
                >
                  자세히 보기
                </span>
                <GoFront fill={smallGroup ? '#B6B7B8' : '#fff'} />
              </div>
            </div>
          </TicketBody>
          <TicketBottom>
            <GoFrontButton
              onClick={frontButtonHandler}
              label="입금하러 가기"
            ></GoFrontButton>
          </TicketBottom>
          <ModalComponent
            ref={smallGroupRef}
            onClose={() => {
              smallGroupRef.current.classList.add('hidden');
            }}
          >
            <ModalBox
              onClickYes={yesButtonHandler}
              onClickNo={noButtonHandler}
            />
          </ModalComponent>
        </ProgressLayout>
      </TicketContainer>
    </TicketWrapContainer>
  );
}

export default TicketingStudentInfoPage;