import css from './SearchBox.module.css'
import { changeFilter } from '../../redux/filtersSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function SearchBox() {

    const dispatch = useDispatch();
    const filter = useSelector(state => state.name);

    const handleFilter = (filter) => {
        dispatch(changeFilter(filter));
    }
    
    
    return (
        <div className={css.box}>
            <p className={css.text}>Find contacts by name:</p>
            <input type="text" name="filter" value={filter} onChange={evt => handleFilter(evt.target.value)} />
        </div>
    )
} 