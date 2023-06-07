const formatDate = date => {

    const fechaObj = new Date(date);
    const dia = fechaObj.getDate().toString().padStart(2, '0');
    const mes = (fechaObj.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaObj.getFullYear().toString();

    return `${dia} - ${mes} - ${año}`
}

module.exports = { formatDate }