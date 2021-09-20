import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";

import User from "../models/User";

class UserController {
    //Busca um usuario
    async index(req: Request, res: Response) {
        const repository = getRepository(User);

        const user = await repository.find({ where: { id: req.params.id } })

        return res.json(user)
    }
    //Cria um usuario
    async store(req: Request, res: Response) {
        const repository = getRepository(User);
        const { email, password } = req.body
        const userExists = await repository.findOne({ where: { email } })
        if (userExists) {
            return res.status(409).send("Esse email já foi cadastrado")
        }
        const cryptPass = bcrypt.hashSync(password, 8)
        const user = repository.create({ email, password: cryptPass });
        try {
            await repository.save(user);
            return res.json("ok");
        } catch (e) {
            return res.send(e)
        }
    }
    //atualiza o usuario logado
    async update(req: Request, res: Response) {
        const repository = getRepository(User);
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).send("Campo senha e email são obrigatorios")
        }
        const user = await repository.findOne({ where: { id: req.userId } })
        if (!user) {
            return res.status(401).send("Usuario invalido")
        }

        const userExists = await repository.findOne({ where: { email } })
        if (userExists) {
            return res.status(409).send("Esse email já foi cadastrado")
        }

        const cryptPass = bcrypt.hashSync(password, 8)

        await repository.update(req.userId, { email, password: cryptPass });

        return res.json("ok")

    }

    //O usuario que e deletado e o usuario logado
    async delete(req: Request, res: Response) {
        const repository = getRepository(User);
        const user = await repository.findOne({ where: { id: req.userId } })
        if (!user) {
            return res.status(401).send("Usuario invalido")
        }
        await repository.delete(user)
        return res.json("ok")
    }
}

export default new UserController()