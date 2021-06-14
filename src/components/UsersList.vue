<template>
  <div class="user-list" v-click-outside="clear">
    <div class="user-list__header">
      <input type="text" 
             class="user-list__header--input"
             placeholder="Search user"
             v-model="username">
      <div class="user-list__header--info">
        <div class="counter">
          {{ findUsers.length }} 
          <span>items</span>
          <button class="add-user" @click="TOGGLE_MODE(true)">
            Add User
          </button>
        </div>
        <button @click="sortByDate" v-if="findUsers.length > 0">Sort by date</button>
      </div>
    </div>
    <div class="user-list__body" v-if="findUsers.length > 0">
      <Item 
          v-for="i in findUsers"
          :key="i.id"
          :data="i"
      />
    </div>

    <div class="no-users" v-else>
      <p>Users not found</p>
    </div>
    
  </div>
</template>

<script>
import Item from "./Item.vue"
import { mapActions, mapGetters, mapMutations } from "vuex"
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    username: ''
  }),

  methods: {
    ...mapActions(['sortByDate', 'searchUser']),
    ...mapMutations(['TOGGLE_MODE']),
    clear() {
      this.username = ''
    }
  },

  watch: {
    username(e) {

      this.searchUser(e)
    }
  },

  computed: {
    ...mapGetters(['findUsers'])
  },

  components: {
    Item
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";
.user-list {
  @include block;
  &__header {
    width: 100%;
    height: 78px;
    margin-bottom: 12px;

    &--input {
      background: #0000000d;
      border-radius: 5px;
      width: 100%;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      text-align: center;
      margin-bottom: 24px;
      
      &:focus {
        outline: none;
      }

      &::placeholder {
        text-align: center;
        color: #0000004d;
      }
    }

    &--info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-style: normal;
      font-weight: 600;
      font-size: 13px;

      .counter {
        color: black;

        span {
          color: #00000066;
        }
      }

      button {
        border: none;
        background: none;
        color: #2F80ED;
        font-weight: 600;
        font-size: 13px;
        &:focus {
          outline: none;
        }
      }
    }
  }
  
  &__body {
    width: 100%;
    max-height: 87%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
  }

  .no-users {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.4);
  }

  .add-user {
    margin-left: 20px;
  }
}
</style>