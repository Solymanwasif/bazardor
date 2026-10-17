const API_URL = "https://openapi.programming-hero.com/api/bazardor";


export async function getProducts() {

  const res = await fetch(`${API_URL}/products`, {
    next: {
      revalidate: 60
    }
  });


  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }


  return await res.json();

}



export async function getCategories() {

  const res = await fetch(`${API_URL}/categories`, {
    next: {
      revalidate: 60
    }
  });


  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }


const data = await res.json();

return data;

}



export async function getSingleProduct(id) {

  const res = await fetch(
    `${API_URL}/products/${id}`
  );


  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }


  return await res.json();

}
export async function getCategoryProducts(slug){

  const res = await fetch(
    `${API_URL}/products?category=${slug}`,
    {
      cache:"no-store"
    }
  );


  if(!res.ok){
    throw new Error("Failed to fetch category products");
  }


  return await res.json();

}