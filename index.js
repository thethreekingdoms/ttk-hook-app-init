export default {
	name: "app-test",
	version: "1.0.0",
	moduleName: '模块名称',
	description: '测试页名称',
	meta: null,
	components: [],
	config: null,
	load: (cb) => {
		require.ensure([], require => {
			cb(require('./component'), require('./action'), require('./reducer'), require('./data'), require('./config'))
		}, "app-test")
	}
}