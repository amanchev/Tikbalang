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

        describe('Data.getUsers() tests', () => {  

            beforeEach(() => {
                sinon.stub(Requester, 'get', (url) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }))
                })

            })

            afterEach(function () {
                Requester.get.restore();
            });

            it('expect Data.getUsers() to make exactly one GET call', (done) => {
			Data.getUsers()
				.then(() => {
					expect(Requester.get.calledOnce).to.be.true;
				})
				.then(done, done);
		    });

            it('expect Data.getUsers() to make correct GET call', (done) => {
			Data.getUsers()
				.then(obj => {
					const actual = Requester.get
						.firstCall
						.args[0];

					expect(actual).to.equal('api/users');
				})
				.then(done, done);
		    });

            it('expect Data.getUsers() to return correct result', (done) =>{
			Data.getClients()
				.then(obj => {
					expect(obj).to.eql(result)
				})
				.then(done, done);
		    });       
         });

         describe('Data.getClients() tests', () => {  

            beforeEach(() => {
                sinon.stub(Requester, 'get', (url) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }))
                })

            })

            afterEach(function () {
                Requester.get.restore();
            });

            it('expect Data.getClients() to make exactly one GET call', (done) => {
			Data.getClients()
				.then(() => {
					expect(Requester.get.calledOnce).to.be.true;
				})
				.then(done, done);
		    });

            it('expect Data.getClients() to make correct GET call', (done) => {
			Data.getClients()
				.then(obj => {
					const actual = Requester.get
						.firstCall
						.args[0];

					expect(actual).to.equal('api/clients');
				})
				.then(done, done);
		    });

            it('expect Data.getClients() to return correct result', (done) =>{
			Data.getClients()
				.then(obj => {
					expect(obj).to.eql(result)
				})
				.then(done, done);
		    });
        });

        describe('Data.login() tests', () => {

            beforeEach(() => {
                sinon.stub(Requester, 'put', (body) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }));
                });
            });

            afterEach(function () {
                Requester.put.restore();
            });

            it('Expect Data.login() to make a PUT request', (done) => {
                Data.login(body)
                    .then(() => {
                        expect(Requester.put).to.have.been.calledOnce;
                    })
                    .then(done, done)
            });

            it('Expect Data.login() to make a PUT request to api/auth', (done) => {
                Data.login(body)
                    .then(() => {
                        expect(Requester.put).to.have.been.calledWith('api/auth');
                    })
                    .then(done, done)
            });

            it('Expect Data.login() to call PUT with two parameters', (done)  => {
                 Data.login(body)
                 .then(() => {
                     expect(Requester.put.firstCall.args.length).to.equal(2);
                 })
                 .then(done,done)
            });

            it('Expect Data.login() to call PUT with valid data', (done) => {
                Data.login(body)
                .then(() => {
                    var actual = Object.keys( Requester.put.firstCall.args[1]);
                    var expected = ['username', 'passHash'];
                    expect(actual).to.eql(expected);
                })
                .then(done,done)
            });

            it('Expect Data.login() to return object', (done) => {
                Data.login(body)
                .then((res)=>{             
                    expect(res).to.be.a('object')
                })
                .then(done,done)
            });

        });

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

            it('Expect Data.register() to make exactly one post call', (done) => {
                Data.register(body)
                    .then(() => {
                        expect(Requester.post.calledOnce).to.be.true;
                    })
                    .then(done, done)
            });

            it('Expect Data.register to make a POST request to api/users', (done) => {
                Data.register(body)
                    .then(() => {
                        expect(Requester.post).to.have.been.calledWith('api/users');
                    })
                    .then(done, done)
            });

            it('Expect Data.register() to call post with two parameters', (done)  => {
                 Data.register(body)
                 .then(() => {
                     expect(Requester.post.firstCall.args.length).to.equal(2);
                 })
                 .then(done,done)
            });

            it('Expect Data.register() to call post with valid data', (done) => {
                Data.register(body)
                .then(() => {
                    var actual = Object.keys( Requester.post.firstCall.args[1]);
                    var expected = ['username', 'passHash'];
                    expect(actual).to.eql(expected);
                })
                .then(done,done)
            });          

             it('Expect Data.register() to return object', (done) => {
                Data.register(body)
                .then((res)=>{                  
                    expect(res).to.be.a('object')
                })
                .then(done,done)
            });

        });

        describe('Data.addClient() tests', () => {

            const client = {
            name: 'pesho',
            profession: 'Programmer',
            age: '18',
            trainings: '25',
            endDate: '2016/07/25',
            price: '$170,755',
		    picture: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-128.png'
            }

            beforeEach(() => {
                sinon.stub(Requester, 'post', (client) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }));
                });
            });

            afterEach(() => {
                Requester.post.restore();
            });

            it('Expect Data.addClient() to make a POST request', (done) => {
                Data.addClient(client)
                    .then(() => {
                        expect(Requester.post).to.have.been.calledOnce;
                    })
                    .then(done, done)
            });

            it('Expect Data.addClient() to make a POST request to api/clients', (done) => {
                Data.addClient(client)
                    .then(() => {
                        expect(Requester.post).to.have.been.calledWith('api/clients');
                    })
                    .then(done, done)
            });

             it('Expect Data.addClient() to call POST with correct user data', (done)  => {
                 Data.addClient(client)
                 .then(() => {
                    const actual = Requester.post.firstCall.args[1];
                    const prop = Object.keys(actual).sort();
					expect(prop.length).to.equal(7);
					expect(prop[0]).to.equal('age');
					expect(prop[1]).to.equal('endDate');
                    expect(prop[2]).to.equal('name');
                    expect(prop[3]).to.equal('picture');
                    expect(prop[4]).to.equal('price');
                    expect(prop[5]).to.equal('profession');
                    expect(prop[6]).to.equal('trainings');
                 })
                 .then(done,done)
            });

            it('Expect Data.addClient() to return object', (done) => {
                Data.addClient(client)
                .then((res)=>{             
                    expect(res).to.be.a('object')
                })
                .then(done,done)
            });
        });

        describe('Data.addTrainingDay() tests', () => {

            const day = {
            date: '2017-05-19',
            id: '2',
            }

            beforeEach(() => {
                sinon.stub(Requester, 'post', (day) => {
                    return (new Promise((resolve, reject) => {
                        resolve(result);
                    }));
                });
            });

            afterEach(() => {
                Requester.post.restore();
            });

            it('Expect Data.addTrainingDay() to make a POST request', (done) => {
                Data.addTrainingDay(day)
                    .then(() => {
                        expect(Requester.post).to.have.been.calledOnce;
                    })
                    .then(done, done)
            });

            it('Expect Data.addTrainingDay() to make a POST request to api/profile', (done) => {
                Data.addTrainingDay(day)
                    .then(() => {
                        expect(Requester.post).to.have.been.calledWith('api/profile');
                    })
                    .then(done, done)
            });

             it('Expect Data.addTrainingDay() to call post with two parameters', (done)  => {
                 Data.addTrainingDay(day)
                 .then(() => {
                     expect(Requester.post.firstCall.args.length).to.equal(2);
                 })
                 .then(done,done)
            });

            it('Expect Data.addTrainingDay() to call post with valid data', (done) => {
                Data.addTrainingDay(day)
                .then(() => {
                    var actual = Object.keys( Requester.post.firstCall.args[1]);
                    var expected = ['date', 'id'];
                    expect(actual).to.eql(expected);
                })
                .then(done,done)
            });          

            it('Expect Data.addTrainingDay() to return object', (done) => {
                Data.addTrainingDay(day)
                .then((res)=>{             
                    expect(res).to.be.a('object')
                })
                .then(done,done)
            });
        });

    });
});
mocha.run();