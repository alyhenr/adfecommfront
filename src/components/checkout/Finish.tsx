import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/reducers/store'
import { createCart } from '../../store/actions'

const Finish = () => {
    const { products } = useSelector((state: RootState) => state.cartState)
    const dispatch = useDispatch<AppDispatch>()
    const createUserCart = () => {
        console.log("Creating cart...");
        
        dispatch(createCart(products))
    }
    return (
        <>
            <div>Finish</div>
            <button onClick={createUserCart}>
                OK
            </button>
        </>
    )
}

export default Finish