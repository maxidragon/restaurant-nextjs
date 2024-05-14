import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { OrderedItem } from "@/types";
import { MenuItem } from "@prisma/client";

interface ItemsPicker {
  items: OrderedItem[];
  availableItems: MenuItem[];
  handleAddItem: (item: MenuItem) => void;
}

const ItemsPicker = ({ items, availableItems, handleAddItem }: ItemsPicker) => {
  return (
    <div>
      <h1>Available Items</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {availableItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>
                <button onClick={() => handleAddItem(item)}>Add</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h1>Your items</h1>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {items.map((item) => (
                <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price * item.quantity}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </div>
  );
};

export default ItemsPicker;
