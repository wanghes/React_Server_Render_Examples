import * as types from '../constants/ActionTypes';
import { push } from 'connected-react-router'
import axios from 'axios';

export const increment = () => ({ type: types.INCREMENT });

// let instance = null;
// if (process.env.BASE_URL) {
//     instance = axios.create({
//         baseURL: process.env.BASE_URL,
//         timeout: 10000
//     });
// }


/**
 * 获取users
 * @param {*} param
 */
export const fetchUserList = (params) => {
    return async (dispatch, getState) => {
        await axios.get(process.env.BASE_URL+'/api/user', {
            params: params
        }).then((res) => {
            const list = res.data;
            dispatch({
                type: types.USERLIST,
                data: list
            });
        }).catch((err) => {
            console.log(err)
        })
    }
}

/**
 * 获取users
 * @param {*} param
 */
export const fetchPostList = (params) => {
    return async (dispatch, getState) => {
        await axios.get(process.env.BASE_URL+'/api/post', {
            params: params
        }).then((res) => {
            const list = res.data;

            dispatch({
                type: types.POSTLIST,
                data: list
            });
            // setTimeout(() => {
            //     dispatch(push('/foo'));
            // }, 3000)
        }).catch((err) => {
            console.log(err)
        })
    }
}
