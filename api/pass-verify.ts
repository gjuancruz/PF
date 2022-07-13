import bcrypt from 'bcrypt'

const verifyPassword = async() => {
    const myPassword = 'admin @123';
    const hash = '$2b$10$LXfX0MZ1yup/.wp1YXyGaOU6YnTTEiATyUQRiuddQ690hRFf.cAH2'
    const isMatch = await bcrypt.compare(myPassword, hash);
    console.log(isMatch);
    
}

verifyPassword();