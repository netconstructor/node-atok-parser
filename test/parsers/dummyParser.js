atok
	.trimLeft(false)
		.ignore(true)
			.addRule('\n', 'newline')
		.ignore()
		.addRule('~', 'error')
		.addRule({ start: '0', end: '9' }, 'digit')
		.addRule({ start: 'aA', end: 'zZ' }, 'char')
		.on('empty', function () {
			atok.emit('data', null, -1, 'end')
		})
	.on('data', function (token, idx, type) {
		self.emit('data', token, idx, type)
	})
	.on('error', function (err, token) {
		// Add some positioning info to the error
		// Error, extracted token, neighbour size
		var newerr = self.trackError(err, token, 3)
		self.emit('error', newerr)
	})