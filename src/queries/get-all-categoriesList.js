import { client, Query, Field } from "@tilework/opus";

const getAllCategoriesList = async () => {
  client.setEndpoint("http://localhost:4000/graphql");

  const queryAll = new Query("categories", true).addField(
    new Field("name", true)
  );

  return await client.post(queryAll);
};

export default getAllCategoriesList;
