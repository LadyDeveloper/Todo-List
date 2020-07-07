//module.exports.getDate = () => {
//module.exports. is the same as exports.
exports.getDate = () => {
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    const day = today.toLocaleDateString('en-us', options);

    return day;
}

exports.getDay =  () => {
    const today = new Date();

    const options = {
        weekday: "long"
    };

    const day = today.toLocaleDateString('en-us', options);

    return day;
}