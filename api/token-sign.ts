import jwt from 'jsonwebtoken';

const secret = 'myCat';

const payload = {
    sub: 1,
    role: 'admin'
}

function signToken(payload:any, secret:string) {
    return jwt.sign(payload, secret)
}

const token = signToken(payload, secret)
console.log(token);
