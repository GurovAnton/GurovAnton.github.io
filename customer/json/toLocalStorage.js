var data = [{
  "name": "Anton1",
  "email": "anton@gmail.com",
  "telephone": "0952004515",
  "adress": {
    "street": "street str",
    "city": "Kiev",
    "state": "Kiev",
    "zip": "02140"
  }
},
  {
    "name": "Anton2",
    "email": "anton@gmail.com",
    "telephone": "0952004515",
    "adress": {
      "street": "street str",
      "city": "Kiev",
      "state": "Kiev",
      "zip": "02140"
    }
  },
    {
      "name": "Anton3",
      "email": "anton@gmail.com",
      "telephone": "0952004515",
      "adress": {
        "street": "street str",
        "city": "Kiev",
        "state": "Kiev",
        "zip": "02140"
      }
    }
];
localStorage.setItem('dat', JSON.stringify(data));
