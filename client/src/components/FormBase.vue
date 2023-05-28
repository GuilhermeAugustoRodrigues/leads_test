<template>
  <div>
    <div class="card border-0">
      <div class="card-header">
        <h6 class="mb-0 font-weight-bold">{{ title }}</h6>
      </div>

      <ul class="list-group list-group-flush">
        <div>
          <div class="form-group mb-3">
            <li class="list-group-item">
              <slot name="form">
              </slot>
            </li>

            <li class="list-group-item text-right">
              <router-link
                :to="{ name: returnPathName }"
                class="btn btn-outline-primary ml-3"
              >
                Voltar
              </router-link>

              <button
                type="button"
                class="btn btn-primary ml-3"
                @click="emitSave"
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
    name: "FormBase",

    props: {
      title: String,
      returnPathName: String,
    },

    methods: {
      emitSave() {
        this.$emit('save');
      }
    }
  };
</script>
