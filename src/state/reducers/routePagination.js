import { ROUTE_CHANGE } from '../action-types';
const INITIAL_STATE = {
  currentPage: '',
  slideFromDirection: 'right'
};

const pageOrder = [
  '/', // 메인 페이지
  '/ticketing/landing', // 티켓예매 처음일때 ( 인증안되었을 때 들어가는 페이지)
  '/list/landing', // 리스트 랜딩용 페이지
  '/auth/message', // 인증용 메세지 보내는 페이지
  '/auth/validation', // 인증 시키는 페이지
  '/ticketing/amount', // 티켓 수량 입력
  '/ticketing/deposit', // 티켓 입금자명, 입금주소 모달창 띄우는 페이지
  '/list/mytickets', // 내 티켓 리스트, 패스이름 바꾸고 싶음 바꿔도됨, 밑에 processForValidationNextPage 도 바꿔주삼 - 2월 1일 11:52 이찬진
  '/tickets' // 뒤에 파라미터붙으면 pathname이 어떻게 되는지 모르겠음 확인요망 - 2월 1일 11:52 이찬진
];

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ROUTE_CHANGE:
      // 슬라이드 방향 디력선 설정
      let slideFromDirection = 'right';
      if (
        pageOrder.indexOf(state.currentPage) > pageOrder.indexOf(action.payload)
      ) {
        slideFromDirection = 'left';
      }
      // 프로세스가 티켓팅일때
      if (action.payload === '/ticketing/landing') {
        return {
          ...state,
          currentPage: action.payload,
          slideFromDirection: slideFromDirection,
          // 인증이끝나고 next page를 위함
          processForValidationNextPage: '/ticketing/amount'
        };
      }
      // 프로세스가 내 티켓을 확인 할 때
      else if (action.payload === '/list/landing') {
        return {
          ...state,
          currentPage: action.payload,
          slideFromDirection: slideFromDirection,
          // 인증이끝나고 next page를 위함
          processForValidationNextPage: '/list/mytickets'
        };
      }
      // 기본
      return {
        ...state,
        currentPage: action.payload,
        slideFromDirection: slideFromDirection
      };

    default:
      return state;
  }
}