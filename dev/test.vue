<template>
    <div id="app">
        <webskit-knob-control v-model="wheelDegrees"></webskit-knob-control>
        <webskit-knob-control :options="options" v-model="wheelDegrees" @input="test"></webskit-knob-control>
    </div>
</template>

<script>
import webskitKnobControl from '../src/webskitKnobControl.vue'

export default {
  name: 'App',
  data () {
    return {
      wheelDegrees: 135,
      options: {
        size: 200,
        arcColor: 'rgb(97, 126, 148)',
        arcBackgroundColor: 'rgb(31, 31, 76)',
        internalCircleBackgroundColor: '#4d4d5a',
        handleColor: 'white',
        setPositionColor: '#de5555',
        textColor: '#b4d5d8'
      }
    }
  },
  methods: {
    test () {
      // console.log(value)
    }
  },
  components: { webskitKnobControl }
}
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 160px;
    }

    .wk-knob-control-wrapper {
        margin-bottom: 2em !important;
    }
</style>
