import { changeSessionReducer } from '../../../../reducers/user/index'

describe('Change session reducer', () => {
    it('should handle IS_AUTHENTICATED', () => {
        expect(changeSessionReducer({}, {
            type: 'IS_AUTHENTICATED',
            payload: false
        })).toEqual(
            test = false
        )
        expect(changeSessionReducer({},
            {
                test: false
            }
            , {
                type: "IS_AUTHENTICATED",
                payload: test = false
            }
        )).toEqual(
            {

            }
        )
    })
});