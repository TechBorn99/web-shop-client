//import FinLoadingPage from 'app/pages/Dashboard/Loading/FinLoadingPage';
import authService from 'core/services/http/auth/auth.service';
import localStorageService from 'core/services/internal/local-storage.service';
import watchAuthStoreSagas from 'core/store/auth-store/auth-store.sagas';
import {
  authStoreActions,
  authStoreKey,
  authStoreReducer,
} from 'core/store/auth-store/auth-store.slice';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from 'types';
import {
  AuthRoutes,
  GlobalRoutes,
} from 'utils/constants/routes/app-routes.consts';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

const AuthChecker = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  useInjectReducer({ key: authStoreKey, reducer: authStoreReducer });
  useInjectSaga({ key: authStoreKey, saga: watchAuthStoreSagas });

  const userInfo = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    checkIfUserIsAuthenticatedAndRedirect();
  }, []);

  const checkIfUserIsAuthenticatedAndRedirect = async () => {
    const token = localStorageService.getSignedUser();

    if (token) {
      try {
        const { data: userDetails } = await authService.getUserInfo();

        dispatch(authStoreActions.setUserInfo(userDetails));

        if (!location.pathname.includes(GlobalRoutes.Home)) {
          navigate(GlobalRoutes.Home);
        }
        // if (!location.pathname.includes(GlobalRoutes.Dashboard)) {
        //   navigate(GlobalRoutes.Dashboard);
        // }
      } catch {
        console.log('error');
      }
    } else {
      if (!location.pathname.includes(GlobalRoutes.Auth)) {
        navigate(AuthRoutes.SignIn);
      }
    }
  };

  const shouldRenderApplication = useMemo(() => {
    if (userInfo) {
      return children;
      // if (
      //   RoutePermissions[location.pathname]?.roles.includes(userInfo.role.name)
      // ) {
      //   return children;
      // } else {
      //   return <FinForbiddenPage />;
      // }
    }

    if (location.pathname.includes(GlobalRoutes.Auth)) return children;

    return children;
    //return <FinLoadingPage />;
  }, [location, userInfo]);

  return shouldRenderApplication;
};

export default AuthChecker;
