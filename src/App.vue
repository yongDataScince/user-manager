<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  methods: {
    ...mapActions({
      load: "loadUsers"
    })
  },

  async mounted() {
    await this.load()
  }
}
</script>

