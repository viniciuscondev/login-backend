import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {} from 'dotenv/config';

import { UsersRepository } from '../repositories/UsersRepository';
import { Validation } from '../services/Validation';

class UserController {
    async create(request: Request, response: Response) {
        try {
            //Armazenamento do request.body em variáveis
            const { name, email, password, passwordConfirmation } = request.body;

            //Validação dos dados
            const validation = new Validation();
            validation.isRequired(name, "Informe seu nome");
            validation.isRequired(email, "Informe seu email");
            validation.isRequired(password, "Informe sua senha");
            validation.isRequired(passwordConfirmation, "Confirme sua senha");
            validation.isTrue(password !== passwordConfirmation, "A senha e a confirmação devem ser iguais");
            validation.isEmail(email, "Informe um email válido");
            validation.isPasswordValid(password, "A senha deve ter mais que 6 caracteres");

            if(validation.errors.length > 0) {
                response.status(400).json(validation.errors);
                return;
            }
            
            const usersRepository = getCustomRepository(UsersRepository);

            const userAlreadyExists = await usersRepository.findOne({
                email
            });

            if (userAlreadyExists) {
                return response.status(400).json({
                    error: "Usuário já registrado"
                });
            }

            //Criptografando a senha
            var salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const user = usersRepository.create({
                name, email, password: hashedPassword
            });

            await usersRepository.save(user);

            const filteredUser = {
                name: user.name,
                email: user.email
            }

            return response.json(filteredUser);
        } catch (error) {
            return response.status(500).send({ message: "Erro interno no servidor" });
        }        
    }

    async authenticate(request: Request, response: Response) {
        try {
            const { email, password } = request.body;

            const validation = new Validation();
            validation.isRequired(email, "Informe seu email");
            validation.isRequired(password, "Informe sua senha");

            if(validation.errors.length > 0) {
                response.status(400).json(validation.errors);
                return;
            }

            const usersRepository = getCustomRepository(UsersRepository);

            const userExists = await usersRepository.findOne({
                email
            });

            if(!userExists) {
                return response.status(400).send({ message: "Email não cadastrado" });
            }

            if(!bcrypt.compareSync(password, userExists.password)) {
                return response.status(400).send({ message: "Senha incorreta" });
            }

            const filteredUser = {
                name: userExists.name,
                email: userExists.email
            }

            return response.status(200).send({ user: filteredUser, token: jwt.sign({ user: userExists }, process.env.SECRET_KEY) });
            
        } catch (error) {
            return response.status(500).send({ message: "Erro interno no servidor" });
        }
    }

    async update(request: Request, response: Response) {
        try {
            const { oldPassword, newPassword } = request.body;

            const validation = new Validation();
            validation.isRequired(oldPassword, "Informe sua senha atual");
            validation.isRequired(newPassword, "Informe sua nova senha");
            validation.isPasswordValid(newPassword, "A senha deve ter mais que 6 caracteres");

            if(validation.errors.length > 0) {
                response.status(400).json(validation.errors);
                return;
            }

            if(bcrypt.compareSync(newPassword, (<any>request.user).password)) {
                return response.status(400).send({ message: "A nova senha deve ser diferente da senha atual" });
            }

            var salt = await bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(newPassword, salt);
            
            const usersRepository = getCustomRepository(UsersRepository);

            const updatedUser = await usersRepository.update({ id: (<any>request.user).id }, { password: hashedPassword });

            if(!updatedUser) {
                return response.status(400).send({ message: "Operação inválida" });
            }

            return response.status(200).send({ message: "Senha atualizada com sucesso!" });
        } catch (error) {
            return response.status(500).send({ message: "Erro interno no servidor" });
        }
    }

    async delete(request: Request, response: Response) {
        try {
            const { password } = request.body;
            
            const isPasswordEqual = bcrypt.compareSync(password, (<any>request.user).password);
            
            if (!isPasswordEqual) {                
                return response.status(400).send({ message: "Senha incorreta" });
            }
                        
            const usersRepository = getCustomRepository(UsersRepository);

            const deletedUser = await usersRepository.delete({ id: (<any>request.user).id });

            if(!deletedUser) {
                return response.status(400).send({ message: "Operação inválida" });
            }

            return response.status(200).send({ message: "Usuário deletado com sucesso!" });
        } catch (error) {
            return response.status(500).send({ message: "Erro interno no servidor" });
        }
    }
}

export { UserController };