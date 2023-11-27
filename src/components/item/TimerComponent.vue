<template>
  <div>
    <button @click="startTimer">타이머 시작</button>
    <button @click="stopTimer">타이머 스탑</button>
    <div>
      {{ hours }} :
      {{ minutes }} :
      {{ seconds }}
    </div>
  </div>
</template>

<script>

export default {
  name: "TimerComponent",

  data() {
    return {
      timer: null,
      totalTime: (24 * 60),
      resetButton: false,
    }
  },

  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer() {
      this.totalTime = (24 * 60);
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    padTime(time) {
      return (time < 10 ? '0' : '') + time;
    },
    countdown() {
      if(this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        this.resetTimer;
      }
    }
  },

  computed: {
/*    hours() {
      const hours =
    },*/
    minutes() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds() {
      const seconds = this.totalTime - (this.minutes * 60);
      return this.padTime(seconds);
    }
  }
}
</script>

<style scoped>

</style>