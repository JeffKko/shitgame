import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'


Vue.use(Vuex)

function getRandom() {
  var Sum = 0;
  for(var i = 0; i <= 8 ; i++){
    Sum += Math.random();
  }
  return Sum / 8
}

function Rock() {
  this.$rock = $("<div class='rock'>")
  this.width = getRandom()  * 80
  this.height = getRandom() * 80
  this.setShape()
  $('#app').append(this.$rock);
  const timer = setInterval( ()=>{
    if( !isOverlap('app', this.$rock) ){
      // this.rockAnimate(false);
      clearInterval(timer);
      this.$rock.remove();
      // store.commit('rockDisAppear');
      console.log('rock gone')
      store.dispatch('addScore', 10);
    }
  },100);

  const timer2 =  setInterval( ()=> {
    if ( isOverlap('person', this.$rock) ) {
      console.log('gameover')
      store.dispatch('gameOver');
      clearInterval(timer2);
    }
  },100);

}

Rock.prototype.setShape = function() {
  this.$rock.css({
    width: this.width + 'px',
    height: this.height + 'px'
  });
}

const state = {
  msg : 'person',
  live : true,
  score : 0,
  jumpHeight : 0,
  onTheGround : true,
  rockLive : false,
  rockTimer : null,
  startCount : {
  	show : false,
  	count : 3
  },
  level : 1
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})