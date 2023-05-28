<template>
  <nav
    class="sidebar border-right"
    v-if="isAuthenticated"
  >
    <div class="container-fluid">
      <ul class="list-unstyled">
        <li class="p-3 text-left font-weight-bold">
          <router-link to="/">
            <font-awesome-icon icon="home" /> Início
          </router-link>
        </li>

        <li class="p-3 text-left font-weight-bold">
          <router-link to="/employee">
            <font-awesome-icon icon="users" /> Colaboradores
          </router-link>
        </li>

        <li class="p-3 text-left font-weight-bold">
          <router-link to="/project">
            <font-awesome-icon icon="tasks" /> Projetos
          </router-link>
        </li>

        <li class="p-3 text-left font-weight-bold">
          <router-link to="/skill">
            <font-awesome-icon icon="cogs" /> Competências
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Sidebar",
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
      },
    },
  };
</script>
