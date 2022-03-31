<template>
  <n-space>
    <n-progress type="circle" :percentage=75>
        <span style="text-align: center"></span>
    </n-progress>
    <n-progress type="circle" status="info" :percentage="percentage" />
    <n-progress type="circle" status="success" :percentage="percentage" />
    <n-progress type="circle" status="warning" :percentage="percentage" />
    <n-progress type="circle" status="error" :percentage="percentage" />
  </n-space>
  <n-space>
    <n-button @click="minus">
      Minus 10%
    </n-button>
    <n-button @click="add">
      Add 10%
    </n-button>
  </n-space>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const percentageRef = ref(0);
    
    const add = () => {
      percentageRef.value += 10;
      if (percentageRef.value > 100) {
        percentageRef.value = 0;
      }
    };
    
    const minus = () => {
      percentageRef.value -= 10;
      if (percentageRef.value < 0) {
        percentageRef.value = 100;
      }
    };
    
    return {
      percentage: percentageRef,
      add,
      minus
    };
  }
});
</script>