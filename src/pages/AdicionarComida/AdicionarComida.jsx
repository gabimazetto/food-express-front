import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";



export function AdicionarComida() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        axios.post("http://localhost:3001/comidas", data)
            .then(response => {
                toast.success("Comida adicionada.", {
                    position: "bottom-center", duration: 2000
                });
                navigate("/restaurante/cardapio")
            })
            .catch(error => {
                toast.error("Algo deu errado.", {
                    position: "bottom-center", duration: 2000
                });
            })
    }

    return (
        <div className="container w75">
            <h1>Adicionar comida</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label>Código:</Form.Label>
                    <Form.Control type="text"  {...register("codigo", { required: "O código da comida é obrigatório" }) }/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control type="text" {...register("nome", { required: "O nome da comida é obrigatória.", maxLength: { value: 131, message: "Limite de 131 caracteres." }, minLength: { value: 3, message: "É preciso digitar 3 caracteres ou mais." } })} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Descrição:</Form.Label>
                    <Form.Control type="text" {...register("descricao", { required: "A descrição da comida é obrigatória", maxLength: { value: 255, message: "Limite de 255 caracteres." }, minLength: { value: 8, message: "É preciso digitar 8 caracteres ou mais" } })} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Categoria:</Form.Label>
                    <Form.Select aria-label="Selecione a categoria" {...register("categoria", { required: true })}>
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
                </Form.Group>

                <Form.Group>
                    <Form.Label>Preço:</Form.Label>
                    <Form.Control placeholder="Digite o valor do serviço."
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
                </Form.Group>

                <Form.Group>
                    <Form.Label>Peso:</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Imagem</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>

                {/* <Form.Group className="invisible"> */}
                <Form.Group>
                    <Form.Label>RestauranteId</Form.Label>
                    <Form.Control type="text" />
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