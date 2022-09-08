const triviaAPI = async (token) => {
  const ENDPOINT_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(ENDPOINT_URL);
  const json = await response.json();
  return json.results;
};

export default triviaAPI;
