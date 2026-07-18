import Lead from "../models/Lead.js";
import { successResponse, errorResponse, paginatedResponse } from "../utils/apiResponse.js";

/**
 * Get all leads for the logged-in user with pagination, filtering, and search.
 * Route: GET /api/leads (Protected)
 * Query Params: status, search, source, dateFrom, dateTo, page, limit, sortBy, sortOrder
 */
export const getLeads = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";
    const { status, search, source, dateFrom, dateTo } = req.query;

    // Build the dynamic filter (always isolate by owner)
    const filter = { owner: req.user._id };

    // Apply status filter if provided and not "All"
    if (status && status !== "All") {
      filter.status = status;
    }

    // Apply source filter if provided and not "All"
    if (source && source !== "All") {
      filter.source = source;
    }

    // Apply date range filters
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) {
        filter.createdAt.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        filter.createdAt.$lte = new Date(dateTo);
      }
    }

    // Apply search filter (name, company, email)
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    // Pagination calculations
    const skip = (page - 1) * limit;

    // Fetch leads and count total matching records
    const sortOptions = { [sortBy]: sortOrder === "desc" ? -1 : 1 };
    const leads = await Lead.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Lead.countDocuments(filter);

    if (process.env.NODE_ENV !== "production") {
      console.log(`Fetched ${leads.length} leads for user: ${req.user._id}`);
    }

    return paginatedResponse(res, leads, total, page, limit);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new lead for the logged-in user.
 * Route: POST /api/leads (Protected)
 */
export const createLead = async (req, res, next) => {
  try {
    const { name, company, email, phone, status, source, notes, value } = req.body;

    const lead = await Lead.create({
      name,
      company,
      email,
      phone,
      status,
      source,
      notes,
      value: value === undefined ? 0 : value,
      owner: req.user._id
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(`Created new lead: ${lead._id} for user: ${req.user._id}`);
    }

    return successResponse(res, lead, "Lead created successfully", 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single lead by ID.
 * Route: GET /api/leads/:id (Protected)
 */
export const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });
    if (!lead) {
      return errorResponse(res, "Lead not found", 404);
    }
    return successResponse(res, lead, "Lead retrieved successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Update a lead by ID.
 * Route: PUT /api/leads/:id (Protected)
 */
export const updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });
    if (!lead) {
      return errorResponse(res, "Lead not found", 404);
    }

    // Do NOT allow changing the owner field
    delete req.body.owner;

    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (process.env.NODE_ENV !== "production") {
      console.log(`Updated lead: ${updatedLead._id} for user: ${req.user._id}`);
    }

    return successResponse(res, updatedLead, "Lead updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Update only the status field of a lead.
 * Route: PATCH /api/leads/:id/status (Protected)
 */
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const updatedLead = await Lead.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return errorResponse(res, "Lead not found", 404);
    }

    return successResponse(res, updatedLead, "Lead status updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a lead permanently.
 * Route: DELETE /api/leads/:id (Protected)
 */
export const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findOne({ _id: req.params.id, owner: req.user._id });
    if (!lead) {
      return errorResponse(res, "Lead not found", 404);
    }

    await lead.deleteOne();

    if (process.env.NODE_ENV !== "production") {
      console.log(`Deleted lead: ${req.params.id} for user: ${req.user._id}`);
    }

    return successResponse(res, null, "Lead deleted successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Get dashboard and analytics stats for the logged-in user.
 * Route: GET /api/leads/stats/summary (Protected)
 */
export const getLeadStats = async (req, res, next) => {
  try {
    const startOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const startOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
    const endOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0, 23, 59, 59, 999);

    const stats = await Lead.aggregate([
      { $match: { owner: req.user._id } },
      {
        $facet: {
          total: [{ $count: "count" }],
          statusGroup: [
            { $group: { _id: "$status", count: { $sum: 1 } } }
          ],
          sourceGroup: [
            { $group: { _id: "$source", count: { $sum: 1 } } }
          ],
          thisMonth: [
            { $match: { createdAt: { $gte: startOfThisMonth } } },
            { $count: "count" }
          ],
          lastMonth: [
            {
              $match: {
                createdAt: {
                  $gte: startOfLastMonth,
                  $lte: endOfLastMonth
                }
              }
            },
            { $count: "count" }
          ]
        }
      }
    ]);

    const totalLeads = stats[0].total[0]?.count || 0;
    const thisMonthLeads = stats[0].thisMonth[0]?.count || 0;
    const lastMonthLeads = stats[0].lastMonth[0]?.count || 0;

    // Initialize breakdowns with 0 for all enum options
    const statusBreakdown = {
      New: 0,
      Contacted: 0,
      "Meeting Scheduled": 0,
      "Proposal Sent": 0,
      Won: 0,
      Lost: 0
    };

    const sourceBreakdown = {
      Website: 0,
      Referral: 0,
      LinkedIn: 0,
      "Cold Call": 0,
      "Email Campaign": 0,
      Other: 0
    };

    stats[0].statusGroup.forEach((item) => {
      if (item._id in statusBreakdown) {
        statusBreakdown[item._id] = item.count;
      }
    });

    stats[0].sourceGroup.forEach((item) => {
      if (item._id in sourceBreakdown) {
        sourceBreakdown[item._id] = item.count;
      }
    });

    const wonLeads = statusBreakdown.Won || 0;
    const conversionRate = totalLeads > 0 ? parseFloat(((wonLeads / totalLeads) * 100).toFixed(1)) : 0;
    
    // Growth Rate calculation
    let growthRate = 0;
    if (lastMonthLeads > 0) {
      growthRate = parseFloat((((thisMonthLeads - lastMonthLeads) / lastMonthLeads) * 100).toFixed(1));
    } else if (thisMonthLeads > 0) {
      growthRate = 100;
    }

    const summaryStats = {
      totalLeads,
      wonLeads,
      lostLeads: statusBreakdown.Lost || 0,
      conversionRate,
      statusBreakdown,
      sourceBreakdown,
      thisMonthLeads,
      lastMonthLeads,
      growthRate
    };

    return successResponse(res, summaryStats, "Lead statistics retrieved successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Get monthly lead statistics for the last 6 months.
 * Route: GET /api/leads/stats/monthly (Protected)
 */
export const getMonthlyStats = async (req, res, next) => {
  try {
    // Generate dates and names for the last 6 months in chronological order
    const monthsList = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setDate(1); // Avoid month rollover edge cases
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleString("en-US", { month: "short" });
      const year = d.getFullYear();
      monthsList.push({
        key: `${year}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: `${monthName} ${year}`,
        total: 0,
        won: 0,
        lost: 0
      });
    }

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyData = await Lead.aggregate([
      {
        $match: {
          owner: req.user._id,
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          total: { $sum: 1 },
          won: {
            $sum: {
              $cond: [{ $eq: ["$status", "Won"] }, 1, 0]
            }
          },
          lost: {
            $sum: {
              $cond: [{ $eq: ["$status", "Lost"] }, 1, 0]
            }
          }
        }
      }
    ]);

    // Map aggregate data back to list of months
    monthlyData.forEach((item) => {
      const monthStr = `${item._id.year}-${String(item._id.month).padStart(2, "0")}`;
      const monthObj = monthsList.find((m) => m.key === monthStr);
      if (monthObj) {
        monthObj.total = item.total;
        monthObj.won = item.won;
        monthObj.lost = item.lost;
      }
    });

    const responseData = monthsList.map((m) => {
      const conversionRate = m.total > 0 ? parseFloat(((m.won / m.total) * 100).toFixed(1)) : 0;
      return {
        month: m.label,
        total: m.total,
        won: m.won,
        lost: m.lost,
        conversionRate
      };
    });

    return successResponse(res, responseData, "Monthly statistics retrieved successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Autocomplete / search lead names/emails.
 * Route: GET /api/leads/search (Protected)
 * Query: q (search term), limit
 */
export const getLeadsSearch = async (req, res, next) => {
  try {
    const queryTerm = req.query.q || "";
    const searchLimit = parseInt(req.query.limit) || 5;

    if (!queryTerm) {
      return successResponse(res, [], "No search query provided");
    }

    const leads = await Lead.find({
      owner: req.user._id,
      $or: [
        { name: { $regex: queryTerm, $options: "i" } },
        { company: { $regex: queryTerm, $options: "i" } },
        { email: { $regex: queryTerm, $options: "i" } }
      ]
    })
      .select("_id name company email status")
      .limit(searchLimit);

    return successResponse(res, leads, "Search completed successfully");
  } catch (error) {
    next(error);
  }
};
