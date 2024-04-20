
import Filter from "../../ui/Filter"
import TableOperations from "../../ui/TableOperations"

function CartTableOperations() {
    return <TableOperations>
        <Filter filterField='type' options={[
        {value: 'allCarts', label: 'All Carts'}, 
        {value: 'activeCarts', label: 'Active Carts'},
        ]}/>
    </TableOperations>
}

export default CartTableOperations
