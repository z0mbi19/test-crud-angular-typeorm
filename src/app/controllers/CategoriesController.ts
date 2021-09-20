import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Categories from "../models/Categories";

class CategoriesController {

    async index(req: Request, res: Response) {
        const repository = getRepository(Categories)
        const category = await repository.find({ where: { id: req.params.id } })
        return res.send(category)
    }

    async indexAll(req: Request, res: Response) {
        const repository = getRepository(Categories)
        const category = await repository.find()
        return res.send(category)
    }

    async store(req: Request, res: Response) {
        const repository = getRepository(Categories)
        const { nome, imagem } = req.body
        const userExists = await repository.findOne({ where: { nome } })
        if (userExists) {
            return res.status(409).send("Essa categoria já foi cadastrado")
        }
        const categorie = repository.create({ nome, imagem })
        await repository.save(categorie)
        return res.json("ok")
    }

    async update(req: Request, res: Response) {
        const repository = getRepository(Categories);
        const { nome, imagem } = req.body
        const categorieExists = await repository.findOne({ where: { id: req.params.id } })
        if (!categorieExists) {
            return res.status(409).send("Essa categoria nâo foi cadastrado")
        }
        await repository.save({ id: categorieExists.id, nome, imagem })
        return res.json("ok")
    }

    async delete(req: Request, res: Response) {
        const repository = getRepository(Categories);
        const categorieExists = await repository.findOne({ where: { id: req.params.id } })
        if (!categorieExists) {
            return res.status(409).send("Essa categoria nâo foi cadastrado")
        }
        await repository.delete({ id: categorieExists.id })
        return res.json("ok")
    }

}

export default new CategoriesController()