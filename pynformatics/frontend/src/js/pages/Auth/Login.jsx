import React from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

import {Form} from "antd";
import * as _ from "lodash";

import FormWrapper from "./FormWrapper";

import Button from '../../components/utility/Button';
import Input, {InputGroup} from "../../components/utility/Input";
import Checkbox from "../../components/utility/Checkbox";
import {Col, Row} from '../../components/utility/Grid';

import * as userActions from "../../actions/userActions";


@connect(state => ({user: state.user}))
@Form.create()
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      usernameTouched: false,
      passwordTouched: false,
      successfulLogin: false,
    }
  }

  login(username, password) {
    this.props.dispatch(userActions.login(username, password)).then(() => {
      this.setState({
        successfulLogin: true,
        errorMessage: ''
      });
    }).catch((error) => {
      if (error.response && error.response.status === 403 && error.response.data) {
        if (error.response.data.message === "Wrong username or password") { // TODO убрать костыль
          this.setState({errorMessage: "Неправильное имя пользователя или пароль"});
        } else {
          this.setState({errorMessage: error.response.data.message});
        }
      } else {
        this.setState({errorMessage: "Похоже что-то пошло не так"});
      }
    });
  }

  validate = () => {
    this.props.form.validateFields((errors, value) => {
      if (!errors) {
        this.setState({errorMessage: ''});
        return;
      }
      if (this.state.usernameTouched && errors.username) {
        this.setState({errorMessage: this.props.form.getFieldError("username")});
        return;
      }
      if (this.state.passwordTouched && errors.password && errors.password.errors.length > 0) {
        this.setState({errorMessage: errors.password.errors[0].message})
      }
    })
  };

  handleUsernameChange = (e) => {
    this.props.form.setFieldsValue({username: e.target.value});
    this.setState({usernameTouched: true});
    this.validate();
  };

  handlePasswordChange = (e) => {
    this.props.form.setFieldsValue({password: e.target.value});
    this.setState({passwordTouched: true});
    this.validate();
  };

  handleSubmit = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login(values.username, values.password);
      } else {
        this.setState({errorMessage: 'Не все обязательные поля заполнены'});
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props;
    return !_.isEmpty(user)
      ?
        (<FormWrapper
          title={`Здраствуйте, ${user.firstname}`}
        >
          <div>{`Вы успешно вошли в систему как ${user.lastname} ${user.firstname}.`}</div>
          <div>Перейти на <Link to="/">главную страницу</Link> или <Link to="/logout">Выйти</Link></div>
        </FormWrapper>)
      :
        (<FormWrapper title="Вход" errorMessage={this.state.errorMessage}>
          {this.state.successfulLogin ? <Redirect to="/"/> : null}
          {getFieldDecorator('username', {
            rules: [{required: true, message: 'Введите логин'}],
          })(<Input
            size="large"
            placeholder="Логин"
            onChange={this.handleUsernameChange}
          />)}
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Введите пароль'}],
          })(<Input
            size="large"
            placeholder="Пароль"
            type="password"
            onChange={this.handlePasswordChange}
            onPressEnter={this.handleSubmit}
          />)}
          <InputGroup className="inputGroup">
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
              className="mainButton"
            >Войти</Button>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Запомнить меня</Checkbox>)}
          </InputGroup>
          <Row>
            <Col span={"24"} className="inputGroup socialButtonGroup">
              <Button className="smallButton VKButton">Войти через ВКонтакте</Button>
              <Button className="smallButton GmailButton">Войти через Gmail</Button>
            </Col>
          </Row>
        </FormWrapper>);
  }
}

export default Login;