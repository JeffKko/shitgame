import Vue from 'vue'
import Vuex from 'vuex'
import getters from 'getters'
import actions from 'actions'
import mutations from 'mutations'


Vue.use(Vuex)

const state = {
  msg: 'person',
  count: 100,
  jumpHeight: 0,
  onTheGround : true,
  rockLive : false
},

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})