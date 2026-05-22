import { Duty } from "../dtos/duty.dto"

let duties: Duty[] = []

export const dutyRepository = {

    findAll() {
        return duties.filter(d => !d.deleted)
    },

    findById(id: number) {
        return duties.find(d => d.id === id && !d.deleted)
    },

    create(duty: Duty) {
        duties.push(duty)
        return duty
    },

    update(id: number, data: Partial<Duty>) {
        const item = duties.find(d => d.id === id)

        if (!item) return null

        Object.assign(item, data)

        return item
    },

    delete(id: number) {
        const item = duties.find(d => d.id === id)

        if (!item) return false

        item.deleted = true
        return true
    }
}