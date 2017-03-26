<template>
  <div id="app">
    <div class="div2">
    SCORE
    <br>
    {{ score }}</div>
    <div class="div3">
      <button id="start" @click="start">start!</button>
    </div> 
    <div id="person" class="div1" v-bind:style="{ bottom : jumpHeight+'px' }">
    {{ msg }}
    </div>
    <div id="startCount" v-show="startCount.show"> 
    {{ startCount.count }} </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/index.js'

function getRandomLimit() {
  var Sum = 0;
  for(var i = 0; i <= 8 ; i++){
    Sum += Math.random();
  }
  return Sum / 8
}

function Rock() {
  this.$rock = $("<div class='rock'>")
  this.width = getRandomLimit()  * 80
  this.height = getRandomLimit() * 80
  this.setShape()
  $('#app').append(this.$rock);
  const timer = setInterval( ()=>{
    if( !isOverlap('app', this.$rock) ){
      this.$rock.remove();
      console.log('rock gone')
      store.dispatch('addScore', 10);
      clearInterval(timer);
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

export default {
  name: 'app',
  computed: {
    jumpHeight () {
      return store.state.jumpHeight
    },
    msg () {
      return store.state.msg
    },
    score () {
      return store.state.score
    },
    live () {
      return store.state.live
    },
    startCount () {
      return store.state.startCount
    }
  },
  watch: {
    live: function(val, oldVal){
      if(!val) {
        this.stop()
        // this.$destroy()
      }
    },
    score: function(val) {
      if (val > 30 && store.state.level ==1){
        store.dispatch('setLevel', 2);
      }else if (val > 80 && store.state.level ==2) {
        store.dispatch('setLevel', 3);
      }else if (val > 130 && store.state.level ==3) {
        store.dispatch('setLevel', 4);
      }else if (val > 200 && store.state.level ==4) {
        store.dispatch('setLevel', 5);
      }
    }
  },

  methods: {
    start () {
      console.log('start !')
      $('.div3').hide()
      this.resetState()
      store.dispatch('setLive', true);
      var rockTimer = setInterval( ()=>{
        if( Math.random() > store.getters.levelRandom ) {
          // this.rockAnimate(true);
          // store.commit('rockAppear');
          const rock = new Rock()
          // console.log(rock)
        }
        store.dispatch('addScore', 1);
      }, 1000);
      store.dispatch('createStartCount');
      store.dispatch('createRockTimer', rockTimer);
    },
    stop () {
      console.log('stop')
      clearInterval(store.state.rockTimer)
      $('.div3').show()
    },
    jump () {
      if( store.state.onTheGround ){
        store.dispatch('jump')
      }
    },
    rockAnimate (boolean) {
      store.dispatch('rockAnimate', boolean)
    },
    resetState () {
      store.dispatch('resetState')
    }
  },

  mounted () {
    // this.start()
  },
  created () {
    window.onkeypress = this.jump
    window.onload = this.start
  },
  destroyed () {
    // window.onkeypress = null
    // window.onload = null
  }
}

function isOverlap(idOne,idTwo)
{
  var objOne=$("#"+idOne),
  // objTwo=$("."+idTwo),
  objTwo = idTwo,
  offsetOne=objOne.offset(),
  offsetTwo=objTwo.offset(),
  topOne=offsetOne.top,
  topTwo=offsetTwo.top,
  leftOne=offsetOne.left,
  leftTwo=offsetTwo.left,
  widthOne=objOne.width(),
  widthTwo=objTwo.width(),
  heightOne=objOne.height(),
  heightTwo=objTwo.height();
  var leftTop=leftTwo>leftOne&&leftTwo<leftOne+widthOne&&
  topTwo>topOne&&topTwo<topOne+heightOne,
  rightTop=leftTwo+widthTwo>leftOne
  &&leftTwo+widthTwo<leftOne+widthOne
  &&topTwo>topOne&&topTwo<topOne+heightOne,
  leftBottom=leftTwo>leftOne&&leftTwo<leftOne+widthOne&&
  topTwo+heightTwo>topOne&&topTwo+heightTwo<topOne+heightOne,
  rightBottom=leftTwo+widthTwo>leftOne&&leftTwo+widthTwo<leftOne+widthOne&&
  topTwo+heightTwo>topOne&&topTwo+heightTwo < topOne+heightOne;
  return leftTop||rightTop||leftBottom||rightBottom;
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 800px;
  height: 400px;
  background-color : lightgrey;
  position: relative;
  overflow: hidden;
}

.div1 {
  width : 80px;
  height : 100px;
  background-color : gold;
  position: absolute;
  bottom: 0;
  left: 30px;
}
.div2 {
  width : 200px;
  height : 100px;
  background-color : lightblue;
  font-size : 36px;
}
.div3 {
  width: 800px;
  height: 400px;
  background-color : rgba(100,100,0,0.1);
  position : absolute;
  left : 0;
  top : 0;
  display: none;
}
#start {
  font-size : 48px;
}
#startCount {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 15%;
  left: 50%;
  transform: translate(-50%);
  margin: 0 auto;
  background-color : rgba(0,0,0,0);
  color: deeppink;
  font-size: 250px;
}

.rock {
  position: absolute;
  width: 30px;
  height: 50px;
  bottom : 0;
  right :0;
  background-color : tomato;
  animation: attack 3s ease-in;
}

@keyframes attack {
  from { right : 0px; }
  to { right : 900px; }
}
</style>
