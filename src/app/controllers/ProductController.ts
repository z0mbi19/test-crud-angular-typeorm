import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Categories from '../models/Categories'
import Products from '../models/Products'

class ProductController {
    async index(req: Request, res: Response) {
        const repository = await getRepository(Products)
            .createQueryBuilder("categories")
            .leftJoinAndSelect("categories.IdCateg", "products")
            .getMany()
        //const product = await repository.find({ where: { id: req.params.id } })
        return res.send(repository.filter(p => p.id === Number(req.params.id)))
    }
    async indexAll(req: Request, res: Response) {
        const repository = await getRepository(Products)
            .createQueryBuilder("categories")
            .leftJoinAndSelect("categories.IdCateg", "products")
            .getMany()
        //const product = await repository.find({ where: { id: req.params.id } })
        return res.send(repository)
    }
    async store(req: Request, res: Response) {
        const repository = getRepository(Products)
        const categorie = getRepository(Categories)
        const { nome, imagem, IdCateg } = req.body
        const categorieExists = await categorie.findOne({ where: { id: IdCateg } })

        if (!categorieExists) {
            return res.status(409).send("Essa categoria nâo foi cadastrado")
        }
        try {
            const product = repository.create({ nome, imagem, IdCateg })
            await repository.save(product)
            return res.json("ok")
        } catch (e) {
            return res.status(400).send(e)
        }
    }
    async update(req: Request, res: Response) {
        const repository = getRepository(Products)
        const categorie = getRepository(Categories)
        const { nome, imagem, IdCateg } = req.body
        const categorieExists = await categorie.findOne({ where: { id: IdCateg } })
        const products = await repository.findOne({ where: { id: req.params.id } })
        if (!products) {
            return res.status(409).send("Essa produto nâo foi cadastrado")
        }
        if (!categorieExists) {
            return res.status(409).send("Essa categoria nâo foi cadastrado")
        }
        try {
            await repository.save({ id: products.id, nome, imagem, IdCateg })
            return res.json("ok")
        } catch (e) {
            return res.json(400).send(e)
        }
    }
    async delete(req: Request, res: Response) {
        const repository = getRepository(Products);
        const products = await repository.findOne({ where: { id: req.params.id } })
        if (!products) {
            return res.status(409).send("Essa categoria nâo foi cadastrado")
        }
        await repository.delete({ id: products.id })
        return res.json("ok")
    }
}

export default new ProductController()