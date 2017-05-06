import * as Data from 'data';
import * as Requester from 'requester';
mocha.setup('bdd');
const expect = chai.expect;

describe('Unit Tests', () => {
   
    describe('Data tests',  () => {
        const result = {};
            
            const body = {
            username: 'pesho',
            passHash: '123456'
            
        }

        describe('Data.register() tests', () => {

            beforeEach(() => {
                    sinon.stub(Requester, 'post', (body) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }))
                })

            })

            afterEach(() => {
                Requester.post.restore();
            });

            it('Expect register() to make exactly one post call', (done) => {
                Data.register(body)
                    .then(() => {
                        expect(Requester.post.calledOnce).to.be.true;
                    })
                    .then(done, done)
            });

            it('Expect register to make a POST request to api/users', (done) => {
                Data.register(body)
                    .then(() => {
                        expect(Requester.post).to.have.been.calledWith('api/users');
                    })
                    .then(done, done)
            });

            it('Expect register() to call post with two parameters', (done)  => {
                 Data.register(body)
                 .then(() => {
                     expect(Requester.post.firstCall.args.length).to.equal(2);
                 })
                 .then(done,done)
            });

            it('Expect register() to call post with valid data', (done) => {
                Data.register(body)
                .then(() => {
                    var actual = Object.keys( Requester.post.firstCall.args[1]);
                    var expected = ['username', 'passHash'];
                    expect(actual).to.eql(expected);
                })
                .then(done,done)
            });

        });
    });
});
mocha.run();