export default {
	name: 'ttk-hook-app-init',
	version: "1.0.0",
	moduleName: '模块名称',
	description: '测试页名称',
	meta: null,
	components: [],
	config: null,
	type: 'origin',
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./app'), require('./action'), require('./reducer'), null, null)
		}, "ttk-hook-app-init")
	}
}