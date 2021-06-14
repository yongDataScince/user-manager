<template>
  <div class="dropdown" v-if="options" v-click-outside="close">

    <!-- Dropdown Input -->
    <input class="dropdown-input"
      id="curator"
      autocomplete="off"
      @focus="showOptions()"
      @keyup="keyMonitor"
      v-model="searchFilter"
      :disabled="disabled"
      :placeholder="placeholder" />

    <!-- Dropdown Menu -->
    <div class="dropdown-content"
      v-show="optionsShown">
      <div
        class="dropdown-item"
        v-for="(option, index) in filteredOptions"
        :key="index"
        @click="choise(option)">
        {{ option.name || option.id }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Dropdown',
    template: 'Dropdown',
    props: {
      name: {
        type: String,
        required: false,
        default: 'dropdown',
        note: 'Input name'
      },
      options: {
        type: Array,
        required: true,
        note: 'Options of dropdown. An array of options with id and name',
      },
      placeholder: {
        type: String,
        required: false,
        default: 'Please select an option',
        note: 'Placeholder of dropdown'
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
        note: 'Disable the dropdown'
      },
      maxItem: {
        type: Number,
        required: false,
        default: 6,
        note: 'Max items showing'
      },
      saved: {
        type: Boolean,
        require: true
      }
    },

    data() {
      return {
        selected: {},
        optionsShown: false,
        searchFilter: '',
      }
    },
    computed: {
      filteredOptions() {
        const filtered = [];
        const regOption = new RegExp(this.searchFilter, 'ig')
        for (const option of this.options) {
          if (this.searchFilter.length < 1 || option.name.match(regOption)){
            if (filtered.length < this.maxItem) filtered.push(option);
          }
        }
        return filtered;
      }
    },
    methods: {
      selectOption(option) {
        this.selected = option;
        this.optionsShown = false;
        this.searchFilter = this.selected.name;
        this.$emit('selected', this.selected);
      },

      choise(option) {
        this.searchFilter = option.name
        this.optionsShown = false
        this.$emit('selected', option.name);
      },

      showOptions(){
        if (!this.disabled) {
          this.searchFilter = '';
          this.optionsShown = true;
        }
      },
      exit() {
        if (!this.selected.id) {
          this.selected = {};
          this.searchFilter = '';
        } else {
          this.searchFilter = this.selected.name;
        }
        this.$emit('selected', this.selected);
        this.optionsShown = false;
      },
      close() {
        this.optionsShown = false;
      },
      // Selecting when pressing Enter
      keyMonitor: function(event) {
        if (event.key === "Enter" && this.filteredOptions[0])
          this.selectOption(this.filteredOptions[0]);
      }
    },
    watch: {
      searchFilter() {
        if (this.filteredOptions.length === 0) {
          this.selected = {};
        } else {
          this.selected = this.filteredOptions[0];
        }
        this.$emit('filter', this.searchFilter);
      },
      saved() {
        this.searchFilter = ''
      }
    }
  };
</script>

<style lang="scss" scoped>
.dropdown {
  width: 100%;
  padding: 0;
  position: relative;
  &-content {
    border-radius: 5px;
    background: rgb(233, 233, 233);
    color: #999999;
    font-weight: 500;
    padding: 4px;
    width: 100%;
    z-index: 1000;
    position: absolute;
  }

  &-item {
    padding-left: 3px;
    border-radius: 3px;
    &:hover {
      background: rgba(0, 0, 0, 0.178);
    }
  }
}

.dropdown-input {
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

  &#curator {
    &::placeholder {
      background: no-repeat url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.23441 5.83439C4.38443 5.68442 4.58788 5.60017 4.80001 5.60017C5.01214 5.60017 5.21559 5.68442 5.36561 5.83439L8.00001 8.4688L10.6344 5.83439C10.7082 5.75799 10.7965 5.69704 10.8941 5.65511C10.9917 5.61319 11.0967 5.59112 11.2029 5.59019C11.3091 5.58927 11.4145 5.60951 11.5128 5.64974C11.6111 5.68996 11.7004 5.74936 11.7755 5.82448C11.8506 5.89959 11.91 5.98891 11.9503 6.08723C11.9905 6.18555 12.0107 6.29089 12.0098 6.39712C12.0089 6.50334 11.9868 6.60831 11.9449 6.70592C11.903 6.80352 11.842 6.8918 11.7656 6.96559L8.56561 10.1656C8.41559 10.3156 8.21214 10.3998 8.00001 10.3998C7.78788 10.3998 7.58443 10.3156 7.43441 10.1656L4.23441 6.96559C4.08444 6.81557 4.00018 6.61213 4.00018 6.39999C4.00018 6.18786 4.08444 5.98442 4.23441 5.83439Z' fill='black' fill-opacity='0.4'/%3E%3C/svg%3E%0A");
      background-position-x: right;
    }
  }
}
</style>
