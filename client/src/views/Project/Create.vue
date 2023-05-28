<template>
  <FormBase
    title="Criar projeto"
    return-path-name="Project"
    @save="save"
  >
    <template v-slot:form>
      <div class="form-group">
        <label>Título</label>
        <input
          class="form-control"
          type="text"
          placeholder="Nome"
          v-model="title"
        />
      </div>

      <div class="form-group mt-3">
        <label>Descrição</label>
        <textarea
          class="form-control"
          placeholder="Descrição"
          v-model="description"
        />
      </div>
    </template>
  </FormBase>
</template>

<script>
  import FormBase from '../../components/FormBase.vue';

  export default {
    name: "ProjectCreate",

    components: {
      FormBase,
    },

    data() {
      return {
        title: null,
        description: null,
      };
    },

    methods: {
      async save() {
        try {
          let { data } = await this.$store.dispatch(
            "project/create",
            this.$data
          );
          this.$router.push(`/project/show/${data.id}`);
        } catch (e) {
          return this.$swal.fire({
            icon: "error",
            title: "Falha ao criar projeto",
          });
        }
      },
    },
  };
</script>
