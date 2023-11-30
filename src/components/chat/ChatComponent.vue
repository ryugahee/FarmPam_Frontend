<template>
  <div>
    <row>
      <div class="chat-box" ref="chatBox">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="message"
          ref="messageRef"
          :style="{ height: calculateMessageHeight(message.message) + 'px' }"
        >
          <row>
            <a
              :class="[message.who]"
              v-html="formatMessage(message.message)"
            ></a>
          </row>
        </div>
      </div>
      <div class="message-input-div" ref="inputDivRef">
        <textarea
          class="message-bar"
          placeholder="메시지 보내기"
          v-model="newMessage"
          @keydown.enter.prevent="handleEnterKey"
          rows="1"
          wrap="soft"
          ref="textareaRef"
          @input="adjustTextareaHeight"
          :style="{ height: 'auto' }"
        >
        </textarea>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          @click="sendMessage"
          class="send-button"
        >
          <mask
            id="mask0_530_2375"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="40"
            height="40"
          >
            <rect width="40" height="40" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_530_2375)">
            <path
              d="M4.375 29.1663V5.83301L32.0833 17.4997L4.375 29.1663ZM7.29167 24.7913L24.5729 17.4997L7.29167 10.208V15.3122L16.0417 17.4997L7.29167 19.6872V24.7913Z"
              fill="#D9D9D9"
            />
          </g>
        </svg>
      </div>
    </row>
  </div>
</template>
<script>
export default {
  name: "ChatComponent",
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      messages: [
        { who: "me", message: "안녕하세요" },
        { who: "you", message: "너무 귀여워요" },
        { who: "me", message: "샤인머스켓 맛있겠다." },
        { who: "me", message: "샤인머스켓 맛있겠다." },
        { who: "you", message: "개맛도링" },
      ],
      newMessage: "",
      textareaHeight: "40px",
    };
  },
  mounted() {
    this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({ who: "me", message: this.newMessage });
        this.newMessage = "";
      }

      const textarea = this.$refs.textareaRef;
      textarea.style.height = "auto";

      const inputDiv = this.$refs.inputDivRef;
      inputDiv.style.height = "70px";

      this.$nextTick(() => {
        this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
      });
    },
    adjustTextareaHeight() {
      const textarea = this.$refs.textareaRef;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;

      const inputDiv = this.$refs.inputDivRef;
      inputDiv.style.height = `${textarea.scrollHeight + 20}px`;
    },
    handleEnterKey(event) {
      if (event.shiftKey) {
        this.newMessage += "\n";
        this.adjustTextareaHeight();
      } else {
        this.sendMessage();
      }
    },
    formatMessage(message) {
      return message.replace(/\n/g, "<br>");
    },
    calculateMessageHeight(message) {
      const brCount = (message.match(/\n/g) || []).length;
      const minHeight = 36;
      return minHeight + brCount * 16;
    },
  },
};
</script>

<style scoped>
@import "../../../public/assets/css/chat-style.css";
</style>
