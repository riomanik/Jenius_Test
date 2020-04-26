import { changeUserSession, logout } from "../../../actions/user/index"

describe('actions', () => {
    it('should create an action for authenticated', () => {
        const payload = 'isAuthenticated'
        const expectedAction = {
            type: 'IS_AUTHENTICATED',
            payload: payload
        }
        expect(changeUserSession(payload)).toEqual(expectedAction)
    })
    it('should create an action for logout', () => {
        const payload = 'logout'
        const expectedAction = {
            type: 'LOGOUT',
            payload: payload
        }
        expect(logout(payload)).toEqual(expectedAction)
    })
});
