<template>
  <FormBase
    title="Criar colaborador"
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
    name: "EmployeeCreate",

    components: {
      FormBase,
      Form,
    },

    data() {
      return {
        employee: this.getEmptyEmployee(),
      };
    },

    methods: {
      async save() {
        try {
          const { data } = await this.$store.dispatch(
            "employee/create",
            this.employee
          );
          this.$router.push(`/employee/show/${data.id}`);
        } catch (e) {
          return this.$swal.fire({
            icon: "error",
            title: "Falha ao salvar colaborador",
          });
        }
      },

      getEmptyEmployee() {
        return {
          avatarUrl: null,
          company: null,
          firstName: null,
          lastName: null,
          email: null,
          createdAt: null,
          updatedAt: null,
        };
      },
    },
  };
</script>
