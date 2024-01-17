const AuthKeys = {
  user: 'user',
  token: 'token',
};

const ShoppingCartKeys = {
  cart: 'cart',
};

interface LocalStorageCartItem {
  cartItemUuid: string;
  quantity: number;
}

class LocalStorageService {
  signUserIn({ token }: { token: string }): void {
    localStorage.removeItem(AuthKeys.token);
    localStorage.setItem(AuthKeys.token, token);
  }

  updateAccessToken(token: string): void {
    localStorage.removeItem(AuthKeys.token);
    localStorage.setItem(AuthKeys.token, token);
  }

  clearUser(): void {
    localStorage.removeItem(AuthKeys.token);
    localStorage.removeItem(AuthKeys.user);
  }

  getSignedUser(): { token: string } | null {
    if (!localStorage.getItem(AuthKeys.token)) {
      return null;
    }

    return {
      token: localStorage.getItem(AuthKeys.token) ?? '',
    };
  }

  addAProductToTheCart(product: LocalStorageCartItem): void {
    const localStorageCart = localStorage.getItem(ShoppingCartKeys.cart);

    if (localStorageCart) {
      let cartItems: LocalStorageCartItem[] = JSON.parse(localStorageCart);

      if (cartItems.some(item => item.cartItemUuid === product.cartItemUuid)) {
        cartItems = cartItems.map(item => {
          if (item.cartItemUuid === product.cartItemUuid) item.quantity++;

          return item;
        });
      } else {
        cartItems.push(product);
      }

      localStorage.setItem(ShoppingCartKeys.cart, JSON.stringify(cartItems));
    } else {
      localStorage.setItem(ShoppingCartKeys.cart, JSON.stringify([product]));
    }
  }

  removeSingleFromCart(product: LocalStorageCartItem): void {
    const localStorageCart = localStorage.getItem(ShoppingCartKeys.cart);

    if (localStorageCart) {
      let cartItems: LocalStorageCartItem[] = JSON.parse(localStorageCart);

      const cartItemToRemove = cartItems.find(
        item => item.cartItemUuid === product.cartItemUuid,
      );

      if (cartItemToRemove && cartItemToRemove.quantity > 1) {
        cartItems = cartItems.map(item => {
          if (item.cartItemUuid === product.cartItemUuid) item.quantity--;

          return item;
        });
      } else {
        cartItems = cartItems.filter(
          item => item.cartItemUuid !== product.cartItemUuid,
        );
      }

      localStorage.setItem(ShoppingCartKeys.cart, JSON.stringify(cartItems));
    } else {
      localStorage.setItem(ShoppingCartKeys.cart, JSON.stringify([product]));
    }
  }

  getShoppingCartProducts(): LocalStorageCartItem[] {
    const localStorageCart = localStorage.getItem(ShoppingCartKeys.cart);

    if (localStorageCart != null) {
      return JSON.parse(localStorageCart);
    } else {
      return [];
    }
  }
}

export default new LocalStorageService();
