import React from "react";

const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Vehicles",
    value: "vehicles",
  },
  {
    name: "Kitchen",
    value: "kitchen",
  },
  {
    name: "Phones",
    value: "phones",
  },
  {
    name: "Laptops",
    value: "laptops",
  },
  {
    name: "Fashion",
    value: "fashion",
  },
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Books",
    value: "books",
  },
  {
    name: "Games",
    value: "games",
  },
  {
    name: "Furniture",
    value: "furniture",
  },
];

const ages = [
  {
    name: "0-5 years old",
    value: "0-5",
  },
  {
    name: "5-10 years old",
    value: "5-10",
  },
  {
    name: "10-15 years old",
    value: "10-15",
  },
  {
    name: "15-18 years old",
    value: "15-18",
  },
  {
    name: "18+ years old",
    value: "18-100",
  },
];
function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div className="w-72 flex flex-col" style={{ marginTop: "50px" }}>
      <div className="flex justify-between">
        <h3 className="text-orange-900  text-xl">Filters</h3>
        <i
          className="ri-close-line  text-xl cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <h5 className="text-gray-600">Categories</h5>

        <div className="flex flex-col">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  className="max-width"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>

        <h5 className="text-gray-600 mt-5">Ages</h5>

        <div className="flex flex-col">
          {ages.map((age) => {
            return (
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="age"
                  className="max-width"
                  checked={filters.age.includes(age.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        age: [...filters.age, age.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        age: filters.age.filter((item) => item !== age.value),
                      });
                    }
                  }}
                />
                <label htmlFor="age">{age.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
