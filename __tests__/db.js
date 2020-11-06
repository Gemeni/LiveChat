const db = require('../server/models/models');
const bcrypt = require('bcrypt');
const userController = require('../server/controllers/userController');
const session = require('../server/controllers/sessionController')


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

describe('test creating and deleting a session', ()=> {
  const random = Math.floor(Math.random()*1000)
  const ssid = random
  const userID = random
    describe('creating session', ()=> {
        it('session inserted into db', ()=> {
            db.query('INSERT INTO sessions (ssid, user_id) VALUES ($1, $2)', [ssid, userID])
            .then(data => {
                expect(data.status).toBe(200)
            })
        })
    })
    describe('deleting session', ()=> {
        it('delete session from db', ()=> {
         db.query('delete from sessions where ssid = $1', [ssid]) 
         .then(data => {
             expect(data.status).toBe(200)
         })
        })
        it('deleting session that does not exist', ()=> {
        db.query('delete from sessions where ssid = $1', -50) 
        .then(data => {
            expect(data.status).toBe(500)
        })
        })
    })
})

