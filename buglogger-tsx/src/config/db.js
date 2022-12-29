const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://wtechtec:oneX8748@cluster0.98piply.mongodb.net/?retryWrites=true&w=majority',
			{
        useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true,
      }
			)
		// mongoose.set('useNewUrlParser', true)
		// mongoose.set('useUnifiedTopology', true)
		// mongoose.set('useCreateIndex', true)
    console.log('MongoDB Connected')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB
