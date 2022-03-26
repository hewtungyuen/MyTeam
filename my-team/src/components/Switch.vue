<template>
  <n-space>
    <n-switch v-model:value="active">
        <template #unchecked>
            Show Password
        </template>
        <template #checked>
            Hide Password
        </template>
    </n-switch>
  </n-space>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    return {
      active: ref(true)
    }
  }
})
</script>