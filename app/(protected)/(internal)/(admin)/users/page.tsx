import {getUsers} from "@/actions/users/get-users";
import {DataTable} from "@/app/(protected)/(internal)/(admin)/users/_components/data-table";
import {columns} from "@/app/(protected)/(internal)/(admin)/users/_components/columns";

const UsersPage = async () => {
    const users = await getUsers();
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={users} />
        </div>
    );
};

export default UsersPage;