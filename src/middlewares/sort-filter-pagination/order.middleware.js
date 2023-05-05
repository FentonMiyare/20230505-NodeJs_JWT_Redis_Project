const paginatedResults = model => {
  return async (req, res, next) => {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1000;
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

    // Filter
    let filter = {};
    if (req.query.filterBy && req.query.category) {
      console.log(req.query.category.toLowerCase());
      if (req.query.category.toLowerCase() === 'article review') {
        filter.$or = [{ category: 'Article Review' }];
      } else if (req.query.category.toLowerCase() === 'essay (any type)') {
        filter.$or = [{ category: 'Essay (Any Type)' }];
      } else if (req.query.category.toLowerCase() === "annotated bibliography") {
        filter.$or = [{ category: "Annotated Bibliography" }];
      } else if (req.query.category.toLowerCase() === "coursework") {
        filter.$or = [{ category: "Coursework" }];
      } else if (req.query.category.toLowerCase() === 'article writing') {
        filter.$or = [{ category: 'Article Writing' }];
      } else if (req.query.category.toLowerCase() === "term paper") {
        filter.$or = [{ category: "Term Paper" }];
      } else if (req.query.category.toLowerCase() === "business plan") {
        filter.$or = [{ category: "Business Plan" }];
      } else if (req.query.category.toLowerCase() === 'business proposal') {
        filter.$or = [{ category: 'Business Proposal' }];
      } else if (req.query.category.toLowerCase() === 'research') {
        filter.$or = [{ category: 'Research' }];
      } else if (req.query.category.toLowerCase() === 'book report') {
        filter.$or = [{ category: 'Book Report' }];
      } else if (req.query.category.toLowerCase() === 'case study') {
        filter.$or = [{ category: 'Case Study' }];
      } else if (req.query.category.toLowerCase() === 'critical thinking') {
        filter.$or = [{ category: 'Critical Thinking' }];
      } else if (req.query.category.toLowerCase() === 'movie review') {
        filter.$or = [{ category: 'Movie Review' }];
      } else if (req.query.category.toLowerCase() === 'reflective writing') {
        filter.$or = [{ category: 'Reflective Writing' }];
      } else if (req.query.category.toLowerCase() === 'all categories') {
        filter = {};
      } else {
        filter = {};
      }
    }

    // Search
    if (req.query.search) {
      filter = {
        $or: [
          { title: { $regex: req.query.search } },
          { work: { $regex: req.query.search } },
          { level: { $regex: req.query.search } },
          { category: { $regex: req.query.search } },
          { deadline: { $regex: req.query.search } }
        ]
      };
    }
    console.log('filter', filter);

    try {
      results.results = await model
        .find(filter)
        .select(
        ' work category format level deadline addedDate createdAt updatedAt pages spacing title paperDetails user')
        .populate(
          'user',
          'username email roles'
        ) // populate return merge result
        .limit(limit)
        .sort(sort)
        .skip(startIndex)
        .exec();

      // Add paginated Results to the request
      console.log("model", model)
      res.paginatedResults = results;
      next();
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = paginatedResults;
