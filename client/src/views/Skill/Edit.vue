<template>
  <FormBase
    v-if="skill"
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

    created() {
      this.fetchData();
    },

    computed: {
      skill() {
        return this.$store.getters["skill/getById"](this.$route.params.id);
      },
    },

    methods: {
      fetchData() {
        this.$store.dispatch("skill/findOne", this.$route.params.id);
      },

      async save() {
        try {
          await this.$store.dispatch("skill/update", this.skill);
          this.$router.push(`/skill/show/${this.skill.id}`);
        } catch (e) {
          return this.$swal.fire({
            icon: "error",
            title: "Falha ao salvar competência",
          });
        }
      },
    },

    watch: {
      $route: "fetchData",
    },
  };
</script>
