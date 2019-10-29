import * as TYPES from '../action-types';

let INIT_STATE = {
    bannerData: [],
    courseData: {
        total: 1,
        limit: 10,
        page: 1,
        data: []
    },
    courseType: 'all',
    shopCart: {
        unpay: [],
        pay: []
    },
    selectAll: true
};
export default function course(state = INIT_STATE, action) {
    state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        //=>获取轮播图数据
        case TYPES.COURSE_QUERY_BANNER:
            let {code, data} = action.bannerData;
            if (parseFloat(code) === 0) {
                state.bannerData = data;
            }
            break;

        //=>获取课程列表信息
        case TYPES.COURSE_QUERY_LIST:
            let {result, flag, courseType} = action;
            state.courseType = courseType;
            if (parseFloat(result.code) === 0) {
                state.courseData.total = parseFloat(result.total);
                state.courseData.limit = parseFloat(result.limit);
                state.courseData.page = parseFloat(result.page);
                state.courseData.data = flag === 'push' ? state.courseData.data.concat(result.data) : result.data;
            }
            break;

        //获取已支付和未支付的购物车信息
        case TYPES.COURSE_UNPAY:
            if (parseFloat(action.result.code) === 0) {
                state.shopCart.unpay = action.result.data;
                state.shopCart.unpay = state.shopCart.unpay.map(item => {
                    return {...item, check: true};
                });
                state.selectAll = true;
            }
            break;
        case TYPES.COURSE_PAY:
            if (parseFloat(action.result.code) === 0) {
                state.shopCart.pay = action.result.data;
            }
            break;
        case TYPES.COURSE_HANDLE:
            let mode = action.mode;
            if (mode === 'all') {
                state.selectAll = !state.selectAll;
                state.shopCart.unpay = state.shopCart.unpay.map(item => {
                    return {...item, check: state.selectAll};
                })
            } else {
                let item = state.shopCart.unpay.find(item => parseFloat(item.id) === mode);
                item.check = !item.check;
                let f = state.shopCart.unpay.find(item => item.check === false);
                f ? state.selectAll = false : state.selectAll = true;
            }
            break;
    }
    return state;
};