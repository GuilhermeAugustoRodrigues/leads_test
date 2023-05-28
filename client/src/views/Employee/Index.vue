<template>
  <IndexBase
    title="Colaboradores"
    model-name="Colaborador"
    add-model-link="/employee/create"
    :items="employees"
  >
    <template v-slot:item="{ item }">
      <router-link
        :to="{ name: 'EmployeeShowSkill', params: { id: item.id } }"
        class="d-flex align-items-center"
      >
        <Avatar
          class="avatar-5 flex-shrink-0"
          :item="item"
        />

        <div class="ml-3">
          <h6 class="font-weight-bold">
            {{ item.firstName }} {{ item.lastName }}
          </h6>
          <h6 class="mb-0 text-truncate">
            {{ item.email || "Email não informado" }}
          </h6>
        </div>
      </router-link>
    </template>
  </IndexBase>
</template>

<script>
  import Avatar from "@/components/Avatar.vue";
  import IndexBase from "@/components/IndexBase.vue";

  export default {
    components: {
      Avatar,
      IndexBase,
    },

    created() {
      this.$store.dispatch("employee/find");
    },

    computed: {
      employees() {
        return this.$store.getters["employee/getAll"];
      },
    },
  };
</script>
