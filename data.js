export function getMeta() {
	return {
		name: 'root',
		component: 'Layout',
		className: 'app-test',
		children: [{
			name: 'demo',
			component: '::span',
			className: 'app-test-div',
			children: [{
					name: 'tips',
					component: '::div',
					children: '{{data.content}}'
				}, {
					name: 'version',
					component: '::div',
					children: '{{data.version}}'
				}
			]
		}]
	}
}

export function getInitState() {
	return {
		data: {
			content: 'Hello TTK!!! Successful project initialization',
			version: 'v1.0.0'
		}
	}
}