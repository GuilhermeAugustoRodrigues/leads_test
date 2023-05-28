<template>
  <FormBase
    v-if="employee"
    title="Editar colaborador"
    return-path-name="EmployeeShowSkill"
    @save="save"
  >
    <template v-slot:form>
      <Form v-model="employee" />
    </template>
  </FormBase>
</template>

<script>
  import FormBase from '../../components/FormBase.vue';
  import Form from "../../components/EmployeeForm.vue";

  export default {
    name: "EmployeeEdit",

    components: {
      FormBase,
      Form,
    },

    created() {
      this.fetchData();
    },

    computed: {
      employee() {
        return this.$store.getters["employee/getById"](this.$route.params.id);
      },
    },

    methods: {
      fetchData() {
        this.$store.dispatch("employee/findOne", this.$route.params.id);
      },

      async save() {
        try {
          await this.$store.dispatch("employee/update", this.employee);
          this.$router.push(`/employee/show/${this.employee.id}`);
        } catch (e) {
          return this.$swal.fire({
            icon: "error",
            title: "Falha ao salvar colaborador",
          });
        }
      },
    },

    watch: {
      $route: "fetchData",
    },
  };
</script>
