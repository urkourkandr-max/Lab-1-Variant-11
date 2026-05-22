import { userRepository } from "../repositories/user.repository"
import { CreateUserRequestDto } from "../dtos/user.dto"

export const userService = {

    getAll() {
        return userRepository.findAll()
    },

    getById(id: number) {
        const user = userRepository.findById(id)

        if (!user) {
            throw { status: 404, message: "User not found" }
        }

        return user
    },

    create(dto: CreateUserRequestDto) {

        if (!dto.name || dto.name.length < 3) {
            throw { status: 400, message: "Name invalid" }
        }

        if (!dto.email || !dto.email.includes("@")) {
            throw { status: 400, message: "Email invalid" }
        }

        const user = {
            id: Date.now(),
            ...dto
        }

        return userRepository.create(user)
    },

    update(id: number, dto: any) {
        const updated = userRepository.update(id, dto)

        if (!updated) {
            throw { status: 404, message: "User not found" }
        }

        return updated
    },

    delete(id: number) {
        const ok = userRepository.delete(id)

        if (!ok) {
            throw { status: 404, message: "User not found" }
        }
    }
}