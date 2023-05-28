<template>
  <li class="list-group-item">
    <div class="row">
      <div class="col-md-6 d-flex align-items-start">
        <Avatar
          class="avatar-7 flex-shrink-0"
          :item="employee"
        />

        <div class="ml-4">
          <div class="form-group mb-3">
            <label>Nome</label>
            <input
              class="form-control"
              type="text"
              placeholder="Nome"
              v-model="employee.firstName"
            />
          </div>

          <div class="form-group mb-3">
            <label>Sobrenome</label>
            <input
              class="form-control"
              type="text"
              placeholder="Sobrenome"
              v-model="employee.lastName"
            />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input
              class="form-control"
              type="email"
              placeholder="Email"
              v-model="employee.email"
            />
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
  import Avatar from "@/components/Avatar.vue";

  export default {
    components: {
      Avatar,
    },

    props: {
      value: {
        type: Object,
        required: true,
      },
    },

    computed: {
      employee: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit("input", value);
        },
      },
    },
  };
</script>
