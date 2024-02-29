import {DataTable} from "./_components/data-table";
import {columns} from "./_components/columns";
import {getMenuItems} from "@/actions/menu-items/get-items";

const MenuPage = async () => {
    const items = await getMenuItems();
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={items} />
        </div>
    );
};

export default MenuPage;