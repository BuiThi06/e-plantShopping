import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',

    initialState: {
        items: [],
    },

    reducers: {

        // ADD PRODUCT
        addItem: (state, action) => {

            const existingItem = state.items.find(
                item => item.id === action.payload.id
            );

            if (existingItem) {

                existingItem.quantity += 1;

            } else {

                state.items.push({
                    ...action.payload,
                    quantity: 1
                });

            }
        },

        // REMOVE PRODUCT
        removeItem: (state, action) => {

            state.items = state.items.filter(
                item => item.id !== action.payload
            );

        },

        // UPDATE QUANTITY
        updateQuantity: (state, action) => {

            const { id, quantity } = action.payload;

            const item = state.items.find(
                item => item.id === id
            );

            if (item) {

                item.quantity = quantity;

                if (item.quantity <= 0) {
                    state.items = state.items.filter(
                        item => item.id !== id
                    );
                }

            }

        }

    }
});

export const {
    addItem,
    removeItem,
    updateQuantity
} = CartSlice.actions;

export default CartSlice.reducer;