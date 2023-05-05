const User = require("../../models/user.model");
const Response = require('../../utils/response')
const db = require("../../models")
const ROLES = db.ROLES

const paginatedResults = model => {
  return async (req, res, next) => {
    // Pagination
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 20;
    const search = parseInt(req.query.search) || "";
    let sort = parseInt(req.query.sort) || "rating";
    let roles = parseInt(req.query.roles) || "All"

    // Get all roles array from db
    const rolesOptions = ROLES
    roles = "All"
        ? (roles = [...rolesOptions])
        : (roles = req.query.roles.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1]
    } else {
        sortBy[sort[0]] = "asc"
    }

    const users = await User.find({ name: {$regex: search, $options: "i"} })
        .where("roles")
        .in([...roles])
        .sort(sortBy)
        .skip(page*limit)
        .limit(limit)
    
        const total = await User.countDocuments({
            roles: { $in: [...roles] },
            username: { $regex: search, $options: "i" }
        })

        const responseObj = {
            error: false,
            total,
            page: page + 1,
            limit,
            roles: rolesOptions,
            users,
        }

        return res
            .status(200)
            .json(Response(responseObj, true, false, 'Successfully Found users', 200))
  }
}

//  /page=1&limit=99&roles=writer&sort=createdAt,desc
//  /page=1&limit=99&roles=writer,admin&sort=createdAt,desc
//  /page=1&limit=99&roles=writer&sort=createdAt,desc&search=academics