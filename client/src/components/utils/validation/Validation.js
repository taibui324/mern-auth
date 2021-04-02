export const isEmpty = value => {
    if(!value) return true
    return false
}

export const isEmail = email => {     // eslint-disable-next-line
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

//serial_number generator 
export const isSerial = serial => {
  if(serial.length < 1) return true
  return false
}
