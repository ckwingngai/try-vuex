const store = new Vuex.Store({
  strict: true,
  state: {
    list: [],
    inputText: 'please enter something...'
  },
  mutations: {
    addItem (state) {
      console.log('mutations addItem')
      let nextId = 0
      if (!_.isEmpty(state.list)) {
        nextId = Number(_.maxBy(state.list, 'id').id) + 1
      }
      const obj = {
        id: nextId,
        title: state.inputText,
        active: true
      }
      Vue.set(state, 'list', [...state.list, obj])
      console.log(obj)
      // let key = 0
      // if (!_.isEmpty(state.list)) {
      //   key = Number(_.max(Object.keys(state.list))) + 1
      // }
      // console.log('key', key)
      // Vue.set(state, 'list[key]', obj)

      // this.state.list.push({
      //   title: state.inputText,
      //   active: true
      // })
      Vue.set(state, 'inputText', '')
    },
    changeText (state, payload) {
      console.log('mutations changeText', payload)
      console.log(state)
      Vue.set(state, 'inputText', payload)
    },
    appendText (state) {
      console.log('appendText')
      Vue.set(state, 'list', state.list.map((item) => {
        item.title += '(test)'
        return item
      }))
    },
    delItem (state, payload) {
      console.log('mutations delItem', payload)
      Vue.set(state, 'list', _.filter(state.list, (o) => { return o.id!==payload.id }))
    },
  },
  actions: {
    addItem ({ state, commit }) {
      if (state.inputText !== '') {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('addItem')
            resolve()
          }, 500)
        })
      } else {
        alert('Please enter something!');
      }
      return
    },
    appendText ({ dispatch, commit }) {
      return dispatch('addItem').then(() => {
        commit('appendText')
      })
    },
    delItem ({ state, commit }, payload) {
      console.log('action delItem', payload)
      commit('delItem', payload)
    }
  },
  getters: {
    activeList: state => {
      return state.list
    },
    getInputText: state => {
      return state.inputText
    }
  },
  computed: {
    getActiveList () {
      return this.$store.getters.activeList
    },
  }
})
