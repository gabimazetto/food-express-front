import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export function NovaComida() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

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

        try {
            axios.post("http://localhost:3001/comidas", formData);
            toast.success("Comida adicionada.", {
                position: "bottom-center", duration: 2000
            });
            navigate("/restaurante/cardapio");
        } catch (error) {
            toast.error("Algo deu errado.", {
                position: "bottom-center", duration: 2000
            });
        }
    };

    return (
        <div className="container w75">
            <h1>Adicionar comida</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Código:</Form.Label>
                    <Form.Control type="text" className={errors.codigo && "is-invalid"} {...register("codigo", { required: "O código da comida é obrigatório", maxLength: { value: 22, message: "Limite de 22 caracteres." } })} />
                    {errors.codigo && <Form.Text className="invalid-feedback">{errors.codigo.message}</Form.Text>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome da comida é obrigatória.", maxLength: { value: 131, message: "Limite de 131 caracteres." }, minLength: { value: 3, message: "É preciso digitar 3 caracteres ou mais." } })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descrição:</Form.Label>
                    <Form.Control type="text" className={errors.descricao && "is-invalid"} {...register("descricao", { required: "A descrição da comida é obrigatória", maxLength: { value: 255, message: "Limite de 255 caracteres." }, minLength: { value: 8, message: "É preciso digitar 8 caracteres ou mais." } })} />
                    {errors.descricao && <Form.Text className="invalid-feedback">{errors.descricao.message}</Form.Text>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Categoria:</Form.Label>
                    <Form.Select aria-label="Selecione a categoria" className={errors.categoria && "is-invalid"} {...register("categoria", { required: true, message: "É obrigatório selecionar uma categoria." })}>
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

                <Form.Group>
                    <Form.Label>Preço:</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>R$</InputGroup.Text>
                        <Form.Control
                            type="number"
                            step="0.01"
                            className={errors.preco && "is-invalid"}
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

                <Form.Group>
                    <Form.Label>Peso:</Form.Label>
                    <Form.Control type="number" className={errors.peso && "is-invalid"} {...register("peso", { required: "O peso da comida é obrigatório", maxLength: { value: 10, message: "Limite de 10 numeros." } })} />
                    {errors.peso && <Form.Text className="invalid-feedback">{errors.peso.message}</Form.Text>}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Imagem</Form.Label>
                    <Form.Control type="file" {...register("imagem")} />
                </Form.Group>

                {/* <Form.Group className="invisible"> */}
                {/*  É PRECISO AGUARDAR O LOGIN, PARA LINKAR O RESTAURANTE COM O restauranteId*/}
                <Form.Group>
                    <Form.Label>RestauranteId</Form.Label>
                    <Form.Control type="text" className={errors.restauranteId && "is-invalid"} {...register("restauranteId")} />
                    {errors.restauranteId && <Form.Text className="invalid-feedback">{errors.restauranteId.message}</Form.Text>}
                </Form.Group>

                <div className="d-flex -flex justify-content-evenly mt-4">
                    <Button variant="primary" type="Submit">
                        Cadastrar
                    </Button>
                    <Button variant="primary" type="Reset">
                        Limpar
                    </Button>
                </div>
            </Form>


        </div>
    )
}