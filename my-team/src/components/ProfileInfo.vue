<template>
  <n-space vertical>
    <n-table striped>
      <tbody>
        <tr>
          <td>Email</td>
          <td>insert email here</td>
        </tr>          
        <tr>
          <td>Phone</td>
          <td>12345678</td>
        </tr>
        <tr>
          <td>Position</td>
          <td>insert position here</td>
        </tr>
        <tr>
          <td>Password
              <n-switch v-model:value="showPassword" size="small">
                <template #icon>
                <i class="fas" :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i>
                </template>
              </n-switch>
          </td>
          <td v-if="showPassword">insert password</td>
          <td v-else>************</td>
        </tr>
      </tbody>
    </n-table>
  </n-space>

</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    return {
      showPassword: ref(false)
    }
  }
})
</script>
