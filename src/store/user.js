const user = {
  state: {
    showMsg: false,
    msgType: '',
    msg: '',
    returnText: '',
    returnUrl: '',
    baseUrl: 'http://zhongkeruitong.top',
    // baseUrl: 'http://58.119.112.12:8086',
    openid: '', // 'oMXOb1Se1Lz0XeC03Q4J0UOhus-8',
    userImg: '',
    userName: '',
    infoObj: {
      prov: '',
      categ: '',
      batch: ''
    },
    locationInfo: ''
  },
  mutations: {
    SET_INFO_OBJ: (state, obj) => {
      state.infoObj = obj
    },
    SET_LOCATION: (state, loca) => {
      state.locationInfo = loca
    },
    SET_USR_TYPE: (state, type) => {
      state.userRole = type
    },
    SET_OPENID: (state, id) => {
      state.openid = id
    },
    SET_USER_IMG: (state, img) => {
      state.userImg = img
    },
    SET_USER_NAME: (state, name) => {
      state.userName = name
    },
    SHOW_TOAST: (state, msg) => {
      state.msg = msg
      state.msgType = ''
      state.showMsg = true
    },
    SHOW_ERROR_TOAST: (state, msg) => {
      state.msg = msg
      state.msgType = 'error'
      state.showMsg = true
    },
    HIDE_TOAST: (state) => {
      state.msg = ''
      state.msgType = ''
      state.showMsg = false
    },
    SET_RETURN_TEXT: (state, text) => {
      state.returnText = text
    },
    SET_RETURN_URL: (state, url) => {
      state.returnUrl = url
    },
    SET_USER_INFO: (state, url) => {
      state.returnUrl = url
    }
  }
}

export default user
