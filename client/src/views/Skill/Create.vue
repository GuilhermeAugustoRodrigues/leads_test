<template>
  <div
    class="skill-edit"
    v-if="skill"
  >
    <div class="card border-0">
      <div class="card-header">
        <h6 class="mb-0 font-weight-bold">Criar Colaborador</h6>
      </div>

      <ul class="list-group list-group-flush">
        <div>
          <div class="form-group mb-3">
            <input
              class="form-control"
              type="text"
              placeholder="Nome"
              v-model="skill.title"
            />

            <li class="list-group-item text-right">
              <router-link
                :to="{ name: 'Skill' }"
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
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SkillCreate",

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
