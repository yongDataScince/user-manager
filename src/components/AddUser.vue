<template>
  <div class="modal-main" @keydown.esc="exit">
    <div class="modal-content">
      <button class="close" @click="TOGGLE_MODE(false)">
        <i class="icon-close"></i>
      </button>
      <input type="text" placeholder="@username" class="input" v-model="username">
      <input type="text" placeholder="Full Name" class="input" v-model="fullname">
      <input type="text" placeholder="your@email.com" class="input" v-model="email">
        <div class="group">
          <div class="field input">
            <div class="container">
              <div class="tag" 
                 v-for="tag in userTags"
                 :key="tag">
                  {{ tag }}
              </div>
            </div>
          </div>

          <button class="add" :disabled="userTags.length>=5" @click="openTagsDropdown" >
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
        <Dropdown 
          @selected="selected"
          :options="allCurators"
          :placeholder="'@curator_username'"
          :maxItem="5"
        />
      <button class="save-btn" :disabled="disable" @click="save">
        Add user
      </button>
    </div>
  </div>
</template>

<script>
import Dropdown from "./Dropdown.vue"
import { mapActions, mapGetters, mapState, mapMutations } from "vuex"
export default {
  data: () => ({
    username: '',
    email: '',
    fullname: '',
    curator: '',
    userTags: [],
    tagsDropdownTrigger: false,
  }),

  computed: {
    ...mapGetters(['allCurators']),
    ...mapState(['tags']),

    avaiableTags() {
      return this.tags.filter(i => !this.userTags.includes(i))
    },

    disable() { // validate all data
      let checkEmail = this.email.split('').includes('@')
      let checkUnique = this.allCurators.map(i => i.name).includes(this.username)
      let cond = !checkUnique && checkEmail && this.curator != '' && this.username != '' && this.email != '' && this.fullname.trim().split(' ').length > 1 && this.userTags.length > 0
      return !cond
    }
  },

  methods: {
    ...mapActions(['addUser']),
    ...mapMutations(['TOGGLE_MODE']),
    selected(data) {
      this.curator = data 
    },

    openTagsDropdown() {
      this.tagsDropdownTrigger = !this.tagsDropdownTrigger
    },

    choiseTag(name) {
      this.userTags.push(name)
      this.tagsDropdownTrigger = false
    },

    save() {
      let data = {
        username: this.username,
        fullname: this.fullname,
        email: this.email,
        tags: this.userTags,
        curator: this.curator
      }
      this.username, this.fullname, this.email, this.userTags, this.curator = ''
      this.addUser(data)
      this.TOGGLE_MODE(false)
    },

    exit() {
      this.TOGGLE_MODE(false) // exit on esc. 
    }
  },

  components: {
    Dropdown
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";
  .modal-main {
    width: 100vw;
    height: 100vh;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    @include block;
    flex-direction: column;
    height: 360px;
    .input {
      @include field;
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
  .save-btn {
    width: 100%;
    height: 32px;
    border: none;
    background: #333333;
    margin-top: 50px;
    color: #FFF;
    border-radius: 5px;
    &:active {
      background: #030303;
    }
    &:hover {
      background: #2e2e2e;
    }
    &:disabled {
      opacity: 0.5;
    }
  }
  .close {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: white;
    border: none;
    margin-left: auto;
    margin-top: -12px;
    .icon-close {
      width: 24px;
      height: 24px;
      background-color: rgb(212, 212, 212);
      mask-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z' fill='%23181C2D' stroke='%23181C2D' stroke-width='0.3'/%3E%3C/svg%3E");
    }
    &:hover {
      .icon-close {
        background-color: rgb(163, 163, 163);
      }
    }
  }
</style>