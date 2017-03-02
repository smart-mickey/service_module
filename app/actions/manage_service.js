import * as types from './types'


export const onStart = () => {
    return {
        type: types.APP_STARTED,
        name: ' manage service'
    }
}