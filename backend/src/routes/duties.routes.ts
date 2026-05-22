import { Router } from "express";
import dutyController from "../controllers/duties.controller";

const router = Router();

function validate(req: any, res: any, next: any) {
    const { name, date, time } = req.body;

    if (!name || !date || !time) {
        return res.status(400).json({
            error: true,
            message: "Required fields missing"
        });
    }

    if (name.length < 3 || name.length > 20) {
        return res.status(400).json({
            error: true,
            message: "Name length must be 3-20"
        });
    }

    if (!/^[A-Za-zА-Яа-яІіЇїЄєҐґ\s]+$/.test(name)) {
        return res.status(400).json({
            error: true,
            message: "Name must contain only letters"
        });
    }

    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return res.status(400).json({
            error: true,
            message: "Invalid date"
        });
    }

    if (d < new Date()) {
        return res.status(400).json({
            error: true,
            message: "Date cannot be in past"
        });
    }

    next();
}

router.get("/", dutyController.getAll);
router.get("/:id", dutyController.getById);

router.post("/", validate, dutyController.create);
router.put("/:id", validate, dutyController.update);
router.patch("/:id", validate, dutyController.patch);

router.delete("/:id", dutyController.delete);

export default router;