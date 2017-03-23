import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    msg: 'person',
    count: 100,
    jumpHeight: 0,
    onTheGround : true,
    rockLive : false
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--,
    jump: state => {
      let interval = setInterval( function(){
        state.jumpHeight++;
        state.onTheGround = false;
        if( state.jumpHeight === 100) {
          clearInterval(interval);
          let interval2 = setInterval( function(){
            state.jumpHeight--;
            if(state.jumpHeight === 0) {
              state.onTheGround = true;
              clearInterval(interval2);
            }
          }, 3);
        }
      }, 5);
    },
    rockAppear: state => {
      state.rockLive = true;
    },
    rockDisAppear: state => {
      state.rockLive = false;
    }
  }
})