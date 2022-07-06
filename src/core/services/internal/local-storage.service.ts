const AuthKeys = {
  user: 'user',
  token: 'token',
};

const ShoppingCartKeys = {
  cart: 'cart',
};

interface LocalStorageCartItem {
  uuid: string;
  name: string;
  description: string;
  price: number;
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

      if (cartItems.some(item => item.uuid === product.uuid)) {
        cartItems = cartItems.map(item => {
          if (item.uuid === product.uuid) item.quantity++;

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
}

export default new LocalStorageService();
