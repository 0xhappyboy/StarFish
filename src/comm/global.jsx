export const isNull = (value) => {
    if (value == undefined
        || value == null
        || (typeof (value) == 'string' && (value == '' || value.match(/\s+/)))
        || (typeof (value) == 'number' && isNaN(value))) {
        return true;
    }
    return false;
}