<template>
  <h1 class="topheader">{{ title }}</h1>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style scoped>
.topheader {
  display: flex;
  flex-direction: column;
  overflow: visible;
  background-color: #white;
  color: black;
  margin-top: 0;
  margin-bottom: 0px;
  margin-left: 30px;
  text-align: left;
  font-weight: 500;
  border-bottom-style: solid;
}
</style>
