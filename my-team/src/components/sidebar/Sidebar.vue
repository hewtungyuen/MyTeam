<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <img id = "logo" src="@/assets/logo.png">
    
      <SidebarLink to = '/HomePage' icon = "fa-solid fa-house" >Home</SidebarLink>
      <SidebarLink to = "/ProfilePage" icon = "fa-solid fa-address-card" >Profile</SidebarLink>
      <SidebarLink to = "/ColleaguesPage" icon = "fa-solid fa-magnifying-glass" >Colleagues</SidebarLink>
      

      <span class="collapse-icon" 
      :class="{ 'rotate-180': collapsed }" 
      @click="toggleSidebar">
          <i class = "fas fa-angle-double-left" />
      </span>

      <SidebarLink id = "logout" to = "/" icon = "fa-solid fa-arrow-right-from-bracket" >Logout</SidebarLink>
  </div>
</template>

<script>
import SidebarLink from './SidebarLink.vue'
import { collapsed, toggleSidebar, sidebarWidth} from './state'
export default {
    props: {},
    components: {SidebarLink},
    setup() {
        return { collapsed, toggleSidebar, sidebarWidth}
    }
}
</script>

<style>
:root {
    --sidebar-bg-color: #2f855a;
    --sidebar-item-hover: #38a169;
    --sidebar-item-active: #276749;
}

</style>

<style scoped>
.sidebar {
    colour: white;
    background-color: var(--sidebar-bg-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.7em;

    transition: 0.3s ease-out;

    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 15px #0A311C;


}

.collapse-icon {
    position: fixed;
    bottom: 0;
    padding: 0.75em;

    color: raba(255,255,255,0.7);

    transition: 0.2s ease-out;
}

.rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s ease-out;
}

#logo {
    padding-bottom: 1em;
}



</style>