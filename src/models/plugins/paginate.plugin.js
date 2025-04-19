/* eslint-disable no-param-reassign */

const paginate = (schema) => {
  schema.statics.paginate = async function (filter, options) {
    let sort = '';
    if (options.sortBy) {
      const sortingCriteria = [];
      options.sortBy.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const isUnlimited = options.limit === 'all' || parseInt(options.limit, 10) === 0;

    let limit;
    if (isUnlimited) {
      limit = 0; // means no limit
    } else if (options.limit && parseInt(options.limit, 10) > 0) {
      limit = parseInt(options.limit, 10);
    } else {
      limit = 10;
    }

    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(filter).exec();

    let docsQuery = this.find(filter).sort(sort);

    if (!isUnlimited) {
      docsQuery = docsQuery.skip(skip).limit(limit);
    }

    if (options.populate) {
      options.populate.split(',').forEach((populateOption) => {
        docsQuery = docsQuery.populate(
          populateOption
            .split('.')
            .reverse()
            .reduce((a, b) => ({ path: b, populate: a }))
        );
      });
    }

    const docsPromise = docsQuery.exec();

    return Promise.all([countPromise, docsPromise]).then(([totalResults, results]) => {
      const totalPages = isUnlimited ? 1 : Math.ceil(totalResults / limit);

      return {
        results,
        page,
        limit: isUnlimited ? totalResults : limit,
        totalPages,
        totalResults,
      };
    });
  };
};

module.exports = paginate;
