module.exports={
    capitalLetter: (input) => {
    const words = input.split(" ")
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1)
    }
    return words.join(" ")
    },
      // Format date as MM/DD/YYYY
    format_date: (date) => {
        return date.toLocaleDateString();
      }
}