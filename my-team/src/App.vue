<template>
    <div id="nav">
        <Sidebar />
        <router-view/>
    </div>
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar'
import { sidebarWidth } from '@/components/sidebar/state'
export default {
    name: 'App',
    components: { Sidebar },

    setup() {
        return {sidebarWidth}
    }
}
</script>

<style>
:root {
    margin-left: 60px
}

</style>
