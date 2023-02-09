```
mutation{
  createProduct(createProductInput: {
    name: "농구공",
    description: "뻥뻥",
    price: 5000,
    productSalesLocation:{
      address:"마포",
      lat: 0.1,
      lng:1.0,
      addressDetail:"홍대입구",
      meetingTime:"2022-01-02"
    },
    productCategoryId: "99cab7ea-d5b1-4c2a-8b1d-4bbf7e6948bf"
  }){
    id name description price productSalesLocation{
      id
    }
    productCategory{
      id
    }
  }
}
```

```
query{
  fetchProduct(id:"159f4b89-c969-4935-b42f-b1fa6f685c3e"){
    id
    name
    description
    productSalesLocation{
      id
      address
      addressDetail
      lat
      lng
      meetingTime
    }
  }
}
```

```
mutation{
  createProduct(createProductInput: {
    name: "야구공",
    description: "뻥뻥",
    price: 5000,
    productSalesLocation:{
      address:"마포",
      lat: 0.1,
      lng:1.0,
      addressDetail:"홍대입구",
      meetingTime:"2022-01-02"
    },
    productCategoryId: "99cab7ea-d5b1-4c2a-8b1d-4bbf7e6948bf",
    productTags: ["#공", "#Ball"]
  }){
    id name description price productSalesLocation{
      id
    }
    productCategory{
      id
    }
    productTags{
      id
      name
    }
  }
}
```
