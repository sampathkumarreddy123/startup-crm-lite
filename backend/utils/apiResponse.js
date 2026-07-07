/**
 * Sends a successful API response.
 * @param {object} res - Express response object
 * @param {*} data - Response payload
 * @param {string} message - Response message
 * @param {number} [statusCode=200] - HTTP status code
 */
export const successResponse = (res, data, message, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Sends an error API response.
 * @param {object} res - Express response object
 * @param {string} message - Error message
 * @param {number} [statusCode=500] - HTTP status code
 * @param {*} [errors=null] - Detailed validation or field errors
 */
export const errorResponse = (res, message, statusCode = 500, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};

/**
 * Sends a paginated API response.
 * @param {object} res - Express response object
 * @param {Array} data - Array of paginated data items
 * @param {number} total - Total count of documents matching the query
 * @param {number} page - Current page index (1-indexed)
 * @param {number} limit - Max number of items per page
 */
export const paginatedResponse = (res, data, total, page, limit) => {
  const pages = Math.ceil(total / limit) || 1;
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      pages,
      hasNext: page < pages,
      hasPrev: page > 1
    }
  });
};
