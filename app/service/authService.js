const bcrypt = require('bcrypt');

const saltRounds = process.env.BCRYPT_SALT_ROUNDS;

async function hashPassword(plainPassword) {
    return await bcrypt.hash(plainPassword, saltRounds); // Returns the Hashed Password
}

async function verifyPassword(plainPassword, hashedPasswordFromDB) {
    return await bcrypt.compare(plainPassword, hashedPasswordFromDB); // Returns true or false
}

module.exports = {hashPassword, verifyPassword}
