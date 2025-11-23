import marketCartReducer, {
  addItem,
  removeItem,
  removeItemCompletely,
  clearCart,
  selectMarketCartItems,
  selectMarketCartTotal,
  selectMarketCartItemCount,
  selectMarketCartUniqueItemCount,
} from '../marketCartSlice';

describe('marketCartSlice', () => {
  const initialState = {
    items: [],
  };

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(marketCartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('addItem', () => {
    it('should add a new item to the cart', () => {
      const item = { id: 1, name: 'Elma', price: 10 };
      const action = addItem(item);
      const state = marketCartReducer(initialState, action);

      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({
        id: 1,
        name: 'Elma',
        price: 10,
        quantity: 1,
      });
    });

    it('should increase quantity when adding the same item again', () => {
      const item = { id: 1, name: 'Elma', price: 10 };
      const stateWithItem = marketCartReducer(initialState, addItem(item));
      const state = marketCartReducer(stateWithItem, addItem(item));

      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
    });

    it('should add multiple different items', () => {
      const item1 = { id: 1, name: 'Elma', price: 10 };
      const item2 = { id: 2, name: 'Armut', price: 15 };
      
      let state = marketCartReducer(initialState, addItem(item1));
      state = marketCartReducer(state, addItem(item2));

      expect(state.items).toHaveLength(2);
      expect(state.items[0].id).toBe(1);
      expect(state.items[1].id).toBe(2);
    });
  });

  describe('removeItem', () => {
    it('should decrease quantity when quantity is greater than 1', () => {
      const item = { id: 1, name: 'Elma', price: 10 };
      let state = marketCartReducer(initialState, addItem(item));
      state = marketCartReducer(state, addItem(item)); // quantity = 2
      state = marketCartReducer(state, removeItem(1));

      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(1);
    });

    it('should remove item from cart when quantity is 1', () => {
      const item = { id: 1, name: 'Elma', price: 10 };
      let state = marketCartReducer(initialState, addItem(item));
      state = marketCartReducer(state, removeItem(1));

      expect(state.items).toHaveLength(0);
    });

    it('should not remove item if it does not exist', () => {
      const item = { id: 1, name: 'Elma', price: 10 };
      let state = marketCartReducer(initialState, addItem(item));
      state = marketCartReducer(state, removeItem(999));

      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(1);
    });
  });

  describe('removeItemCompletely', () => {
    it('should remove item completely regardless of quantity', () => {
      const item = { id: 1, name: 'Elma', price: 10 };
      let state = marketCartReducer(initialState, addItem(item));
      state = marketCartReducer(state, addItem(item)); // quantity = 2
      state = marketCartReducer(state, removeItemCompletely(1));

      expect(state.items).toHaveLength(0);
    });

    it('should not affect other items when removing one', () => {
      const item1 = { id: 1, name: 'Elma', price: 10 };
      const item2 = { id: 2, name: 'Armut', price: 15 };
      
      let state = marketCartReducer(initialState, addItem(item1));
      state = marketCartReducer(state, addItem(item2));
      state = marketCartReducer(state, removeItemCompletely(1));

      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(2);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const item1 = { id: 1, name: 'Elma', price: 10 };
      const item2 = { id: 2, name: 'Armut', price: 15 };
      
      let state = marketCartReducer(initialState, addItem(item1));
      state = marketCartReducer(state, addItem(item2));
      state = marketCartReducer(state, clearCart());

      expect(state.items).toHaveLength(0);
    });
  });

  describe('selectors', () => {
    const mockState = {
      marketCart: {
        items: [
          { id: 1, name: 'Elma', price: 10, quantity: 2 },
          { id: 2, name: 'Armut', price: 15, quantity: 3 },
        ],
      },
    };

    describe('selectMarketCartItems', () => {
      it('should return all cart items', () => {
        const items = selectMarketCartItems(mockState);
        expect(items).toHaveLength(2);
        expect(items[0].id).toBe(1);
        expect(items[1].id).toBe(2);
      });
    });

    describe('selectMarketCartTotal', () => {
      it('should calculate total price correctly', () => {
        const total = selectMarketCartTotal(mockState);
        // (10 * 2) + (15 * 3) = 20 + 45 = 65
        expect(total).toBe(65);
      });

      it('should return 0 for empty cart', () => {
        const emptyState = { marketCart: { items: [] } };
        const total = selectMarketCartTotal(emptyState);
        expect(total).toBe(0);
      });
    });

    describe('selectMarketCartItemCount', () => {
      it('should return total item count (sum of quantities)', () => {
        const count = selectMarketCartItemCount(mockState);
        // 2 + 3 = 5
        expect(count).toBe(5);
      });

      it('should return 0 for empty cart', () => {
        const emptyState = { marketCart: { items: [] } };
        const count = selectMarketCartItemCount(emptyState);
        expect(count).toBe(0);
      });
    });

    describe('selectMarketCartUniqueItemCount', () => {
      it('should return number of unique items', () => {
        const count = selectMarketCartUniqueItemCount(mockState);
        expect(count).toBe(2);
      });

      it('should return 0 for empty cart', () => {
        const emptyState = { marketCart: { items: [] } };
        const count = selectMarketCartUniqueItemCount(emptyState);
        expect(count).toBe(0);
      });
    });
  });
});

