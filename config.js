module.exports = {
	db: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chat',
	port: process.env.PORT || 3000
}