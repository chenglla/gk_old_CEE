import VueAgile from './Agile'

const install = function(Vue) {
	Vue.component('agile', VueAgile)
}

export default {
	install
}

export { VueAgile }
