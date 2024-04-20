import { useSearchParams } from "react-router-dom"
import Select from "./Select"

function Sort({options}) {
const [searchParams, setSearchParams] = useSearchParams()  
const sortBy = searchParams.get('sort') || '' //* first value if not defined. keeps track of current selection even after page refresh


function handleChange(e) {
    searchParams.set('sort', e.target.value)
    setSearchParams(searchParams)
    }   


        return <Select value={sortBy} options={options} type='white' onChange={handleChange} />
}

export default Sort
