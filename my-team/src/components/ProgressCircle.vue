<template>
<div>

  <n-space>
    <n-progress type="circle" :percentage= completed*100/total status="success">
        <span style="text-align: center" > Completed: {{completed}} hours</span>
    </n-progress>
    <n-progress type="circle" :percentage= inProgress*100/total status="warning">
        <span style="text-align: center" > In progress: {{inProgress}} hours</span>
    </n-progress>
    <n-progress type="circle" :percentage= overdue*100/total status="error">
        <span style="text-align: center" > Overdue: {{overdue}} hours</span>
    </n-progress>
  </n-space>
  Total hours of work: {{this.total}} hours
</div>
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
  },
  data() {
    return{
      total:this.completed+this.inProgress+this.overdue,
    }
  },
  props:{
    completed:Number,
    inProgress:Number,
    overdue:Number,
  }
});
</script>