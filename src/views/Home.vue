<template>
  <div class="container">
    <AddUser v-if="adding"/>
    <UsersList :data="data"/>
    <div class="profile"
         v-for="user in data"
         :key="user.id">
      <UserProfile
        :user="user"
        v-if="user.choise"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UsersList from "@/components/UsersList.vue"
import UserProfile from "@/components/UserProfile.vue"
import AddUser from "@/components/AddUser.vue"
export default {
  name: 'Home',
  computed: {
    ...mapState({
      data: state => state.users,
      user: state => state.choisedUser,
      adding: state => state.adding
    })
  },
  
  components: {
    UsersList,
    UserProfile,
    AddUser
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #E5E5E5;
    width: 100vw;
    height: 100vh;
  }
</style>
