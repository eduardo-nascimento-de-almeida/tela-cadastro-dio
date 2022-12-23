import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { api } from '../../services/api';

import { Column, Container, LoginText, Observacao, Row, SubtitleLogin, Title, TitleLogin, Wrapper } from './styles'

const schema = yup.object({
    email: yup.string().email('email não é valido').required('email não é valido'),
    password: yup.string().min(3, 'No mínimo 3 caractéres').required('No mínimo 3 caractéres'),
  }).required();


const Login = () => {
    const navigate = useNavigate();


    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    
    const onSubmit = async formData => {
        try{
            const { data } = await api.get(`users?email=${formData.email}&senha=${formData.password}`);
            if(data.length === 1) {
                navigate('/feed')
            } else {
                alert('Email ou senha inválidos.')
            }
        }catch{
            alert('Houve um erro, tente novamente.')
        }
    };


    return (<>
        <Header />
        <Container>
            <Column>
                <Title>
                    A plataforma para você aprender com experts, dominar as principais tecnologias
                     e entrar mais rápido nas empresas mais desejadas.
                </Title>
            </Column>
            <Column>
                <Wrapper>
                    <TitleLogin>Comece agora grátis</TitleLogin>
                    <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input name="name" control={control} placeholder="Nome completo" leftIcon={<MdPerson />}/>
                        <Input name="email" errorMessage={errors?.email?.message} control={control} placeholder="E-mail" leftIcon={<MdEmail />}/>
                        <Input name="password" errorMessage={errors?.password?.message} control={control} placeholder="Password" type="password" leftIcon={<MdLock />}/>
                        <Button title="Criar minha conta" variant="secondary" type="submit" />
                    </form>
                    <Row>
                        <Observacao>
                            Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade
                            e os Termos de Uso da DIO.
                        </Observacao>
                        <LoginText>Criar conta</LoginText>
                    </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Login }