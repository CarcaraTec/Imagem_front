interface UserData {
    token: string;
  }

import storeUserData from 'D:/Fatec Projects/Imagem_front/ImagemFront/src/stores/auth.ts';

// Exemplo de uso
const user: UserData = {
  token: 'John Doe',
};

// Chamando a função para armazenar os dados do usuário
storeUserData(user.token);
export default user;