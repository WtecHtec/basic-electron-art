# mongodb 连接
## 免费云数据 https://cloud.mongodb.com/
## 链接驱动
```
tnpm i mongoose
```
### 建立连接
```

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
    console.log('MongoDB Connected')
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

module.exports = connectDB

```
### 建立模型
```
const mongoose = require('mongoose')
const LogSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Log text is required'],
  },
  priority: {
    type: String,
    default: 'low',
    enum: ['low', 'moderate', 'high'],
  },
  user: {
    type: String,
    trim: true,
    required: [true, 'User is required'],
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Log', LogSchema)

```

### 增删查改
```
// 连接
connectDB()
// 增
await Log.create(item)
// 删
await Log.findOneAndDelete({ _id: id })
// 查
const logs = await Log.find().sort({ created: 1 })
// 改
await Person.updateOne({ _id: id }, { user: 'USS Enterprise' });
```