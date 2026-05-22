import { Request, Response } from "express"
import { userService } from "../services/user.service"

export const userController = {

    getAll(req: Request, res: Response) {
        const items = userService.getAll()
        res.json({ items })
    },

    getById(req: Request, res: Response) {
        const id = Number(req.params.id)
        const item = userService.getById(id)
        res.json(item)
    },

    create(req: Request, res: Response) {
        const item = userService.create(req.body)
        res.status(201).json(item)
    },

    update(req: Request, res: Response) {
        const id = Number(req.params.id)
        const item = userService.update(id, req.body)
        res.json(item)
    },

    delete(req: Request, res: Response) {
        const id = Number(req.params.id)
        userService.delete(id)
        res.status(204).send()
    }
}