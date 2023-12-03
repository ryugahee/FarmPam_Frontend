<template>
  <div>
    <button @click="startTimer">타이머 시작</button>
    <hr>
    <button @click="stopTimer">타이머 스탑</button>
    <hr>
    <div class="show-timer">
      {{ hours }} : {{ minutes }} : {{ seconds }}
    </div>
    <hr>
    <select v-model="totalTime">
      <option value="10">30분</option>
      <option value="3600">1시간</option>
      <option value="7200">2시간</option>
      <option value="10800">3시간</option>
      <option value="21600">6시간</option>
      <option value="43200">12시간</option>
      <option value="86400">24시간</option>
    </select>
  </div>
</template>

<script>

export default {
  name: "TimerComponent",

  data() {
    return {
      timer: null,
      totalTime: '',
    }
  },

  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
    },
    padTime(time) {
      return (time < 10 ? '0' : '') + time;
    },
    countdown() {
      if(this.totalTime > 0) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        clearInterval(this.timer);
      }

      const remainingHours = Math.floor(this.totalTime / 3600);
      const remainingMinutes = Math.floor((this.totalTime % 3600) / 60);
      const remainingSeconds = this.totalTime % 60;

      this.hours = this.padTime(remainingHours);
      this.minutes = this.padTime(remainingMinutes);
      this.seconds = this.padTime(remainingSeconds);
    },
/*    updateTotalTime() {
      this.totalTime = this.selectedInterval * 3600;
    },*/

  },
  computed: {
    hours: {
      get() {
        return this.padTime(Math.floor(this.totalTime / 3600));
      },
    },
    minutes: {
      get() {
        return this.padTime(Math.floor((this.totalTime % 3600) / 60));
      },
    },
    seconds: {
      get() {
        return this.padTime(this.totalTime % 60);
      },
    },
  }
}
</script>

<style scoped>
.show-timer {
  font-size: 50px;
}
</style>