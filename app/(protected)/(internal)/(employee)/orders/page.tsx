import {DataTable} from "./_components/data-table";
import {columns} from "./_components/columns";
import {getAllOrders} from "@/actions/orders/get-all-orders";

const OrdersPage = async () => {
    const orders = await getAllOrders();
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={orders} />
        </div>
    );
};

export default OrdersPage;