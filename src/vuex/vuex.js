// 引用vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    itemList: [],
    menuList: []
}
const mutations = {
    changeItemList(state, arr) {
        state.itemList = arr
    },
    changeMenuList(state, arr) {
        state.menuList = arr
    }
}
 const store = new Vuex.Store({
     state,
     mutations
 })
 export default store 