<template>
  <div class="item">
    <div class="main-body" @click="choise(data.id)">
      <div class="avatar"></div>
      <div class="item-info">
        <div class="name">{{ data.fullname }}</div>
        <div class="date">
          Created {{ days }} days ago
        </div>

      </div>
    </div>
    <button class="trash-btn" @click="remove(data)"></button>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  props: {
    data: {
      type: Object,
      require: true
    }
  },

  computed: {
    days(){
      return Math.floor(Math.abs(new Date().getTime() - this.data.created_at) / 1000 / 3600 / 24)
    }
  },

  methods: {
    ...mapActions({
      choise: "choiseUser",
      remove: "removeUser"
    })
  }
}
</script>

<style lang="scss" scoped>
  .item {
    width: 100%;
    min-height: 70px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 8px;
    padding: 0 13px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: .2s;
    &:hover {
      background: rgba(245, 245, 245, 0.349);
    }
    &:active {
      background: rgba(243, 243, 243, 0.863);
    }
    .avatar {
      width: 44px;
      height: 44px;
      margin-right: 16px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      
    }

    &-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      min-width: 120px;
      .name {
        font-weight: 600;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
      }

      .date {
        font-weight: 500;
        font-size: 13px;
        line-height: 120%;
        margin-top: 6px;
        color: rgba(0, 0, 0, 0.4);
      }
    }

    .main-body {
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    .trash-btn {
      width: 20px;
      height: 20px;
      border: none;
      background: none;
      margin-left: auto;
      background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 2C8.81434 2.0001 8.63237 2.05188 8.47447 2.14955C8.31658 2.24722 8.18899 2.38692 8.106 2.553L7.382 4H4C3.73478 4 3.48043 4.10536 3.29289 4.29289C3.10536 4.48043 3 4.73478 3 5C3 5.26522 3.10536 5.51957 3.29289 5.70711C3.48043 5.89464 3.73478 6 4 6V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H14C14.5304 18 15.0391 17.7893 15.4142 17.4142C15.7893 17.0391 16 16.5304 16 16V6C16.2652 6 16.5196 5.89464 16.7071 5.70711C16.8946 5.51957 17 5.26522 17 5C17 4.73478 16.8946 4.48043 16.7071 4.29289C16.5196 4.10536 16.2652 4 16 4H12.618L11.894 2.553C11.811 2.38692 11.6834 2.24722 11.5255 2.14955C11.3676 2.05188 11.1857 2.0001 11 2H9ZM7 8C7 7.73478 7.10536 7.48043 7.29289 7.29289C7.48043 7.10536 7.73478 7 8 7C8.26522 7 8.51957 7.10536 8.70711 7.29289C8.89464 7.48043 9 7.73478 9 8V14C9 14.2652 8.89464 14.5196 8.70711 14.7071C8.51957 14.8946 8.26522 15 8 15C7.73478 15 7.48043 14.8946 7.29289 14.7071C7.10536 14.5196 7 14.2652 7 14V8ZM12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V14C11 14.2652 11.1054 14.5196 11.2929 14.7071C11.4804 14.8946 11.7348 15 12 15C12.2652 15 12.5196 14.8946 12.7071 14.7071C12.8946 14.5196 13 14.2652 13 14V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7Z' fill='black' fill-opacity='0.2'/%3E%3C/svg%3E");
    }
  }
</style>
