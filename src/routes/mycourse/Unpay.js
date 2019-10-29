import React from 'react';
import {connect} from 'react-redux';
import action from '../../store/action/index';
import CourseItem from './CourseItem';
import {Alert, Button} from 'antd';
import {removeShopCart, payShopCart} from '../../api/course';
import {checkLogin} from '../../api/person';

class Unpay extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let {unpay} = this.props.shopCart;
        if (unpay.length === 0) {
            return <Alert description='当前还未购买任何课程，快去购买吧' type='warning'/>
        }
        return <div>
            <div style={{marginTop: '.2rem', height: '.7rem', lineHeight: '.7rem', padding: '.1rem'}}>
                <input type="checkbox"
                       checked={this.props.selectAll}
                       onChange={this.props.handleSelect.bind(this, 'all')}/>全选/全不选
                <Button type='dashed' onClick={this.handleRemove}>删除</Button>
                <Button type='dashed' onClick={this.handlePay}>支付</Button>
            </div>
            <ul className='courseItem'>
                {this.props.shopCart.unpay.map((item, index) => {
                    return <CourseItem item={item} key={index} input={true}/>;
                })}
            </ul>
        </div>;
    }

    handleRemove = () => {
        //获取所有被选中的课程ID
        let selectIDList = [];
        this.props.shopCart.unpay.forEach(item => {
            if (item.check) {
                selectIDList.push(item.id);
            }
        });
        if (selectIDList.length === 0) {
            alert('没有要删除的信息!');
            return;
        }
        selectIDList = selectIDList.map(courseID => {
            return removeShopCart(courseID);
        });
        Promise.all(selectIDList).then(() => {
            this.props.queryUnpay();
        });
    };

    handlePay = async () => {
        //验证当前是否登录
        let result = await checkLogin();
        if (parseFloat(result.code) !== 0) {
            alert('请先登录');
            return;
        }
        //获取所有被选中的存储id
        let selectIDList = [];
        this.props.shopCart.unpay.forEach(item => {
            if (item.check) {
                selectIDList.push(item.storeID);
            }
        });
        if (selectIDList.length === 0) {
            alert('没有要删除的信息!');
            return;
        }
        selectIDList = selectIDList.map(storeID => {
            return payShopCart(storeID);
        });
        Promise.all(selectIDList).then(() => {
            this.props.queryUnpay();
            this.props.queryPay();
        });


    };


}

export default connect(state => state.course, action.course)(Unpay);