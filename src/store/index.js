import Vue from 'vue'
import Vuex from 'vuex'
import data from "../data/users.json"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    tags: ['Front-end', 'Back-end', 'Fullstack', 'Gamedev', 'Data scientist', 'DevOps', 'Team lead'],
    searchUsername: '',
    adding: false
  },

  mutations: {
    SET_USERS(state, payload) {
      state.users = payload // set all users from json file
      state.users = state.users.map(i => {
        i.choise, i.saved = false
        return i
      })
    },

    CHOISE(state, payload) {
      state.users = state.users.map(i => {
        if(i.id == payload) {
          i.choise = true
        } else {
          i.choise = false
        }
        return i
      })
    },

    REMOVE_USER(state, payload) {
      state.users = state.users.map(i => {
        if(i.id == payload.id + 1) { // choise next user
          i.choise = true
        } else {
          i.choise = false
        }
        return i
      }).filter(i => i.id != payload.id) 
    },

    SAVE_USER(state, payload) {
      state.users = state.users.map(i => {
        if (i.id == payload.id) {
          payload.edited_at = new Date().getTime()
          payload.saved = true
          return payload
        } else {
          return i
        }
      })
    },

    ADD_TAG(state, payload) {
      state.users = state.users.map(i => {
        if (i.choise) {
          i.tags.push(payload)
        }
        return i
      })
    },

    SORT_DATE(state) {
      state.users = state.users.sort((a, b) => a.created_at > b.created_at)
    },

    SEARCH_USER(state, payload) {
      state.searchUsername = payload
    },

    DISCARD_USER(state, payload) {
      state.users = state.users.map(i => {
        if(i.id == payload) {
          console.log(data.filter(i => i.id == payload)[0])
          return data.filter(i => i.id == payload)[0]
        }
        return i
      })
    },

    ADD_USER(state, payload) {
      payload.id = state.users.length
      payload.created_at = new Date().getTime()
      payload.edited_at = new Date().getTime()
      payload.choise, payload.saved = false
      state.users.unshift(payload)
    },
    
    TOGGLE_MODE(state, payload) {
      state.adding = payload
    }
  },

  actions: {
    loadUsers({ commit }) {
      commit("SET_USERS", data)
      commit("CHOISE", 0) // default choise first user for check his profile
    },

    choiseUser({ commit }, payload) {
      commit("CHOISE", payload) // method for choise user
    },

    removeUser({ commit }, payload) {
      commit("REMOVE_USER", payload)
    },

    saveUser({ commit }, payload) {
      commit("SAVE_USER", payload)
    },

    addTag({ commit }, payload) {
      commit("ADD_TAG", payload)
    },

    sortByDate({ commit }) {
      commit("SORT_DATE")
    },

    searchUser({ commit }, payoad) {
      commit("SEARCH_USER", payoad)
    },

    discardUser({ commit }, payload) {
      commit("DISCARD_USER", payload)
    },

    addUser({ commit }, payload) {
      console.log(payload)
      commit("ADD_USER", payload)
    }
  },

  getters: {
    curators: state => {
      return state.users.filter(i => !i.choise).map(i => {
        return { name: i.username }
      })
    },
    
    allCurators: state => {
      return state.users.map(i => {
        return {name: i.username}
      })
    },

    avaiableTags: state => {
      let choisedUser = state.users.filter(i => i.choise)[0].tags
      return state.tags.filter(i => !choisedUser.includes(i))
    },

    findUsers: state => {
      return state.users.filter(i => i.username.toLocaleLowerCase().match(state.searchUsername.toLocaleLowerCase()))
    }
  }
})
