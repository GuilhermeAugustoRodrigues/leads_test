<template>
  <FormBase
    title="Criar competência"
    return-path-name="Skill"
    @save="save"
  >
    <template v-slot:form>
      <input
        class="form-control"
        type="text"
        placeholder="Nome"
        v-model="skill.title"
      />
    </template>
  </FormBase>
</template>

<script>
  import FormBase from '../../components/FormBase.vue';

  export default {
    name: "SkillCreate",

    components: {
      FormBase,
    },

    data() {
      return {
        skill: {
          title: null
        },
      };
    },

    methods: {
      async save() {
        try {
          const { data } = await this.$store.dispatch(
            "skill/create",
            this.skill
          );
          this.$router.push(`/skill/show/${data.id}`);
        } catch (e) {
          return this.$swal.fire({
            icon: "error",
            title: "Falha ao salvar colaborador",
          });
        }
      },
    },
  };
</script>
