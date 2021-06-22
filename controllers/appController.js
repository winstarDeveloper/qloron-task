// const fs = require("fs");
const DataModel = require('./../models/dataModel');
const catchAsync = require("./../utils/catchAsync");

exports.getData = catchAsync(async (req, res, next) => {
  // fs.readFile(`${__dirname}/data.json`, "utf-8", (err, data) => {
  //   const result = JSON.parse(data);
  //   res.status(200).json({
  //     status: "success",
  //     results: result.length,
  //     data: result,
  //   });
  // });
  const data = await DataModel.find();
  res.status(200).json({ status: 'Success', results: data.length, data: data });
});

exports.addData = catchAsync(async (req, res, next) => {
  const new_data = await DataModel.create(req.body);
  res.status(201).json({
    status: 'Success',
    message: 'New Name Data Added',
  });

  // fs.readFile(`${__dirname}/data.json`, "utf-8", (err, data) => {
  //   const result = JSON.parse(data);
  //   req.body.id = Math.floor((1 + Math.random()) * 0x10000);
  //   result.push(req.body);

  //   fs.writeFile(
  //     `${__dirname}/data.json`,
  //     JSON.stringify(result),
  //     "utf-8",
  //     (err) => {
  //       res.status(200).json({
  //         status: "success",
  //         message: "New Name Added Successfully",
  //         results: result.length,
  //         data: result,
  //       });
  //     }
  //   );
  // });
});

exports.updateData = catchAsync(async (req, res, next) => {
  // fs.readFile(`${__dirname}/data.json`, "utf-8", (err, data) => {
  //   let result = JSON.parse(data);
  //   const temp_data = result.filter((i) => i.id === req.params.id * 1);
  //   req.body.id = req.params.id * 1;
  //   result = result.filter((i) => i.id !== req.params.id * 1);
  //   result.push(req.body);
  //   result.sort((a, b) => {
  //     let comparison = 0;
  //     if (a.id > b.id) comparison = 1;
  //     else comparison = -1;
  //     return comparison;
  //   });

  //   fs.writeFile(
  //     `${__dirname}/data.json`,
  //     JSON.stringify(result),
  //     "utf-8",
  //     (err) => {
  //       res.status(200).json({
  //         status: "success",
  //         message: "Data Edited Successfully",
  //         results: result.length,
  //         data: result,
  //       });
  //     }
  //   );
  // });

  const update_name = await DataModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(200)
    .json({ status: 'Success', message: 'Name updated' });
});

exports.deleteData = catchAsync(async (req, res, next) => {
  // fs.readFile(`${__dirname}/data.json`, "utf-8", (err, data) => {
  //   let result = JSON.parse(data);
  //   result = result.filter((i) => i.id !== req.params.id * 1);

  //   result.sort((a, b) => {
  //     let comparison = 0;
  //     if (a.id > b.id) comparison = 1;
  //     else comparison = -1;
  //     return comparison;
  //   });

  //   fs.writeFile(
  //     `${__dirname}/data.json`,
  //     JSON.stringify(result),
  //     "utf-8",
  //     (err) => {
  //       res.status(200).json({
  //         status: "success",
  //         message: "Data Deleted Successfully",
  //         results: result.length,
  //         data: result,
  //       });
  //     }
  //   );
  // });

  const deleted_name = await DataModel.findOneAndDelete({ _id: req.params.id }, req.body);
  if(!deleted_name){
    return next(new AppError('No Name found to delete', 404));
  }
  res.status(200).json({ status: 'Success', message: "Name deleted Successfully" });
});
