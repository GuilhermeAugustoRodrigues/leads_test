<template>
  <div class="skill">
    <div class="card shadow-sm">
      <div class="card-header d-flex align-items-center">
        <h6 class="font-weight-bold text-primary mb-0">Competências</h6>

        <div class="ml-auto d-flex align-items-center">
          <router-link
            to="/skill/create"
            class="btn btn-primary btn-sm flex-shrink-0 ml-3"
            >Adicionar competência</router-link
          >
        </div>
      </div>

      <div class="ui-crud card-body p-0">
        <div class="ui-crud__body row">
          <div class="ui-crud__list col-md-4">
            <ul class="list-group list-group-flush ui-crud__scroll">
              <li
                class="list-group-item"
                v-for="item in skills"
                :key="item.id"
              >
                <router-link
                  :to="{ name: 'SkillShow', params: { id: item.id } }"
                  class="d-flex align-items-center"
                >
                  <div class="ml-3">
                    <h6 class="font-weight-bold">
                      {{ item.title }}
                    </h6>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>

          <div class="ui-crud__view col-md-8">
            <div class="ui-crud__scroll">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch("skill/find");
    },

    computed: {
      skills() {
        return this.$store.getters["skill/getAll"];
      },
    },
  };
</script>
