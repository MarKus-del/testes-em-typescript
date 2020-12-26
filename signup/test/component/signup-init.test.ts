import { expect } from 'chai';
import { SignupInitParams } from '@src/types/signup';
import signupInit from '@src/controllers/signup-init';
import { restore, SinonStub, stub } from 'sinon';
import signupRepo from '@src/ports/repos/signup';

let insertSignup: SinonStub;

describe("Signup initialization", () => {

    beforeEach(() => {
        insertSignup = stub(signupRepo, "insert").resolves();
    });

    afterEach(() => restore());

    it("return a signup token as response to signup initiaization", async () => {
        const signup = await signupInit(signupParams);

        expect(signup.token).to.be.a("string").that.has.length(36)
    });

    it("return a signup with init params that sent to the funtion", async () => {
        const signup = await signupInit(signupParams);

        expect(signup.initParams).to.be.deep.equal(signupParams);
    });

    it("persit signup in the database", async () => {
        const signup = await signupInit(signupParams);

        expect(insertSignup).to.have.been.calledOnce;
        expect(insertSignup).to.have.been.calledWith(signup);
    });
});

const signupParams: SignupInitParams = {
    fullname: "Some Body",
    dateOfBirth: "1990-01-01",
    address: "av. Somestreet, 123"
};