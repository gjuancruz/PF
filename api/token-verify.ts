import jwt from 'jsonwebtoken';

const secret = 'myCat';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1Nzc1NDAzMH0.K255j4hH4wZZYxY4LvjiNcI14JuawQAxsJ1yIKrw5ZI'

function verifyToken(token:string, secret:string) {
    return jwt.verify(token, secret)
}

const payload = verifyToken(token, secret)

console.log(payload);
