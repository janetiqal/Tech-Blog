module.exports = {
  capitalLetter: (input) => {
    const normalizeInput = input.toLowerCase();
    const words = normalizeInput.split(" ")
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1)
    }
    return words.join(" ")
  },
  // Format date as MM/DD/YYYY
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  //if one comment on a post, 'comments' wont be plural
  make_plural: (comment, length) => {
   if(length > 1){
     return `${comment}s`
   }
   return comment
  },

  //  sendAlert: (status, color, element) => {
  //   $(".bootstrap-growl").remove();
  //   $.bootstrapGrowl(status, {
  //     ele: element,
  //     type: color,
  //     align: 'center',
  //     delay: 2000,
  //   });
  // }

}
