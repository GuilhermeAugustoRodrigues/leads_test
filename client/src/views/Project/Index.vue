<template>
  <IndexBase
    title="Projetos"
    model-name="Projeto"
    add-model-link="/project/create"
    :items="projects"
  >
    <template v-slot:item="{ item }">
      <router-link
        :to="{ name: 'ProjectShowSkill', params: { id: item.id } }"
      >
        <h6 class="font-weight-bold">{{ item.title }}</h6>
        <h6 class="mb-0">
          {{ item.description || "Descrição não informada" }}
        </h6>
      </router-link>
    </template>
  </IndexBase>
</template>

<script>
  import IndexBase from "@/components/IndexBase.vue";

  export default {
    components: {
      IndexBase,
    },

    created() {
      this.$store.dispatch("project/find");
    },

    computed: {
      projects() {
        return this.$store.getters["project/getAll"];
      },
    },
  };
</script>
