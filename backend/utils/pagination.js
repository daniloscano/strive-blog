class Pagination {
    constructor(model) {
        this.model = model
    }

    async getPaginatedData(page, pageSize, filter = {}, sort = {}, populateFields = []) {
        const totalResults = await this.model.countDocuments(filter)
        const totalPages = Math.ceil( totalResults / pageSize)
        const data = await this.model.find(filter)
            .sort(sort)
            .limit(pageSize)
            .skip( (page - 1) * pageSize )
            .populate(populateFields)

        return {
            totalResults,
            totalPages,
            page,
            pageSize,
            data
        }
    }
}

module.exports = Pagination