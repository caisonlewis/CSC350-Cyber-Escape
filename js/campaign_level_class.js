/**
 * Basic class for campaign leves
 * @params levelnum (int), correctCode(int), isComplete(bool)
 */
class CampaignLevel {
  constructor (levelNum, correctCode, isComplete) {
    this.levelNum = levelNum
    this.correctCode = correctCode
    this.isComplete = isComplete
  }

  // Getters for CampaignLevel
  getCode () {
    return this.correctCode
  }

  getLevel () {
    return this.levelNum
  }

  getComplete () {
    return this.isComplete
  }

  // Setters for CampaignLevel
  setCode (correctCode) {
    this.correctCode = correctCode
  }

  setLevel (levelNum) {
    this.levelNum = levelNum
  }

  // Value should only change to true once
  setComplete (isComplete) {
    this.isComplete = isComplete
  }
}

// // Sample campaign levels
//   let sampleLevels = [
//     new CampaignLevel(1, 1234, false),
//     new CampaignLevel(2, 5932, false),
//     new CampaignLevel(3, 8923, false)
// ];

// // Print sample levels to console
// console.log(sampleLevels);

export default CampaignLevel
