
const sendAlert=(status, color, element)=> {
    $(".bootstrap-growl").remove();
    $.bootstrapGrowl(status, {
        ele: element,
        type: color,
        align: 'center',
        delay: 2000,
    });
}

module.exports = sendAlert
