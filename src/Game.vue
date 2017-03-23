<template>
  <div id="app">
    <div id="person" class="div1" v-bind:style="{ bottom : jumpHeight+'px' }">
    {{ msg }}
    </div>
    <div class="div2">{{ count }}</div>
    <!-- <div class="div3"></div>  -->
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'

window.onload = function(){
  var $rock = $("<div id='rock'>");
  $("#app").append($rock);

  setInterval(function(){

    if( Math.random() > 0.5 && !store.state.rockLive ) {
      $rock.addClass('rock');
      store.commit('rockAppear');

      var checkRock = setInterval(function(){
        if( !isOverlap('app', 'rock') ){
          $rock.removeClass('rock');
          clearInterval(checkRock);
          store.commit('rockDisAppear');
        }
      },100);
    }

  }, 1000);

  setInterval(function(){
    if ( isOverlap('person', 'rock') ) {
      alert('you die !');
    }

  },100);
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
    count () {
      return store.state.count
    },
  },
  watch: {
    jumpHeight: function(val, oldVal){
      // console.log(val+oldVal);
    }
  },

  methods: {
    press () {
      store.commit('increment')
    },
    start () {
      console.log('start !')
      // setInterval(function(){
      //   if ( isOverlap('person', 'rock') ) {
      //     alert('you die !');
      //   }

      // },100);
    },
    jump () {
      if( store.state.onTheGround ){
        store.commit('jump')
      }
    }
  },

  mounted () {
    this.start()
  },
  created () {
    window.onkeypress = this.jump
  },
  destroyed () {
    window.onkeypress = null
  }
}

function isOverlap(idOne,idTwo)
{
  var objOne=$("#"+idOne),
  objTwo=$("#"+idTwo),
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
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
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
  width : 300px;
  height : 200px;
  background-color : lightblue;
}
.div3 {
  width : 300px;
  height : 200px;
  background-color : tomato;
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
  to { right : 831px; }
}
</style>
