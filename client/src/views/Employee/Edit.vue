<template>
  <div
    class="employee-edit"
    v-if="employee"
  >
    <div class="card border-0">
      <div class="card-header">
        <h6 class="mb-0 font-weight-bold">Editar Colaborador</h6>
      </div>

      <ul class="list-group list-group-flush">
        <Form v-model="employee" />

        <li class="list-group-item text-right">
          <router-link
            :to="{ name: 'EmployeeShowSkill' }"
            class="btn btn-outline-primary ml-3"
          >
            Voltar
          </router-link>

          <button
            type="button"
            class="btn btn-primary ml-3"
            @click="save"
          >
            Salvar
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Form from "../../components/EmployeeForm.vue";

  export default {
    components: {
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
