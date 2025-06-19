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
    static updatedUser(user) {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            restorantName: user.restorantName,
            address: {
                city: user.address.city,
                state: user.address.state,
                street: user.address.street,
                zipCode: user.address.zipCode,
            },
        }
    }
}