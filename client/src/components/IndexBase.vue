<template>
  <div>
    <div class="card shadow-sm">
      <div class="card-header d-flex align-items-center">
        <h6 class="font-weight-bold text-primary mb-0">{{ title }}</h6>

        <div class="ml-4 d-flex align-items-center">
          <input
            class="form-control flex-shrink-0"
            type="text"
            placeholder="Buscar"
            v-model="search"
          />
        </div>

        <div class="ml-auto d-flex align-items-center">
          <router-link
            :to="addModelLink"
            class="btn btn-primary btn-sm flex-shrink-0 ml-3"
          >
            {{ `Adicionar ${modelName.toLowerCase()}` }}
          </router-link>
        </div>
      </div>

      <div class="ui-crud card-body p-0">
        <div class="ui-crud card-body p-0">
          <div class="ui-crud__body row">
            <div class="ui-crud__list col-md-4">
              <ul class="list-group list-group-flush ui-crud__scroll">
                <li
                  class="list-group-item"
                  v-for="item in filteredItems"
                  :key="item.id"
                >
                  <slot name="item" v-bind:item="item">
                  </slot>
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
  </div>
</template>

<script>
  export default {
    name: 'IndexBase',

    props: {
      items: Array,
      title: String,
      modelName: String,
      addModelLink: String,
    },

    data () {
      return {
        search: null,
      };
    },

    computed: {
      filteredItems () {
        if (!this.search) {
          return this.items;
        }

        return this.items.filter(item => JSON.stringify(item).includes(this.search))
      }
    }
  };
</script>
