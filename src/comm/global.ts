export const isNull = (value: any) => {
    if (value == undefined
        || value == null
        || (typeof (value) == 'string' && (value == '' || value.match(/\s+/)))
        || (typeof (value) == 'number' && isNaN(value))) {
        return true;
    }
    return false;
}