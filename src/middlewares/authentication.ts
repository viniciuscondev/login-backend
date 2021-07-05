import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {} from 'dotenv/config';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

export default async (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.token.toString();
    
    if (token) {
      const jwtDecoded = jwt.verify(token, process.env.SECRET_KEY);

      request.user = (<any>jwtDecoded).user;

      const usersRepository = getCustomRepository(UsersRepository);

      const userExists = await usersRepository.findOne({ id: (<any>request.user).id });

      if (!userExists) {
        response.status(401).send({ error: 'Usuário não existe' });
        return;
      }

      next();
    } else {
      response.status(401).send({ error: 'Token não encontrado' });
    }
  } catch (error) {
    response.status(500).send({ error: 'Token inválido' });
  }
};
