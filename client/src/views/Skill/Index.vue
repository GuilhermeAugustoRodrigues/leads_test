<template>
  <IndexBase
    title="Competências"
    model-name="competência"
    add-model-link="/skill/create"
    :items="skills"
  >
    <template v-slot:item="{ item }">
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
    </template>
  </IndexBase>
</template>

<script>
  import IndexBase from "@/components/IndexBase.vue";

  export default {
    components: {
      IndexBase,
    },

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
