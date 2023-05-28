<template>
  <div
    class="skill-show"
    v-if="skill"
  >
    <div class="card border-0">
      <div class="card-header d-flex align-items-center">
        <h6 class="mb-0 font-weight-bold">Dados Gerais</h6>

        <div class="ml-auto">
          <router-link
            :to="{ name: 'SkillEdit', params: { id: skill.id } }"
            class="btn btn-link py-0"
          >
            <font-awesome-icon icon="edit" />
          </router-link>

          <button
            type="button"
            class="btn btn-link py-0 text-danger"
            @click="removeSkill"
          >
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </div>

      <ul class="list-group list-group-flush py-3">
        <li class="list-group-item">
          <div class="row">
            <div class="col-md-6 d-flex align-items-center">
              <div class="ml-4">
                <h6 class="font-weight-bold">
                  {{ skill.title }}
                </h6>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <router-view />
  </div>
</template>

<script>
  export default {
    created () {
      this.fetchData();
    },

    computed: {
      skill () {
        return this.$store.getters["skill/getById"](this.$route.params.id);
      },
    },

    methods: {
      fetchData () {
        this.$store.dispatch("skill/findOne", this.$route.params.id);
      },

      async removeSkill () {
        try {
          const { value } = await this.$swal.fire({
            icon: "info",
            title: "Deseja remover esta competência?",
            text: "Ela será removida de todos os registros associados",
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
          });

          if (!value) {
            return;
          }

          await this.$store.dispatch("skill/destroy", this.$route.params.id);
          this.$router.push(`/skill`);

          return this.$swal.fire("A competência foi removida");
        } catch (e) {
          return this.$swal.fire({
            icon: "error",
            title: "Falha ao remover competência",
          });
        }
      },
    },

    watch: {
      $route: "fetchData",
    },
  };
</script>
