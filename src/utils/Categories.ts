import axios from "axios";
import categoryResponse from "@/interfaces/categoryResponse";

const fetchCategories = async () => {
  let categoryData: categoryResponse[] = [];

  try {
    const res = await axios.get("/api/category");
    const categories = res.data.data as categoryResponse[];
    categoryData = categories.filter(
      (category) => category.title !== "View All",
    );
  } catch (error) {
    console.error("Failed to get all categories due to: " + error);
  }

  return categoryData;
};

export { fetchCategories };
