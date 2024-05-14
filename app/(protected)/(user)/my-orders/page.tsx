import {DataTable} from "./_components/data-table";
import {columns} from "./_components/columns";
import { getMyOrders } from "@/actions/orders/get-my-orders";

const MyOrdersPage = async () => {
    const orders = await getMyOrders();
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={orders} />
        </div>
    );
};

export default MyOrdersPage;