import { onRequest } from "firebase-functions/v2/https";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { accessToken, redirectURL } from '../../config'

const client = new MercadoPagoConfig({ accessToken: accessToken });

const IVA = 0.21

interface Product {
    productId: string,
    title: string,
    price: number,
    quantity: number,
}

export const createPreference = onRequest(async (req, res) => {
    try {
        const { cart } = req.body

        const cartItems = cart.map((item: Product) => ({
            title: item.title,
            unit_price: item.price + (item.price * IVA),
            quantity: item.quantity,
            id: item.productId
        }))

        const body = {
            items: cartItems,
            back_urls: {
                success: `${redirectURL}/success`,
                failure: `${redirectURL}/failure`,
                pending: `${redirectURL}/pending`
            },
            auto_return: "approved"
        };
        const preference = new Preference(client);
        const result = preference.create({ body })
        res.status(200).json((await result).init_point)
        return

    } catch (error: any) {
        console.error("Error completo:", {
            message: error.message,
            response_data: error.response?.data,
            stack: error.stack
        });

        res.status(500).json({
            error: "Error al crear preferencia",
            details: error.response?.data || error.message
        });
    }
});