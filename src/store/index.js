import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const state = {
  materialForm: {
      sourceForm:null,
      workNumber:null,
      questTime:null,
      details:[]
  },
  putOutForm:{
    sourceForm:null,
    machineNumber:null,
    workNumber:null,
    questTime:null,
    details:[]
  }
}


const mutations={
  setMaterialForm(state,obj){
      state.materialForm=obj
  },

  setPutOutForm(state,obj){
      state.putOutForm=obj
  }
}

const store = new Vuex.Store({
  state,
  modules,
  getters,
  mutations
})

export default store