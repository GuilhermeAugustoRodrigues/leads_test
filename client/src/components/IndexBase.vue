<template>
  <div :class="rootClass">
    <div class="card shadow-sm">
      <div class="card-header d-flex align-items-center">
        <h6 class="font-weight-bold text-primary mb-0">{{ title }}</h6>

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
                  v-for="item in items"
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
      rootClass: String,
    }
  };
</script>
