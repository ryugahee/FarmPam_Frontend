<template>
  <div ref="trigger">
    -
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
      // 해당 컴포넌트가 화면에 얼마나 보였을 때를 감지할 것인지 1은 100%이고 0.1은 10%
      threshold: 1
    };
    let observer = null;
    // 옵저버가 감지되면 handleIntersect이라는 함수를 실행
    const handleIntersect = (entry) => {
      if (entry.isIntersecting) emit('triggerIntersected', trigger.value);
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
      observer.value.disconnect();
    });

    return {
      trigger
    };
  }
});
</script>