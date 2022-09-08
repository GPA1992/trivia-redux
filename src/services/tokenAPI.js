const TOKEN_API = 'https://opentdb.com/api_token.php?command=request';

const tokenAPI = async () => {
  try {
    const response = await fetch(TOKEN_API);
    const value = await response.json();
    return value;
  } catch (error) {
    return error;
  }
};

export default tokenAPI;
