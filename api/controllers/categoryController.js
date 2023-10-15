import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    });
    await category.save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in Category",
    });
  }
};
//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    await category.save();
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all cat
export const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel.find({}).select("-photo");
    res.status(200).send({
      success: true,
      message: "All Categories List",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel
      .findOne({ slug: req.params.slug })
      .select("-photo");
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Category",
    });
  }
};

//delete category
export const deleteCategoryCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting category",
      error,
    });
  }
};

// get photo
// export const categoryPhotoController = async (req, res) => {
//   try {
//     const category = await categoryModel
//       .findById(req.params.pid)
//       .select("photo");
//     if (category.photo.data) {
//       res.set("Content-type", category.photo.contentType);
//       return res.status(200).send(category.photo.data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr while getting photo",
//       error,
//     });
//   }
// };

// Create a new subcategory within a category
export const createSubcategory = async (req, res) => {
  try {
    const { categoryId, name } = req.body;

    // Find the category by its ID
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Create a new subcategory
    const subcategory = {
      name,
    };

    category.subcategories.push(subcategory); // Add the subcategory to the category's subcategories array
    await category.save(); // Save the updated category document

    res.status(201).json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateSubcategory = async (req, res) => {
  try {
    const { categoryId, subcategoryId, name } = req.body;

    // Find the category by its ID
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find the subcategory by its ID within the category
    const subcategory = category.subcategories.id(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    // Update the subcategory name
    subcategory.name = name;

    await category.save(); // Save the updated category document

    res.status(200).json(subcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const { categoryId, subcategoryId } = req.body;

    // Find the category by its ID
    const category = await categoryModel.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Find the subcategory by its ID within the category
    const subcategory = category.subcategories.id(subcategoryId);

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    // Remove the subcategory from the category's subcategories array
    subcategory.remove();

    await category.save(); // Save the updated category document

    res.status(204).json({ error: "Delete successful" }); // Send a success response with no content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
