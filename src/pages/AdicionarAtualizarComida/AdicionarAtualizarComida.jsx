import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import "./AdicionarAtualizarComida.css"
import imagemLogo from "../../assets/icons/prato.svg"
import { ContainerCenterMobile } from "../../components/ContainerCenterMobile/ContainerCenterMobile";



export function AdicionarAtualizarComida() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const [imagemComida, setimagemComida] = useState(null)


    async function onSubmit(data) {
        const formData = new FormData();
        formData.append('codigo', data.codigo);
        formData.append('nome', data.nome);
        formData.append('descricao', data.descricao);
        formData.append('categoria', data.categoria);
        formData.append('preco', data.preco);
        formData.append('peso', data.peso);
        formData.append('imagem', data.imagem[0]);
        formData.append('restauranteId', data.restauranteId);

        console.log(data)
        console.log(formData)
        console.log(id)


        if (!id) {
            await axios.post('http://localhost:3001/comidas', formData);
            toast.success('Comida adicionada com sucesso!', {
                position: "bottom-right",
                duration: 2000,
            });
        } else {
            await axios.put(`http://localhost:3001/comidas/${id}`, formData);

            toast.success('Comida atualizada com sucesso!', {
                position: "bottom-right",
                duration: 2000,
            });
        }
        navigate('/restaurante/cardapio');
    }


    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/comidas/${id}`)
                .then((response) => {
                    setimagemComida(response.data.imagem)
                    const { codigo, nome, descricao, categoria, preco, peso, imagem, restauranteId } = response.data;
                    reset({ codigo, nome, descricao, categoria, preco, peso, imagem, restauranteId });
                });
        }
    }, [id, reset]);



    function onDelete() {
        axios.delete(`http://localhost:3001/comidas/${id}`)
            .then(() => {
                toast.success('Comida deletada com sucesso!', {
                    position: "bottom-center",
                    duration: 2000,
                });
                navigate('/restaurante/cardapio');
            }).catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: "bottom-center",
                    duration: 2000
                });
            });
    }



    return (
        <ContainerCenterMobile className="background-gradient">
            <main className="container-forms-comidas">
                <Form onSubmit={handleSubmit(onSubmit)} className="forms-comidas">
                    <h1 className="invisible-desktop">{!id ? 'Adicionar Comida' : 'Editar Comida'}</h1>

                    <h1 className="invisible-desktop">{!id ? <img src={imagemLogo} /> : <img src={imagemComida} alt="" />}</h1>

                    <div className="invisible-mobile forms-header-desktop">
                        <h1 className="invisible-mobile">{!id ? 'Adicionar Comida' : 'Editar Comida'}</h1>
                        <h1 className="invisible-mobile">{!id ? <img src={imagemLogo} /> : <img src={imagemComida} alt="" />}</h1>
                    </div>

                    <div className="horizontal-row invisible-mobile"></div>

                    <div className="forms-container-group">

                        <Form.Group className="mb-2">
                            <InputGroup className="custon-input-group formulario">
                                <Form.Label>Código:</Form.Label>
                                <Form.Control className={`formulario borda-direita forms-comidas-component secondary ${errors.codigo && "is-invalid"}`} type="text" placeholder="Digite o código da comida:"{...register("codigo", { required: "O código da comida é obrigatório", maxLength: { value: 22, message: "Limite de 22 caracteres." } })} />
                                {errors.codigo && <Form.Text className="invalid-feedback">{errors.codigo.message}</Form.Text>}
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <InputGroup className="custon-input-group formulario">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control className={`formulario borda-direita forms-comidas-component secondary ${errors.nome && "is-invalid"}`} type="text" placeholder="Digite o nome da comida:"  {...register("nome", { required: "O nome da comida é obrigatória.", maxLength: { value: 131, message: "Limite de 131 caracteres." }, minLength: { value: 3, message: "É preciso digitar 3 caracteres ou mais." } })} />
                                {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <InputGroup className="custon-input-group formulario">
                                <Form.Label>Descrição:</Form.Label>
                                <Form.Control className={`formulario borda-direita forms-comidas-component secondary ${errors.descricao && "is-invalid"}`} type="text" placeholder="Digite o código da comida:" {...register("descricao", { required: "A descrição da comida é obrigatória", maxLength: { value: 255, message: "Limite de 255 caracteres." }, minLength: { value: 8, message: "É preciso digitar 8 caracteres ou mais." } })} />
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
                                    type="number"
                                    step="0.01"
                                    className={`forms-borda   ${errors.codigo && "is-invalid"}`}
                                    {...register("preco", {
                                        required: "O preço é obrigatório.",
                                        pattern: {
                                            value: /^\d+\.\d{2}$/,
                                            message: "Por favor, digite um valor com duas casas decimais."
                                        }
                                    })} />
                                {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <InputGroup className="custon-input-group formulario">
                                <Form.Label>Peso:</Form.Label>
                                <Form.Control className={`formulario borda-direita forms-comidas-component secondary ${errors.preco && "is-invalid"}`} type="text" placeholder="Digite o código da comida:" {...register("peso", { required: "O peso da comida é obrigatório", maxLength: { value: 10, message: "Limite de 10 numeros." } })} />
                                {errors.peso && <Form.Text className="invalid-feedback">{errors.peso.message}</Form.Text>}
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <InputGroup className="custon-input-group formulario">
                                <Form.Label>Imagem:</Form.Label>
                                <Form.Control className={`formulario borda-direita forms-comidas-component secondary ${errors.preco && "is-invalid"}`} type="file" placeholder="Digite o código da comida:" {...register("imagem", )} />
                            </InputGroup>
                        </Form.Group>

                        {/* <Form.Group className="forms-div-group">
                            <Form.Label>Imagem</Form.Label>
                            <Form.Control type="file" className="formulario form-font-size" {...register("imagem")} />
                        </Form.Group> */}

                        {/* <Form.Group className="invisible"> */}
                        {/*  É PRECISO AGUARDAR O LOGIN, PARA LINKAR O RESTAURANTE COM O restauranteId*/}
                        {!id ?
                            <Form.Group className="mb-2">
                                <InputGroup className="custon-input-group formulario">
                                    <Form.Label>RestauranteId:</Form.Label>
                                    <Form.Control className={`formulario borda-direita forms-comidas-component secondary ${errors.preco && "is-invalid"}`} type="text" placeholder="Digite o código da comida:" {...register("restauranteId")} />
                                    {errors.restauranteId && <Form.Text className="invalid-feedback">{errors.restauranteId.message}</Form.Text>}
                                </InputGroup>
                            </Form.Group>
                            :
                            <div className="invisible"></div>
                        }
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