const { readFile, writeFile } = require("../utils/fs");
const { v4 } = require("uuid");

const createPost = (req, res) => {
  try {
    const { title, desc } = req.body;
    const allPost = readFile("posts");

    if (!title && !desc) {
      return res.status(401).json({ message: "invalid title or desc" });
    }

    const collectionData = { id: v4(), title: title, desc: desc };

    writeFile([...allPost, collectionData]);

    res.status(200).json(collectionData);
  } catch (e) {
    console.log(e);
  }
};

const getPostFilter = (req, res) => {
  try {
    const { id } = req.params;
    const allPost = readFile("posts");

    if (!id) return res.status(404).json({ message: "id not specified" });

    const foundData = allPost.find((e) => e.id == id);
    if (!foundData) return res.status(404).json({ message: "data not found" });

    res.status(200).json({ message: "success", data: foundData });
  } catch (e) {
    console.log(e);
  }
};

const updatetePost = (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.params;
    const allPost = read("posts");

    if (!title && !desc) return res.status(401).json({ message: "invalid title or desc" });
    else if (!id) return res.status(404).json({ message: "id not specified" });

    const foundData = allPost.find((e) => e.id == id);
    if (!foundData) return res.status(404).json({ message: "data not found" });

    foundData.title = title || foundData.title;
    foundData.desc = desc || foundData.desc;

    writeFile("posts", allPost);

    res.status(200).json({ message: "success", data: foundData });
  } catch (e) {
    console.log(e);
  }
};

const deletePost = (req, res) => {
  try {
    const { id } = req.params;
    const allPost = readFile("posts");

    if (!id) return res.status(404).json({ message: "id not found" });
    const deletedPost = allPost.filter((e) => e.id !== id);

    writeFile("posts", deletedPost);

    res.status(200).json({ message: "post deleted!" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { createPost, getPostFilter, updatetePost, deletePost };
