import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AdicionarAtualizarComida.css";
import imagemLogo from "../../assets/icons/prato.svg";
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";
import { ContextRestaurant } from "../../contexts/RestaurantContext";
import { ContextLogin } from "../../contexts/LoginContext";


export function AdicionarAtualizarComida() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { id } = useParams();
    const [imagemComida, setimagemComida] = useState(null);
    const { idRes } = useContext(ContextRestaurant);
    const { config } = useContext(ContextLogin);
    const navigate = useNavigate();

    function convertPrice(price) {
        const formattedPrice = price.replace(",", ".");
        // Check if the price has a decimal point
        if (formattedPrice.indexOf(".") === -1) {
            // If there is no decimal point, append .00 to the end
            return `${formattedPrice}.00`;
        }
        // Check if the decimal part has less than two digits
        const decimalPart = formattedPrice.split(".")[1];
        if (decimalPart.length < 2) {
            // If there are less than two digits, append a zero
            return `${formattedPrice}0`;
        }
        return formattedPrice;
    }

    async function onSubmit(data) {
        const formData = new FormData();
        formData.append("codigo", data.codigo);
        formData.append("nome", data.nome);
        formData.append("descricao", data.descricao);
        formData.append("categoria", data.categoria);
        formData.append("preco", convertPrice(data.preco)); // Convert the price before appending
        formData.append("peso", data.peso);
        formData.append("imagem", data.imagem[0]);
        formData.append("restauranteId", idRes);

        

        if (!id) {
            await axios.post("http://localhost:3001/comidas", formData, config);
            toast.success("Comida adicionada com sucesso!", {
                position: "bottom-right",
                duration: 2000,
            });
        } else {
            await axios.put(`http://localhost:3001/comidas/${id}`, formData, config);

            toast.success("Comida atualizada com sucesso!", {
                position: "bottom-right",
                duration: 2000,
            });
        }
        navigate('/restaurante/cardapio/');
    }

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/comidas/${id}`, config)
                .then((response) => {
                    setimagemComida(response.data.imagem)
                    const { codigo, nome, descricao, categoria, preco, peso, imagem, restauranteId } = response.data;
                    reset({ codigo, nome, descricao, categoria, preco, peso, imagem, restauranteId });
                });
        }
    }, [id, reset]);


    function onDelete() {
        axios.delete(`http://localhost:3001/comidas/${id}`, config)
            .then(() => {
                toast.success('Comida deletada com sucesso!', {
                    position: "bottom-center",
                    duration: 2000,
                });
                navigate('/restaurante/id/cardapio');
            }).catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: "bottom-center",
                    duration: 2000
                });
            });
    }


    return (
        <ContainerCenterMobile className="background-gradient container-addComida">
            <main className="container-forms-comidas">
                <Form onSubmit={handleSubmit(onSubmit)} className="forms-comidas">
                    <div className="invisible-desktop icon-voltar-comida">
                        <Button as={Link} to="/restaurante/cardapio" className="button-desc-cliente"> <i class="bi bi-arrow-left"></i> Voltar</Button>
                        <h1 className="invisible-desktop">{!id ? 'Adicionar Comida' : 'Editar Comida'}</h1>
                        <h1 className="invisible-desktop">{!id ? <img src={imagemLogo} alt="Uma foto de um prato com garfo e faca"/> : <img src={imagemComida} alt="Foto da comida selecionada" />}</h1>
                    </div>


                    <div className="invisible-mobile forms-header-desktop">
                        <Button as={Link} to="/restaurante/cardapio" className="button-desc-cliente"> <i class="bi bi-arrow-left"></i> Voltar</Button>
                        <h1 className="invisible-mobile">{!id ? 'Adicionar Comida' : 'Editar Comida'}</h1>
                        <h1 className="invisible-mobile">{!id ? <img src={imagemLogo} alt="Uma foto de um prato com garfo e faca"/> : <img src={imagemComida} alt="Foto da comida selecionada" />}</h1>
                    </div>



                    <div className="horizontal-row invisible-mobile"></div>

                    <div className="forms-container-group">

                        <Form.Group className="mb-2 ">
                            <InputGroup className="custon-input-group formulario">
                                <Form.Label>Código:</Form.Label>
                                <Form.Control className={`formulario borda-direita forms-comidas-component secondary rounded rounded${errors.codigo && "is-invalid"}`} type="text" placeholder="Digite o código da comida"{...register("codigo", { required: "O código da comida é obrigatório", maxLength: { value: 22, message: "Limite de 22 caracteres." } })} />
                                {errors.codigo && <Form.Text className="invalid-feedback">{errors.codigo.message}</Form.Text>}
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <InputGroup className="custon-input-group formulario">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control className={`formulario borda-direita forms-comidas-component secondary rounded ${errors.nome && "is-invalid"}`} type="text" placeholder="Digite o nome da comida"  {...register("nome", { required: "O nome da comida é obrigatória.", maxLength: { value: 131, message: "Limite de 131 caracteres." }, minLength: { value: 3, message: "É preciso digitar 3 caracteres ou mais." } })} />
                                {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <InputGroup className="custon-input-group formulario">
                                <Form.Label>Descrição:</Form.Label>
                                <Form.Control className={`formulario borda-direita forms-comidas-component secondary rounded ${errors.descricao && "is-invalid"}`} type="text" placeholder="Digite o descrição da comida" {...register("descricao", { required: "A descrição da comida é obrigatória", maxLength: { value: 255, message: "Limite de 255 caracteres." }, minLength: { value: 8, message: "É preciso digitar 8 caracteres ou mais." } })} />
                                {errors.descricao && <Form.Text className="invalid-feedback">{errors.descricao.message}</Form.Text>}
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="forms-select-comida mb-2">
                            <Form.Label>Categoria:</Form.Label>
                            <Form.Select aria-label="Selecione a categoria" className={`forms-borda ${errors.categoria && "is-invalid"}`} {...register("categoria", { required: true, message: "É obrigatório selecionar uma categoria." })}>
                                <option value="">Selecione a categoria</option>
                                <option value="Açaí">Açaí</option>
                                <option value="Lanche">Lanche</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Brasileira">Brasileira</option>
                                <option value="Italiana">Italiana</option>
                                <option value="Sobremesa">Sobremesa</option>
                                <option value="Japonesa">Japonesa</option>
                                <option value="Chinesa">Chinesa</option>
                                <option value="Vegetariana">Vegetariana</option>
                                <option value="Padaria">Padaria</option>
                                <option value="Marmita">Marmita</option>
                                <option value="Carne">Carne</option>
                                <option value="Fit">Fit</option>
                                <option value="Árabe">Árabe</option>
                            </Form.Select>
                            {errors.categoria && <Form.Text className="invalid-feedback">{errors.categoria.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-2 input-preco">
                            <Form.Label>Preço:</Form.Label>
                            <InputGroup className="custon-input-group mt-2">
                                <InputGroup.Text className="">
                                    R$
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Digite o preço da comida"
                                    type="text"
                                    className={`forms-borda rounded-end ${errors.codigo && "is-invalid"}`}
                                    {...register("preco", {
                                        required: "O preço é obrigatório.",
                                        pattern: {
                                            value: /^\d+([,.]\d{1,2})?$/, // Modificado para aceitar números com vírgula ou ponto decimal, com até duas casas decimais opcionais
                                            message: "Por favor, digite um valor válido."
                                        }
                                    })}
                                />

                                {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <InputGroup className="custon-input-group form-peso formulario">
                                <Form.Label>Peso:</Form.Label>
                                <Form.Control className={`formulario borda-direita forms-comidas-component secondary rounded ${errors.preco && "is-invalid"}`} type="text" placeholder="Digite o peso da comida" {...register("peso", { required: "O peso da comida é obrigatório", maxLength: { value: 10, message: "Limite de 10 numeros." } })} />
                                {errors.peso && <Form.Text className="invalid-feedback">{errors.peso.message}</Form.Text>}
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <InputGroup className="custon-input-group formulario">
                                <Form.Label>Imagem:</Form.Label>
                                <Form.Control className={`formulario borda-direita forms-comidas-component secondary ${errors.preco && "is-invalid"}`} type="file" placeholder="Adicione uma imagem" {...register("imagem",)} />
                            </InputGroup>
                        </Form.Group>

                        {/* {!idRes ?
                            <Form.Group className="mb-2">
                                <InputGroup className="custon-input-group formulario">
                                    <Form.Label>RestauranteId:</Form.Label>
                                    <Form.Control disabled value={idRes} className={`formulario borda-direita forms-comidas-component secondary rounded ${errors.preco && "is-invalid"}`} type="text" placeholder="Digite o código da comida:" {...register("restauranteId")} />
                                    {errors.restauranteId && <Form.Text className="invalid-feedback">{errors.restauranteId.message}</Form.Text>}
                                </InputGroup>
                            </Form.Group>
                            :
                            <div className="invisible"></div>
                        } */}
                        <div className="d-flex flex-row justify-content-evenly mt-3 mb-4 forms-container-botoes">
                            {!id ?
                                <Button variant="primary" className="botao-form-card" type="submit">
                                    Cadastrar
                                </Button>
                                :
                                <Button variant="primary" className="botao-form-card" type="submit">
                                    Editar
                                </Button>
                            }
                            <Button variant="primary" className="botao-form-card" type="Reset">
                                Limpar
                            </Button>
                        </div>
                        {id ?
                            <>   <div className="vertical-row mb-4"></div>
                                <div className=" mb-2">
                                    <Button onClick={onDelete} variant="primary" className="exluir-form-card" type="button">
                                        Excluir comida
                                    </Button>
                                </div></>
                            : ""}
                    </div>
                </Form>
            </main>
        </ContainerCenterMobile>
    )
}