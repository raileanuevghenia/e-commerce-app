import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Nina Rabei',
        email: 'nina@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        
    },
    {
        name: 'Andrei',
        email: 'andrei@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        
    },
]

export default users