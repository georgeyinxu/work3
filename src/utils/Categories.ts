import axios from "axios";
import {ICategory} from "@/interfaces/CategoryResponse";

const fetchCategories = async () => {
  let categoryData: ICategory[] = [];

  try {
    const res = await axios.get("/api/category");
    categoryData = res.data.data as ICategory[];
  } catch (error) {
    console.error("Failed to get all categories due to: " + error);
  }

  return categoryData;
};

export { fetchCategories };
