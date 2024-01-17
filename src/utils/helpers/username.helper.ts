import { UserDetailsResponseDTO } from 'core/services/http/auth/dto/auth-service.response.dto';

export const getUserName = (
  user: UserDetailsResponseDTO | undefined | null,
) => {
  return user != null ? user.firstName + ' ' + user.lastName : 'Michael';
};
