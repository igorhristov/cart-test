import { client, Query } from "@tilework/opus";

const getProduct = async (product) => {
  client.setEndpoint("http://localhost:4000/graphql");

  const query = new Query("product", true)
    .addArgument("id", "String!", product)
    .addFieldList([
      "id",
      "name",
      "description",
      "brand",
      "attributes {id, items {value, id}}",
      "prices {amount}",
      "inStock",
      "gallery",
    ]);

  return await client.post(query);
};

export default getProduct;
