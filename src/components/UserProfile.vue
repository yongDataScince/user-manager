<template>
  <div class="user-profile"
       :id="user.id"
  >
    <div class="user-profile__header">
      <div class="avatar"></div>
      <div class="fullname">{{ user.fullname }}</div>
      <div class="username">@{{ user.username }}</div>
    </div>
    <div class="user-profile__body">
      <div class="edit-form">
        <label for="date">Created at</label>
        <input disabled type="text" id="date" class="input" :placeholder="date">

        <label for="username">Username</label>
        <input type="text" 
               id="username" 
               class="input" 
               :placeholder="`@${user.username}`"
               v-model="userData.username">

        <label for="email">Email</label>
        <input type="text" 
               id="email" 
               class="input"
               :placeholder="user.email"
               v-model="userData.email">

        <label for="tags">Tags</label>
        <div class="group">
          <div class="field input">
            <div class="container">
              <div class="tag" 
                 v-for="tag in user.tags"
                 :key="tag">
                  {{ tag }}
              </div>
            </div>
          </div>
          <button class="add" :disabled="user.tags.length>=5" @click="openTagsDropdown" >
            <i class="icon-add"></i>
          </button>
          <div v-show="tagsDropdownTrigger && avaiableTags.length > 0" class="tags-drop">
            <div v-for="tag in avaiableTags" 
                 :key="tag"
                 @click="choiseTag(tag)"
                 class="tags-drop__item">
              {{ tag }}
            </div>
          </div>
        </div>

        <label for="curator">Curator</label>
        <Dropdown 
          @selected="selected"
          :options="curators"
          :name="userData.curator"
          :placeholder="curator"
          :maxItem="5"
        />

        <div class="form-footer">
          <button :disabled="disableSave" @click="save(user)" class="save-btn">
            <i class="icon-save"></i>
            Save changes
          </button>
          <button :disabled="!this.user.saved" @click="discard(user.id)" class="discard-btn">
            <i class="icon-discard"></i>
            Discard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import Dropdown from "@/components/Dropdown.vue"
export default {
  props: {
    user: {
      type: Object,
      require: true
    }
  },

  data: () => ({
    userData: {},
    disableSave: true,
    tagsDropdownTrigger: false,
    enable: ''
  }),

  computed: {
    ...mapGetters(['curators', 'avaiableTags']),

    date() {
      let date = new Date(this.user.created_at)
      return date.toLocaleString().split(' ')[0].replace(',', '')
    },

    curator() {
      return this.user.curator ? "@" + this.user.curator : "@curator_username"
    }
  },

  methods: {
    ...mapActions({
      saveUser: 'saveUser',
      addTag: 'addTag',
      discardUser: 'discardUser'
    }),

    async save() {
      let edited_user = {...this.user, ...this.userData}
      await this.saveUser(edited_user)
      this.disableSave = true
    },

    discard(id) {
      this.discardUser(id)
      this.disableSave = true
      this.userData = {}
    },

    selected(data) {
      this.userData.curator = data 
    },

    openTagsDropdown() {
      this.tagsDropdownTrigger = !this.tagsDropdownTrigger
    },

    choiseTag(name) {
      this.addTag(name)
      this.tagsDropdownTrigger = false
    },

    enableInp(name) {
      this.enable = name
    }
  },

  watch: {
    userData: {
      handler(e) {
        this.userData.username = e.username.trim()
        this.userData.email = e.email.trim()
        this.userData.curator = e.curator.trim()

        if(e.username || e.email || e.curator) {
          this.disableSave = false
        } else {
          this.disableSave = true
        }
      },
      deep: true
    },

    user: {
      handler(e) {
        this.disableSave = e != this.userData
      },
      deep: true
    }
  },

  components: {
    Dropdown
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";
.user-profile {
  @include block;
  margin-left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 50px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    margin-bottom: 32px;
    .avatar {
      width: 100px;
      height: 100px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      margin-bottom: 24px;
    }
    .fullname {
      font-weight: 600;
      font-size: 16px;
    }
    .username {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.4);
    }
  }

  &__body {
    width: 100%;
    .edit-form {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;
      
      .input {
        width: 100%;
        height: 32px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        padding: 0 9px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border: none;
        margin-bottom: 16px;
        position: relative;
        &::placeholder {
          color: rgba(0, 0, 0, 0.3);
        }
        &:focus {
          outline: none;
        }

        &#date {
          &::placeholder {
            background: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.80001 1.6C4.58783 1.6 4.38435 1.68428 4.23432 1.83431C4.08429 1.98434 4.00001 2.18783 4.00001 2.4V3.2H3.20001C2.77566 3.2 2.36869 3.36857 2.06864 3.66863C1.76858 3.96869 1.60001 4.37565 1.60001 4.8V12.8C1.60001 13.2243 1.76858 13.6313 2.06864 13.9314C2.36869 14.2314 2.77566 14.4 3.20001 14.4H12.8C13.2244 14.4 13.6313 14.2314 13.9314 13.9314C14.2314 13.6313 14.4 13.2243 14.4 12.8V4.8C14.4 4.37565 14.2314 3.96869 13.9314 3.66863C13.6313 3.36857 13.2244 3.2 12.8 3.2H12V2.4C12 2.18783 11.9157 1.98434 11.7657 1.83431C11.6157 1.68428 11.4122 1.6 11.2 1.6C10.9878 1.6 10.7843 1.68428 10.6343 1.83431C10.4843 1.98434 10.4 2.18783 10.4 2.4V3.2H5.60001V2.4C5.60001 2.18783 5.51572 1.98434 5.36569 1.83431C5.21566 1.68428 5.01218 1.6 4.80001 1.6ZM4.80001 5.6C4.58783 5.6 4.38435 5.68428 4.23432 5.83431C4.08429 5.98434 4.00001 6.18783 4.00001 6.4C4.00001 6.61217 4.08429 6.81565 4.23432 6.96568C4.38435 7.11571 4.58783 7.2 4.80001 7.2H11.2C11.4122 7.2 11.6157 7.11571 11.7657 6.96568C11.9157 6.81565 12 6.61217 12 6.4C12 6.18783 11.9157 5.98434 11.7657 5.83431C11.6157 5.68428 11.4122 5.6 11.2 5.6H4.80001Z' fill='black' fill-opacity='0.4'/%3E%3C/svg%3E") no-repeat;
            background-position-x: right;
          }
        }

        &#curator {
          &::placeholder {
            background: no-repeat url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.23441 5.83439C4.38443 5.68442 4.58788 5.60017 4.80001 5.60017C5.01214 5.60017 5.21559 5.68442 5.36561 5.83439L8.00001 8.4688L10.6344 5.83439C10.7082 5.75799 10.7965 5.69704 10.8941 5.65511C10.9917 5.61319 11.0967 5.59112 11.2029 5.59019C11.3091 5.58927 11.4145 5.60951 11.5128 5.64974C11.6111 5.68996 11.7004 5.74936 11.7755 5.82448C11.8506 5.89959 11.91 5.98891 11.9503 6.08723C11.9905 6.18555 12.0107 6.29089 12.0098 6.39712C12.0089 6.50334 11.9868 6.60831 11.9449 6.70592C11.903 6.80352 11.842 6.8918 11.7656 6.96559L8.56561 10.1656C8.41559 10.3156 8.21214 10.3998 8.00001 10.3998C7.78788 10.3998 7.58443 10.3156 7.43441 10.1656L4.23441 6.96559C4.08444 6.81557 4.00018 6.61213 4.00018 6.39999C4.00018 6.18786 4.08444 5.98442 4.23441 5.83439Z' fill='black' fill-opacity='0.4'/%3E%3C/svg%3E%0A");
            background-position-x: right;
          }
        }
      }

      .field {
        display: flex;
        align-items: center;
        overflow: hidden;
        .container {
          display: flex;
          align-items: center;
          width: 120%;
          min-width: 120%;
          height: 100%;
          overflow-x: scroll;
          box-sizing: content-box;
        }
        .tag {
          color: rgba(0, 0, 0, 0.3);
          margin-right: 3px;
          cursor: pointer;
          padding: 2px;
          border-radius: 5px;
          font-weight: 500;
          font-size: 14px;
          &:hover {
            background: rgba(0, 0, 0, 0.199);
            color: #f2f2f2;
          }
        }
      }

      label {
        font-weight: 600;
        font-size: 13px;
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.8);
      }

      .form-footer {
        width: 100%;
        height: 32px;
        display: flex;
        margin-top: 80px;
        button {
          width: 50%;
          height: 100%;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          font-size: 13px;
          &:disabled {
            opacity: 0.7;
          }
        }
        .save-btn {
          border: none;
          margin-right: 28px;
          background: rgba(0, 0, 0, 0.8);
          color: #fff;

          .icon-save {
            width: 16px;
            height: 16px;
            display: block;
            margin-right: 10px;
            background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.1656 8.23439C6.0918 8.15799 6.00352 8.09704 5.90592 8.05511C5.80832 8.01319 5.70334 7.99112 5.59712 7.99019C5.4909 7.98927 5.38555 8.00951 5.28724 8.04974C5.18892 8.08996 5.0996 8.14936 5.02448 8.22448C4.94937 8.29959 4.88997 8.38891 4.84974 8.48723C4.80952 8.58555 4.78927 8.69089 4.7902 8.79712C4.79112 8.90334 4.81319 9.00831 4.85512 9.10592C4.89704 9.20352 4.95799 9.2918 5.0344 9.36559L7.4344 11.7656C7.58442 11.9156 7.78787 11.9998 8 11.9998C8.21213 11.9998 8.41558 11.9156 8.5656 11.7656L10.9656 9.36559C11.1113 9.21471 11.192 9.01263 11.1901 8.80287C11.1883 8.59312 11.1042 8.39247 10.9559 8.24414C10.8075 8.09581 10.6069 8.01168 10.3971 8.00986C10.1874 8.00803 9.98528 8.08867 9.8344 8.23439L8.8 9.2688V4.79999H12.8C13.2243 4.79999 13.6313 4.96856 13.9314 5.26862C14.2314 5.56868 14.4 5.97565 14.4 6.39999V12C14.4 12.4243 14.2314 12.8313 13.9314 13.1314C13.6313 13.4314 13.2243 13.6 12.8 13.6H3.2C2.77565 13.6 2.36869 13.4314 2.06863 13.1314C1.76857 12.8313 1.6 12.4243 1.6 12V6.39999C1.6 5.97565 1.76857 5.56868 2.06863 5.26862C2.36869 4.96856 2.77565 4.79999 3.2 4.79999H7.2V9.2688L6.1656 8.23439ZM7.2 3.19999C7.2 2.98782 7.28428 2.78434 7.43431 2.63431C7.58434 2.48428 7.78783 2.39999 8 2.39999C8.21217 2.39999 8.41565 2.48428 8.56568 2.63431C8.71571 2.78434 8.8 2.98782 8.8 3.19999V4.79999H7.2V3.19999Z' fill='white' fill-opacity='0.6'/%3E%3C/svg%3E%0A");
          }
        }
        .discard-btn {
          border: 1px solid rgba(0, 0, 0, 0.1);
          .icon-discard {
            width: 16px;
            height: 16px;
            display: block;
            margin-right: 10px;
            background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.16559 2.63441C6.31556 2.78443 6.39982 2.98787 6.39982 3.20001C6.39982 3.41214 6.31556 3.61558 6.16559 3.76561L4.33119 5.60001H8.79999C10.2852 5.60001 11.7096 6.19 12.7598 7.24021C13.81 8.29041 14.4 9.71479 14.4 11.2V12.8C14.4 13.0122 14.3157 13.2157 14.1657 13.3657C14.0156 13.5157 13.8122 13.6 13.6 13.6C13.3878 13.6 13.1843 13.5157 13.0343 13.3657C12.8843 13.2157 12.8 13.0122 12.8 12.8V11.2C12.8 10.1391 12.3786 9.12172 11.6284 8.37158C10.8783 7.62143 9.86085 7.20001 8.79999 7.20001H4.33119L6.16559 9.03441C6.242 9.1082 6.30294 9.19648 6.34487 9.29408C6.3868 9.39169 6.40886 9.49666 6.40979 9.60289C6.41071 9.70911 6.39047 9.81445 6.35024 9.91277C6.31002 10.0111 6.25062 10.1004 6.1755 10.1755C6.10039 10.2506 6.01107 10.31 5.91275 10.3503C5.81443 10.3905 5.70909 10.4107 5.60287 10.4098C5.49664 10.4089 5.39167 10.3868 5.29406 10.3449C5.19646 10.303 5.10819 10.242 5.03439 10.1656L1.83439 6.96561C1.68441 6.81558 1.60016 6.61214 1.60016 6.40001C1.60016 6.18787 1.68441 5.98443 1.83439 5.83441L5.03439 2.63441C5.18441 2.48443 5.38786 2.40018 5.59999 2.40018C5.81212 2.40018 6.01557 2.48443 6.16559 2.63441Z' fill='black' fill-opacity='0.5'/%3E%3C/svg%3E%0A");
          }
        }
      }
    }
  }
}

.group {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  .add {
    width: 35px;
    height: 50%;
    right: 5px;
    top: 8%;
    border-radius: 5px;
    border: none;
    background: rgb(216, 216, 216);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: rgb(173, 173, 173);
      .icon-add {
        background: rgb(88, 88, 88);
      }
    }
    &:active {
      background: rgb(138, 138, 138);
      .icon-add {
        background: rgb(88, 88, 88);
      }
    }
    &:disabled {
      background: rgb(216, 216, 216);
      opacity: 0.5;
      &:hover {
        background: rgb(216, 216, 216);
        .icon-add {
          background: rgb(143, 143, 143);
        }
      }
    }
    .icon-add {
      width: 12px;
      height: 12px;
      background: rgb(143, 143, 143);
      display: block;
      mask-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.75 5.25V0H5.25V5.25H0V6.75H5.25V12H6.75V6.75H12V5.25H6.75Z' fill='%23181C2D'/%3E%3C/svg%3E%0A");
    }
  }
  .tags-drop {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(90%);
    width: 120px;
    min-height: 24px;
    background: #b6b6b6;
    color: #ececec;
    border-radius: 5px;
    padding: 5px;
    z-index: 10000;
    &__item {
      text-align: right;
      border-radius: 5px;
      width: 100%;
      cursor: pointer;
      &:hover {
        padding-right: 2px;
        color: #b6b6b6;
        background: #ececec;
      }
    }
  }
}
</style>
