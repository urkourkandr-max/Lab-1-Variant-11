import { Request, Response } from "express";
import { dutyService } from "../services/duty.service";

const dutyController = {
    getAll(req: Request, res: Response) {
        const result = dutyService.getAll();

        console.log("GET ALL:", result);

        return res.json(result);
    },

    getById(req: Request, res: Response) {
        const item = dutyService.getById(Number(req.params.id));

        if (!item) {
            return res.status(404).json({
                error: true,
                message: "Not Found"
            });
        }

        return res.json(item);
    },

    create(req: Request, res: Response) {
        console.log("BODY:", req.body);

        const item = dutyService.create(req.body);

        return res.status(201).json(item);
    },

    update(req: Request, res: Response) {
        const item = dutyService.update(
            Number(req.params.id),
            req.body
        );

        if (!item) {
            return res.status(404).json({
                error: true,
                message: "Not Found"
            });
        }

        return res.json(item);
    },

    patch(req: Request, res: Response) {
        const item = dutyService.update(
            Number(req.params.id),
            req.body
        );

        if (!item) {
            return res.status(404).json({
                error: true,
                message: "Not Found"
            });
        }

        return res.json(item);
    },

    delete(req: Request, res: Response) {
        const deleted = dutyService.delete(
            Number(req.params.id)
        );

        if (!deleted) {
            return res.status(404).json({
                error: true,
                message: "Not Found"
            });
        }

        return res.sendStatus(204);
    }
};

export default dutyController;