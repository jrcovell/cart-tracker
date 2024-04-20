
import Filter from "../../ui/Filter"
import Sort from "../../ui/Sort"
import TableOperations from "../../ui/TableOperations"

function CartTableOperations() {
    return <TableOperations>
        <Filter filterField='type' options={[
        {value: 'allCarts', label: 'All Carts'}, 
        {value: 'activeCarts', label: 'Active Carts'},
        ]}/>

        <Sort options={[
            {value: 'ascending', label: 'Ascending'},
            {value: 'descending', label: 'Descending' }
        ]}
            />

        
    </TableOperations>
}

export default CartTableOperations
