export default {
  jump (context) {
    context.commit('jump')
  },
  gameOver (context) {
  	context.commit('setLive', false)
  },
  rockAnimate (context, boolean) {
  	context.commit('rockAnimate', boolean)
  }
}