<template>
  <div class="employee-edit" v-if="employee">
    <div class="card border-0">
      <div class="card-header">
        <h6 class="mb-0 font-weight-bold">Criar Colaborador</h6>
      </div>

      <ul class="list-group list-group-flush">
        <Form v-model="employee" />

        <li class="list-group-item text-right">
          <router-link :to="{ name: 'EmployeeShowSkill' }" class="btn btn-outline-primary ml-3">
            Voltar
          </router-link>

          <button type="button" class="btn btn-primary ml-3" @click="save">Salvar</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Form from '../../components/EmployeeForm.vue';

export default {
  name: 'CreateEmployee',
  components: {
    Form
  },

  data () {
    return {
      employee: this.getEmptyEmployee()
    }
  },

  methods: {
    async save () {
      try {
        const { data } = await this.$store.dispatch('employee/create', this.employee);
        this.$router.push(`/employee/show/${data.id}`);
      } catch (e) {
        return this.$swal.fire({
          icon: 'error',
          title: 'Falha ao salvar colaborador'
        });
      }
    },

    getEmptyEmployee () {
      return {
        avatarUrl: null,
        company: null,
        firstName: null,
        lastName: null,
        email: null,
        createdAt: null,
        updatedAt: null
      };
    }
  },
}
</script>
