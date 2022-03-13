<template>
    <div id="nav">
        <router-link to = "/ProjectPage">ProjectPage</router-link> | 
        <router-link to = '/HomePage'>HomePage</router-link>
    </div>
    <router-view/>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>

</style>
