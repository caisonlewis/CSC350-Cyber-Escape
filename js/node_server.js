const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// Sample database (replace with your actual database connection)
const questions = [
  {
    id: 1,
    questionText: 'Is the sky blue?',
    questionType: 'trueFalse'
  },
  {
    id: 2,
    questionText: 'What color is the grass?',
    questionType: 'multipleChoice',
    choices: ['Green', 'Blue', 'Red']
  }
]

app.use(bodyParser.json())
app.use(cors())

// Route to fetch a question by ID
app.post('/user/gamequestions', (req, res) => {
  const { questionID } = req.body
  const question = questions.find(q => q.id === parseInt(questionID))
  if (!question) {
    res.status(404).json({ error: 'Question not found' })
  } else {
    res.json(question)
  }
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
