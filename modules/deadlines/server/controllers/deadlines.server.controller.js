'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Deadline = mongoose.model('Deadline'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a deadline
 */
exports.create = function (req, res) {
  var deadline = new Deadline(req.body);
  deadline.user = req.user;

  deadline.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(deadline);
    }
  });
};

/**
 * Show the current deadline
 */
exports.read = function (req, res) {
  res.json(req.deadline);
};

/**
 * Update a deadline
 */
exports.update = function (req, res) {
  var deadline = req.deadline;
  deadline.event_date = req.body.event_date;
  deadline.event = req.body.event;
  deadline.content = req.body.content;
  deadline.classes = req.body.classes;
  deadline.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(deadline);
    }
  });
};

/**
 * Delete an deadline
 */
exports.delete = function (req, res) {
  var deadline = req.deadline;

  deadline.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(deadline);
    }
  });
};

/**
 * List of Deadlines
 */
exports.list = function (req, res) {
  Deadline.find().sort('event_date').populate('user', 'displayName').exec(function (err, deadlines) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(deadlines);
    }
  });
};

/**
 * Deadline middleware
 */
exports.deadlineByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Deadline is invalid'
    });
  }

  Deadline.findById(id).populate('user', 'displayName').exec(function (err, deadline) {
    if (err) {
      return next(err);
    } else if (!deadline) {
      return res.status(404).send({
        message: 'No deadline with that identifier has been found'
      });
    }
    req.deadline = deadline;
    next();
  });
};
