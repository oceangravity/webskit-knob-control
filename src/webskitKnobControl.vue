<template>
  <div class="wk-knob-control-wrapper" @scroll="onScroll">
    <div class="wk-knob-control" ref="knobControl" :style="{ width: `${options.size}px`, height: `${options.size}px`}">

      <div class="wk-knob-circle" :style="{ 'background-color': options.arcBackgroundColor }">
        <div class="wk-knob-internal-circle" :style="{ 'background-color': options.internalCircleBackgroundColor }"></div>
      </div>

      <span class="wk-knob-label">
        <label>
            <input :style="{ 'color': options.textColor, 'font-size': `${options.size / 10}px`}" type="number" min="0" max="360" step="0.01" @mousedown.stop="" v-model="wheelDegrees">
        </label>
      </span>

      <div class="wk-knob-path" :style="{ width: `${options.size}px`, height: `${options.size}px`}">
        <svg :style="{ width: `${options.size}px`, height: `${options.size}px`}">
          <path id="wk-knob-arc" ref="knobArc" fill="none" stroke="rgb(53, 57, 60)" stroke-width="20" d=""/>
        </svg>
      </div>

      <div class="wk-knob-axis" ref="knobAxis">
        <div class="wk-knob-handle">
          <div class="wk-knob-handle-arrow" :style="{ 'background-color': options.handleColor, width: `${options.size / 9.5}px`, height: `${options.size / 9.5}px`}"></div>
        </div>
      </div>

      <div class="wk-know-point-wrapper">
        <div class="wk-know-point-wrapper-bar">
          <div class="wk-know-point" :style="{ 'background-color': options.setPositionColor, width: `${options.size / 15}px`, height: `${options.size / 15}px`}" @mousedown.prevent.stop="setDegrees(0)"></div>
          <div class="wk-know-point" :style="{ 'background-color': options.setPositionColor, width: `${options.size / 15}px`, height: `${options.size / 15}px`}" @mousedown.prevent.stop="setDegrees(180)"></div>
        </div>
      </div>

      <div class="wk-know-point-wrapper wk-knob-rotate-45">
        <div class="wk-know-point-wrapper-bar">
          <div class="wk-know-point" :style="{ 'background-color': options.setPositionColor, width: `${options.size / 15}px`, height: `${options.size / 15}px`}" @mousedown.prevent.stop="setDegrees(45)" @click="setDegrees(45)" jest-wk-knob-rotate-45></div>
          <div class="wk-know-point" :style="{ 'background-color': options.setPositionColor, width: `${options.size / 15}px`, height: `${options.size / 15}px`}" @mousedown.prevent.stop="setDegrees(225)"></div>
        </div>
      </div>

      <div class="wk-know-point-wrapper wk-knob-rotate-90">
        <div class="wk-know-point-wrapper-bar">
          <div class="wk-know-point" :style="{ 'background-color': options.setPositionColor, width: `${options.size / 15}px`, height: `${options.size / 15}px`}" @mousedown.prevent.stop="setDegrees(90)"></div>
          <div class="wk-know-point" :style="{ 'background-color': options.setPositionColor, width: `${options.size / 15}px`, height: `${options.size / 15}px`}" @mousedown.prevent.stop="setDegrees(270)"></div>
        </div>
      </div>

      <div class="wk-know-point-wrapper wk-knob-rotate-135">
        <div class="wk-know-point-wrapper-bar">
          <div class="wk-know-point" :style="{ 'background-color': options.setPositionColor, width: `${options.size / 15}px`, height: `${options.size / 15}px`}" @mousedown.prevent.stop="setDegrees(135)"></div>
          <div class="wk-know-point" :style="{ 'background-color': options.setPositionColor, width: `${options.size / 15}px`, height: `${options.size / 15}px`}" @mousedown.prevent.stop="setDegrees(315)"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'WebskitKnobControl',
  data () {
    return {
      wheelDegrees: 0
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default: function () {
        return {
          size: 120,
          arcColor: 'rgb(53, 57, 60)',
          arcBackgroundColor: '#9b9bb5',
          internalCircleBackgroundColor: '#4d4d5a',
          handleColor: 'white',
          setPositionColor: 'gray',
          textColor: '#b4d5d8'
        }
      }
    }
  },
  mounted () {
    const me = this
    let dragging = false

    this.$nextTick(() => {
      me.$refs.knobControl.addEventListener('mousedown', (e) => {
        dragging = true
        onMousemove(e)
      })

      document.addEventListener('mouseup', () => {
        dragging = false
      })

      document.addEventListener('mousemove', (e) => {
        if (dragging) onMousemove(e)
      })

      window.addEventListener('mousewheel', mouseScroll, false)

      function mouseScroll (event) {
        if (event.wheelDelta >= 0) {
          me.wheelDegrees++
          if (me.wheelDegrees > 360) me.wheelDegrees = 0
          me.wheelDegrees = parseInt(me.wheelDegrees)
          me.setDegrees(me.wheelDegrees)
        } else {
          me.wheelDegrees--
          if (me.wheelDegrees < 0) me.wheelDegrees = 360
          me.wheelDegrees = parseInt(me.wheelDegrees)
          me.setDegrees(me.wheelDegrees)
        }
      }

      const onMousemove = (e) => {
        const eyes = document.querySelector('.wk-knob-axis')
        const mouseX = (eyes.getBoundingClientRect().left + (eyes.getBoundingClientRect().width / 2))
        const mouseY = (eyes.getBoundingClientRect().top + (eyes.getBoundingClientRect().height / 2))
        const radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY)
        const rotationDegrees = (radianDegrees * (180 / Math.PI) * -1) + 180
        me.setDegrees(rotationDegrees)
      }

      me.wheelDegrees = me.value
    })
  },
  destroyed () {
  },
  watch: {
    wheelDegrees: function (degrees) {
      this.setDegrees(parseFloat(degrees))
    }
  },
  methods: {
    setDegrees (degrees) {
      if (isNaN(degrees)) return
      if (degrees > 360) degrees = 0
      this.wheelDegrees = (degrees).toFixed(2)
      this.$refs.knobAxis.style.transform = `rotate(${degrees}deg)`
      this.$refs.knobArc.setAttribute('d', this.toArc(this.options.size / 2, this.options.size / 2, this.options.size / 3, 0, degrees))
      this.$refs.knobArc.setAttribute('stroke-width', (this.options.size / 10).toString())
      this.$refs.knobArc.setAttribute('stroke', this.options.arcColor)
      this.$emit('input', parseFloat(this.wheelDegrees))
    },
    onMouseDown (event) {
      if (event.target !== this.$refs.pointerCenter) {
        this.moving = true
        this.move(event)
      }
    },
    toArc (x, y, radius, startAngle, endAngle) {
      const start = this.ptc(x, y, radius, endAngle)
      const end = this.ptc(x, y, radius, startAngle)

      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

      return [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(' ')
    },
    ptc (centerX, centerY, radius, angleInDegrees) {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      }
    },
    onMouseUp () {
      this.moving = false
    },
    onMouseMove (event) {
      if (this.moving) {
        this.move(event)
      }
    },
    onScroll () {
    }
  }
}
</script>

<style lang="scss">
  .wk-knob-control-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    height: 100%;
  }

  .wk-knob-control {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    position: relative;
  }

  .wk-knob-axis {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }

  .wk-knob-path {
    position: absolute;
    height: 150px;
    width: 150px;
    pointer-events: none;
  }

  .wk-knob-path svg {
    height: 150px;
    width: 150px;
  }

  .wk-knob-label {
    position: absolute;
    font-family: sans-serif;
    color: #a1b1b1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 14px;
    width: 33%;
    font-weight: 700;
    pointer-events: all;
    z-index: 999999;

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance:textfield;
    }

    input {
      pointer-events: all;
      outline: none;
      border: none;
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      vertical-align: middle;
      text-align: center;
      background-color: transparent;
      font-size: 1.1em;
      line-height: 1em;
      font-family: Consolas;
      color: #abb2b3;
      font-weight: 600;
      text-shadow: 1px 1px 1px #394146;
    }
  }

  .wk-knob-circle {
    width: 85%;
    height: 85%;
    background-color: #9b9bb5;
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
  }

  .wk-knob-internal-circle {
    width: 58%;
    height: 58%;
    background-color: #4d4d5a;
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  .wk-knob-handle {
    background-color: transparent;
    width: 20px;
    height: 77%;
    position: absolute;
    pointer-events: none;
    display: flex;
    justify-content: center;
  }

  .wk-knob-handle-arrow {
    width: 20px;
    height: 20px;
    background-color: white;
    position: absolute;
    top: 0;
    z-index: 9999;
    border-radius: 50%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    pointer-events: all;
  }

  .wk-know-point-wrapper {
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-color: transparent;
    display: flex;
    position: absolute;
    justify-content: center;
  }

  .wk-know-point-wrapper-bar {
    width: 20px;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    pointer-events: none;
  }

  .wk-know-point {
    width: 10px;
    height: 10px;
    background-color: gray;
    border-radius: 50%;
    cursor: pointer;
    pointer-events: all;
  }

  .wk-knob-rotate-45 {
    transform: rotate(45deg);
  }

  .wk-knob-rotate-90 {
    transform: rotate(90deg);
  }

  .wk-knob-rotate-135 {
    transform: rotate(135deg);
  }
</style>
