import { getMenuItems } from "@/actions/menu-items/get-items";
import OrderForm from "./_components/order-form";

const OrderPage = async () => {
    const availableItems = await getMenuItems();
    return (
        <div className="flex items-center justify-center">
            <OrderForm availableItems={availableItems} />
        </div>
    )
};

export default OrderPage;