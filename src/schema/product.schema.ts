import { number, object, string, TypeOf } from "zod";

const payload = {
    body: object({
        title: string({
            required_error: 'Product Title required'
        }),
        description: string({
            required_error: 'Product description required'
        }).min(120, "Description too short -- at least 120 characters"),
        price: number({
            required_error: 'Product Price required'
        }),
        image: string({
            required_error: 'Product image required'
        }),
    })
}

const params = {
    params: object({
        productId: string({
            required_error: "ProductId is required"
        })
    })
}

export const createProductSchema = object({
    ...payload
})

export const updateProductSchema = object({
    ...payload,
    ...params
})

export const getProductSchema = object({
    ...params
})

export const deleteProductSchema = object({
    ...params
})

export type CreateProductInput = TypeOf<typeof createProductSchema>
export type UpdateProductInput = TypeOf<typeof updateProductSchema>
export type ReadProductInput = TypeOf<typeof getProductSchema>
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>