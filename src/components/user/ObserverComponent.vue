<template>
  <div ref="trigger">
    a
  </div>
</template>

<script>
import {
  defineComponent, onMounted, onUnmounted, ref
} from 'vue';

export default defineComponent({
  setup(props, { emit }) {
    const trigger = ref();
    const options = {
      root: null,
      threshold: 1
    };
    let observer = null;
    // 옵저버가 감지되면 handleIntersect이라는 함수를 실행
    const handleIntersect = (entry) => {
      try {
        if (entry.isIntersecting) {
          emit('triggerIntersected', trigger.value);
        }
      } catch (error) {
        console.error('Error during handleIntersect:', error);
      }
    };

    onMounted(() => {
      try {
        observer = new IntersectionObserver((entries) => {
          handleIntersect(entries[0]);
        }, options);
        observer.observe(trigger.value);
      } catch (err) {
        console.error(err);
      }
    });

    onUnmounted(() => {
      if (observer.value) {
        observer.value.disconnect();
      }
    });

    return {
      trigger
    };
  }
});
</script>