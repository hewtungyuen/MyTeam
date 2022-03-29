<template>
<div v-if = "leader">
  <n-button id="modalBut" @click="show()">
    + Member
  </n-button>
  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      title="Add A Task"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
    <form id="addMemForm">
          <label>Add New Members: </label> <br />
          <n-input
            type="text"
            id="emailInput"
            round
            placeholder="Enter Email"
            size="large"
            v-model:value="member"
            autosize
            style="min-width: 80%"
            clearable
          />
          <n-button
            strong
            secondary
            round
            type="success"
            id="addBut"
            @click="addMember()"
          >
            +
          </n-button>
          <br /><br />
          <label>Team Members: </label> <br />
          <div id="members"></div>
        </form>
    </n-card>
  </n-modal>
</div>
</template>

<script>
export default {

}
</script>

<style>
#members {
  height: 150px;
  background-color: rgb(165, 233, 210);
}
</style>