// Updated version of the code, which includes collapseable menu and search capability

<template>
    <div>
        <!--main heading-->
      <h1 style="margin-bottom: 10px;">Cyber Security Escape Room FAQ</h1>

      <!-- Add search input and button -->
      <div>
        <input type="text" v-model="searchTerm" placeholder="Search FAQ">
        <button @click="search">Search</button>
      </div>

      <ul>
        <li v-for="(item, index) in filteredFaq" :key="index" :id="'faq-' + index">
            <!-- FAQ question with expand/collapse button -->
          <h3 style="font-weight: bold">
            <button @click="toggleAnswer(index)">
              {{ item.isCollapsed ? '+' : '-' }}
            </button>
            <!-- Display FAQ question with highlighted search term -->
            <span v-html="highlightText(item.question)"></span>
          </h3>
          <!-- Display FAQ answer if not collapsed, with highlighted search term -->
          <p v-if="!item.isCollapsed" v-html="highlightText(item.answer)"></p>

          <div v-if="index < filteredFaq.length - 1" style="margin-bottom: 10px;"></div>

        </li>
      </ul>
    </div>
  </template>

<script>
class FAQ {
  constructor (question, answer) {
    this.question = question
    this.answer = answer
    this.isCollapsed = true
  }
}

export default {
  data () {
    return {
      searchTerm: '', // Add a data property for the search term
      faq: [
        new FAQ(
          'What is a Cyber Security Escape Room?',
          'A Cyber Security Escape Room is an interactive and immersive game designed to test and enhance participants\' knowledge of cyber security concepts. Participants work alone to solve puzzles, complete challenges, and "escape" from a simulated cyber security scenario. It provides a fun and educational experience to understand and address real-world cyber threats.'
        ),
        new FAQ(
          'How long does a typical session last?',
          'The duration of a Cyber Security Escape Room session varies, but it typically lasts around 60 to 90 minutes. The goal is to create an engaging experience that balances challenge and enjoyment while accommodating different skill levels.'
        ),
        new FAQ(
          'Is any prior knowledge of cyber security required?',
          'No prior knowledge of cyber security is required to participate. The escape room is designed to be accessible to individuals with varying levels of expertise. It serves as an opportunity for both beginners and experienced participants to learn and collaborate.'
        ),
        new FAQ(
          'Are there age restrictions for participants?',
          'No, there is no age restriction to participate in this fun activity.'
        ),
        new FAQ(
          'What skills can participants expect to develop?',
          'Participants can expect to develop a range of skills, including problem-solving, critical thinking, teamwork, and an understanding of basic cyber security principles. The escape room provides a hands-on and dynamic environment for acquiring and applying these skills.'
        ),
        new FAQ(
          'How the leaderboard is determined?',
          'The leaderboard is typically determined based on various factors such as completion time, accuracy in solving challenges, and overall participation. Individuals with faster completion times and higher accuracy may rank higher on the leaderboard. It adds a competitive element to the experience.'
        ),
        new FAQ(
          'Can I participate in daily challenges?',
          'Yes, daily challenges are often designed to accommodate individual participants. Individuals can participate in daily challenges to test their skills, learn new concepts, and have the chance to win daily rewards.'
        ),
        new FAQ(
          'How can I access daily challenges?',
          'Daily challenges are often accessible through a dedicated platform or within the main escape room interface. Participants can log in daily to view and participate in the challenges. Specific instructions and details about daily challenges are usually provided on the platform.'
        ),
        new FAQ(
          'Are there time limits for daily challenges?',
          'Daily challenges typically have shorter time limits compared to the main escape room scenario. This is to create a sense of urgency and keep the challenges dynamic. The time limits add an element of excitement to daily participation.'
        )

      ]
    }
  },
  computed: {
    // Add a computed property to filter the FAQ based on the search term
    filteredFaq () {
      const lowerSearchTerm = this.searchTerm.toLowerCase()
      return this.faq.filter(item =>
        item.question.toLowerCase().includes(lowerSearchTerm) ||
          item.answer.toLowerCase().includes(lowerSearchTerm)
      )
    }
  },
  methods: {
    // Toggle the collapse/expand state of a FAQ item
    toggleAnswer (index) {
      this.faq[index].isCollapsed = !this.faq[index].isCollapsed
    },
    // Perform search and scroll to the first matching FAQ item
    search () {
      // Perform search and scroll to the first matching FAQ item
      const matchingIndex = this.faq.findIndex(
        item =>
          item.question.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            item.answer.toLowerCase().includes(this.searchTerm.toLowerCase())
      )

      if (matchingIndex !== -1) {
        // Use smooth scrolling to make the matching FAQ item visible
        document.getElementById(`faq-${matchingIndex}`).scrollIntoView({ behavior: 'smooth' })
      }
    },
    // Highlight the search term in the text
    highlightText (text) {
      if (this.searchTerm) {
        const regex = new RegExp(`(${this.searchTerm})`, 'gi')
        return text.replace(regex, '<span style="background-color: yellow;">$1</span>')
      }
      return text
    }
  }
}
</script>

  <style scoped>
  button {
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1em;
  }

  /* Additional styling for the button */
  button:hover {
    color: #007bff; /* color yellow*/
  }

  ul li {
    list-style: none;
  }
  </style>
