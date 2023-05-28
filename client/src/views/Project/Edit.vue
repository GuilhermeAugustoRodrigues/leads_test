<template>
  <FormBase
    v-if="project"
    title="Editar projeto"
    return-path-name="ProjectShowSkill"
    @save="save"
  >
    <template v-slot:form>
      <div class="form-group">
        <label>Título</label>
        <input
          class="form-control"
          type="text"
          placeholder="Nome"
          v-model="project.title"
        />
      </div>

      <div class="form-group mt-3">
        <label>Descrição</label>
        <textarea
          class="form-control"
          placeholder="Descrição"
          v-model="project.description"
        />
      </div>
    </template>
  </FormBase>
</template>

<script>
  import FormBase from '../../components/FormBase.vue';

  export default {
    name: "ProjectEdit",

    components: {
      FormBase,
    },

    created() {
      this.fetchData();
    },

    computed: {
      project() {
        return this.$store.getters["project/getById"](this.$route.params.id);
      },
    },

    methods: {
      fetchData() {
        this.$store.dispatch("project/findOne", this.$route.params.id);
      },

      async save() {
        try {
          await this.$store.dispatch("project/update", this.project);
          this.$router.push(`/project/show/${this.project.id}`);
        } catch (e) {
          return this.$swal.fire({
            icon: "error",
            title: "Falha ao salvar projeto",
          });
        }
      },
    },

    watch: {
      $route: "fetchData",
    },
  };
</script>
