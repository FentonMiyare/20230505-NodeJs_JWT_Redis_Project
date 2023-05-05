const paginatedResults = model => {
  return async (req, res, next) => {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {
      currentPage: {
        page: page,
        limit: limit
      }
    };

    const totalCount = await model.countDocuments().exec();

    results.totalDocs = totalCount;
    if (endIndex < totalCount) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }

    results.totalPages = Math.ceil(totalCount / limit);
    results.lastPage = Math.ceil(totalCount / limit);

    // Sort
    const sort = {};
    if (req.query.sortBy && req.query.OrderBy) {
      sort[req.query.sortBy] = req.query.OrderBy.toLowerCase() === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    // let authorities = [];

    // for (let i = 0; i < user.roles.length; i++) {
    //   authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    // }

    // Filter
    let filter = {};
    if (req.query.filterBy && req.query.roles) {
      if (req.query.roles.toLowerCase() === 'admin') {
        filter.$or = [{ name: 'admin' }];
        // [{ roles: 'admin' }];
      } else if (req.query.roles.toLowerCase() === 'writer') {
        filter.$or = [{name: 'writer'}];
        // [{ roles: 'writer' }];
      } else if (req.query.roles.toLowerCase() === 'user') {
        filter.$or = [{ name: 'user' }];
        // [{ roles: 'user' }];
      } else if (req.query.roles.toLowerCase() === 'all') {
        filter = {};
      }
    }
    // { $or: [{name: { $in: req.query.roles }}] }
    // [{ age: 12}, {name: "Kyle"}]
    // console.log(filter)
    // Search
    if (req.query.search) {
      filter = {
        $or: [
          { username: { $regex: req.query.search } },
          { email: { $regex: req.query.search } },
          { profileImage: { $regex: req.query.search } },
          { whatsAppNumber: { $regex: req.query.search } },
          { roles: { $regex: req.query.search } }
        ]
      };
    }

    try {
      results.results = await model
        .find(filter)
        .select(
          'username email profileImage whatsAppNumber roles'
        )
        .limit(limit)
        .sort(sort)
        .skip(startIndex)
        .exec();

      // Add paginated Results to the request
      // console.log("model", model)
      res.paginatedResults = results;
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = paginatedResults;
