export default {
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
  },
  setLive: (state, boolean) => {
    state.live = boolean
  },
  rockAnimate: (state, boolean) => {
    state.$rock.toggleClass('rock', boolean)
  },
  addScore: (state, num) => {
    state.score += num
  },
  createRockTimer: (state, timer) => {
    state.rockTimer = timer
  },
  createStartCount: state => {
    state.startCount.show = true
    const timer = setInterval( ()=>{
      state.startCount.count -=1
      if (state.startCount.count === 0) {
        state.startCount.count = 3
        state.startCount.show = false
        clearInterval(timer)
      } 
    },1000)
  },
  resetState: state => {
    state.score = 0
     state.level = 1
  },
  setLive: (state, boolean) => {
    state.live = boolean
  },
  setLevel: (state, num) => {
    console.log('level up !! level : '+num)
    state.level = num
  }
}