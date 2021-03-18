export const isEmpty = value => {
    if(!value) return true
    return false
}

export const isEmail = email => {
    // eslint-disable-next-line
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return re.test(email);
}

export const isLength = password => {
    if(password.length < 7) return true
    return false
}

export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}

export const isUser = username => {
    // eslint-disable-next-line
    const re = /^\D(\d{2,}|\D+)\d*$/;
    return re.test(username);
}


export const isSerial = serial_code => {
    if(serial_code.length < 13) return true
    return false
}
