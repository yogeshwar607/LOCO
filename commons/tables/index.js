
 const schemaName = '"Remittance".'
const tables = {
    transaction:'transaction',
    payees:'payees',
    customer:'customer',
    otp_verification:'otp_verification',
    email_verification:'email_verification',
}

function getTableName (key) {
    return `${schemaName}${tables[key]}`;
}

module.exports = {
getTableName,
}