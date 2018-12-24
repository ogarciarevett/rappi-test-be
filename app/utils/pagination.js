const { LIMIT, DEFAULT_PAGE } = require('./constants').pagination;

/*
 * Name: getTotal()
 *
 * Description:
 *   This method gets the total count for the table you reference
 *
 * Params:
 *   - knex : {object} | Reference of the knex instance
 *   - table: 'string' | The name of the table you want to count
 *
 * Return:
 *   - type int (number)
 */
const getTotal = async (knex, table) => {
    try {
        const [{ total }] = await knex(table).count('* as total');
        return total;
    } catch (error) {
        throw error;
    }
};

/*
 * Name: getPaginationParams()
 *
 * Description:
 *   This method gets some pagination params and returns an object with
 *   calculated pagination numbers
 *
 * Params:
 *   - parsePage : (number) | Parsed Int of the original page param
 *   - page: (number) | Original page param
 *   - parseLimit: (number) | Parsed Int of the original itemLimit param
 *   - itemLimit: (number) | Original itemLimit param
 *
 * Return:
 *   - type object { current_page: (number), per_page: (number), offset: (number) }
 */
const getPaginationParams = (parsePage, page, parseLimit, itemLimit) => {
    // eslint-disable-next-line no-restricted-globals
    const current_page =
        parsePage > 0 && !isNaN(parsePage) ? page : DEFAULT_PAGE;
    // eslint-disable-next-line no-restricted-globals
    const per_page = parseLimit > 0 && !isNaN(parseLimit) ? itemLimit : LIMIT;
    // Here the page starts at 1, but for the offset we call the 0 index
    const offset = (current_page - 1) * per_page;

    return { current_page, per_page, offset };
};

/*
 * Name: paginate()
 *
 * Description:
 *   This method makes a pagination obj structure for the resources
 *
 * Params:
 *   - knex       : {object}  | Reference of the knex instance
 *   - table      : 'string'  | The name of the table you want to paginate
 *   - itemLimit  : (number)  | The limit of items per page
 *   - page       : (number)  | The page for the resource to display
 *   - shouldIncludeTotal: (boolean) | default (false) request the total items in the table
 *
 * Return:
 *   - type {object} structure for the pagination
 *   - Example:
 *     {
 *       total: 10, // Optional key, default (undefined)
 *       current_page: 1,
 *       per_page: 5,
 *       offset: 0,
 *       data: [
 *          {
 *            id: 1,
 *            type: 'POSSIBLE LOST PIELOT',
 *            created_at: 2018-08-23T13:48:45.133Z,
 *            updated_at: 2018-08-23T13:48:45.133Z
 *          },
 *          { ... },
 *          { ... }
 *       ]
 *     }
 */
const paginate = async (
    knex,
    table,
    itemLimit = LIMIT,
    page = DEFAULT_PAGE,
    conditions = {},
    shouldIncludeTotal,
) => {
    const parsePage = parseInt(page, 10);
    const parseLimit = parseInt(itemLimit, 10);
    try {
        let data;

        const { current_page, per_page, offset } = getPaginationParams(
            parsePage,
            page,
            parseLimit,
            itemLimit,
        );

        if (parsePage && parseLimit) {
            data = await knex(table)
                .where(conditions)
                .select()
                .limit(per_page)
                .offset(offset);
        } else {
            data = await knex(table)
                .where(conditions)
                .select();
        }

        const pagination = {
            current_page,
            per_page,
            offset,
            data,
        };

        if (shouldIncludeTotal) pagination.total = await getTotal(knex, table);
        return pagination;
    } catch (error) {
        throw error;
    }
};

const paginateBySQL = async (
    knex,
    SQLRawSentence,
    itemLimit = LIMIT,
    page = DEFAULT_PAGE,
    queryBindings = [],
) => {
    const parsePage = parseInt(page, 10);
    const parseLimit = parseInt(itemLimit, 10);
    try {
        const { current_page, per_page, offset } = getPaginationParams(
            parsePage,
            page,
            parseLimit,
            itemLimit,
        );

        const query = `${SQLRawSentence} LIMIT ${per_page} OFFSET ${offset}`;
        const data = await knex.raw(query, queryBindings);

        const pagination = {
            current_page: current_page,
            per_page: per_page,
            offset: offset,
            data: data.rows,
        };

        return pagination;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    paginate,
    paginateBySQL,
    getTotal,
    getPaginationParams,
};
