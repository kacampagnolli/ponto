import React, { Component } from 'react';
import FormInput from './utils/FormInput.js'
import FormButton from './utils/FormButton.js'
import 'statics/css/Card.css'



class SingUp extends Component{

    constructor(){
        super();
        this.state = {nome:'',senha:''};
    }

    setNome(evento){
        this.setState({nome:evento.target.value});
    }

    setSenha(evento){
        this.setState({senha:evento.targe.value});
    }

    render(){
        return(
            <div className="login-container">
                <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">Cadastro de Usuário</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <form action="#">
                            <FormInput idInput="nome" textInput="text" nameInput="nome" 
                            valueInput={this.state.nome}  labelInput="Nome" />
                            <FormInput idInput="senha" textInput="password" nameInput="senha" 
                            valueInput={this.state.senha}  labelInput="Senha" />
                        </form>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <FormButton textButton='Cadastrar' />
                    </div>
                </div>
            </div>
        );
    }
}

export default SingUp;