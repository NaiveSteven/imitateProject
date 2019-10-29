//base
import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';

//redux store
import {Provider} from 'react-redux';
import store from './store/index';

//ant
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

//import css
import './static/css/reset.min.css';
import './static/css/common.less';

//import component
import NavTop from './component/NavTop';
import NavBottom from './component/NavBottom';
import Home from './routes/Home';
import Mycourse from './routes/Mycourse';
import Person from './routes/Person';

render(<Provider store={store}>
    <HashRouter>
        <LocaleProvider locale={zh_CN}>
            <div>
                {/*{header}*/}
                <NavTop></NavTop>

                {/*{main=>route}*/}
                <main className='container'>
                    <Switch>
                        <Route path='/course' component={Home}/>
                        <Route path='/mycourse' component={Mycourse}/>
                        <Route path='/person' component={Person}/>
                        <Redirect to='/course'/>
                    </Switch>
                </main>

                {/*{footer}*/}
                <NavBottom></NavBottom>
            </div>
        </LocaleProvider>
    </HashRouter>
</Provider>, root);