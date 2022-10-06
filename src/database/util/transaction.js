const mongoose = require('mongoose');

class Transaction {
	#session;
	#conn;

	constructor() {
		mongoose.Promise = global.Promise;
		mongoose.connect(process.env.MONGO_DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		this.#conn = mongoose.connection;
		this.#conn.on('error', () =>
			console.error.bind(console, 'connection error')
		);
		this.#conn.once('open', () =>
			console.info('Connection to Database is successful')
		);
	}

	async start() {
		this.#session = await this.#conn.startSession();
		return this.#session.startTransaction();
	}

	async commit() {
		await this.#session.commitTransaction();
		this.#session.endSession();
	}

	async abort() {
		await this.#session.abortTransaction();
		this.#session.endSession();
	}

	get session() {
		return this.#session;
	}

	get conn() {
		return this.#conn;
	}
}

module.exports = Transaction;
