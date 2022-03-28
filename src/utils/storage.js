

export const LocalStorageKeyManager = {
    JWT_TOKEN: 'jwt_token',
    GAME_HISTORY: 'game_history'
};


export const saveJwtTokenToStorage = token => {
    localStorage.setItem(LocalStorageKeyManager.JWT_TOKEN, token);
};


export const saveLoginDataToStorage = data => {
    if (!data) return;

    // eslint-disable-next-line camelcase
    const { jwt_token } = data;
    saveJwtTokenToStorage(jwt_token);

    return {
        jwt_token
    }
};

export const getJwtTokenFromStorage = () => {
    return localStorage.getItem(LocalStorageKeyManager.JWT_TOKEN);
};

export const getPingPongGameHistoryFromStorage = () => {
    return localStorage.getItem(LocalStorageKeyManager.GAME_HISTORY) ? JSON.parse(localStorage.getItem(LocalStorageKeyManager.GAME_HISTORY)) : [];
};

export const saveCurrentPingPongGameHistoryToStorage = history => {
    localStorage.setItem(LocalStorageKeyManager.GAME_HISTORY, history);
};

export const saveCurrentPingPongGameToStorage = game => {
    const history = [...getPingPongGameHistoryFromStorage()];
    console.log(game, 'history', history);
    history.push(game);
    saveCurrentPingPongGameHistoryToStorage(JSON.stringify(history));
};

