import { client, Query, Field } from "@tilework/opus";

const getAllProducts = async () => {
  client.setEndpoint("http://localhost:4000/graphql");

  const queryAll = new Query("category", true)
    .addField(
      new Field("products", true).addFieldList([
        "id",
        "name",
        "inStock",
        'gallery',
        "attributes {id, items {value, id}}",
        "prices{amount}",
      ])
    )
 

  return await client.post(queryAll);
};

export default getAllProducts;
