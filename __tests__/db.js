const db = require('../server/models/models');
const bcrypt = require('bcrypt');
const userController = require('../server/controllers/userController');

describe("Database Testing", ()=>{
    describe("Create user", ()=>{
        it('adding to database', () => {
            let username = 'tester' + Math.floor(Math.random()*1000)
            let password = "password"

            bcrypt.hash(password, 10)
            .then(hash => {
                // If successful, pass the encrypted password on to the next middleware function
                db.query('INSERT INTO users(user_name, hashed_pass) VALUES ($1, $2) RETURNING id;', [username, hash])
                .then(res => {
                    expect(res.status).toBe(200)
                    return;
                }).catch(err =>{
                    return;
                })
                return
            });
        })
    })
    describe('Verifying user', ()=>{
        it("Verify if a user is contained in the SQL DB",()=>{
            let username = 'tester'
            db.query('SELECT hashed_pass FROM users WHERE user_name = $1', [username])
            .then(data => {
                expect(data.status).toBe(200);
            })
        })
        it("Should not be able to verify non-exisitng user",()=>{
            let username = '------'
            db.query('SELECT hashed_pass FROM users WHERE user_name = $1', [username])
            .then(data => {
                expect(data.status).toBe(500);
            })
        })
    })
})