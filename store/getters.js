export default {
  requesting: state => {
    return state.user.requesting;
  },
  token: state => {
    return state.user.token;
  },
  devList: state => {
    return state.user.devList;
  },
  code:state => {
    return state.user.code;
  },
  devListMac: state => {
    return state.user.devListMac;
  },
  userInfo: state => {
    return state.user.userInfo;
  },
  opponentInfo: state => {
    return state.dev.opponentInfo;
  },
  questionList: state => {
    return state.dev.questionList;
  },
  socketInstance: state => {
    return state.dev.socketInstance;
  },
  userScore: state => {
    return state.dev.userScore;
  },
  opponentScore: state => {
    return state.dev.opponentScore;
  },
  settlementInfo: state => {
    return state.dev.settlementInfo;
  }
};
