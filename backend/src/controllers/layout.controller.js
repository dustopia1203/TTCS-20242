const Layout = require("../models/Layout");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary").v2;

const createLayout = async (req, res, next) => {
  try {
    const { type } = req.body;
    const isTypeExist = await Layout.findOne({ type });
    if (isTypeExist) {
      return next(new ErrorHandler("Layout already exists", 400));
    }
    if (type === "Banner") {
      const { image, title, subtitle } = req.body;
      const imageHolder = await cloudinary.uploader.upload(image, {
        folder: "layout",
      });
      const banner = {
        image: {
          public_id: imageHolder.public_id,
          url: imageHolder.secure_url,
        },
        title,
        subtitle,
      };
      await Layout.create({ type, banner });
    }
    if (type === "FAQs") {
      const { faqs } = req.body;
      const faqItems = await Promise.all(
        faqs.map(async (faq) => {
          return {
            question: faq.question,
            answer: faq.answer,
          };
        })
      );
      await Layout.create({ type, faqs: faqItems });
    }
    if (type === "Categories") {
      const { categories } = req.body;
      const categoryItems = await Promise.all(
        categories.map(async (category) => {
          return {
            title: category.title,
          };
        })
      );
      await Layout.create({ type, categories: categoryItems });
    }
    res.status(201).json({
      success: true,
      message: "Layout created successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const editLayout = async (req, res, next) => {
  try {
    const { type } = req.body;
    if (type === "Banner") {
      const bannerData = await Layout.findOne({ type });
      const { image, title, subtitle } = req.body;
      if (bannerData) {
        await cloudinary.uploader.destroy(bannerData.image.public_id);
      }
      const imageHolder = await cloudinary.uploader.upload(image, {
        folder: "layout",
      });
      const banner = {
        image: {
          public_id: imageHolder.public_id,
          url: imageHolder.secure_url,
        },
        title,
        subtitle,
      };
      await Layout.findByIdAndUpdate(bannerData._id, { banner });
    }
    if (type === "FAQs") {
      const { faqs } = req.body;
      const faqItem = await Layout.findOne({ type });
      const faqItems = await Promise.all(
        faqs.map(async (faq) => {
          return {
            question: faq.question,
            answer: faq.answer,
          };
        })
      );
      await Layout.findByIdAndUpdate(faqItem._id, { faqs: faqItems });
    }
    if (type === "Categories") {
      const { categories } = req.body;
      const category = await Layout.findOne({ type });
      const categoryItems = await Promise.all(
        categories.map(async (category) => {
          return {
            title: category.title,
          };
        })
      );
      await Layout.findByIdAndUpdate(category._id, {
        categories: categoryItems,
      });
    }
    res.status(201).json({
      success: true,
      message: "Layout updated successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

const getLayoutByType = async (req, res, next) => {
  try {
    type = req.params.type[0].toUpperCase() + req.params.type.slice(1);
    const layout = await Layout.findOne({ type });
    if (!layout) {
      return next(new ErrorHandler("Layout not found", 404));
    }
    res.status(200).json({
      success: true,
      layout,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

module.exports = {
  createLayout,
  editLayout,
  getLayoutByType,
};
