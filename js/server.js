const express = require('express')
const app = express()
const port = 3000 // Port number for your server

// Define a route to handle GET requests
app.get('/user/gamequestions', (req, res) => {
  // Respond with dummy data for testing
  res.json({
    questionID: 1,
    questionText: 'Sample question text',
    questionType: 'trueFalse',
    questionChoice: ['true', 'false'],
    questionError: null
  })
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
