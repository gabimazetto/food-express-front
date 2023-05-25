import React, { useState } from "react";
import { CustomInput } from "../CustomInput/CustomInput";
import "./Contato.css";
import { ButtonNavigation } from "../ButtonNavigation/ButtonNavigation";
import { toast, ToastContainer } from 'react-toastify';


export function Contato() {
  const [email, setEmail] = useState(""); // Estado para o e-mail
  const [message, setMessage] = useState(""); // Estado para a mensagem
  const [emailError, setEmailError] = useState(null);
  const [messageError, setMessageError] = useState(null);
  
  const handleEmailChange = (event) => {
    const email = event.target.value;
    setEmail(email);

    if (!email.includes('@')) { // simples verificação de e-mail
        setEmailError("Digite um email válido.");
      } else {
        setEmailError(null);
      }
    };
  
  const handleMessageChange = (event) => {
    const message = event.target.value;
    setMessage(message);
  
    if (message.length === 255) { // Verifica se a mensagem atingiu o limite
        setMessageError("Mensagem atingiu o limite de 255 caracteres.");
    } else if (message.length > 255) { // caso a mensagem ultrapasse o limite
        setMessage(message.slice(0, 255)); // atualiza a mensagem para os primeiros 255 caracteres
        setMessageError("Mensagem atingiu o limite de 255 caracteres.");
    } else {
        setMessageError(null);
    }
    };

  // Função para manipular a submissão do formulário
  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (emailError || messageError) {
        console.error('Formulário inválido');
        return;
    }
    toast.success('Mensagem enviada com sucesso!');
    setEmail("");
    setMessage("");
  };

  return (
    <div className="form-container">
      <h1 style={{textAlign: "center", color: "#f06000"}}>Fale Conosco</h1>
      <form onSubmit={handleSubmit}> {/* Adicione um manipulador de submissão ao formulário */}
        <CustomInput 
          type="email"
          placeholder="Digite seu email aqui"
          value={email}
          onChange={handleEmailChange}
          icon="bi bi-envelope-at" // Substitua pelo seu ícone de e-mail
        />
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        <CustomInput        
          type="textarea"
          placeholder="Digite sua mensagem aqui"
          value={message}
          onChange={handleMessageChange}
          icon="bi bi-pencil-square" // Substitua pelo seu ícone de mensagem
        />
        {messageError && <p style={{ color: 'red' }}>{messageError}</p>}

        <div class="d-flex justify-content-between align-items-end mt-3 mb-3">
        <ButtonNavigation                                            
                                            type="submit"
                                            route="/"
                                            icon="white bi bi-arrow-left-circle-fill"
                                            className="botao-voltar-editar"
                                            tooltipContent="Voltar para a home"
                                        />
        
            <ButtonNavigation
                text="Enviar"
                type="submit"
                className="white"
            />
</div>

      </form>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
