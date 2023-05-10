import axios from "axios"
import { useEffect, useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditaRestaurante() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const {id} = useParams()
    const navigate = useNavigate();
    

function onSubmit(data) {
    axios.put(`http://localhost:3001/restaurantes/${id}`, data)
    .then(response => {
        toast.success(response.data.message, {position:"bottom-right", duration:2000})
        navigate("/restaurantes")
    })

.catch(error => {
    toast.error(error.response.data.message, {position:"botom-right", duration: 2000})
    console.log(error)
})
}

useEffect( () => {
    axios.get(`http://localhost:3001/restaurantes/${id}`)
    .then(response => {
        //TODO --> Tirar email e senha como obrigatório do put, tanto no front quanto no back.
        const {nomeFantasia, razaoSocial, cnpj, email, senha, endereco: {uf, cidade, cep, rua, numero, complemento}} = response.data
        reset ({nomeFantasia, razaoSocial, cnpj, email, senha, endereco: {uf, cidade, cep, rua, numero, complemento}})
    })
}, [id, reset])

return (
    <>
            <div className="container mt-2 ">
                <Card className="mt-3 mb-3" border="warning">
                    <Card.Body>
                        <h1 className="text-center">Editar informações do restaurante</h1>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="mt-2 mb-3">
                                <Form.Label>Nome Fantasia</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Restaurante da Maria"
                                    className={errors.nomeFantasia && "is-invalid"}
                                    {...register("nomeFantasia", {
                                        required: "O Nome Fantasia é obrigatório.",
                                        maxLength: {
                                            value: 130,
                                            message: "Limite de 130 caracteres.",
                                        },
                                    })}
                                />
                                {errors.nomeFantasia && (
                                    <Form.Text className="invalid-feedback">
                                        {errors.nomeFantasia.message}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Razão Social</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Maria Comércio de Alimentos Ltda."
                                    className={errors.razaoSocial && "is-invalid"}
                                    {...register("razaoSocial", {
                                        required: "A Razão Social é obrigatória.",
                                    })}
                                />
                                {errors.razaoSocial && (
                                    <Form.Text className="invalid-feedback">
                                        {errors.razaoSocial.message}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>CNPJ</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="12.345.678/0001-00"
                                    className={errors.cnpj && "is-invalid"}
                                    {...register("cnpj", {
                                        required: "O CNPJ é obrigatório.",
                                        maxLength: {
                                            value: 18,
                                            message: "Limite de 18 caracteres.",
                                        },
                                    })}
                                />
                                {errors.cnpj && (
                                    <Form.Text className="invalid-feedback">
                                        {errors.cnpj.message}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="restaurantedamaria@email.com"
                                    className={errors.email && "is-invalid"}
                                    {...register("email", {
                                        required: "O email é obrigatório.",
                                    })}
                                />
                                {errors.email && (
                                    <Form.Text className="invalid-feedback">
                                        {errors.email.message}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Insira sua senha aqui"
                                    className={errors.senha && "is-invalid"}
                                    {...register("senha", {
                                        required: "O senha é obrigatório.",
                                    })}
                                />
                                {errors.senha && (
                                    <Form.Text className="invalid-feedback">
                                        {errors.senha.message}
                                    </Form.Text>
                                )}
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Cidade</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Alabasta"
                                            className={errors.endereco?.cidade && "is-invalid"}
                                            {...register("endereco.cidade", {
                                                required: "A cidade é obrigatória.",
                                                maxLength: {
                                                    value: 255,
                                                    message: "Limite de 255 caracteres.",
                                                },
                                            })}
                                        />
                                        {errors.endereco?.cidade && (
                                            <Form.Text className="invalid-feedback">
                                                {errors.endereco?.cidade.message}
                                            </Form.Text>
                                        )}
                                    </Form.Group>
                                </Col>

                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>UF</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        className={errors.endereco?.uf && "is-invalid"}
                                        {...register("endereco.uf", {
                                            required: "O UF é obrigatório.",
                                            maxLength: {
                                                value: 2,
                                                message: "Limite de 2 caracteres",
                                            },
                                        })}
                                    >
                                        <option value="default">Unidade Federativa</option>
                                        <option value="1">PE</option>
                                        <option value="2">SP</option>
                                        <option value="3">RJ</option>
                                        <option value="4">CE</option>
                                    </Form.Select>
                                    {errors.endereco?.uf && (
                                        <Form.Text className="invalid-feedback">
                                            {errors.endereco?.uf.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>CEP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="99999-999"
                                        pattern="[0-9]{5}-[0-9]{3}|[0-9]{8}"
                                        title="Formato: 123.456.789-12"
                                        className={errors.endereco?.cep && "is-invalid"}
                                        {...register("endereco.cep", {
                                            required: "O CEP é obrigatório.",
                                            maxLength: {
                                                value: 9,
                                                message: "Limite de 9 caracteres.",
                                            },
                                        })}
                                    />
                                    {errors.endereco?.cep && (
                                        <Form.Text className="invalid-feedback">
                                            {errors.endereco?.cep.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Rua</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Avenida Paulista"
                                        className={errors.endereco?.rua && "is-invalid"}
                                        {...register("endereco.rua", {
                                            required: "A rua é obrigatória.",
                                            maxLength: {
                                                value: 100,
                                                message: "Limite de 100 caracteres.",
                                            },
                                        })}
                                    />
                                    {errors.endereco?.rua && (
                                        <Form.Text className="invalid-feedback">
                                            {errors.endereco?.rua.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Numero</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="5"
                                        className={errors.endereco?.numero && "is-invalid"}
                                        {...register("endereco.numero", {
                                            required: "O número é obrigatório.",
                                            maxLength: {
                                                value: 100,
                                                message: "Limite de 100 caracteres.",
                                            },
                                        })}
                                    />
                                    {errors.endereco?.numero && (
                                        <Form.Text className="invalid-feedback">
                                            {errors.endereco?.numero.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>

                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Complemento</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Casa ou Apt"
                                        className={errors.endereco?.complemento && "is-invalid"}
                                        {...register("endereco.complemento", {
                                            required: "O complemento é obrigatório.",
                                            maxLength: {
                                                value: 100,
                                                message: "Limite de 100 caracteres.",
                                            },
                                        })}
                                    />
                                    {errors.endereco?.complemento && (
                                        <Form.Text className="invalid-feedback">
                                            {errors.endereco?.complemento.message}
                                        </Form.Text>
                                    )}
                                </Form.Group>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button variant="warning" type="submit" color="light">
                                    Editar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </>
)
}