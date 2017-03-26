export default {
  jump (context) {
    context.commit('jump')
  },
  gameOver (context) {
  	context.commit('setLive', false)
  },
  rockAnimate (context, boolean) {
  	context.commit('rockAnimate', boolean)
  },
  addScore (context, num) {
    context.commit('addScore', num)
  },
  createRockTimer (context, timer) {
    context.commit('createRockTimer', timer)
  },
  createStartCount (context) {
    context.commit('createStartCount')
  },
  resetState (context) {
    context.commit('resetState')
  },
  setLive (context, boolean) {
    context.commit('setLive', boolean)
  },
  setLevel (context, num) {
  	context.commit('setLevel', num)
  }
}