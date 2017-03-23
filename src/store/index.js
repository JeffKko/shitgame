import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'


Vue.use(Vuex)


const state = {
  msg: 'person',
  live: true,
  count: 100,
  jumpHeight: 0,
  onTheGround : true,
  rockLive : false,
  $rock : $("<div id='rock'>")
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})