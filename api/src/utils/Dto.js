export class DTO {
    static userDto(user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone
        }
    }
}