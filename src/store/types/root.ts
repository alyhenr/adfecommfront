import type { ProductState, FilteredProductState } from "./products";
import type { ErrorState } from "./errors";
import type { CategoryState } from "./categories";
import type { CartState } from "./cart";
import type { AuthState } from "./auth";
import type { AddressState } from "./address";
import type { OrderState } from "./order";
import type { UserState } from "./user";

export interface RootState {
    errorsState: ErrorState;
    productsState: ProductState;
    filteredProductsState: FilteredProductState;
    categoriesState: CategoryState;
    cartState: CartState;
    authState: AuthState;
    addressState: AddressState;
    orderState: OrderState;
    userState: UserState;
} 